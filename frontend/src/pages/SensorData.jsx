import { useNavigate } from 'react-router-dom';

function SensorData({ wallet }) {
  const navigate = useNavigate();
  const { isConnected } = wallet;

  if (!isConnected) {
    navigate('/');
    return null;
  }

  return (
    <div className="container" style={{ paddingTop: '40px' }}>
      <div className="card">
        <button onClick={() => navigate('/sensors')} style={{ background: 'none', border: 'none', color: '#667eea', cursor: 'pointer', marginBottom: '20px' }}>
          ← Volver a Sensores
        </button>

        <h1 style={{ marginBottom: '30px', color: '#667eea' }}>📈 Datos del Sensor</h1>

        <div className="card" style={{ background: '#f7fafc' }}>
          <h2>🌡️ Última Lectura</h2>
          <div style={{ marginTop: '20px' }}>
            <p><strong>Temperatura:</strong> 5.2°C ✅ Normal</p>
            <p><strong>Humedad:</strong> 45% ✅ Normal</p>
            <p><strong>Estado:</strong> Online</p>
            <p><strong>Hace:</strong> 2 minutos</p>
          </div>
        </div>

        <div className="card" style={{ marginTop: '20px' }}>
          <h2>📋 Historial de Lecturas</h2>
          <p style={{ color: '#718096' }}>No hay lecturas registradas en blockchain aún.</p>
        </div>
      </div>
    </div>
  );
}

export default SensorData;
