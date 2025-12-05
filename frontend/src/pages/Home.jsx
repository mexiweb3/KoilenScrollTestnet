import { useNavigate } from 'react-router-dom';
import { BLOCKCHAIN_CONFIG } from '../config/blockchain';

function Home({ wallet }) {
  const navigate = useNavigate();
  const { account, isConnected, connectWallet, loading, error } = wallet;

  const handleConnect = async () => {
    await connectWallet();
  };

  if (isConnected && account) {
    navigate('/dashboard');
  }

  return (
    <div className="container" style={{ paddingTop: '100px' }}>
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '20px', color: '#667eea' }}>
          🧊 Koilen Web3
        </h1>
        <h2 style={{ fontSize: '24px', marginBottom: '40px', color: '#718096' }}>
          Sistema de Registro Descentralizado
        </h2>
        <p style={{ fontSize: '18px', marginBottom: '40px', color: '#4a5568' }}>
          Para Monitoreo de Refrigeración en Blockchain
        </p>

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        <button
          className="button"
          onClick={handleConnect}
          disabled={loading}
          style={{ fontSize: '20px', padding: '16px 32px' }}
        >
          {loading ? 'Conectando...' : '🦊 Conectar con MetaMask'}
        </button>

        <div style={{ marginTop: '40px', padding: '20px', background: '#f7fafc', borderRadius: '8px' }}>
          <p style={{ fontSize: '14px', color: '#718096', marginBottom: '8px' }}>
            <strong>Red:</strong> {BLOCKCHAIN_CONFIG.networkName}
          </p>
          <p style={{ fontSize: '14px', color: '#718096' }}>
            <strong>Chain ID:</strong> {BLOCKCHAIN_CONFIG.chainId}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
