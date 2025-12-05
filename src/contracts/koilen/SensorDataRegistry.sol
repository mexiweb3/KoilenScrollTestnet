// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

/**
 * @title SensorDataRegistry
 * @dev Immutable registry for sensor readings with data integrity verification
 * @notice Stores temperature and humidity readings on-chain for audit trail
 */
contract SensorDataRegistry {

    // ============ STRUCTS ============

    struct Reading {
        uint256 id;
        uint256 sensorId;         // Referencia al sensor en KoilenRegistry
        string deviceId;          // deviceId de Tuya
        int16 temperature;        // Temp * 10 (para decimales)
        int16 humidity;           // Humedad
        bool online;              // Estado del sensor
        uint256 timestamp;        // Timestamp de la lectura (de Tuya)
        uint256 blockNumber;      // Bloque donde se registró
        bytes32 dataHash;         // Hash para verificación de integridad
        uint256 createdAt;        // Timestamp del bloque
    }

    struct Alert {
        uint256 id;
        uint256 sensorId;
        string alertType;         // "temp_high", "temp_low", "offline", "humidity_high", etc.
        int16 value;
        uint256 timestamp;
        bytes32 readingHash;      // Hash de la lectura que disparó la alerta
    }

    // ============ STORAGE ============

    uint256 private nextReadingId = 1;
    uint256 private nextAlertId = 1;

    // Lecturas por deviceId
    mapping(string => Reading[]) public deviceReadings;

    // Lecturas por sensorId
    mapping(uint256 => Reading[]) public sensorReadings;

    // Alertas por sensorId
    mapping(uint256 => Alert[]) public sensorAlerts;

    // Contador total
    uint256 public totalReadings;
    uint256 public totalAlerts;

    // Control de acceso
    mapping(address => bool) public authorizedWriters;
    address public admin;

    // ============ EVENTS ============

    event ReadingLogged(
        uint256 indexed readingId,
        uint256 indexed sensorId,
        string deviceId,
        int16 temperature,
        int16 humidity,
        bool online,
        uint256 timestamp,
        bytes32 dataHash
    );

    event AlertTriggered(
        uint256 indexed alertId,
        uint256 indexed sensorId,
        string alertType,
        int16 value,
        uint256 timestamp
    );

    event WriterAuthorized(address indexed writer, uint256 timestamp);
    event WriterRevoked(address indexed writer, uint256 timestamp);

    // ============ CONSTRUCTOR ============

    constructor() {
        admin = msg.sender;
        authorizedWriters[msg.sender] = true;
    }

    // ============ MODIFIERS ============

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin");
        _;
    }

    modifier onlyAuthorized() {
        require(authorizedWriters[msg.sender], "Not authorized");
        _;
    }

    // ============ ADMIN FUNCTIONS ============

    function authorizeWriter(address _writer) public onlyAdmin {
        authorizedWriters[_writer] = true;
        emit WriterAuthorized(_writer, block.timestamp);
    }

    function revokeWriter(address _writer) public onlyAdmin {
        authorizedWriters[_writer] = false;
        emit WriterRevoked(_writer, block.timestamp);
    }

    // ============ WRITE FUNCTIONS ============

    function logReading(
        uint256 _sensorId,
        string memory _deviceId,
        int16 _temperature,
        int16 _humidity,
        bool _online,
        uint256 _timestamp
    ) public onlyAuthorized returns (bytes32) {
        // Generar hash de los datos
        bytes32 dataHash = keccak256(abi.encodePacked(
            _sensorId,
            _deviceId,
            _temperature,
            _humidity,
            _online,
            _timestamp
        ));

        uint256 readingId = nextReadingId++;

        Reading memory newReading = Reading({
            id: readingId,
            sensorId: _sensorId,
            deviceId: _deviceId,
            temperature: _temperature,
            humidity: _humidity,
            online: _online,
            timestamp: _timestamp,
            blockNumber: block.number,
            dataHash: dataHash,
            createdAt: block.timestamp
        });

        deviceReadings[_deviceId].push(newReading);
        sensorReadings[_sensorId].push(newReading);
        totalReadings++;

        emit ReadingLogged(
            readingId,
            _sensorId,
            _deviceId,
            _temperature,
            _humidity,
            _online,
            _timestamp,
            dataHash
        );

        return dataHash;
    }

    function logReadingsBatch(
        uint256[] memory _sensorIds,
        string[] memory _deviceIds,
        int16[] memory _temperatures,
        int16[] memory _humidities,
        bool[] memory _onlineStatuses,
        uint256[] memory _timestamps
    ) public onlyAuthorized {
        require(
            _sensorIds.length == _deviceIds.length &&
            _sensorIds.length == _temperatures.length &&
            _sensorIds.length == _humidities.length &&
            _sensorIds.length == _onlineStatuses.length &&
            _sensorIds.length == _timestamps.length,
            "Array length mismatch"
        );

        for (uint256 i = 0; i < _sensorIds.length; i++) {
            logReading(
                _sensorIds[i],
                _deviceIds[i],
                _temperatures[i],
                _humidities[i],
                _onlineStatuses[i],
                _timestamps[i]
            );
        }
    }

    function logAlert(
        uint256 _sensorId,
        string memory _alertType,
        int16 _value,
        bytes32 _readingHash
    ) public onlyAuthorized returns (uint256) {
        uint256 alertId = nextAlertId++;

        Alert memory newAlert = Alert({
            id: alertId,
            sensorId: _sensorId,
            alertType: _alertType,
            value: _value,
            timestamp: block.timestamp,
            readingHash: _readingHash
        });

        sensorAlerts[_sensorId].push(newAlert);
        totalAlerts++;

        emit AlertTriggered(
            alertId,
            _sensorId,
            _alertType,
            _value,
            block.timestamp
        );

        return alertId;
    }

    // ============ READ FUNCTIONS ============

    function getReadingCount(string memory _deviceId) public view returns (uint256) {
        return deviceReadings[_deviceId].length;
    }

    function getSensorReadingCount(uint256 _sensorId) public view returns (uint256) {
        return sensorReadings[_sensorId].length;
    }

    function getLatestReading(string memory _deviceId)
        public
        view
        returns (Reading memory)
    {
        Reading[] memory readings = deviceReadings[_deviceId];
        require(readings.length > 0, "No readings found");
        return readings[readings.length - 1];
    }

    function getLatestReadings(string memory _deviceId, uint256 _count)
        public
        view
        returns (Reading[] memory)
    {
        Reading[] storage allReadings = deviceReadings[_deviceId];
        uint256 totalCount = allReadings.length;
        uint256 returnCount = _count > totalCount ? totalCount : _count;

        Reading[] memory latestReadings = new Reading[](returnCount);

        for (uint256 i = 0; i < returnCount; i++) {
            latestReadings[i] = allReadings[totalCount - returnCount + i];
        }

        return latestReadings;
    }

    function getSensorReadings(uint256 _sensorId, uint256 _count)
        public
        view
        returns (Reading[] memory)
    {
        Reading[] storage allReadings = sensorReadings[_sensorId];
        uint256 totalCount = allReadings.length;
        uint256 returnCount = _count > totalCount ? totalCount : _count;

        Reading[] memory latestReadings = new Reading[](returnCount);

        for (uint256 i = 0; i < returnCount; i++) {
            latestReadings[i] = allReadings[totalCount - returnCount + i];
        }

        return latestReadings;
    }

    function getSensorAlerts(uint256 _sensorId)
        public
        view
        returns (Alert[] memory)
    {
        return sensorAlerts[_sensorId];
    }

    // ============ VERIFICATION ============

    function verifyReading(
        string memory _deviceId,
        uint256 _index
    ) public view returns (bool) {
        Reading memory reading = deviceReadings[_deviceId][_index];

        bytes32 computedHash = keccak256(abi.encodePacked(
            reading.sensorId,
            reading.deviceId,
            reading.temperature,
            reading.humidity,
            reading.online,
            reading.timestamp
        ));

        return computedHash == reading.dataHash;
    }
}
