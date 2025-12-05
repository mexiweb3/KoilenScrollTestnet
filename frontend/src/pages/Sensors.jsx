import { useNavigate } from 'react-router-dom';

function Sensors({ wallet }) {
  const navigate = useNavigate();
  const { isConnected } = wallet;

  if (!isConnected) {
    navigate('/');
    return null;
  }

  return (
    <div className="container" style={{ paddingTop: '40px' }}>
      <div className="card">
        <button onClick={() => navigate('/dashboard')} style={{ background: 'none', border: 'none', color: '#667eea', cursor: 'pointer', marginBottom: '20px' }}>
          ← Volver al Dashboard
        </button>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ color: '#667eea' }}>🌡️ Mis Sensores</h1>
          <button className="button" onClick={() => navigate('/sensors/register')}>
            + Nuevo Sensor
          </button>
        </div>

        <div className="grid">
          <div className="card" style={{ border: '2px dashed #e2e8f0', textAlign: 'center', cursor: 'pointer' }}
               onClick={() => navigate('/sensors/register')}>
            <h3 style={{ color: '#718096' }}>+ Registrar Primer Sensor</h3>
            <p style={{ color: '#a0aec0' }}>No tienes sensores registrados</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sensors;
