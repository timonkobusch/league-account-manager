import About from 'renderer/pages/About';
import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import 'tailwindcss/tailwind.css';

function sendNotification() {
  window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
}

function Main() {
  return (
    <div className="px-4">
      <h1 className="text-4xl">Hello React!</h1>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/add" element={<h1>Register</h1>} />
        <Route path="/edit" element={<h1>Edit</h1>} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}
