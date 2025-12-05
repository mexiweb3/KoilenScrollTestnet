// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "../../library/EvvmService.sol";
import {AdvancedStrings} from "@evvm/testnet-contracts/library/utils/AdvancedStrings.sol";

/**
 * @title KoilenRegistry
 * @dev Main registry contract for Koilen IoT monitoring system
 * @notice Manages clients, business units, and sensors on-chain
 */
contract KoilenRegistry is AccessControl, EvvmService {

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

    event SensorConfigUpdated(
        uint256 indexed sensorId,
        int16 tempMin,
        int16 tempMax,
        uint256 timestamp
    );

    function _intToString(int256 value) internal pure returns (string memory) {
        if (value == 0) return "0";
        if (value < 0) {
            return string.concat("-", AdvancedStrings.uintToString(uint256(-value)));
        }
        return AdvancedStrings.uintToString(uint256(value));
    }

    // ============ CONSTRUCTOR ============

    constructor(address _evvmAddress, address _stakingAddress) 
        EvvmService(_evvmAddress, _stakingAddress) 
    {
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
        address _wallet,
        string memory _businessName,
        string memory _email,
        string memory _phoneNumber,
        uint256 _nonce,
        bytes memory _signature,
        uint256 _priorityFeeEVVM,
        uint256 _nonceEVVM,
        bool _priorityFlagEVVM,
        bytes memory _signatureEVVM
    ) public returns (uint256) {
        // Verify signature
        validateServiceSignature(
            "registerClient",
            string.concat(
                _businessName,
                ",",
                _email,
                ",",
                _phoneNumber,
                ",",
                AdvancedStrings.uintToString(_nonce)
            ),
            _signature,
            _wallet
        );

        // Replay protection
        verifyAsyncServiceNonce(_wallet, _nonce);

        require(walletToClientId[_wallet] == 0, "Wallet already registered");

        // Pay for the service (even if free/gasless for user, someone pays gas, potentially priority fee logic here)
        // For now, simple logic, maybe transfer 0 if no cost, or just fisher rewards if applic.
        // Assuming free registration for now, but we must process the EVVM payment part if fisher expects reward/fee
        // Minimal payment execution to satisfy EVVM flow:
        requestPay(
            _wallet,
            getEtherAddress(),
            0, // Amount
            _priorityFeeEVVM, // Priority fee
            _nonceEVVM,
            _priorityFlagEVVM,
            _signatureEVVM
        );

        uint256 clientId = nextClientId++;

        clients[clientId] = Client({
            id: clientId,
            wallet: _wallet,
            businessName: _businessName,
            email: _email,
            phoneNumber: _phoneNumber,
            isActive: true,
            createdAt: block.timestamp,
            updatedAt: block.timestamp
        });

        walletToClientId[_wallet] = clientId;
        allClientIds.push(clientId);

        // Mark nonce
        markAsyncServiceNonceAsUsed(_wallet, _nonce);

        emit ClientRegistered(clientId, _wallet, _businessName, block.timestamp);
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
        address _wallet,
        string memory _name,
        string memory _location,
        string memory _businessType,
        string memory _contactName,
        string memory _contactPhone,
        string memory _contactEmail,
        uint256 _nonce,
        bytes memory _signature,
        uint256 _priorityFeeEVVM,
        uint256 _nonceEVVM,
        bool _priorityFlagEVVM,
        bytes memory _signatureEVVM
    ) public returns (uint256) {
        // Verify signature
        validateServiceSignature(
            "createBusinessUnit",
            string.concat(
                 _name,
                 ",",
                 _location,
                 ",",
                 _businessType,
                 ",",
                 _contactName,
                 ",",
                 _contactPhone,
                 ",",
                 _contactEmail,
                 ",",
                 AdvancedStrings.uintToString(_nonce)
            ),
            _signature,
            _wallet
        );

        // Replay protection
        verifyAsyncServiceNonce(_wallet, _nonce);

        uint256 clientId = walletToClientId[_wallet];
        require(clientId != 0, "Must be registered client");

        requestPay(
            _wallet,
            getEtherAddress(),
            0,
            _priorityFeeEVVM,
            _nonceEVVM,
            _priorityFlagEVVM,
            _signatureEVVM
        );

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

        // Mark nonce
        markAsyncServiceNonceAsUsed(_wallet, _nonce);

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
        address _wallet,
        uint256 _businessUnitId,
        string memory _deviceId,
        string memory _name,
        string memory _location,
        string memory _equipmentType,
        int16 _tempMin,
        int16 _tempMax,
        int16 _humidityMin,
        int16 _humidityMax,
        uint256 _nonce,
        bytes memory _signature,
        uint256 _priorityFeeEVVM,
        uint256 _nonceEVVM,
        bool _priorityFlagEVVM,
        bytes memory _signatureEVVM
    ) public returns (uint256) {
        // Verify signature
        validateServiceSignature(
            "registerSensor",
            string.concat(
                 AdvancedStrings.uintToString(_businessUnitId),
                 ",",
                 _deviceId,
                 ",",
                 _name,
                 ",",
                 _location,
                 ",",
                 _equipmentType,
                 ",",
                 _intToString(int256(_tempMin)),
                 ",",
                 _intToString(int256(_tempMax)),
                 ",",
                 _intToString(int256(_humidityMin)), // Note: humidity is int16 in logic but often uint in struct? 
                 // Wait, struct says int16 for humidity too? 
                 // Let's check struct. Struct Sensor says: int16 humidityMin, int16 humidityMax. 
                 // Arguments say int16. Okay.
                 ",",
                 _intToString(int256(_humidityMax)),
                 ",",
                 AdvancedStrings.uintToString(_nonce)
            ),
            _signature,
            _wallet
        );

        // Replay protection
        verifyAsyncServiceNonce(_wallet, _nonce);

        // Ownership check
        uint256 clientId = businessUnits[_businessUnitId].clientId;
        require(clients[clientId].wallet == _wallet, "Not authorized");

        require(businessUnits[_businessUnitId].id != 0, "BusinessUnit not found");
        require(deviceIdToSensorId[_deviceId] == 0, "Device already registered");

        requestPay(
            _wallet,
            getEtherAddress(),
            0,
            _priorityFeeEVVM,
            _nonceEVVM,
            _priorityFlagEVVM,
            _signatureEVVM
        );

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
