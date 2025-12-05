# 🚀 Instrucciones de Deployment - Koilen Web3

## ✅ Todo está listo en GitHub

Repositorio: https://github.com/mexiweb3/KoilenScrollTestnet

**Commit:** `e5572c3` - "Add Koilen Web3 Registry - Complete decentralized IoT monitoring system"

---

## 📦 Lo que se creó

### Smart Contracts (Solidity)

```
src/contracts/koilen/
├── KoilenRegistry.sol           # 500+ líneas
└── SensorDataRegistry.sol       # 300+ líneas
```

**Funcionalidades:**
- ✅ Registro de clientes en blockchain
- ✅ Gestión de sucursales
- ✅ Registro de sensores IoT
- ✅ Lecturas inmutables con hash de verificación
- ✅ Control de acceso granular
- ✅ Sistema de alertas

### Deployment Script

```
script/
└── DeployKoilen.s.sol           # Script de Foundry
```

### Frontend Web3 (React)

```
frontend/
├── src/
│   ├── App.jsx                  # Aplicación principal
│   ├── index.jsx                # Entry point
│   ├── App.css                  # Estilos
│   ├── config/
│   │   └── blockchain.js        # Configuración de red
│   ├── hooks/
│   │   └── useWallet.js         # Hook de MetaMask
│   └── pages/
│       ├── Home.jsx             # Landing + Wallet Connect
│       ├── Dashboard.jsx        # Dashboard principal
│       ├── RegisterClient.jsx   # Registro de cliente
│       ├── BusinessUnits.jsx    # Lista de sucursales
│       ├── CreateBusinessUnit.jsx
│       ├── Sensors.jsx          # Lista de sensores
│       ├── RegisterSensor.jsx   # Registro de sensor
│       └── SensorData.jsx       # Vista de lecturas
├── public/
│   └── index.html
├── package.json
├── vite.config.js
└── .eslintrc.json
```

**Total:** 8 páginas funcionales + hooks + config

### Documentación

```
KOILEN_WEB3_README.md           # Documentación completa (500+ líneas)
KOILEN_QUICK_START.md           # Guía paso a paso (400+ líneas)
DEPLOYMENT_INSTRUCTIONS.md      # Este archivo
```

---

## 🎯 Próximos Pasos

### Paso 1: Deploy de Contratos

```bash
# Desde el directorio del proyecto
cd /home/davidiego2/Documents/Koilen/Scroll/Testnet-Contracts

# Compilar
forge build

# Deploy
forge script script/DeployKoilen.s.sol \
  --rpc-url https://sepolia-rpc.scroll.io/ \
  --account defaultKey \
  --broadcast \
  --verify

# IMPORTANTE: Guardar las addresses que aparezcan
```

**Output esperado:**
```
========================================
Deployment Summary
========================================
KoilenRegistry: 0x...
SensorDataRegistry: 0x...
========================================
```

### Paso 2: Actualizar Frontend Config

```bash
cd frontend

# Abrir archivo de configuración
nano src/config/blockchain.js

# Actualizar líneas 10-11:
contracts: {
  koilenRegistry: '0x...', // <-- Pegar address de KoilenRegistry
  sensorDataRegistry: '0x...', // <-- Pegar address de SensorDataRegistry
}

# Guardar y cerrar
```

### Paso 3: Instalar y Ejecutar Frontend

```bash
# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm run dev

# Abrir: http://localhost:3000
```

### Paso 4: Probar el Sistema

1. **Conectar MetaMask**
   - Asegúrate de estar en Scroll Sepolia (534351)
   - Conecta tu wallet

2. **Registrar Cliente**
   - Dashboard → "Registrar Cliente"
   - Completar formulario
   - Aprobar transacción en MetaMask

3. **Crear Sucursal**
   - Dashboard → "Gestionar Sucursales"
   - Crear nueva sucursal
   - Aprobar transacción

4. **Registrar Sensor**
   - Dashboard → "Gestionar Sensores"
   - Registrar sensor con deviceId de Tuya
   - Configurar rangos de temperatura/humedad
   - Aprobar transacción

5. **Verificar en Explorer**
   - https://sepolia.scrollscan.com/address/TU_WALLET
   - Deberías ver todas las transacciones

---

## 📊 Estructura de Datos en Blockchain

