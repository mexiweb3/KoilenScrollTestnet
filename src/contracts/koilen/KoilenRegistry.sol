// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title KoilenRegistry
 * @dev Main registry contract for Koilen IoT monitoring system
 * @notice Manages clients, business units, and sensors on-chain
 */
contract KoilenRegistry is AccessControl {

    // ============ ROLES ============
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant OPERATOR_ROLE = keccak256("OPERATOR_ROLE");

    // ============ STRUCTS ============

    struct Client {
        uint256 id;
        address wallet;           // Wallet del cliente
        string businessName;      // Nombre del negocio
        string email;             // Email de contacto
        string phoneNumber;       // Teléfono
        bool isActive;
        uint256 createdAt;
        uint256 updatedAt;
    }

    struct BusinessUnit {
        uint256 id;
        uint256 clientId;         // ID del cliente propietario
        string name;              // Nombre de la sucursal
        string location;          // Ubicación (ciudad, país)
        string businessType;      // restaurant, supermarket, etc.
        string contactName;       // Contacto de la sucursal
        string contactPhone;
        string contactEmail;
        bool isActive;
        uint256 createdAt;
        uint256 updatedAt;
    }

    struct Sensor {
        uint256 id;
        uint256 businessUnitId;   // Sucursal donde está instalado
        string deviceId;          // ID de Tuya (referencia externa)
        string name;              // Nombre del sensor
        string location;          // Ubicación específica ("Cocina - Esquina izquierda")
        string equipmentType;     // cooler, freezer, etc.
        int16 tempMin;            // Temp mínima * 10 (para decimales)
        int16 tempMax;            // Temp máxima * 10
        int16 humidityMin;        // Humedad mínima
        int16 humidityMax;        // Humedad máxima
        bool isActive;
        uint256 installedAt;
        uint256 createdAt;
        uint256 updatedAt;
    }

    // ============ STORAGE ============

    // Contadores
    uint256 private nextClientId = 1;
    uint256 private nextBusinessUnitId = 1;
    uint256 private nextSensorId = 1;

    // Mappings principales
    mapping(uint256 => Client) public clients;
    mapping(address => uint256) public walletToClientId;
    mapping(uint256 => BusinessUnit) public businessUnits;
    mapping(uint256 => Sensor) public sensors;

    // Relaciones
    mapping(uint256 => uint256[]) public clientBusinessUnits;  // clientId => businessUnitIds[]
    mapping(uint256 => uint256[]) public businessUnitSensors;  // businessUnitId => sensorIds[]
    mapping(string => uint256) public deviceIdToSensorId;      // deviceId => sensorId

    // Control de acceso compartido
    mapping(uint256 => mapping(address => bool)) public businessUnitSharedWith;

    // Arrays para iteración
    uint256[] private allClientIds;
    uint256[] private allBusinessUnitIds;
    uint256[] private allSensorIds;

    // ============ EVENTS ============

    event ClientRegistered(
        uint256 indexed clientId,
        address indexed wallet,
        string businessName,
        uint256 timestamp
    );

    event ClientUpdated(
        uint256 indexed clientId,
        string businessName,
        uint256 timestamp
    );

    event BusinessUnitCreated(
        uint256 indexed businessUnitId,
        uint256 indexed clientId,
        string name,
        string location,
        uint256 timestamp
    );

    event BusinessUnitUpdated(
        uint256 indexed businessUnitId,
        uint256 timestamp
    );

    event BusinessUnitShared(
        uint256 indexed businessUnitId,
        address indexed sharedWith,
        uint256 timestamp
    );

    event SensorRegistered(
        uint256 indexed sensorId,
        uint256 indexed businessUnitId,
        string deviceId,
        string name,
        uint256 timestamp
    );

    event SensorUpdated(
        uint256 indexed sensorId,
        uint256 timestamp
    );

    event SensorConfigUpdated(
        uint256 indexed sensorId,
        int16 tempMin,
        int16 tempMax,
        uint256 timestamp
    );

    // ============ CONSTRUCTOR ============

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
        _grantRole(OPERATOR_ROLE, msg.sender);
    }

    // ============ MODIFIERS ============

    modifier onlyClientOwner(uint256 _clientId) {
        require(
            clients[_clientId].wallet == msg.sender ||
            hasRole(ADMIN_ROLE, msg.sender),
            "Not authorized"
        );
        _;
    }

    modifier onlyBusinessUnitOwner(uint256 _businessUnitId) {
        uint256 clientId = businessUnits[_businessUnitId].clientId;
        require(
            clients[clientId].wallet == msg.sender ||
            businessUnitSharedWith[_businessUnitId][msg.sender] ||
            hasRole(ADMIN_ROLE, msg.sender),
            "Not authorized"
        );
        _;
    }

    // ============ CLIENT FUNCTIONS ============

    function registerClient(
        string memory _businessName,
        string memory _email,
        string memory _phoneNumber
    ) public returns (uint256) {
        require(walletToClientId[msg.sender] == 0, "Client already registered");

        uint256 clientId = nextClientId++;

        clients[clientId] = Client({
            id: clientId,
            wallet: msg.sender,
            businessName: _businessName,
            email: _email,
            phoneNumber: _phoneNumber,
            isActive: true,
            createdAt: block.timestamp,
            updatedAt: block.timestamp
        });

        walletToClientId[msg.sender] = clientId;
        allClientIds.push(clientId);

        emit ClientRegistered(clientId, msg.sender, _businessName, block.timestamp);

        return clientId;
    }

    function updateClient(
        uint256 _clientId,
        string memory _businessName,
        string memory _email,
        string memory _phoneNumber
    ) public onlyClientOwner(_clientId) {
        Client storage client = clients[_clientId];

        client.businessName = _businessName;
        client.email = _email;
        client.phoneNumber = _phoneNumber;
        client.updatedAt = block.timestamp;

        emit ClientUpdated(_clientId, _businessName, block.timestamp);
    }

    function getClientByWallet(address _wallet) public view returns (Client memory) {
        uint256 clientId = walletToClientId[_wallet];
        require(clientId != 0, "Client not found");
        return clients[clientId];
    }

    function getClientById(uint256 _clientId) public view returns (Client memory) {
        require(clients[_clientId].id != 0, "Client not found");
        return clients[_clientId];
    }

    function getAllClients() public view returns (Client[] memory) {
        Client[] memory allClients = new Client[](allClientIds.length);
        for (uint256 i = 0; i < allClientIds.length; i++) {
            allClients[i] = clients[allClientIds[i]];
        }
        return allClients;
    }

    // ============ BUSINESS UNIT FUNCTIONS ============

    function createBusinessUnit(
        string memory _name,
        string memory _location,
        string memory _businessType,
        string memory _contactName,
        string memory _contactPhone,
        string memory _contactEmail
    ) public returns (uint256) {
        uint256 clientId = walletToClientId[msg.sender];
        require(clientId != 0, "Must be registered client");

        uint256 businessUnitId = nextBusinessUnitId++;

        businessUnits[businessUnitId] = BusinessUnit({
            id: businessUnitId,
            clientId: clientId,
            name: _name,
            location: _location,
            businessType: _businessType,
            contactName: _contactName,
            contactPhone: _contactPhone,
            contactEmail: _contactEmail,
            isActive: true,
            createdAt: block.timestamp,
            updatedAt: block.timestamp
        });

        clientBusinessUnits[clientId].push(businessUnitId);
        allBusinessUnitIds.push(businessUnitId);

        emit BusinessUnitCreated(
            businessUnitId,
            clientId,
            _name,
            _location,
            block.timestamp
        );

        return businessUnitId;
    }

    function updateBusinessUnit(
        uint256 _businessUnitId,
        string memory _name,
        string memory _location,
        string memory _businessType,
        string memory _contactName,
        string memory _contactPhone,
        string memory _contactEmail
    ) public onlyBusinessUnitOwner(_businessUnitId) {
        BusinessUnit storage bu = businessUnits[_businessUnitId];

        bu.name = _name;
        bu.location = _location;
        bu.businessType = _businessType;
        bu.contactName = _contactName;
        bu.contactPhone = _contactPhone;
        bu.contactEmail = _contactEmail;
        bu.updatedAt = block.timestamp;

        emit BusinessUnitUpdated(_businessUnitId, block.timestamp);
    }

    function shareBusinessUnit(
        uint256 _businessUnitId,
        address _sharedWith
    ) public onlyBusinessUnitOwner(_businessUnitId) {
        businessUnitSharedWith[_businessUnitId][_sharedWith] = true;

        emit BusinessUnitShared(_businessUnitId, _sharedWith, block.timestamp);
    }

    function getBusinessUnit(uint256 _businessUnitId)
        public
        view
        returns (BusinessUnit memory)
    {
        require(businessUnits[_businessUnitId].id != 0, "BusinessUnit not found");
        return businessUnits[_businessUnitId];
    }

    function getClientBusinessUnits(uint256 _clientId)
        public
        view
        returns (BusinessUnit[] memory)
    {
        uint256[] memory ids = clientBusinessUnits[_clientId];
        BusinessUnit[] memory units = new BusinessUnit[](ids.length);

        for (uint256 i = 0; i < ids.length; i++) {
            units[i] = businessUnits[ids[i]];
        }

        return units;
    }

    function getAllBusinessUnits() public view returns (BusinessUnit[] memory) {
        BusinessUnit[] memory allUnits = new BusinessUnit[](allBusinessUnitIds.length);
        for (uint256 i = 0; i < allBusinessUnitIds.length; i++) {
            allUnits[i] = businessUnits[allBusinessUnitIds[i]];
        }
        return allUnits;
    }

    // ============ SENSOR FUNCTIONS ============

    function registerSensor(
        uint256 _businessUnitId,
        string memory _deviceId,
        string memory _name,
        string memory _location,
        string memory _equipmentType,
        int16 _tempMin,
        int16 _tempMax,
        int16 _humidityMin,
        int16 _humidityMax
    ) public onlyBusinessUnitOwner(_businessUnitId) returns (uint256) {
        require(businessUnits[_businessUnitId].id != 0, "BusinessUnit not found");
        require(deviceIdToSensorId[_deviceId] == 0, "Device already registered");

        uint256 sensorId = nextSensorId++;

        sensors[sensorId] = Sensor({
            id: sensorId,
            businessUnitId: _businessUnitId,
            deviceId: _deviceId,
            name: _name,
            location: _location,
            equipmentType: _equipmentType,
            tempMin: _tempMin,
            tempMax: _tempMax,
            humidityMin: _humidityMin,
            humidityMax: _humidityMax,
            isActive: true,
            installedAt: block.timestamp,
            createdAt: block.timestamp,
            updatedAt: block.timestamp
        });

        businessUnitSensors[_businessUnitId].push(sensorId);
        deviceIdToSensorId[_deviceId] = sensorId;
        allSensorIds.push(sensorId);

        emit SensorRegistered(
            sensorId,
            _businessUnitId,
            _deviceId,
            _name,
            block.timestamp
        );

        return sensorId;
    }

    function updateSensorConfig(
        uint256 _sensorId,
        int16 _tempMin,
        int16 _tempMax,
        int16 _humidityMin,
        int16 _humidityMax
    ) public {
        Sensor storage sensor = sensors[_sensorId];
        require(sensor.id != 0, "Sensor not found");

        uint256 businessUnitId = sensor.businessUnitId;
        uint256 clientId = businessUnits[businessUnitId].clientId;

        require(
            clients[clientId].wallet == msg.sender ||
            businessUnitSharedWith[businessUnitId][msg.sender] ||
            hasRole(ADMIN_ROLE, msg.sender),
            "Not authorized"
        );

        sensor.tempMin = _tempMin;
        sensor.tempMax = _tempMax;
        sensor.humidityMin = _humidityMin;
        sensor.humidityMax = _humidityMax;
        sensor.updatedAt = block.timestamp;

        emit SensorConfigUpdated(_sensorId, _tempMin, _tempMax, block.timestamp);
    }

    function getSensor(uint256 _sensorId) public view returns (Sensor memory) {
        require(sensors[_sensorId].id != 0, "Sensor not found");
        return sensors[_sensorId];
    }

    function getSensorByDeviceId(string memory _deviceId)
        public
        view
        returns (Sensor memory)
    {
        uint256 sensorId = deviceIdToSensorId[_deviceId];
        require(sensorId != 0, "Sensor not found");
        return sensors[sensorId];
    }

    function getBusinessUnitSensors(uint256 _businessUnitId)
        public
        view
        returns (Sensor[] memory)
    {
        uint256[] memory ids = businessUnitSensors[_businessUnitId];
        Sensor[] memory sensorList = new Sensor[](ids.length);

        for (uint256 i = 0; i < ids.length; i++) {
            sensorList[i] = sensors[ids[i]];
        }

        return sensorList;
    }

    function getAllSensors() public view returns (Sensor[] memory) {
        Sensor[] memory allSensorsList = new Sensor[](allSensorIds.length);
        for (uint256 i = 0; i < allSensorIds.length; i++) {
            allSensorsList[i] = sensors[allSensorIds[i]];
        }
        return allSensorsList;
    }

    // ============ UTILITY FUNCTIONS ============

    function getTotalClients() public view returns (uint256) {
        return allClientIds.length;
    }

    function getTotalBusinessUnits() public view returns (uint256) {
        return allBusinessUnitIds.length;
    }

    function getTotalSensors() public view returns (uint256) {
        return allSensorIds.length;
    }
}
