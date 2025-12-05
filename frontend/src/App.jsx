import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useWallet } from './hooks/useWallet';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import RegisterClient from './pages/RegisterClient';
import BusinessUnits from './pages/BusinessUnits';
import CreateBusinessUnit from './pages/CreateBusinessUnit';
import Sensors from './pages/Sensors';
import RegisterSensor from './pages/RegisterSensor';
import SensorData from './pages/SensorData';
import LogReading from './pages/LogReading';
import './App.css';

function App() {
  const wallet = useWallet();

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home wallet={wallet} />} />
          <Route path="/dashboard" element={<Dashboard wallet={wallet} />} />
          <Route path="/register-client" element={<RegisterClient wallet={wallet} />} />
          <Route path="/business-units" element={<BusinessUnits wallet={wallet} />} />
          <Route path="/business-units/create" element={<CreateBusinessUnit wallet={wallet} />} />
          <Route path="/sensors" element={<Sensors wallet={wallet} />} />
          <Route path="/sensors/register" element={<RegisterSensor wallet={wallet} />} />
          <Route path="/sensors/:sensorId" element={<SensorData wallet={wallet} />} />
          <Route path="/readings/log" element={<LogReading wallet={wallet} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
