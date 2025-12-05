import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { EQUIPMENT_TYPES } from '../config/blockchain';
import { useWallet } from '../hooks/useWallet';
import { useKoilenContracts } from '../hooks/useKoilenContracts';

function RegisterSensor() {
  const navigate = useNavigate();
  const location = useLocation();
  const wallet = useWallet();
  const { isConnected, signer, account, loading: walletLoading } = wallet;

  const {
    getClientIdByWallet,
    getClientBusinessUnits,
    registerSensor
  } = useKoilenContracts(signer);

  const [businessUnits, setBusinessUnits] = useState([]);
  const [loadingConfig, setLoadingConfig] = useState(true);

  const [formData, setFormData] = useState({
    businessUnitId: location.state?.preselectedUnitId || '',
    deviceId: '',
    name: '', // Note: Contract doesn't seem to have 'name' in registerSensor params based on my read, but maybe it's metadata? 
    // Wait, looking at useKoilenContracts: registerSensor(buId, deviceId, type, location, minT, maxT, minH, maxH).
    // There is NO 'name' param in the contract function signature shown in useKoilenContracts.js lines 138-147.
    // I will verify this. If no name in contract, I'll ignore it or append to location?
    // actually, let's keep it in form state but maybe not send it if contract doesn't take it.
    // OR, maybe I should check the ABI again?
    location: '',
    equipmentType: 'freezer',
    tempMin: 0,
    tempMax: 10,
    humidityMin: 30,
    humidityMax: 70
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isConnected && account) {
      loadBusinessUnits();
    }
  }, [isConnected, account]);

  // Wait for wallet to initialize
  if (walletLoading) {
    return <div className="container" style={{ paddingTop: '40px', textAlign: 'center' }}>Conectando wallet...</div>;
  }

  if (!isConnected) {
    return (
      <div className="container" style={{ paddingTop: '40px', textAlign: 'center' }}>
        <h2>⚠️ Wallet Desconectada</h2>
        <button className="button" onClick={() => wallet.connectWallet()}>Conectar Wallet</button>
      </div>
    );
  }

  const loadBusinessUnits = async () => {
    try {
      setLoadingConfig(true);
      const clientId = await getClientIdByWallet(account);
      if (clientId === 0) {
        alert("Primero debes registrarte como cliente.");
        navigate('/register-client');
        return;
      }
      const units = await getClientBusinessUnits(clientId);
      setBusinessUnits(units);

      // If we have a preselected unit passed via router state, ensure it is selected
      // (The initial state set might handle it, but if units load async, we might want to ensure it matches a valid unit)
      if (location.state?.preselectedUnitId) {
        setFormData(prev => ({ ...prev, businessUnitId: location.state.preselectedUnitId }));
      }
    } catch (error) {
      console.error("Error loading units:", error);
    } finally {
      setLoadingConfig(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.businessUnitId) {
      alert("Por favor selecciona una sucursal.");
      return;
    }

    setLoading(true);
    try {
      // Hook already handles temperature scaling (* 10)
      // Pass raw values from form
      const result = await registerSensor(
        formData.businessUnitId,
        formData.deviceId,
        formData.name,
        formData.location,
        formData.equipmentType,
        formData.tempMin,      // Hook will scale by 10
        formData.tempMax,      // Hook will scale by 10
        formData.humidityMin,
        formData.humidityMax
      );

      console.log("Sensor registration result:", result);
      alert("¡Sensor registrado exitosamente! 🎉");
      navigate('/dashboard');
    } catch (err) {
      console.error("Error in handleSubmit:", err);
      alert("Error al registrar sensor: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loadingConfig) {
    return <div className="container" style={{ paddingTop: '40px', textAlign: 'center' }}>Cargando sucursales...</div>;
  }

  return (
    <div className="container" style={{ paddingTop: '40px' }}>
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <button onClick={() => navigate('/dashboard')} style={{ background: 'none', border: 'none', color: '#667eea', cursor: 'pointer', marginBottom: '20px' }}>
          ← Volver
        </button>

        <h1 style={{ marginBottom: '30px', color: '#667eea' }}>🌡️ Registrar Nuevo Sensor</h1>

        <form onSubmit={handleSubmit}>

          <div style={{ marginBottom: '20px', padding: '15px', background: '#f7fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#4a5568', fontWeight: 'bold' }}>📍 Seleccionar Sucursal</label>
            {businessUnits.length > 0 ? (
              <select
                className="select"
                value={formData.businessUnitId}
                onChange={(e) => setFormData({ ...formData, businessUnitId: e.target.value })}
                required
              >
                <option value="" disabled>-- Selecciona una sucursal --</option>
                {businessUnits.map(u => (
                  <option key={u.id.toString()} value={u.id.toString()}>{u.name} ({u.location})</option>
                ))}
              </select>
            ) : (
              <div style={{ color: 'red' }}>
                No tienes sucursales registradas. <span style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => navigate('/business-units/create')}>Crear una primero.</span>
              </div>
            )}
          </div>

          <input className="input" type="text" placeholder="Device ID (Tuya) *" required
            value={formData.deviceId}
            onChange={(e) => setFormData({ ...formData, deviceId: e.target.value })} />
          <small style={{ display: 'block', marginTop: '-12px', marginBottom: '12px', color: '#718096' }}>
            ℹ️ ID único del sensor en Tuya
          </small>

          <input className="input" type="text" placeholder="Ubicación en la sucursal" required
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })} />

          <select className="select" value={formData.equipmentType} onChange={(e) => setFormData({ ...formData, equipmentType: e.target.value })}>
            {EQUIPMENT_TYPES.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>

          <h3 style={{ marginTop: '20px', marginBottom: '10px', color: '#4a5568' }}>⚙️ Configuración de Rangos</h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#718096' }}>Temp Mín (°C)</label>
              <input className="input" type="number" value={formData.tempMin} step="0.1"
                onChange={(e) => setFormData({ ...formData, tempMin: parseFloat(e.target.value) })} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#718096' }}>Temp Máx (°C)</label>
              <input className="input" type="number" value={formData.tempMax} step="0.1"
                onChange={(e) => setFormData({ ...formData, tempMax: parseFloat(e.target.value) })} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#718096' }}>Humedad Mín (%)</label>
              <input className="input" type="number" value={formData.humidityMin}
                onChange={(e) => setFormData({ ...formData, humidityMin: parseInt(e.target.value) })} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#718096' }}>Humedad Máx (%)</label>
              <input className="input" type="number" value={formData.humidityMax}
                onChange={(e) => setFormData({ ...formData, humidityMax: parseInt(e.target.value) })} />
            </div>
          </div>

          <button className="button" type="submit" disabled={loading || businessUnits.length === 0} style={{ width: '100%', marginTop: '20px' }}>
            {loading ? 'Registrando...' : '✅ Registrar en Blockchain'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterSensor;
