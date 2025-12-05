import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../hooks/useWallet';
import { useKoilenContracts } from '../hooks/useKoilenContracts';

function LogReading() {
    const navigate = useNavigate();
    const wallet = useWallet();
    const { isConnected, signer, account, loading: walletLoading } = wallet;

    const {
        getClientIdByWallet,
        getClientBusinessUnits,
        getBusinessUnitSensors,
        logReading
    } = useKoilenContracts(signer);

    const [businessUnits, setBusinessUnits] = useState([]);
    const [sensors, setSensors] = useState([]);
    const [loadingConfig, setLoadingConfig] = useState(true);

    const [formData, setFormData] = useState({
        businessUnitId: '',
        sensorId: '',
        deviceId: '',
        temperature: 5,
        humidity: 50,
        online: true
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isConnected && account) {
            loadBusinessUnits();
        }
    }, [isConnected, account]);

    // Wait for wallet to initialize
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

    const loadBusinessUnits = async () => {
        try {
            setLoadingConfig(true);
            const clientId = await getClientIdByWallet(account);
            if (clientId === 0) {
                alert("Primero debes registrarte como cliente.");
                navigate('/register-client');
                return;
            }
            const units = await getClientBusinessUnits(clientId);
            setBusinessUnits(units);
        } catch (error) {
            console.error("Error loading units:", error);
        } finally {
            setLoadingConfig(false);
        }
    };

    const loadSensors = async (businessUnitId) => {
        try {
            const sensorsData = await getBusinessUnitSensors(businessUnitId);
            setSensors(sensorsData);

            // Auto-select first sensor if available
            if (sensorsData.length > 0) {
                setFormData(prev => ({
                    ...prev,
                    sensorId: sensorsData[0].id.toString(),
                    deviceId: sensorsData[0].deviceId
                }));
            }
        } catch (error) {
            console.error("Error loading sensors:", error);
            setSensors([]);
        }
    };

    const handleBusinessUnitChange = (e) => {
        const buId = e.target.value;
        setFormData({ ...formData, businessUnitId: buId, sensorId: '', deviceId: '' });
        if (buId) {
            loadSensors(buId);
        } else {
            setSensors([]);
        }
    };

    const handleSensorChange = (e) => {
        const sId = e.target.value;
        const selectedSensor = sensors.find(s => s.id.toString() === sId);
        setFormData({
            ...formData,
            sensorId: sId,
            deviceId: selectedSensor ? selectedSensor.deviceId : ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.sensorId || !formData.deviceId) {
            alert("Por favor selecciona un sensor.");
            return;
        }

        setLoading(true);
        try {
            // Temperature is scaled by 10 in the contract (e.g., 5.5°C = 55)
            const tempScaled = Math.round(formData.temperature * 10);
            const humInt = Math.round(formData.humidity);

            const result = await logReading(
                formData.sensorId,
                formData.deviceId,
                tempScaled,
                humInt,
                formData.online
            );

            console.log("Reading logged:", result);
            alert("¡Lectura registrada exitosamente! 🎉");
            navigate(`/sensors/${formData.sensorId}`);
        } catch (err) {
            console.error("Error in handleSubmit:", err);
            alert("Error al registrar lectura: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loadingConfig) {
        return <div className="container" style={{ paddingTop: '40px', textAlign: 'center' }}>Cargando sucursales...</div>;
    }

    return (
        <div className="container" style={{ paddingTop: '40px' }}>
            <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <button onClick={() => navigate('/dashboard')} style={{ background: 'none', border: 'none', color: '#667eea', cursor: 'pointer', marginBottom: '20px' }}>
                    ← Volver
                </button>

                <h1 style={{ marginBottom: '30px', color: '#667eea' }}>📊 Registrar Lectura de Sensor</h1>

                <form onSubmit={handleSubmit}>

                    <div style={{ marginBottom: '20px', padding: '15px', background: '#f7fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                        <label style={{ display: 'block', marginBottom: '8px', color: '#4a5568', fontWeight: 'bold' }}>📍 Seleccionar Sucursal</label>
                        {businessUnits.length > 0 ? (
                            <select
                                className="select"
                                value={formData.businessUnitId}
                                onChange={handleBusinessUnitChange}
                                required
                            >
                                <option value="" disabled>-- Selecciona una sucursal --</option>
                                {businessUnits.map(bu => (
                                    <option key={bu.id} value={bu.id.toString()}>
                                        {bu.name} ({bu.businessType})
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <p style={{ color: '#999', fontStyle: 'italic' }}>No tienes sucursales. Crea una primero.</p>
                        )}
                    </div>

                    <div style={{ marginBottom: '20px', padding: '15px', background: '#f7fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                        <label style={{ display: 'block', marginBottom: '8px', color: '#4a5568', fontWeight: 'bold' }}>🌡️ Seleccionar Sensor</label>
                        {sensors.length > 0 ? (
                            <select
                                className="select"
                                value={formData.sensorId}
                                onChange={handleSensorChange}
                                required
                            >
                                <option value="" disabled>-- Selecciona un sensor --</option>
                                {sensors.map(sensor => (
                                    <option key={sensor.id} value={sensor.id.toString()}>
                                        {sensor.name || `Sensor ${sensor.id}`} - {sensor.equipmentType} (ID: {sensor.deviceId})
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <p style={{ color: '#999', fontStyle: 'italic' }}>
                                {formData.businessUnitId ? 'No hay sensores en esta sucursal.' : 'Selecciona una sucursal primero.'}
                            </p>
                        )}
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', color: '#4a5568', fontWeight: 'bold' }}>🌡️ Temperatura (°C)</label>
                        <input
                            type="number"
                            step="0.1"
                            className="input"
                            value={formData.temperature}
                            onChange={(e) => setFormData({ ...formData, temperature: parseFloat(e.target.value) })}
                            placeholder="Ej: 5.5"
                            required
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', color: '#4a5568', fontWeight: 'bold' }}>💧 Humedad (%)</label>
                        <input
                            type="number"
                            className="input"
                            value={formData.humidity}
                            onChange={(e) => setFormData({ ...formData, humidity: parseInt(e.target.value) })}
                            placeholder="Ej: 50"
                            min="0"
                            max="100"
                            required
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', color: '#4a5568', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={formData.online}
                                onChange={(e) => setFormData({ ...formData, online: e.target.checked })}
                                style={{ marginRight: '10px', width: '20px', height: '20px' }}
                            />
                            <span style={{ fontWeight: 'bold' }}>🟢 Sensor Online</span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="button"
                        disabled={loading || !formData.sensorId}
                        style={{ width: '100%', opacity: (loading || !formData.sensorId) ? 0.6 : 1 }}
                    >
                        {loading ? 'Registrando...' : '📊 Registrar Lectura'}
                    </button>

                </form>
            </div>
        </div>
    );
}

export default LogReading;