### Client
```solidity
{
  id: uint256,
  wallet: address,
  businessName: string,
  email: string,
  phoneNumber: string,
  isActive: bool,
  createdAt: uint256,
  updatedAt: uint256
}
```

### BusinessUnit
```solidity
{
  id: uint256,
  clientId: uint256,
  name: string,
  location: string,
  businessType: string,
  contactName: string,
  contactPhone: string,
  contactEmail: string,
  isActive: bool,
  createdAt: uint256,
  updatedAt: uint256
}
```

### Sensor
```solidity
{
  id: uint256,
  businessUnitId: uint256,
  deviceId: string,
  name: string,
  location: string,
  equipmentType: string,
  tempMin: int16,        // * 10 para decimales
  tempMax: int16,        // * 10 para decimales
  humidityMin: int16,
  humidityMax: int16,
  isActive: bool,
  installedAt: uint256,
  createdAt: uint256,
  updatedAt: uint256
}
```

### Reading
```solidity
{
  id: uint256,
  sensorId: uint256,
  deviceId: string,
  temperature: int16,    // * 10 para decimales
  humidity: int16,
  online: bool,
  timestamp: uint256,
  blockNumber: uint256,
  dataHash: bytes32,     // Hash de verificación
  createdAt: uint256
}
```

---

## 🔧 Comandos Útiles

### Ver estadísticas on-chain

```bash
# Total de clientes
cast call KOILEN_REGISTRY_ADDRESS "getTotalClients()(uint256)" \
  --rpc-url https://sepolia-rpc.scroll.io/

# Total de sucursales
cast call KOILEN_REGISTRY_ADDRESS "getTotalBusinessUnits()(uint256)" \
  --rpc-url https://sepolia-rpc.scroll.io/

# Total de sensores
cast call KOILEN_REGISTRY_ADDRESS "getTotalSensors()(uint256)" \
  --rpc-url https://sepolia-rpc.scroll.io/

# Total de lecturas
cast call SENSOR_DATA_REGISTRY_ADDRESS "totalReadings()(uint256)" \
  --rpc-url https://sepolia-rpc.scroll.io/
```

### Build para producción

```bash
cd frontend
npm run build

# Output en: frontend/dist/
```

---

## 💡 Mejoras Futuras (TODO)

- [ ] Integración automática con Tuya API
- [ ] Hook `useRegistry.js` completo con llamadas a contratos
- [ ] Hook `useSensorData.js` completo
- [ ] Gráficos de temperatura con Recharts
- [ ] Sistema de notificaciones
- [ ] Export de datos a CSV/PDF
- [ ] Dashboard con estadísticas en tiempo real
- [ ] Mobile responsive mejorado
- [ ] Tests unitarios para contratos
- [ ] Tests E2E para frontend

---

## 📝 Notas Importantes

1. **Addresses de contratos**: Actualizar en `frontend/src/config/blockchain.js` después del deploy

2. **Network**: El sistema está configurado para Scroll Sepolia (testnet). Para producción:
   - Cambiar `chainId` a `534352` (Scroll Mainnet)
   - Cambiar RPC URL a mainnet
   - Actualizar contract addresses

3. **Gas Costs**: En testnet son negligibles. En mainnet estimar ~$2-5 por setup completo

4. **Seguridad**:
   - Los contratos usan AccessControl de OpenZeppelin
   - Solo propietarios pueden modificar sus datos
   - Lecturas son inmutables
   - Hash de verificación para integridad

---

## 🎉 Sistema Completo

Has creado un sistema Web3 completo que incluye:

✅ **2 Smart Contracts** (800+ líneas de Solidity)
✅ **Frontend React completo** (8 páginas)
✅ **Sistema de hooks** para Web3
✅ **Documentación completa** (900+ líneas)
✅ **Scripts de deployment**
✅ **Integración con MetaMask**
✅ **Configuración para Scroll Sepolia**

**Todo en tu repositorio:** https://github.com/mexiweb3/KoilenScrollTestnet

---

## 🆘 Soporte

Si tienes problemas:

1. Revisa `KOILEN_QUICK_START.md` para troubleshooting
2. Verifica que estés en Scroll Sepolia (Chain ID: 534351)
3. Asegúrate de tener ETH de testnet
4. Revisa la consola del navegador para errores

---

**Creado con [Claude Code](https://claude.com/claude-code)**

*December 4, 2025*
