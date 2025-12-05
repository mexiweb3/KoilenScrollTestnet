import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BUSINESS_TYPES } from '../config/blockchain';

function CreateBusinessUnit({ wallet }) {
  const navigate = useNavigate();
  const { isConnected } = wallet;

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    businessType: 'restaurant',
    contactName: '',
    contactPhone: '',
    contactEmail: ''
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
      navigate('/business-units');
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="container" style={{ paddingTop: '40px' }}>
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <button onClick={() => navigate('/business-units')} style={{ background: 'none', border: 'none', color: '#667eea', cursor: 'pointer', marginBottom: '20px' }}>
          ← Volver
        </button>

        <h1 style={{ marginBottom: '30px', color: '#667eea' }}>🏢 Crear Nueva Sucursal</h1>

        <form onSubmit={handleSubmit}>
          <input className="input" type="text" placeholder="Nombre de la Sucursal *" required
                 onChange={(e) => setFormData({...formData, name: e.target.value})} />

          <input className="input" type="text" placeholder="Ubicación (Ciudad, País) *" required
                 onChange={(e) => setFormData({...formData, location: e.target.value})} />

          <select className="select" onChange={(e) => setFormData({...formData, businessType: e.target.value})}>
            {BUSINESS_TYPES.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>

          <input className="input" type="text" placeholder="Contacto de la Sucursal"
                 onChange={(e) => setFormData({...formData, contactName: e.target.value})} />

          <input className="input" type="tel" placeholder="Teléfono del Contacto"
                 onChange={(e) => setFormData({...formData, contactPhone: e.target.value})} />

          <input className="input" type="email" placeholder="Email del Contacto"
                 onChange={(e) => setFormData({...formData, contactEmail: e.target.value})} />

          <button className="button" type="submit" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Creando...' : '✅ Crear en Blockchain'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateBusinessUnit;
