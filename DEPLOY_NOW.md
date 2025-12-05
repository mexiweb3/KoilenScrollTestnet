# 🚀 Deploy Koilen Web3 - Ejecutar AHORA

## ✅ Todo está listo para deployar

El sistema completo está en GitHub y listo para deployment.

---

## 📋 Método 1: Usando el Script Automatizado (RECOMENDADO)

```bash
cd /home/davidiego2/Documents/Koilen/Scroll/Testnet-Contracts

# Ejecutar script de deployment
./deploy_koilen.sh
```

**El script hará:**
1. ✅ Compilar los contratos de Koilen
2. ✅ Conectarse a Scroll Sepolia
3. ✅ Deployar KoilenRegistry
4. ✅ Deployar SensorDataRegistry
5. ✅ Mostrar las addresses

**⚠️ IMPORTANTE:** Cuando ejecutes, te pedirá la contraseña de tu keystore `defaultKey`.

---

## 📋 Método 2: Manual (Paso a Paso)

### Paso 1: Compilar

```bash
cd /home/davidiego2/Documents/Koilen/Scroll/Testnet-Contracts
export PATH="$PATH:$HOME/.foundry/bin"

# Compilar solo los contratos de Koilen
forge build --contracts src/contracts/koilen/
```

### Paso 2: Deployar

```bash
forge script script/DeployKoilen.s.sol \
  --rpc-url https://sepolia-rpc.scroll.io/ \
  --account defaultKey \
  --broadcast \
  --legacy
```

**Cuando te pida la contraseña:** Ingresa la password de tu wallet `defaultKey`

---

## 📝 ¿Qué esperar?

**Output esperado:**

```
🚀 Koilen Web3 Deployment Script
=================================

📦 Compiling contracts...
✅ Compilation successful!

🔐 Deploying to Scroll Sepolia...
Network: Scroll Sepolia (Chain ID: 534351)
RPC: https://sepolia-rpc.scroll.io/

Enter keystore password: ******

Deploying Koilen contracts...
Deployer address: 0xA1Fa6f037CaC8fFc0Be322AD2abf2c4a33989bbF

1. Deploying KoilenRegistry...
KoilenRegistry deployed at: 0x...

2. Deploying SensorDataRegistry...
SensorDataRegistry deployed at: 0x...

========================================
Deployment Summary
========================================
KoilenRegistry: 0x...
SensorDataRegistry: 0x...
========================================

✅ Deployment complete!
```

---

## ⚠️ DESPUÉS DEL DEPLOYMENT

### 1. Guardar las Addresses

Copia las addresses que aparezcan:
- `KoilenRegistry`: 0x...
- `SensorDataRegistry`: 0x...

### 2. Actualizar Frontend

```bash
cd frontend
nano src/config/blockchain.js
```

**Actualizar líneas 10-11:**
```javascript
contracts: {
  koilenRegistry: '0x...', // <-- PEGAR ADDRESS DE KOILEN REGISTRY
  sensorDataRegistry: '0x...', // <-- PEGAR ADDRESS DE SENSOR DATA REGISTRY
}
```

**Guardar:** `Ctrl+O`, `Enter`, `Ctrl+X`

### 3. Instalar y Ejecutar Frontend

```bash
npm install
npm run dev
```

**Abrir:** http://localhost:3000

---

## 🔍 Verificar Deployment

### En el Explorer

1. Ve a: https://sepolia.scrollscan.com/
2. Busca tu address: `0xA1Fa6f037CaC8fFc0Be322AD2abf2c4a33989bbF`
3. Deberías ver 2 transacciones de deployment

### Desde Terminal

```bash
export PATH="$PATH:$HOME/.foundry/bin"

# Verificar KoilenRegistry
cast call KOILEN_REGISTRY_ADDRESS \
  "getTotalClients()(uint256)" \
  --rpc-url https://sepolia-rpc.scroll.io/

# Debería retornar: 0

# Verificar SensorDataRegistry
cast call SENSOR_DATA_REGISTRY_ADDRESS \
  "totalReadings()(uint256)" \
  --rpc-url https://sepolia-rpc.scroll.io/

# Debería retornar: 0
```

---

## 🆘 Troubleshooting

### Error: "insufficient funds"

**Solución:** Necesitas ETH en Scroll Sepolia
```bash
# Ve al faucet
https://sepolia.scroll.io/faucet

# Pega tu address: 0xA1Fa6f037CaC8fFc0Be322AD2abf2c4a33989bbF
# Click "Request"
```

### Error: "user denied transaction"

**Solución:** Cuando se te pida la contraseña del keystore, ingrésala correctamente.

### Error: "contract creation code storage out of gas"

**Solución:** El contrato es grande, usa `--legacy`:
```bash
forge script script/DeployKoilen.s.sol \
  --rpc-url https://sepolia-rpc.scroll.io/ \
  --account defaultKey \
  --broadcast \
  --legacy \
  --gas-limit 10000000
```

### Error: "forge: command not found"

**Solución:**
```bash
export PATH="$PATH:$HOME/.foundry/bin"
```

---

## 📊 Costos Estimados

**En Scroll Sepolia (Testnet):**
- Gas: ~5,000,000 total
- Costo: 0 ETH (testnet)

**En Scroll Mainnet (Producción):**
- Gas: ~5,000,000 total
- Costo: ~$2-3 USD

---

## ✅ Checklist de Deployment

- [ ] Tengo ETH en Scroll Sepolia
- [ ] Compilé los contratos (`forge build`)
- [ ] Ejecuté el deployment (`./deploy_koilen.sh`)
- [ ] Guardé las addresses de los contratos
- [ ] Actualicé `frontend/src/config/blockchain.js`
- [ ] Instalé dependencias del frontend (`npm install`)
- [ ] Ejecuté el frontend (`npm run dev`)
- [ ] Conecté MetaMask en http://localhost:3000
- [ ] Registré mi primer cliente
- [ ] Verifiqué en el explorer

---

## 🎉 ¡Listo para Deployar!

Ejecuta:

```bash
cd /home/davidiego2/Documents/Koilen/Scroll/Testnet-Contracts
./deploy_koilen.sh
```

**Y sigue las instrucciones en pantalla.**

---

*Creado con [Claude Code](https://claude.com/claude-code)*
