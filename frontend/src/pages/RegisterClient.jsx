import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKoilenContracts } from '../hooks/useKoilenContracts';

function RegisterClient({ wallet }) {
  const navigate = useNavigate();
  const { account, isConnected, signer } = wallet;
  const { registerClient, getClientIdByWallet } = useKoilenContracts(signer);

  const [formData, setFormData] = useState({
    businessName: '',
    email: '',
    phoneNumber: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [checkingRegistration, setCheckingRegistration] = useState(true);

  useEffect(() => {
    if (isConnected && signer && account) {
      checkIfAlreadyRegistered();
    }
  }, [isConnected, signer, account]);

  const checkIfAlreadyRegistered = async () => {
    try {
      const clientId = await getClientIdByWallet(account);
      if (clientId > 0) {
        // Already registered, redirect to dashboard
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error checking registration:', error);
    } finally {
      setCheckingRegistration(false);
    }
  };

  if (!isConnected) {
    navigate('/');
    return null;
  }

  if (checkingRegistration) {
    return (
      <div className="container" style={{ paddingTop: '40px' }}>
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          <h2>Verificando registro...</h2>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await registerClient(
        formData.businessName,
        formData.email,
        formData.phoneNumber || ''
      );

      setSuccess(`Cliente registrado exitosamente! TX: ${result.txHash}`);
      setTimeout(() => navigate('/dashboard'), 3000);
    } catch (err) {
      setError(err.message || 'Error al registrar cliente');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ paddingTop: '40px' }}>
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <button
          onClick={() => navigate('/dashboard')}
          style={{ background: 'none', border: 'none', color: '#667eea', cursor: 'pointer', marginBottom: '20px' }}
        >
          ← Volver al Dashboard
        </button>

        <h1 style={{ marginBottom: '30px', color: '#667eea' }}>📝 Registrar Nuevo Cliente</h1>

        <div style={{ marginBottom: '20px', padding: '12px', background: '#f7fafc', borderRadius: '8px' }}>
          <strong>Wallet Conectado:</strong>
          <div style={{ fontSize: '14px', color: '#718096', marginTop: '4px' }}>{account}</div>
        </div>

        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#4a5568' }}>
              Nombre del Negocio *
            </label>
            <input
              className="input"
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              required
              placeholder="Ej: Refrigeración Chile S.A."
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#4a5568' }}>
              Email de Contacto *
            </label>
            <input
              className="input"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="contacto@empresa.com"
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#4a5568' }}>
              Teléfono
            </label>
            <input
              className="input"
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="+56 9 1234 5678"
            />
          </div>

          <button
            className="button"
            type="submit"
            disabled={loading}
            style={{ width: '100%', fontSize: '18px' }}
          >
            {loading ? 'Registrando en Blockchain...' : '✅ Registrar en Blockchain'}
          </button>
        </form>

        <div style={{ marginTop: '20px', padding: '12px', background: '#fff8dc', borderRadius: '8px', fontSize: '14px' }}>
          ⚠️ Esta operación requiere firma con MetaMask y gas fees
        </div>
      </div>
    </div>
  );
}

export default RegisterClient;
