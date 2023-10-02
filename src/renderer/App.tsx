import About from 'renderer/pages/About';
import Header from 'renderer/components/header';
import AccountList from 'renderer/components/accountList';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import '../dist/styles.css';
/*
function sendNotification() {
  window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
}
*/

function Main() {
  const refreshAccounts = () => {
    window.electron.ipcRenderer.sendMessage('acc:reload');
  };

  const [currentText, setCurrentText] = useState('unset');

  window.electron.ipcRenderer.on('acc:reload', (arg) => {
    console.log(arg);
    setCurrentText(arg);
  });

  return (
    <div className="px-4">
      <Header handleRefresh={refreshAccounts} />
      <p>{currentText}</p>
      <AccountList />
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
