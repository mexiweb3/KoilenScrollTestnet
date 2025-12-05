# Koilen Web3 - Guía Rápida de Inicio

Esta guía te llevará paso a paso desde cero hasta tener el sistema funcionando.

---

## ✅ Pre-requisitos

- [x] Foundry instalado
- [x] Node.js 18+ instalado
- [x] MetaMask instalado
- [x] Wallet con ETH en Scroll Sepolia

---

## 🚀 Paso 1: Deploy de Contratos

```bash
# 1. Ir al directorio del proyecto
cd /home/davidiego2/Documents/Koilen/Scroll/Testnet-Contracts

# 2. Compilar contratos
forge build

# 3. Verificar que los contratos compilen sin errores
# Deberías ver:
# [⠊] Compiling...
# [✓] Compiled successfully

# 4. Deploy en Scroll Sepolia
forge script script/DeployKoilen.s.sol \
  --rpc-url https://sepolia-rpc.scroll.io/ \
  --account defaultKey \
  --broadcast \
  --verify

# 5. IMPORTANTE: Guarda las direcciones que aparecen en la terminal
# Ejemplo de output:
# ========================================
# KoilenRegistry: 0xABC123...
# SensorDataRegistry: 0xDEF456...
# ========================================
```

**⚠️ GUARDA ESTAS DIRECCIONES - Las necesitarás en el siguiente paso**

---

## 📝 Paso 2: Configurar Frontend

```bash
# 1. Ir al directorio del frontend
cd frontend

# 2. Instalar dependencias
npm install

# 3. Abrir el archivo de configuración
nano src/config/blockchain.js

# 4. Actualizar las direcciones de los contratos:
# Reemplaza:
#   koilenRegistry: '0x...',
#   sensorDataRegistry: '0x...',
# Con las direcciones que guardaste en el Paso 1

# 5. Guardar (Ctrl+O, Enter, Ctrl+X)
```

---

## 🎯 Paso 3: Iniciar la Aplicación

```bash
# Asegúrate de estar en el directorio frontend
cd /home/davidiego2/Documents/Koilen/Scroll/Testnet-Contracts/frontend

# Iniciar servidor de desarrollo
npm run dev

# Deberías ver:
#   VITE v5.0.8  ready in 500 ms
#   ➜  Local:   http://localhost:3000/
#   ➜  Network: use --host to expose
```

**Abre tu navegador en:** `http://localhost:3000`

---

## 🦊 Paso 4: Configurar MetaMask

### 4.1 Agregar Scroll Sepolia

1. Abre MetaMask
2. Click en el selector de red (arriba)
3. Click en "Add Network" → "Add Network Manually"
4. Ingresa:
   - **Network Name:** Scroll Sepolia
   - **RPC URL:** `https://sepolia-rpc.scroll.io/`
   - **Chain ID:** `534351`
   - **Currency Symbol:** ETH
   - **Block Explorer:** `https://sepolia.scrollscan.com/`
5. Click "Save"

### 4.2 Obtener ETH de Testnet

1. Ve a: https://sepolia.scroll.io/faucet
2. Pega tu dirección de wallet
3. Click "Request" y espera

---

## 🎮 Paso 5: Usar la Aplicación

### 5.1 Conectar Wallet

1. En `http://localhost:3000`
2. Click "🦊 Conectar con MetaMask"
3. Aprobar en MetaMask
4. Deberías ver el Dashboard

### 5.2 Registrar Cliente (Primera vez)

1. Click en "📝 Registrar Cliente"
2. Completa el formulario:
   - **Nombre del negocio:** Ej: "Refrigeración Chile S.A."
   - **Email:** tu-email@empresa.com
   - **Teléfono:** +56 9 1234 5678
3. Click "✅ Registrar en Blockchain"
4. **Aprobar transacción en MetaMask**
5. Espera confirmación (~5 segundos)
6. ✅ ¡Cliente registrado!

### 5.3 Crear Sucursal

1. Dashboard → "🏢 Gestionar Sucursales"
2. Click "+ Nueva Sucursal"
3. Completa:
   - **Nombre:** Ej: "Sucursal Centro"
   - **Ubicación:** Ej: "Santiago, Chile"
   - **Tipo:** Restaurant
   - **Contacto:** Juan Pérez
   - **Teléfono:** +56 9 8765 4321
   - **Email:** sucursal@empresa.com
4. Click "✅ Crear en Blockchain"
5. Aprobar en MetaMask
6. ✅ ¡Sucursal creada!

### 5.4 Registrar Sensor

1. Dashboard → "🌡️ Gestionar Sensores"
2. Click "+ Nuevo Sensor"
3. Completa:
   - **Device ID:** Ej: "vdevo170967042611130" (ID de Tuya)
   - **Nombre:** Ej: "Freezer Cocina Principal"
   - **Ubicación:** Ej: "Cocina - Esquina izquierda"
   - **Tipo:** Freezer
   - **Temp Mín:** 0°C
   - **Temp Máx:** 10°C
   - **Humedad Mín:** 30%
   - **Humedad Máx:** 70%
4. Click "✅ Registrar en Blockchain"
5. Aprobar en MetaMask
6. ✅ ¡Sensor registrado!

---

## 🔍 Paso 6: Verificar en el Explorador

1. Ve a: https://sepolia.scrollscan.com/
2. Busca tu wallet address
3. Deberías ver todas las transacciones
4. Click en cualquier TX hash para ver detalles

---

## 📊 Verificar que Todo Funciona

### Verificar Contratos desde Terminal

```bash
# Ver total de clientes registrados
cast call 0xTU_KOILEN_REGISTRY_ADDRESS \
  "getTotalClients()(uint256)" \
  --rpc-url https://sepolia-rpc.scroll.io/

# Debería retornar: 1

# Ver total de sucursales
cast call 0xTU_KOILEN_REGISTRY_ADDRESS \
  "getTotalBusinessUnits()(uint256)" \
  --rpc-url https://sepolia-rpc.scroll.io/

# Ver total de sensores
cast call 0xTU_KOILEN_REGISTRY_ADDRESS \
  "getTotalSensors()(uint256)" \
  --rpc-url https://sepolia-rpc.scroll.io/

# Ver información de tu cliente
cast call 0xTU_KOILEN_REGISTRY_ADDRESS \
  "getClientByWallet(address)(tuple)" \
  TU_WALLET_ADDRESS \
  --rpc-url https://sepolia-rpc.scroll.io/
```

---

## 🎉 ¡Listo!

Has completado el setup completo del sistema Koilen Web3:

- ✅ Contratos desplegados en blockchain
- ✅ Frontend funcionando
- ✅ Wallet configurada
- ✅ Cliente registrado
- ✅ Sucursal creada
- ✅ Sensor registrado

---

## 🆘 Problemas Comunes

### "insufficient funds for gas"
**Solución:** Necesitas más ETH en Scroll Sepolia
- Ve al faucet: https://sepolia.scroll.io/faucet

### "Client already registered"
**Solución:** Esta wallet ya tiene un cliente registrado
- Usa otra wallet o actualiza el cliente existente

### "User rejected transaction"
**Solución:** Aprobaste la transacción en MetaMask
- Vuelve a intentar y aprueba

### Frontend no carga
**Solución:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Contratos no compilan
**Solución:**
```bash
forge clean
forge build
```

---

## 📞 Siguiente Paso

¿Quieres integrar lecturas automáticas desde Tuya?

Revisa: `TUYA_INTEGRATION.md` (próximamente)

---

**¿Tienes preguntas?** Abre un issue en GitHub

---

*Guía creada con [Claude Code](https://claude.com/claude-code)*
