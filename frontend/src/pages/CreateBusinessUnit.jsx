import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BUSINESS_TYPES } from '../config/blockchain';
import { useKoilenContracts } from '../hooks/useKoilenContracts';

function CreateBusinessUnit({ wallet }) {
  const navigate = useNavigate();
  const { isConnected, signer } = wallet;
  const { createBusinessUnit } = useKoilenContracts(signer);

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    country: '',
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
      if (!signer) throw new Error("No signer available");

      console.log("Creating business unit...", formData);

      // Call the EVVM gasless createBusinessUnit from the hook
      // Hook signature: (name, businessType, address, city, country, contactName, contactPhone, contactEmail)
      const result = await createBusinessUnit(
        formData.name.trim(),
        formData.businessType,
        formData.address.trim(),
        formData.city.trim(),
        formData.country.trim(),
        formData.contactName.trim() || "Manager",
        formData.contactPhone.trim() || "000-000-0000",
        formData.contactEmail.trim() || "contact@example.com"
      );

      console.log("Transaction confirmed:", result.txHash);
      alert("¡Sucursal creada exitosamente! 🎉");
      navigate('/business-units');
    } catch (err) {
      console.error(err);
      alert("Error creating business unit: " + (err.message || err.toString()));
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
            onChange={(e) => setFormData({ ...formData, name: e.target.value })} />

          <input className="input" type="text" placeholder="Dirección *" required
            onChange={(e) => setFormData({ ...formData, address: e.target.value })} />

          <input className="input" type="text" placeholder="Ciudad *" required
            onChange={(e) => setFormData({ ...formData, city: e.target.value })} />

          <input className="input" type="text" placeholder="País *" required
            onChange={(e) => setFormData({ ...formData, country: e.target.value })} />

          <select className="select" onChange={(e) => setFormData({ ...formData, businessType: e.target.value })} value={formData.businessType}>
            {BUSINESS_TYPES.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>

          <input className="input" type="text" placeholder="Nombre del Contacto"
            onChange={(e) => setFormData({ ...formData, contactName: e.target.value })} />

          <input className="input" type="tel" placeholder="Teléfono del Contacto"
            onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })} />

          <input className="input" type="email" placeholder="Email del Contacto"
            onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })} />

          <button className="button" type="submit" disabled={loading}>
            {loading ? '⏳ Creando...' : '✅ Crear en Blockchain'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateBusinessUnit;
