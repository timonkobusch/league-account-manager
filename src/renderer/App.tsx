import About from 'renderer/pages/About';
import Header from 'renderer/components/header';
import Add from 'renderer/pages/Register';
import Edit from 'renderer/pages/Edit';
import AccountList from 'renderer/components/accountList';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
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
  const [dark, setDark] = useState(false);

  const switchDark = () => {
    document.documentElement.classList.toggle('dark');
    setDark(!dark);
  };

  window.electron.accountLoadHandler.once('acc:reload', (accs: Account[]) => {
    setAccounts(accs);
  });

  return (
    <div className="px-4 dark:bg-slate-600 h-full">
      <Header handleRefresh={refreshAccounts} switchDark={switchDark} />
      <AccountList accounts={accounts} />
      <ToastContainer />
      <div className="flex w-full p-2 justify-center">
        <p>Timon Kobusch 2024 ©</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/add" element={<Add />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}
