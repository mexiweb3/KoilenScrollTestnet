import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EQUIPMENT_TYPES } from '../config/blockchain';

function RegisterSensor({ wallet }) {
  const navigate = useNavigate();
  const { isConnected } = wallet;

  const [formData, setFormData] = useState({
    businessUnitId: 1,
    deviceId: '',
    name: '',
    location: '',
    equipmentType: 'freezer',
    tempMin: 0,
    tempMax: 10,
    humidityMin: 30,
    humidityMax: 70
  });
  const [loading, setLoading] = useState(false);

  if (!isConnected) {
    navigate('/');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: Contract call
      await new Promise(resolve => setTimeout(resolve, 2000));
      navigate('/sensors');
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="container" style={{ paddingTop: '40px' }}>
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <button onClick={() => navigate('/sensors')} style={{ background: 'none', border: 'none', color: '#667eea', cursor: 'pointer', marginBottom: '20px' }}>
          ← Volver
        </button>

        <h1 style={{ marginBottom: '30px', color: '#667eea' }}>🌡️ Registrar Nuevo Sensor</h1>

        <form onSubmit={handleSubmit}>
          <input className="input" type="text" placeholder="Device ID (Tuya) *" required
                 onChange={(e) => setFormData({...formData, deviceId: e.target.value})} />
          <small style={{ display: 'block', marginTop: '-12px', marginBottom: '12px', color: '#718096' }}>
            ℹ️ ID único del sensor en Tuya
          </small>

          <input className="input" type="text" placeholder="Nombre del Sensor *" required
                 onChange={(e) => setFormData({...formData, name: e.target.value})} />

          <input className="input" type="text" placeholder="Ubicación Específica"
                 onChange={(e) => setFormData({...formData, location: e.target.value})} />
          <small style={{ display: 'block', marginTop: '-12px', marginBottom: '12px', color: '#718096' }}>
            ej: "Cocina - Esquina izquierda"
          </small>

          <select className="select" onChange={(e) => setFormData({...formData, equipmentType: e.target.value})}>
            {EQUIPMENT_TYPES.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>

          <h3 style={{ marginTop: '20px', marginBottom: '10px', color: '#4a5568' }}>⚙️ Configuración de Rangos</h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#718096' }}>Temp Mín (°C)</label>
              <input className="input" type="number" value={formData.tempMin} step="0.1"
                     onChange={(e) => setFormData({...formData, tempMin: parseFloat(e.target.value)})} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#718096' }}>Temp Máx (°C)</label>
              <input className="input" type="number" value={formData.tempMax} step="0.1"
                     onChange={(e) => setFormData({...formData, tempMax: parseFloat(e.target.value)})} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#718096' }}>Humedad Mín (%)</label>
              <input className="input" type="number" value={formData.humidityMin}
                     onChange={(e) => setFormData({...formData, humidityMin: parseInt(e.target.value)})} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#718096' }}>Humedad Máx (%)</label>
              <input className="input" type="number" value={formData.humidityMax}
                     onChange={(e) => setFormData({...formData, humidityMax: parseInt(e.target.value)})} />
            </div>
          </div>

          <button className="button" type="submit" disabled={loading} style={{ width: '100%', marginTop: '20px' }}>
            {loading ? 'Registrando...' : '✅ Registrar en Blockchain'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterSensor;
