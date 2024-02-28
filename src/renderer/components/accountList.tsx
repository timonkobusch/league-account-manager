import { useState } from 'react';
import { Account } from '../../interface/accounts.interface';
import AccountElement from './accountElement';

export default function AccountList({ accounts }: { accounts: Account[] }) {
  const [soloActive, setSoloActive] = useState(true);
  return (
    <>
      <div className="flex w-full mb-2">
        <div className="flex font-medium rounded-md border border-blue-700 dark:border-blue-800 bg-white dark:bg-zinc-200 text-blue-700 dark:text-blue-800 hover:bg-gray-100 shadow-sm">
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
      </div>
      <ul className="space-y-4">
        {accounts &&
          accounts.length > 0 &&
          accounts.map((account: Account) => {
            return (
              <AccountElement
                key={account.username}
                account={account}
                soloActive={soloActive}
              />
            );
          })}
      </ul>
    </>
  );
}
