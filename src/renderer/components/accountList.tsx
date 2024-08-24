import { useState } from 'react';
import { AiOutlineDown } from 'react-icons/ai';
import { MdOutlineCancel } from 'react-icons/md';
import { Account } from '../../interface/accounts.interface';
import AccountElement from './accountElement';

export default function AccountList({
  accounts,
  autoLoginActive,
}: {
  accounts: Account[];
  autoLoginActive: boolean;
}) {
  const [soloActive, setSoloActive] = useState(true);
  const savedServer = localStorage.getItem('server') || '';
  const [server, setServer] = useState(savedServer);
  const [showServer, setShowServer] = useState(false);

  const servers = Array.from(
    new Set(accounts.map((account) => account.server))
  );

  const setServerInLocalStorage = (s: string) => {
    setServer(s);
    localStorage.setItem('server', s);
  };

  return (
    <>
      <div className="flex w-full mb-2 gap-4">
        <div className="flex font-medium rounded-md border border-blue-700 dark:border-blue-800 bg-white dark:bg-zinc-400 text-blue-700 dark:text-blue-800 hover:bg-gray-100 shadow-sm">
          <button
            type="button"
            className={`border-r border-blue-700 px-2 py-1 ${
              soloActive ? ' bg-blue-700 dark:bg-blue-800 text-white' : ''
            }`}
            onClick={() => {
              setSoloActive(true);
            }}
          >
            SoloQ
          </button>
          <button
            type="button"
            className={`px-2 ${!soloActive ? ' bg-blue-700 text-white' : ''}`}
            onClick={() => {
              setSoloActive(false);
            }}
          >
            FlexQ
          </button>
        </div>
        <div>
          <button
            type="button"
            className="rounded-full border border-blue-800 p-1 px-3 dark:bg-zinc-400 text-blue-800 flex flex-row items-center gap-1"
            onClick={() => {
              if (server !== '') {
                setServerInLocalStorage('');
              } else {
                setShowServer(!showServer);
              }
            }}
          >
            <span
              className={
                server === '' ? 'font-semibold' : 'uppercase font-medium'
              }
            >
              {server === '' ? 'Server' : server}
            </span>
            {server === '' ? <AiOutlineDown /> : <MdOutlineCancel />}
          </button>
          {showServer && (
            <div className="absolute bg-white dark:bg-zinc-300 font-medium dark:text-gray-700 border border-gray-200 dark:border-gray-800 rounded-md z-20">
              {servers.map((s) => (
                <button
                  key={s}
                  type="button"
                  className="w-full text-left uppercase hover:bg-zinc-400 dark:hover:bg-zinc-500 px-2 py-2"
                  onClick={() => {
                    setServerInLocalStorage(s);
                    setShowServer(false);
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <ul className="space-y-2">
        {accounts &&
          accounts.length > 0 &&
          accounts
            .filter((account: Account) => {
              if (server !== '') {
                return account.server === server;
              }
              return true;
            })
            .map((account: Account) => {
              return (
                <AccountElement
                  key={account.username}
                  account={account}
                  soloActive={soloActive}
                  autoLoginActive={autoLoginActive}
                />
              );
            })}
      </ul>
    </>
  );
}
