import { useState } from 'react';
import { Account } from '../../interface/accounts.interface';
import AccountElement from './accountElement';

export default function AccountList({ accounts }: { accounts: Account[] }) {
  const [soloActive, setSoloActive] = useState(true);
  return (
    <>
      <div className="flex w-full mb-2">
        <div className="flex rounded-md border border-blue-700 bg-white text-blue-700 hover:bg-gray-100 shadow-sm">
          <button
            type="button"
            className={`border-r border-blue-700 p-2${
              soloActive ? ' bg-blue-700 text-white' : ''
            }`}
            onClick={() => {
              setSoloActive(true);
            }}
          >
            SoloQ
          </button>
          <button
            type="button"
            className={`p-2 ${!soloActive ? ' bg-blue-700 text-white' : ''}`}
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
