import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useKoilenContracts } from '../hooks/useKoilenContracts';

function Dashboard({ wallet }) {
  const navigate = useNavigate();
  const { account, isConnected, disconnectWallet, signer } = wallet;
  const {
    getClientIdByWallet,
    getClient,
    getClientBusinessUnits,
    getBusinessUnitSensors
  } = useKoilenContracts(signer);

  /* State */
  const [clientId, setClientId] = useState(null);
  const [clientInfo, setClientInfo] = useState(null);
  const [dashboardData, setDashboardData] = useState([]); // Array of { unit, sensors: [] }
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [expandedUnitId, setExpandedUnitId] = useState(null);

  useEffect(() => {
    if (!isConnected) {
      navigate('/');
    }
  }, [isConnected, navigate]);

  useEffect(() => {
    if (isConnected && signer && account) {
      loadClientData();
    }
  }, [isConnected, signer, account]);

  const loadClientData = async () => {
    try {
      setLoading(true);

      // Check if wallet is registered as client
      const id = await getClientIdByWallet(account);

      if (id === 0) {
        setIsRegistered(false);
        setLoading(false);
        return;
      }

      setClientId(id);
      setIsRegistered(true);

      // Load client info
      const info = await getClient(id);
      setClientInfo(info);

      // Load business units and their sensors
      const units = await getClientBusinessUnits(id);

      const data = [];
      for (const unit of units) {
        const sensors = await getBusinessUnitSensors(unit.id);
        data.push({
          unit: unit,
          sensors: sensors
        });
      }

      setDashboardData(data);
    } catch (error) {
      console.error('Error loading client data:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (unitId) => {
    if (expandedUnitId === unitId) {
      setExpandedUnitId(null);
    } else {
      setExpandedUnitId(unitId);
    }
  };

  if (!isConnected) {
    return null;
  }

  const formatAddress = (addr) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  // If not registered, show registration prompt
  if (!loading && !isRegistered) {
    return (
      <div className="container" style={{ paddingTop: '40px' }}>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ color: '#667eea' }}>Desconectado</h1>
            <button className="button" onClick={disconnectWallet}>
              Desconectar
            </button>
          </div>
        </div>

        <div className="card" style={{ marginTop: '30px', textAlign: 'center', padding: '40px' }}>
          <h2 style={{ color: '#667eea', marginBottom: '20px' }}>🚀 Registro Requerido</h2>
          <p style={{ fontSize: '18px', color: '#4a5568', marginBottom: '30px' }}>
            Tu wallet no está registrada como cliente en el contrato.
          </p>

          <div style={{ background: '#fff5f5', padding: '15px', borderRadius: '8px', marginBottom: '20px', textAlign: 'left', display: 'inline-block' }}>
            <p><strong>Debug Info:</strong></p>
            <p style={{ fontFamily: 'monospace', fontSize: '12px' }}>Wallet: {account}</p>
            <p style={{ fontFamily: 'monospace', fontSize: '12px' }}>Client ID Found: {clientId !== null ? clientId.toString() : 'null'}</p>
            <p style={{ fontFamily: 'monospace', fontSize: '12px' }}>Network ID: {wallet.chainId}</p>
          </div>

          <br />

          <button
            className="button"
            onClick={() => navigate('/register-client')}
            style={{ fontSize: '18px', padding: '16px 32px' }}
          >
            📝 Registrar Mi Negocio
          </button>
        </div>
      </div>
    );
  }

  const getTotalSensors = () => {
    return dashboardData.reduce((acc, curr) => acc + curr.sensors.length, 0);
  };

  return (
    <div className="container" style={{ paddingTop: '40px' }}>
      {/* Header Card */}
      <div className="card" style={{ marginBottom: '30px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '2rem' }}>
              {loading ? 'Cargando...' : clientInfo?.businessName || 'Mi Negocio'}
            </h1>
            {clientInfo && (
              <p style={{ opacity: 0.9, marginTop: '8px' }}>
                {clientInfo.email} • {formatAddress(account)}
              </p>
            )}
          </div>
          <button
            onClick={disconnectWallet}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Desconectar
          </button>
        </div>

        <div style={{ display: 'flex', gap: '40px', marginTop: '30px' }}>
          <div>
            <span style={{ fontSize: '3rem', fontWeight: 'bold' }}>{dashboardData.length}</span>
            <div style={{ textTransform: 'uppercase', fontSize: '0.8rem', opacity: 0.8 }}>Sucursales</div>
          </div>
          <div>
            <span style={{ fontSize: '3rem', fontWeight: 'bold' }}>{getTotalSensors()}</span>
            <div style={{ textTransform: 'uppercase', fontSize: '0.8rem', opacity: 0.8 }}>Sensores Totales</div>
          </div>
        </div>
        <div style={{ marginTop: '20px', textAlign: 'right' }}>
          <button
            onClick={loadClientData}
            style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', opacity: 0.8 }}
          >
            🔄 Actualizar
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>

        {/* Actions Bar */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button className="button" onClick={() => navigate('/business-units/create')}>
            + Nueva Sucursal
          </button>
          <button className="button" onClick={() => navigate('/sensors/register')} style={{ background: '#48bb78' }}>
            + Nuevo Sensor
          </button>
          <button className="button" onClick={() => navigate('/readings/log')} style={{ background: '#f6ad55' }}>
            📊 Registrar Lectura
          </button>
        </div>

        {/* Business Units List */}
        {loading ? (
          <div className="card"><p>Cargando información de sucursales...</p></div>
        ) : dashboardData.length > 0 ? (
          dashboardData.map(({ unit, sensors }) => (
            <div key={unit.id} className="card" style={{ borderLeft: '5px solid #667eea' }}>
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                onClick={() => toggleExpand(unit.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ fontSize: '2rem' }}>
                    {unit.businessType === 'restaurant' ? '🍽️' :
                      unit.businessType === 'supermarket' ? '🛒' :
                        unit.businessType === 'warehouse' ? '🏭' : '🏢'}
                  </div>
                  <div>
                    <h3 style={{ margin: 0, color: '#2d3748' }}>{unit.name}</h3>
                    <p style={{ margin: 0, color: '#718096', fontSize: '0.9rem' }}>📍 {unit.location}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#667eea' }}>{sensors.length}</span>
                    <span style={{ fontSize: '0.9rem', color: '#a0aec0', marginLeft: '5px' }}>Sensores</span>
                  </div>
                  <div style={{ fontSize: '1.5rem', transform: expandedUnitId === unit.id ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>
                    ▼
                  </div>
                </div>
              </div>

              {/* Collapsible Sensor List */}
              {expandedUnitId === unit.id && (
                <div style={{ marginTop: '20px', borderTop: '1px solid #e2e8f0', paddingTop: '20px', animation: 'fadeIn 0.3s ease-in' }}>
                  {sensors.length > 0 ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
                      {sensors.map(sensor => (
                        <div key={sensor.id}
                          style={{ background: '#f7fafc', padding: '15px', borderRadius: '8px', cursor: 'pointer', border: '1px solid #edf2f7' }}
                          onClick={() => navigate(`/sensors/${sensor.id}`)}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                            <span>{sensor.equipmentType === 'freezer' ? '❄️' : '🌡️'}</span>
                            <span style={{ fontSize: '0.8rem', color: sensor.isActive ? '#48bb78' : '#e53e3e' }}>
                              ● {sensor.isActive ? 'Activo' : 'Inactivo'}
                            </span>
                          </div>
                          <h4 style={{ margin: '0 0 5px 0', fontSize: '1rem' }}>{sensor.name}</h4>
                          <p style={{ margin: 0, fontSize: '0.8rem', color: '#718096' }}>{sensor.location}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p style={{ color: '#a0aec0', fontStyle: 'italic', textAlign: 'center' }}>
                      No hay sensores instalados.
                      <span style={{ color: '#667eea', cursor: 'pointer', marginLeft: '5px', textDecoration: 'underline' }}
                        onClick={(e) => { e.stopPropagation(); navigate('/sensors/register', { state: { preselectedUnitId: unit.id.toString() } }); }}>
                        Instalar uno ahora
                      </span>
                    </p>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="card" style={{ textAlign: 'center', padding: '50px' }}>
            <h2>Bienvenido a tu Dashboard</h2>
            <p>Comienza creando tu primera sucursal para monitorear.</p>
            <button className="button" onClick={() => navigate('/business-units/create')} style={{ marginTop: '20px' }}>
              Crear Primera Sucursal
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default Dashboard;

