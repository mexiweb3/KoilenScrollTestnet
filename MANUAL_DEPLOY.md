# 🚀 Deployment Manual - Koilen Web3

## ⚠️ El deployment automático requiere interacción

El script automatizado no puede funcionar completamente sin interacción porque Foundry necesita que ingreses la contraseña de tu keystore manualmente.

---

## ✅ Método Recomendado: Deployment Manual Interactivo

### Paso 1: Preparar el entorno

```bash
cd /home/davidiego2/Documents/Koilen/Scroll/Testnet-Contracts
export PATH="$PATH:$HOME/.foundry/bin"
```

### Paso 2: Compilar los contratos

```bash
# Renombrar archivos problemáticos temporalmente (ya está hecho)
# mv script/StakeOne.s.sol script/StakeOne.s.sol.bak
# mv script/StakeExact.s.sol script/StakeExact.s.sol.bak

# Compilar
forge build
```

**Deberías ver:** `Compiler run successful!`

### Paso 3: Deployar con --broadcast

```bash
forge script script/DeployKoilen.s.sol \
  --rpc-url https://sepolia-rpc.scroll.io/ \
  --account defaultKey \
  --broadcast \
  --legacy
```

**Te pedirá:**
```
Enter keystore password:
```

**Ingresa la contraseña** de tu wallet `defaultKey` y presiona Enter.

---

## 📝 ¿Qué esperar?

### Output esperado:

```
Enter keystore password: ******

Deploying Koilen contracts...
Deployer address: 0xA1Fa6f037CaC8fFc0Be322AD2abf2c4a33989bbF

1. Deploying KoilenRegistry...
KoilenRegistry deployed at: 0x1234...

2. Deploying SensorDataRegistry...
SensorDataRegistry deployed at: 0x5678...

========================================
Deployment Summary
========================================
KoilenRegistry: 0x1234...
SensorDataRegistry: 0x5678...
========================================
```

---

## 🆘 Si no tienes la contraseña del keystore

### Opción 1: Usar una nueva wallet

```bash
# Crear nueva wallet
cast wallet new

# Te dará una address y private key
# GUARDA LA PRIVATE KEY en lugar seguro

# Importar a Foundry
cast wallet import koilenDeploy --interactive
# Pega la private key cuando te lo pida
# Ingresa una contraseña nueva

# Usar la nueva wallet para deploy
forge script script/DeployKoilen.s.sol \
  --rpc-url https://sepolia-rpc.scroll.io/ \
  --account koilenDeploy \
  --broadcast \
  --legacy
```

### Opción 2: Usar private key directamente (NO RECOMENDADO)

```bash
# Crear archivo .env (temporal)
echo "PRIVATE_KEY=tu_private_key_aqui" > .env

# Modificar el script para usar .env
# (requiere cambios en DeployKoilen.s.sol)
```

---

## ✅ Después del Deployment

### 1. Guardar las Addresses

Copia y guarda:
- `KoilenRegistry`: 0x...
- `SensorDataRegistry`: 0x...

### 2. Actualizar Frontend

```bash
cd frontend
nano src/config/blockchain.js
```

**Cambiar líneas 10-11:**
```javascript
contracts: {
  koilenRegistry: '0x...', // <-- PEGAR ADDRESS
  sensorDataRegistry: '0x...', // <-- PEGAR ADDRESS
}
```

### 3. Commit y Push

```bash
git add frontend/src/config/blockchain.js
git commit -m "Update contract addresses after deployment"
git push origin master
```

### 4. Iniciar Frontend

```bash
npm install
npm run dev
```

---

## 🔍 Verificar Deployment

### En ScrollScan

1. Ve a: https://sepolia.scrollscan.com/
2. Busca: `0xA1Fa6f037CaC8fFc0Be322AD2abf2c4a33989bbF`
3. Deberías ver 2 transacciones de "Contract Creation"

### Desde Terminal

```bash
# Verificar KoilenRegistry
cast call 0xTU_KOILEN_REGISTRY_ADDRESS \
  "getTotalClients()(uint256)" \
  --rpc-url https://sepolia-rpc.scroll.io/

# Debería retornar: 0

# Verificar SensorDataRegistry
cast call 0xTU_SENSOR_DATA_REGISTRY_ADDRESS \
  "totalReadings()(uint256)" \
  --rpc-url https://sepolia-rpc.scroll.io/

# Debería retornar: 0
```

---

## 💡 Consejo

Si tienes problemas con el keystore, es más fácil crear una wallet nueva específicamente para Koilen Web3.

**Pasos:**
1. `cast wallet new` → Guarda la private key
2. `cast wallet import koilenDeploy --interactive` → Ingresa la private key
3. Envía ETH de Sepolia a esa nueva address
4. Deploy usando `--account koilenDeploy`

---

**¿Estás listo para deployar?** Ejecuta:

```bash
cd /home/davidiego2/Documents/Koilen/Scroll/Testnet-Contracts
export PATH="$PATH:$HOME/.foundry/bin"

forge script script/DeployKoilen.s.sol \
  --rpc-url https://sepolia-rpc.scroll.io/ \
  --account defaultKey \
  --broadcast \
  --legacy
```

Y sigue las instrucciones en pantalla.

---

*Creado con [Claude Code](https://claude.com/claude-code)*
