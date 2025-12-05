import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { BLOCKCHAIN_CONFIG } from '../config/blockchain';
import KoilenRegistryABI from '../contracts/KoilenRegistry';

function BusinessUnits({ wallet }) {
  const navigate = useNavigate();
  const { isConnected, signer, account } = wallet;
  const [businessUnits, setBusinessUnits] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isConnected && signer) {
      loadBusinessUnits();
    }
  }, [isConnected, signer]);

  const loadBusinessUnits = async () => {
    setLoading(true);
    try {
      const contract = new ethers.Contract(
        BLOCKCHAIN_CONFIG.contracts.koilenRegistry,
        KoilenRegistryABI,
        signer
      );

      // Get Client ID
      const clientId = await contract.walletToClientId(account);

      if (Number(clientId) === 0) {
        // Not registered
        setBusinessUnits([]);
        setLoading(false);
        return;
      }

      // Get Business Units
      const units = await contract.getClientBusinessUnits(clientId);
      console.log("Loaded units:", units);
      setBusinessUnits(units);
    } catch (error) {
      console.error("Error loading business units:", error);
    }
    setLoading(false);
  };

  if (!isConnected) {
    navigate('/');
    return null;
  }

  return (
    <div className="container" style={{ paddingTop: '40px' }}>
      <div className="card">
        <button
          onClick={() => navigate('/dashboard')}
          style={{ background: 'none', border: 'none', color: '#667eea', cursor: 'pointer', marginBottom: '20px' }}
        >
          ← Volver al Dashboard
        </button>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ color: '#667eea' }}>🏢 Mis Sucursales</h1>
          <button className="button" onClick={() => navigate('/business-units/create')}>
            + Nueva Sucursal
          </button>
        </div>

        {loading ? (
          <p>Cargando sucursales de la blockchain...</p>
        ) : businessUnits.length > 0 ? (
          <div className="grid">
            {businessUnits.map((unit) => (
              <div key={unit.id} className="card" onClick={() => navigate(`/sensors?unitId=${unit.id}`)} style={{ cursor: 'pointer' }}>
                <h3>{unit.name}</h3>
                <p>📍 {unit.location}</p>
                <p>🔧 {unit.businessType}</p>
              </div>
            ))}
            <div className="card" style={{ border: '2px dashed #e2e8f0', textAlign: 'center', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              onClick={() => navigate('/business-units/create')}>
              <span style={{ color: '#718096' }}>+ Agregar Otra</span>
            </div>
          </div>
        ) : (
          <div className="grid">
            <div className="card" style={{ border: '2px dashed #e2e8f0', textAlign: 'center', cursor: 'pointer' }}
              onClick={() => navigate('/business-units/create')}>
              <h3 style={{ color: '#718096' }}>+ Crear Primera Sucursal</h3>
              <p style={{ color: '#a0aec0' }}>No tienes sucursales registradas</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BusinessUnits;
