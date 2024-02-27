import About from 'renderer/pages/About';
import Header from 'renderer/components/header';
import Add from 'renderer/pages/Register';
import Edit from 'renderer/pages/Edit';
import AccountList from 'renderer/components/accountList';
import {
  MemoryRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../dist/styles.css';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';

import { Account } from '../interface/accounts.interface';

function Main() {
  const refreshAccounts = () => {
    window.electron.accountLoadHandler.sendMessage('acc:reload');
  };
  useEffect(() => {
    refreshAccounts();
  }, []);

  const [accounts, setAccounts] = useState([] as Account[]);

  window.electron.accountLoadHandler.once('acc:reload', (accs: Account[]) => {
    setAccounts(accs);
  });

  return (
    <div className="px-4">
      <Header handleRefresh={refreshAccounts} />
      <AccountList accounts={accounts} />
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Main />} />
        <Route path="/add" element={<Add />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}
