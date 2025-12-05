import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Dashboard({ wallet }) {
  const navigate = useNavigate();
  const { account, isConnected, disconnectWallet } = wallet;

  useEffect(() => {
    if (!isConnected) {
      navigate('/');
    }
  }, [isConnected, navigate]);

  if (!isConnected) {
    return null;
  }

  const formatAddress = (addr) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  return (
    <div className="container" style={{ paddingTop: '40px' }}>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ color: '#667eea' }}>Koilen Web3 Registry</h1>
          <div>
            <span style={{ marginRight: '20px', color: '#4a5568' }}>
              {formatAddress(account)}
            </span>
            <button className="button" onClick={disconnectWallet}>
              Desconectar
            </button>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">0</div>
          <div className="stat-label">Clientes</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">0</div>
          <div className="stat-label">Sucursales</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">0</div>
          <div className="stat-label">Sensores</div>
        </div>
      </div>

      <div className="card">
        <h2 style={{ marginBottom: '20px', color: '#4a5568' }}>Navegación</h2>
        <div className="grid">
          <button
            className="card"
            onClick={() => navigate('/register-client')}
            style={{ cursor: 'pointer', border: '2px solid #e2e8f0', transition: 'all 0.3s' }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = '#667eea'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
          >
            <h3>📝 Registrar Cliente</h3>
            <p>Registra tu empresa en blockchain</p>
          </button>

          <button
            className="card"
            onClick={() => navigate('/business-units')}
            style={{ cursor: 'pointer', border: '2px solid #e2e8f0', transition: 'all 0.3s' }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = '#667eea'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
          >
            <h3>🏢 Gestionar Sucursales</h3>
            <p>Crea y administra tus ubicaciones</p>
          </button>

          <button
            className="card"
            onClick={() => navigate('/sensors')}
            style={{ cursor: 'pointer', border: '2px solid #e2e8f0', transition: 'all 0.3s' }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = '#667eea'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
          >
            <h3>🌡️ Gestionar Sensores</h3>
            <p>Registra y configura sensores IoT</p>
          </button>

          <button
            className="card"
            onClick={() => navigate('/sensors')}
            style={{ cursor: 'pointer', border: '2px solid #e2e8f0', transition: 'all 0.3s' }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = '#667eea'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
          >
            <h3>📊 Ver Lecturas</h3>
            <p>Consulta datos de sensores</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
