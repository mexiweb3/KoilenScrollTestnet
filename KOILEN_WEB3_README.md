# Koilen Web3 Registry

Sistema descentralizado de monitoreo de refrigeración en blockchain para registro de clientes, sucursales, sensores IoT y lecturas inmutables.

---

## 🎯 Descripción

Koilen Web3 es una aplicación **100% descentralizada** que permite registrar y gestionar:
- ✅ Clientes (empresas)
- ✅ Sucursales (ubicaciones físicas)
- ✅ Sensores IoT (temperatura y humedad)
- ✅ Lecturas inmutables en blockchain

Todo almacenado en smart contracts desplegados en **Scroll Sepolia Testnet**.

---

## 🏗️ Arquitectura

```
├── src/contracts/koilen/          # Smart Contracts (Solidity)
│   ├── KoilenRegistry.sol         # Registro de clientes, sucursales, sensores
│   └── SensorDataRegistry.sol     # Registro inmutable de lecturas
├── script/
│   └── DeployKoilen.s.sol         # Script de deployment
└── frontend/                       # Frontend Web3 (React)
    ├── src/
    │   ├── pages/                 # Páginas de la app
    │   ├── hooks/                 # React Hooks personalizados
    │   ├── config/                # Configuración blockchain
    │   └── App.jsx                # Componente principal
    └── package.json
```

---

## 🚀 Instalación y Deployment

### Paso 1: Deploy de Smart Contracts

```bash
cd /home/davidiego2/Documents/Koilen/Scroll/Testnet-Contracts

# Compilar contratos
forge build

# Deploy en Scroll Sepolia
forge script script/DeployKoilen.s.sol \
  --rpc-url https://sepolia-rpc.scroll.io/ \
  --account defaultKey \
  --broadcast \
  --verify

# Guarda las direcciones de los contratos desplegados
```

**Contratos desplegados:**
- `KoilenRegistry`: 0x... (actualizar después del deploy)
- `SensorDataRegistry`: 0x... (actualizar después del deploy)

---

### Paso 2: Configurar Frontend

```bash
cd frontend

# Instalar dependencias
npm install

# Actualizar addresses en src/config/blockchain.js
# Reemplazar '0x...' con las direcciones reales de los contratos

# Iniciar servidor de desarrollo
npm run dev

# Abrir http://localhost:3000
```

---

## 📝 Uso del Sistema

### 1. Conectar Wallet

1. Abre la aplicación en `http://localhost:3000`
2. Click en "Conectar con MetaMask"
3. Asegúrate de estar en **Scroll Sepolia** (Chain ID: 534351)

### 2. Registrar Cliente

1. Ve a **Dashboard** → "Registrar Cliente"
2. Completa:
   - Nombre del negocio
   - Email
   - Teléfono
3. Firma la transacción con MetaMask
4. ✅ Cliente registrado en blockchain

### 3. Crear Sucursal

1. Dashboard → "Gestionar Sucursales" → "Nueva Sucursal"
2. Completa:
   - Nombre de la sucursal
   - Ubicación (ciudad, país)
   - Tipo de negocio
   - Información de contacto
3. Firma la transacción
4. ✅ Sucursal creada en blockchain

### 4. Registrar Sensor

1. Dashboard → "Gestionar Sensores" → "Nuevo Sensor"
2. Completa:
   - Device ID de Tuya
   - Nombre del sensor
   - Ubicación específica
   - Tipo de equipo (freezer, cooler, etc.)
   - Rangos de temperatura y humedad
3. Firma la transacción
4. ✅ Sensor registrado en blockchain

### 5. Registrar Lectura Manual

1. Dashboard → "Ver Lecturas" → Seleccionar sensor
2. Ingresar:
   - Temperatura
   - Humedad
   - Estado (online/offline)
3. Firma la transacción
4. ✅ Lectura registrada de forma inmutable

---

## 🔧 Desarrollo

### Compilar Contratos

```bash
forge build
```

### Testing de Contratos

```bash
forge test
forge test -vvv  # Verbose
```

### Verificar Contratos

```bash
forge verify-contract \
  --chain-id 534351 \
  --etherscan-api-key YOUR_API_KEY \
  CONTRACT_ADDRESS \
  src/contracts/koilen/KoilenRegistry.sol:KoilenRegistry
```

### Build Frontend para Producción

