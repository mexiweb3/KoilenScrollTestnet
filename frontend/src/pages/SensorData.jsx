import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useWallet } from '../hooks/useWallet';
import { useKoilenContracts } from '../hooks/useKoilenContracts';

function SensorData() {
  const navigate = useNavigate();
  const { sensorId } = useParams();
  const wallet = useWallet();
  const { isConnected, signer, loading: walletLoading } = wallet;
  const { getSensor, getSensorReadings, getBusinessUnit, getClient } = useKoilenContracts(signer);

  const [sensor, setSensor] = useState(null);
  const [businessUnit, setBusinessUnit] = useState(null);
  const [client, setClient] = useState(null);
  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isConnected && sensorId) {
      loadData();
    }
  }, [isConnected, sensorId, signer]);

  const loadData = async () => {
    setLoading(true);
    try {
      // 1. Get sensor data
      console.log('Loading sensor data for ID:', sensorId);
      const sensorData = await getSensor(sensorId);
      console.log('Sensor data loaded:', sensorData);
      setSensor(sensorData);

      // 2. Get business unit data (don't fail if this errors)
      try {
        console.log('Loading business unit for ID:', sensorData.businessUnitId);
        const buData = await getBusinessUnit(sensorData.businessUnitId);
        console.log('Business unit data loaded:', buData);
        setBusinessUnit(buData);

        // 3. Get client data (don't fail if this errors)
        try {
          console.log('Loading client for ID:', buData.clientId);
          const clientData = await getClient(buData.clientId);
          console.log('Client data loaded:', clientData);
          setClient(clientData);
        } catch (clientError) {
          console.error("Error loading client data:", clientError);
          // Continue anyway - sensor data is more important
        }
      } catch (buError) {
        console.error("Error loading business unit data:", buError);
        // Continue anyway - sensor data is more important
      }

      // 4. Get sensor readings (don't fail if this errors)
      try {
        const readingsData = await getSensorReadings(sensorId, 20);
        console.log('Readings loaded:', readingsData.length, 'readings');
        setReadings(readingsData);
      } catch (readingsError) {
        console.error("Error loading readings:", readingsError);
        setReadings([]);
      }
    } catch (error) {
      console.error("Error loading sensor data:", error);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return <div className="container" style={{ paddingTop: '40px', textAlign: 'center' }}>Cargando datos del sensor...</div>;
  }

  if (!sensor) {
    return (
      <div className="container" style={{ paddingTop: '40px', textAlign: 'center' }}>
        <h2>Sensor no encontrado</h2>
        <button onClick={() => navigate('/dashboard')}>Volver al Dashboard</button>
      </div>
    );
  }

  const lastReading = readings.length > 0 ? readings[0] : null;

  return (
    <div className="container" style={{ paddingTop: '40px' }}>
      <div className="card">
        <button onClick={() => navigate('/dashboard')} style={{ background: 'none', border: 'none', color: '#667eea', cursor: 'pointer', marginBottom: '20px' }}>
          ← Volver al Dashboard
        </button>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div>
            <h1 style={{ margin: 0, color: '#667eea' }}>📈 {sensor.name || "Sensor " + sensor.id}</h1>
            <p style={{ color: '#718096', marginTop: '5px' }}>
              {sensor.location} • {sensor.equipmentType} • ID: {sensor.deviceId}
            </p>
          </div>
          <button className="button-secondary" onClick={loadData}>Updated 🔄</button>
        </div>

        {/* Client and Business Unit Info */}
        <div className="card" style={{ background: '#f7fafc', marginBottom: '20px' }}>
          <h3 style={{ marginTop: 0, color: '#667eea' }}>📍 Información de Ubicación</h3>

          {/* Debug info */}
          <div style={{ marginBottom: '15px', padding: '10px', background: '#fff', borderRadius: '4px' }}>
            <p style={{ margin: '5px 0', fontSize: '12px', color: '#666' }}>
              <strong>Debug:</strong> businessUnit={businessUnit ? 'loaded' : 'null'}, client={client ? 'loaded' : 'null'}
            </p>
            {sensor && (
              <p style={{ margin: '5px 0', fontSize: '12px', color: '#666' }}>
                <strong>Sensor businessUnitId:</strong> {sensor.businessUnitId}
              </p>
            )}
          </div>

          {client && (
            <div style={{ marginBottom: '15px' }}>
              <p style={{ margin: '5px 0' }}><strong>🏢 Cliente:</strong> {client.businessName}</p>
              <p style={{ margin: '5px 0', color: '#718096' }}><strong>📧 Email:</strong> {client.email}</p>
              <p style={{ margin: '5px 0', color: '#718096' }}><strong>📞 Teléfono:</strong> {client.phoneNumber}</p>
            </div>
          )}

          {businessUnit && (
            <div>
              <p style={{ margin: '5px 0' }}><strong>🏪 Sucursal:</strong> {businessUnit.name}</p>
              <p style={{ margin: '5px 0', color: '#718096' }}><strong>📍 Ubicación:</strong> {businessUnit.location}</p>
              <p style={{ margin: '5px 0', color: '#718096' }}><strong>🏷️ Tipo:</strong> {businessUnit.businessType}</p>
            </div>
          )}

          {!client && !businessUnit && (
            <p style={{ color: '#999', fontStyle: 'italic' }}>
              Cargando información de ubicación...
            </p>
          )}
        </div>

        <div className="card" style={{ background: '#f7fafc' }}>
          <h2>🌡️ Última Lectura</h2>
          {lastReading ? (
            <div style={{ marginTop: '20px' }}>
              <p><strong>Temperatura:</strong> {lastReading.temperature}°C
                {(lastReading.temperature > sensor.maxTemp || lastReading.temperature < sensor.minTemp) ? ' ⚠️ Alerta' : ' ✅ Normal'}
              </p>
              <p><strong>Humedad:</strong> {lastReading.humidity}%
                {(lastReading.humidity > sensor.maxHumidity || lastReading.humidity < sensor.minHumidity) ? ' ⚠️ Alerta' : ' ✅ Normal'}
              </p>
              <p><strong>Estado:</strong> {lastReading.online ? '🟢 Online' : '🔴 Offline'}</p>
              <p><strong>Hora:</strong> {lastReading.timestamp.toLocaleString()}</p>
            </div>
          ) : (
            <p style={{ color: '#718096', fontStyle: 'italic' }}>No hay lecturas recientes.</p>
          )}
        </div>

        <div className="card" style={{ marginTop: '20px' }}>
          <h2>📋 Historial de Lecturas</h2>
          {readings.length > 0 ? (
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
              <thead>
                <tr style={{ textAlign: 'left', color: '#718096' }}>
                  <th style={{ padding: '8px' }}>Hora</th>
                  <th style={{ padding: '8px' }}>Temp</th>
                  <th style={{ padding: '8px' }}>Humedad</th>
                  <th style={{ padding: '8px' }}>Estado</th>
                </tr>
              </thead>
              <tbody>
                {readings.map(r => (
                  <tr key={r.id} style={{ borderTop: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '8px' }}>{r.timestamp.toLocaleDateString()} {r.timestamp.toLocaleTimeString()}</td>
                    <td style={{ padding: '8px' }}>{r.temperature}°C</td>
                    <td style={{ padding: '8px' }}>{r.humidity}%</td>
                    <td style={{ padding: '8px' }}>{r.online ? 'Online' : 'Offline'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ color: '#718096' }}>No hay lecturas registradas en blockchain aún.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SensorData;
