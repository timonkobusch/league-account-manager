import acc from '../accounts.json';
import { Account } from '../../interface/accounts.interface';
import AccountElement from './accountElement';

export default function AccountList() {
  const accounts: Account[] = acc;
  return (
    <ul className="space-y-4">
      {accounts &&
        accounts.map((account: Account) => {
          return <AccountElement key={account.username} account={account} />;
        })}
      ;
    </ul>
  );
}
