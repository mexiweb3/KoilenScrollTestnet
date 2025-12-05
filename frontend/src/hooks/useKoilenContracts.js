import { ethers } from 'ethers';
import { BLOCKCHAIN_CONFIG } from '../config/blockchain';
import KoilenRegistryABI from '../contracts/KoilenRegistry.js';
import SensorDataRegistryABI from '../contracts/SensorDataRegistry.js';

/**
 * Hook for interacting with Koilen smart contracts
 */
export function useKoilenContracts(signer) {
  if (!signer) {
    return {
      koilenRegistry: null,
      sensorDataRegistry: null,
      registerClient: null,
      createBusinessUnit: null,
      registerSensor: null,
      logReading: null,
    };
  }

  // Initialize contract instances
  const koilenRegistry = new ethers.Contract(
    BLOCKCHAIN_CONFIG.contracts.koilenRegistry,
    KoilenRegistryABI,
    signer
  );

  const sensorDataRegistry = new ethers.Contract(
    BLOCKCHAIN_CONFIG.contracts.sensorDataRegistry,
    SensorDataRegistryABI,
    signer
  );

  /**
   * Register a new client
   * @param {string} businessName - Business name
   * @param {string} email - Contact email
   * @param {string} phoneNumber - Phone number
   * @returns {Promise<Object>} Transaction result
   */
  /**
   * Register a new client
   * @param {string} businessName - Business name
   * @param {string} email - Contact email
   * @param {string} phoneNumber - Phone number
   * @returns {Promise<Object>} Transaction result
   */
  const getEvvmPayload = async (funcName, params) => {
    const nonce = BigInt(Math.floor(Math.random() * 1000000000));
    return {
      nonce,
      payload: `${BLOCKCHAIN_CONFIG.evvmId},${funcName},${params.join(',')},${nonce}`
    };
  };

  const getEvvmPaymentPayload = async (from, to, token, amount, fee, priorityFlag = true) => {
    const nonce = BigInt(Math.floor(Math.random() * 1000000000));
    // EXACT format from SignatureUtils.sol verifyMessageSignedForPay (lines 51-66):
    // SignatureUtil.verifySignature(evvmID, "pay", concat(
    //   receiverAddress (or identity if address is 0x0),
    //   token, amount, priorityFee, nonce, priorityFlag, executor
    // ))
    // NOTE: 'from' is NOT in the signature - it's verified separately!
    // Format: <evvmID>,pay,<to>,<token>,<amount>,<priorityFee>,<nonce>,<priorityFlag>,<executor>
    return {
      nonce,
      payload: `${BLOCKCHAIN_CONFIG.evvmId},pay,${to.toLowerCase()},${token.toLowerCase()},${amount},${fee},${nonce},${priorityFlag},${to.toLowerCase()}`
    };
  };

  const registerClient = async (businessName, email, phoneNumber) => {
    try {
      console.log('Registering client (EVVM):', { businessName, email, phoneNumber });
      const walletAddress = await signer.getAddress();
      console.log('Wallet address:', walletAddress);

      // 1. Sign Service Request
      console.log("Constructing Service Payload...");
      const serviceParams = [businessName, email, phoneNumber];
      const { nonce: serviceNonce, payload: servicePayload } = await getEvvmPayload('registerClient', serviceParams);
      console.log("Service Payload constructed:", servicePayload);

      console.log("REQUESTING SIGNATURE 1/2 (Service)...");
      const signature = await signer.signMessage(servicePayload);
      console.log("Signature 1 obtained:", signature);

      // Add delay to prevent wallet UI glitches
      await new Promise(r => setTimeout(r, 1000));
      alert("¡Primera firma lista! Ahora te pedirá la segunda firma (Payment Authorization).");

      // 2. Sign Payment
      console.log("Constructing Payment Payload...");
      const { nonce: evvmNonce, payload: paymentPayload } = await getEvvmPaymentPayload(
        walletAddress,
        BLOCKCHAIN_CONFIG.contracts.koilenRegistry,
        "0x0000000000000000000000000000000000000000",
        0,
        0
      );
      console.log("Payment Payload constructed:", paymentPayload);

      console.log("REQUESTING SIGNATURE 2/2 (Payment)...");
      const signatureEVVM = await signer.signMessage(paymentPayload);
      console.log("Signature 2 obtained:", signatureEVVM);

      console.log("Sending Transaction to Blockchain...");
      const tx = await koilenRegistry.registerClient(
        walletAddress,
        businessName,
        email,
        phoneNumber,
        serviceNonce, // Already BigInt from getEvvmPayload? No, it returns {nonce, payload}. Let's check getEvvmPayload.
        signature,
        0, // fee
        evvmNonce, // Already BigInt?
        true,
        signatureEVVM
      );

      console.log('Transaction sent:', tx.hash);
      const receipt = await tx.wait();
      console.log('Transaction confirmed:', receipt);

      return {
        success: true,
        txHash: tx.hash,
        receipt,
      };
    } catch (error) {
      console.error('Error registering client:', error);
      throw new Error(error.message || 'Failed to register client');
    }
  };


  /**
   * Create a new business unit
   * @param {string} name - Business unit name
   * @param {string} businessType - Type of business
   * @param {string} address - Physical address
   * @param {string} city - City
   * @param {string} country - Country
   * @param {string} contactName - Contact person name
   * @param {string} contactPhone - Contact phone
   * @param {string} contactEmail - Contact email
   * @returns {Promise<Object>} Transaction result
   */
  const createBusinessUnit = async (name, businessType, address, city, country, contactName = "Manager", contactPhone = "000-000-0000", contactEmail = "contact@example.com") => {
    try {
      console.log('Creating business unit (EVVM):', { name, businessType, address, city, country });
      const walletAddress = await signer.getAddress();

      // Combine address fields into single location string
      const location = `${address}, ${city}, ${country}`;

      // 1. Construct Service Payload
      // Contract expects: name, location, businessType, contactName, contactPhone, contactEmail, nonce
      const serviceParams = [
        name,
        location,
        businessType,
        contactName,
        contactPhone,
        contactEmail
      ];

      console.log('Constructing Service Payload...');
      const { nonce: serviceNonce, payload: servicePayload } = await getEvvmPayload('createBusinessUnit', serviceParams);
      console.log('Service Payload constructed:', servicePayload);

      console.log('REQUESTING SIGNATURE 1/2 (Service)...');
      const signature = await signer.signMessage(servicePayload);
      console.log('Signature 1 obtained:', signature);

      // Add delay and alert between signatures
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('¡Primera firma lista! Ahora viene la segunda firma (autorización de pago)...');

      // 2. Construct Payment Payload
      console.log('Constructing Payment Payload...');
      const token = "0x0000000000000000000000000000000000000000";
      const amount = 0;
      const fee = 0;

      const { nonce: evvmNonce, payload: paymentPayload } = await getEvvmPaymentPayload(
        walletAddress,
        BLOCKCHAIN_CONFIG.contracts.koilenRegistry,
        token,
        amount,
        fee
      );
      console.log('Payment Payload constructed:', paymentPayload);

      console.log('REQUESTING SIGNATURE 2/2 (Payment)...');
      const signatureEVVM = await signer.signMessage(paymentPayload);
      console.log('Signature 2 obtained:', signatureEVVM);

      // 3. Send Transaction
      console.log('Sending Transaction to Blockchain...');
      const tx = await koilenRegistry.createBusinessUnit(
        walletAddress,
        name,
        location,
        businessType,
        contactName,
        contactPhone,
        contactEmail,
        serviceNonce,
        signature,
        fee,
        evvmNonce,
        true,
        signatureEVVM
      );

      console.log('Transaction sent:', tx.hash);
      const receipt = await tx.wait();
      console.log('Transaction confirmed:', receipt);

      return {
        success: true,
        txHash: tx.hash,
        receipt,
      };
    } catch (error) {
      console.error('Error creating business unit:', error);
      throw new Error(error.message || 'Failed to create business unit');
    }
  };

  /**
   * Register a new sensor
   * @param {number} businessUnitId
   * @param {string} deviceId
   * @param {string} name
   * @param {string} location
   * @param {string} equipmentType
   * @param {number} minTemp
   * @param {number} maxTemp
   * @param {number} minHumidity
   * @param {number} maxHumidity
   */
  const registerSensor = async (businessUnitId, deviceId, name, location, equipmentType, minTemp, maxTemp, minHumidity, maxHumidity) => {
    try {
      console.log('Registering sensor (EVVM)...');
      const walletAddress = await signer.getAddress();

      // Scale values
      const minTempScaled = Math.round(minTemp * 10);
      const maxTempScaled = Math.round(maxTemp * 10);
      const minHumInt = Math.round(minHumidity);
      const maxHumInt = Math.round(maxHumidity);

      // 1. Sign Service Request
      // Order: buId, deviceId, name, location, equip, minT, maxT, minH, maxH
      console.log("Constructing Service Payload (registerSensor)...");
      const serviceParams = [
        businessUnitId.toString(),
        deviceId,
        name,
        location,
        equipmentType,
        minTempScaled.toString(),
        maxTempScaled.toString(),
        minHumInt.toString(),
        maxHumInt.toString()
      ];
      const { nonce: serviceNonce, payload: servicePayload } = await getEvvmPayload('registerSensor', serviceParams);
      console.log("Service Payload:", servicePayload);

      console.log("REQUESTING SIGNATURE 1/2 (Service)...");
      const signature = await signer.signMessage(servicePayload);
      console.log("Signature 1 obtained");

      // Add delay and alert between signatures
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('¡Primera firma lista! Ahora viene la segunda firma (autorización de pago)...');

      // 2. Sign Payment
      console.log("Constructing Payment Payload...");
      const { nonce: evvmNonce, payload: paymentPayload } = await getEvvmPaymentPayload(
        walletAddress,
        BLOCKCHAIN_CONFIG.contracts.koilenRegistry,
        "0x0000000000000000000000000000000000000000",
        0,
        0
      );
      console.log("REQUESTING SIGNATURE 2/2 (Payment)...");
      const signatureEVVM = await signer.signMessage(paymentPayload);
      console.log("Signature 2 obtained");

      console.log("Sending Transaction...");

      const tx = await koilenRegistry.registerSensor(
        walletAddress,
        businessUnitId,
        deviceId,
        name,
        location,
        equipmentType,
        minTempScaled,
        maxTempScaled,
        minHumInt,
        maxHumInt,
        serviceNonce,
        signature,
        0,
        evvmNonce,
        true,
        signatureEVVM
      );

      console.log('Sensor registered, tx:', tx.hash);
      await tx.wait();
      return { success: true, txHash: tx.hash };
    } catch (error) {
      console.error("Error registering sensor:", error);
      throw error;
    }
  };

  /**
   * Log a sensor reading
   * @param {number} sensorId - Sensor ID
   * @param {string} deviceId - Device ID
   * @param {number} temperature - Temperature (in °C * 10)
   * @param {number} humidity - Humidity
   * @param {boolean} online - Is device online
   * @returns {Promise<Object>} Transaction result
   */
  /**
   * Log a sensor reading
   * @param {number} sensorId - Sensor ID
   * @param {string} deviceId - Device ID
   * @param {number} temperature - Temperature (in °C * 10)
   * @param {number} humidity - Humidity
   * @param {boolean} online - Is device online
   * @returns {Promise<Object>} Transaction result
   */
  const logReading = async (sensorId, deviceId, temperature, humidity, online) => {
    try {
      console.log('Logging reading (EVVM):', { sensorId, deviceId, temperature, humidity, online });
      const walletAddress = await signer.getAddress();
      const timestamp = Math.floor(Date.now() / 1000);

      // 1. Sign Service Request
      console.log("Constructing Service Payload (logReading)...");
      // Order: sensorId, deviceId, temp, hum, online, timestamp
      // Assuming temperature and humidity inputs are ALREADY scaled integers?
      // If not, I should scale them. Previous impl passed them directly?
      // Previous impl: logReading(sensorId, deviceId, temperature, humidity, online) which mapped to contract args directly.
      // Contract args: int16 temperature.
      // So inputs should be integers. Let's assume they are.

      const serviceParams = [
        sensorId.toString(),
        deviceId,
        temperature.toString(),
        humidity.toString(),
        online ? "true" : "false",
        timestamp.toString()
      ];

      const { nonce: serviceNonce, payload: servicePayload } = await getEvvmPayload('logReading', serviceParams);
      console.log("Service Payload:", servicePayload);
      const signature = await signer.signMessage(servicePayload);
      console.log("Signature 1 obtained");

      // Add delay and alert between signatures
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('¡Primera firma lista! Ahora viene la segunda firma (autorización de pago)...');

      // 2. Sign Payment
      console.log("Constructing Payment Payload...");
      const { nonce: evvmNonce, payload: paymentPayload } = await getEvvmPaymentPayload(
        walletAddress,
        BLOCKCHAIN_CONFIG.contracts.sensorDataRegistry, // Note: DIFFERENT contract address
        "0x0000000000000000000000000000000000000000",
        0,
        0
      );
      console.log("REQUESTING SIGNATURE 2/2 (Payment)...");
      const signatureEVVM = await signer.signMessage(paymentPayload);
      console.log("Signature 2 obtained");

      console.log("Sending Transaction...");

      const tx = await sensorDataRegistry.logReading(
        walletAddress,
        sensorId,
        deviceId,
        temperature,
        humidity,
        online,
        timestamp,
        serviceNonce,
        signature,
        0,
        evvmNonce,
        true,
        signatureEVVM
      );

      console.log('Transaction sent:', tx.hash);
      const receipt = await tx.wait();
      console.log('Transaction confirmed:', receipt);

      return {
        success: true,
        txHash: tx.hash,
        receipt,
      };
    } catch (error) {
      console.error('Error logging reading:', error);
      throw new Error(error.message || 'Failed to log reading');
    }
  };

  /**
   * Get client information
   * @param {number} clientId - Client ID
   * @returns {Promise<Object>} Client data
   */
  const getClient = async (clientId) => {
    try {
      let client;
      try {
        if (koilenRegistry) {
          client = await koilenRegistry.getClientById(clientId);
        }
      } catch (e) {
        console.warn("Signer getClient failed, trying provider", e);
      }

      if (!client) {
        console.log("Using fallback RPC for getClient...");
        const provider = new ethers.JsonRpcProvider(BLOCKCHAIN_CONFIG.rpcUrl);
        const readOnlyContract = new ethers.Contract(
          BLOCKCHAIN_CONFIG.contracts.koilenRegistry,
          KoilenRegistryABI,
          provider
        );
        client = await readOnlyContract.getClientById(clientId);
      }

      return {
        id: client.id.toString(),
        wallet: client.wallet,
        businessName: client.businessName,
        email: client.email,
        phoneNumber: client.phoneNumber,
        isActive: client.isActive,
        createdAt: new Date(Number(client.createdAt) * 1000),
        updatedAt: new Date(Number(client.updatedAt) * 1000),
      };
    } catch (error) {
      console.error('Error getting client:', error);
      throw error;
    }
  };

  /**
   * Get business unit information
   * @param {number} businessUnitId - Business unit ID
   * @returns {Promise<Object>} Business unit data
   */
  const getBusinessUnit = async (businessUnitId) => {
    try {
      const bu = await koilenRegistry.getBusinessUnit(businessUnitId);

      return {
        id: bu.id.toString(),
        clientId: bu.clientId.toString(),
        name: bu.name,
        location: bu.location, // Single location field
        businessType: bu.businessType,
        contactName: bu.contactName,
        contactPhone: bu.contactPhone,
        contactEmail: bu.contactEmail,
        isActive: bu.isActive,
        createdAt: new Date(Number(bu.createdAt) * 1000),
      };
    } catch (error) {
      console.error('Error getting business unit:', error);
      throw error;
    }
  };

  /**
   * Get sensor information
   * @param {number} sensorId - Sensor ID
   * @returns {Promise<Object>} Sensor data
   */
  const getSensor = async (sensorId) => {
    try {
      let sensor;
      try {
        if (koilenRegistry) {
          sensor = await koilenRegistry.getSensor(sensorId);
        }
      } catch (e) {
        console.warn("Signer getSensor failed, trying provider", e);
      }

      if (!sensor || !sensor.id) {
        console.log("Using fallback RPC for getSensor...");
        const provider = new ethers.JsonRpcProvider(BLOCKCHAIN_CONFIG.rpcUrl);
        const readOnlyContract = new ethers.Contract(
          BLOCKCHAIN_CONFIG.contracts.koilenRegistry,
          KoilenRegistryABI,
          provider
        );
        sensor = await readOnlyContract.getSensor(sensorId);
      }

      return {
        id: sensor.id.toString(),
        businessUnitId: sensor.businessUnitId.toString(),
        deviceId: sensor.deviceId,
        name: sensor.name, // Added name since we added it to contract
        equipmentType: sensor.equipmentType,
        location: sensor.location,
        minTemp: Number(sensor.minTemp) / 10,
        maxTemp: Number(sensor.maxTemp) / 10,
        minHumidity: Number(sensor.minHumidity),
        maxHumidity: Number(sensor.maxHumidity),
        isActive: sensor.isActive,
        createdAt: new Date(Number(sensor.createdAt) * 1000),
      };
    } catch (error) {
      console.error('Error getting sensor:', error);
      throw error;
    }
  };

  /**
   * Get client ID by wallet address
   * @param {string} walletAddress - Wallet address
   * @returns {Promise<number>} Client ID (0 if not registered)
   */
  const getClientIdByWallet = async (walletAddress) => {
    let clientId = 0;
    try {
      console.log("Checking client ID for (Signer):", walletAddress);
      // Ensure checksum address
      const checksumAddress = ethers.getAddress(walletAddress);

      if (koilenRegistry) {
        try {
          clientId = await koilenRegistry.walletToClientId(checksumAddress);
        } catch (e) {
          console.warn("Signer read failed, trying provider", e);
        }
      }

      // Fallback if signer yielded 0 or failed, try direct RPC
      if (Number(clientId) === 0) {
        console.log("Signer returned 0 or failed. Attempting fallback RPC...");
        const provider = new ethers.JsonRpcProvider(BLOCKCHAIN_CONFIG.rpcUrl);
        const readOnlyContract = new ethers.Contract(
          BLOCKCHAIN_CONFIG.contracts.koilenRegistry,
          KoilenRegistryABI,
          provider
        );
        clientId = await readOnlyContract.walletToClientId(checksumAddress);
        console.log("Fallback RPC Client ID result:", clientId);
      }

      console.log("Final Resolved Client ID:", clientId.toString());
      return Number(clientId);
    } catch (error) {
      console.error('Error getting client ID (Fatal):', error);
      return 0;
    }
  };

  /**
   * Get business units for a client
   * @param {number} clientId - Client ID
   * @returns {Promise<Array>} Array of business unit IDs
   */
  const getClientBusinessUnits = async (clientId) => {
    try {
      let businessUnitIds = [];
      try {
        if (koilenRegistry) {
          businessUnitIds = await koilenRegistry.getClientBusinessUnits(clientId);
        }
      } catch (e) {
        console.warn("Signer getClientBusinessUnits failed, trying provider", e);
      }

      if (!businessUnitIds || businessUnitIds.length === 0) {
        // It might really be 0, but if signer failed we should try RPC to be sure
        // Since we can't easily distinguish empty from failed without the error above,
        // we'll optimistically try RPC if the array is empty, or rely on the catch above.
        // However, the safe bet given the user's context is to double check with RPC if empty/error.

        try {
          const provider = new ethers.JsonRpcProvider(BLOCKCHAIN_CONFIG.rpcUrl);
          const readOnlyContract = new ethers.Contract(
            BLOCKCHAIN_CONFIG.contracts.koilenRegistry,
            KoilenRegistryABI,
            provider
          );
          const ids = await readOnlyContract.getClientBusinessUnits(clientId);
          if (ids && ids.length > 0) {
            console.log("Fallback RPC found business units:", ids);
            businessUnitIds = ids;
          }
        } catch (rpcError) {
          console.error("Fallback RPC for units failed", rpcError);
        }
      }

      // Return the full objects (tuples/structs) from the contract
      // The contract returns structs, so we don't need to fetch individual items by ID
      return businessUnitIds || [];
    } catch (error) {
      console.error('Error getting business units:', error);
      return [];
    }
  };

  /**
   * Get sensors for a business unit
   * @param {number} businessUnitId - Business unit ID
   * @returns {Promise<Array>} Array of Sensor structs
   */
  const getBusinessUnitSensors = async (businessUnitId) => {
    try {
      let sensors = [];
      try {
        if (koilenRegistry) {
          sensors = await koilenRegistry.getBusinessUnitSensors(businessUnitId);
        }
      } catch (e) {
        console.warn("Signer getBusinessUnitSensors failed, trying provider", e);
      }

      if (!sensors || sensors.length === 0) {
        try {
          const provider = new ethers.JsonRpcProvider(BLOCKCHAIN_CONFIG.rpcUrl);
          const readOnlyContract = new ethers.Contract(
            BLOCKCHAIN_CONFIG.contracts.koilenRegistry,
            KoilenRegistryABI,
            provider
          );
          const ids = await readOnlyContract.getBusinessUnitSensors(businessUnitId);
          if (ids && ids.length > 0) {
            sensors = ids;
          }
        } catch (rpcError) {
          console.error("Fallback RPC for sensors failed", rpcError);
        }
      }

      return sensors || [];
    } catch (error) {
      console.error('Error getting sensors:', error);
      return [];
    }
  };

  /**
   * Get total clients
   * @returns {Promise<number>} Total clients
   */
  const getTotalClients = async () => {
    try {
      const total = await koilenRegistry.getTotalClients();
      return Number(total);
    } catch (error) {
      console.error('Error getting total clients:', error);
      return 0;
    }
  };

  /**
   * Get total business units
   * @returns {Promise<number>} Total business units
   */
  const getTotalBusinessUnits = async () => {
    try {
      const total = await koilenRegistry.getTotalBusinessUnits();
      return Number(total);
    } catch (error) {
      console.error('Error getting total business units:', error);
      return 0;
    }
  };

  /**
   * Get total sensors
   * @returns {Promise<number>} Total sensors
   */
  const getTotalSensors = async () => {
    try {
      const total = await koilenRegistry.getTotalSensors();
      return Number(total);
    } catch (error) {
      console.error('Error getting total sensors:', error);
      return 0;
    }
  };

  /**
   * Get sensor readings
   * @param {number} sensorId - Sensor ID
   * @param {number} count - Number of readings to fetch
   * @returns {Promise<Array>} Array of readings
   */
  const getSensorReadings = async (sensorId, count = 10) => {
    try {
      let readings = [];
      try {
        if (sensorDataRegistry) {
          readings = await sensorDataRegistry.getSensorReadings(sensorId, count);
        }
      } catch (e) {
        console.warn("Signer getSensorReadings failed, trying provider", e);
      }

      if (!readings || readings.length === 0) {
        try {
          const provider = new ethers.JsonRpcProvider(BLOCKCHAIN_CONFIG.rpcUrl);
          const readOnlyContract = new ethers.Contract(
            BLOCKCHAIN_CONFIG.contracts.sensorDataRegistry,
            SensorDataRegistryABI,
            provider
          );
          const data = await readOnlyContract.getSensorReadings(sensorId, count);
          if (data && data.length > 0) {
            readings = data;
          }
        } catch (rpcError) {
          console.error("Fallback RPC for readings failed", rpcError);
        }
      }

      if (!readings) return [];

      // Format readings
      return readings.map(r => ({
        id: r.id.toString(),
        sensorId: r.sensorId.toString(),
        deviceId: r.deviceId,
        temperature: Number(r.temperature) / 10,
        humidity: Number(r.humidity),
        online: r.online,
        timestamp: new Date(Number(r.timestamp) * 1000),
        createdAt: new Date(Number(r.createdAt) * 1000)
      })).reverse(); // Newest first
    } catch (error) {
      console.error('Error getting sensor readings:', error);
      return [];
    }
  };

  return {
    koilenRegistry,
    sensorDataRegistry,
    registerClient,
    createBusinessUnit,
    registerSensor,
    logReading,
    getClient,
    getBusinessUnit,
    getSensor,
    getClientIdByWallet,
    getClientBusinessUnits,
    getBusinessUnitSensors,
    getSensorReadings,
    getTotalClients,
    getTotalBusinessUnits,
    getTotalSensors,
  };
}
