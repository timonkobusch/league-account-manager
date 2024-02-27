import { Account } from '../../interface/accounts.interface';
import AccountElement from './accountElement';

interface AccountListProps {
  accounts: Account[];
}
export default function AccountList({ accounts }: AccountListProps) {
  return (
    <ul className="space-y-4">
      {accounts &&
        accounts.length > 0 &&
        accounts.map((account: Account) => {
          return <AccountElement key={account.username} account={account} />;
        })}
      ;
    </ul>
  );
}
