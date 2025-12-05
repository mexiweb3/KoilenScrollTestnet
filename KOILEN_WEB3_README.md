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

## 🏗️ Arquitectura (EVVM Services)

Koilen ahora opera como un **Servicio EVVM**, lo que permite transacciones "Gasless" para los usuarios finales.

```
├── src/contracts/koilen/          # Smart Contracts (EVVM Services)
│   ├── KoilenRegistry.sol         # Hereda de EvvmService.sol
│   └── SensorDataRegistry.sol     # Hereda de EvvmService.sol
├── script/
│   └── DeployKoilenServices.s.sol # Script de deployment en EVVM existente
└── frontend/                       
    └── src/hooks/useKoilenContracts.js # Implementa EIP-191 Signing
```

### ¿Cómo funciona el "Gasless"?
1. **Usuario**: No necesita ETH. Solo firma un mensaje criptográfico (EIP-191) autorizando la acción.
2. **Fisher (Relayer)**: Recibe la firma y envía la transacción a la blockchain, pagando el gas (ETH) en Scroll Sepolia.
3. **Contrato**: Verifica la firma del usuario y ejecuta la lógica.

---

## 🚀 Instalación y Deployment

### Paso 1: Deploy de Servicios

```bash
cd /home/davidiego2/Documents/Koilen/Scroll/Testnet-Contracts

# Deploy conectado al EVVM ID 1083
forge script script/DeployKoilenServices.s.sol \
  --rpc-url https://sepolia-rpc.scroll.io/ \
  --account defaultKey \
  --broadcast
```

**Contratos actuales:**
- `KoilenRegistry`: `0x605d618A3D3ece7aAe6820007a5bF81649632077`
- `SensorDataRegistry`: `0x3ED5092ab73cc505E9a52a0DE93F00f04Bdb9268`
- `EVVM ID`: `1083`

---

## 📝 Uso del Sistema (Flow Gasless)

### 1. Conectar Wallet
El usuario conecta su wallet (MetaMask) pero **NO necesita tener fondos en Scroll Sepolia**.

### 2. Registrar Cliente / Sucursal / Sensor
1. El usuario llena el formulario.
2. Al hacer click en "Guardar", MetaMask pide **FIRMAR** un mensaje (no una transacción).
3. **Costo para el usuario: 0 ETH.**

---

## 💰 Modelo de Costos

| Actor | Rol | Costo |
|-------|-----|-------|
| **Usuario Final** | Genera datos | **$0 (Gratis)** |
| **Fisher (Koilen)** | Envía transacciones | Paga el Gas en Scroll (~$0.01/tx) |
| **EVVM** | Orquestador | Gestiona los pagos (opcionalmente en Tokens) |

En esta fase Testnet, el modelo es **totalmente subsidiado** (Monto de pago = 0).

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