```bash
cd frontend
npm run build
```

---

## 📊 Smart Contracts - Funciones Principales

### KoilenRegistry.sol

**Clientes:**
- `registerClient(businessName, email, phoneNumber)` → Registrar cliente
- `getClientByWallet(wallet)` → Obtener cliente por wallet
- `getAllClients()` → Listar todos los clientes

**Sucursales:**
- `createBusinessUnit(name, location, businessType, ...)` → Crear sucursal
- `getClientBusinessUnits(clientId)` → Obtener sucursales de un cliente
- `getAllBusinessUnits()` → Listar todas las sucursales

**Sensores:**
- `registerSensor(businessUnitId, deviceId, name, ...)` → Registrar sensor
- `getBusinessUnitSensors(businessUnitId)` → Obtener sensores de una sucursal
- `getSensorByDeviceId(deviceId)` → Buscar sensor por device ID
- `updateSensorConfig(sensorId, tempMin, tempMax, ...)` → Actualizar configuración

**Estadísticas:**
- `getTotalClients()` → Total de clientes
- `getTotalBusinessUnits()` → Total de sucursales
- `getTotalSensors()` → Total de sensores

### SensorDataRegistry.sol

**Escritura:**
- `logReading(sensorId, deviceId, temperature, humidity, online, timestamp)` → Registrar lectura
- `logReadingsBatch([...])` → Registrar múltiples lecturas
- `logAlert(sensorId, alertType, value, readingHash)` → Registrar alerta

**Lectura:**
- `getLatestReading(deviceId)` → Última lectura de un sensor
- `getLatestReadings(deviceId, count)` → Últimas N lecturas
- `getSensorReadings(sensorId, count)` → Lecturas de un sensor
- `getSensorAlerts(sensorId)` → Alertas de un sensor

**Verificación:**
- `verifyReading(deviceId, index)` → Verificar integridad de una lectura

---

## 🔐 Seguridad

### Control de Acceso

- **Admin**: Puede gestionar todo el sistema
- **Client Owner**: Solo puede ver y modificar sus propios datos
- **Shared Access**: Sucursales pueden compartirse con otros usuarios

### Permisos en SensorDataRegistry

- Solo wallets autorizadas pueden escribir lecturas
- Las lecturas son **inmutables** una vez registradas
- Hash de verificación para detectar manipulación

---

## 💰 Costos Estimados

En **Scroll Sepolia** (testnet):
- Registro de cliente: ~0.0001 ETH
- Crear sucursal: ~0.00012 ETH
- Registrar sensor: ~0.00015 ETH
- Registrar lectura: ~0.00008 ETH

**Total para setup completo:** ~0.0005 ETH (~$2 USD en mainnet)

---

## 🌐 Network Information

| Parámetro | Valor |
|-----------|-------|
| Network | Scroll Sepolia Testnet |
| Chain ID | 534351 |
| RPC URL | https://sepolia-rpc.scroll.io/ |
| Explorer | https://sepolia.scrollscan.com/ |
| Faucet | https://sepolia.scroll.io/faucet |

---

## 📚 Recursos

- [Documentación de Scroll](https://docs.scroll.io/)
- [Foundry Book](https://book.getfoundry.sh/)
- [Ethers.js Docs](https://docs.ethers.org/)
- [React Router](https://reactrouter.com/)

---

## 🐛 Troubleshooting

**Error: "Client already registered"**
- Cada wallet solo puede registrar un cliente
- Usa otra wallet o usa la función `updateClient()`

**Error: "Device already registered"**
- Cada deviceId solo puede registrarse una vez
- Verifica que el deviceId sea único

**Error: "Not authorized"**
- Solo el propietario puede modificar sus entidades
- Verifica que estés conectado con la wallet correcta

---

## 📝 TODO - Mejoras Futuras

- [ ] Integración automática con Tuya API
- [ ] Dashboard con gráficos de lecturas
- [ ] Sistema de alertas en tiempo real
- [ ] Export de datos a PDF
- [ ] Multi-wallet support
- [ ] Mobile responsive optimization

---

## 👥 Equipo

Desarrollado por **Koilen**

---

## 📄 Licencia

MIT License - Ver [LICENSE](./LICENSE)

---

**Generated with [Claude Code](https://claude.com/claude-code)**

*Last Updated: December 4, 2025*
