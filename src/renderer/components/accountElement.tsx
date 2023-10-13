import {
  AiOutlineMinusCircle,
  AiOutlineMore,
  AiOutlineEdit,
} from 'react-icons/ai';
import { Account } from '../../interface/accounts.interface';

const rankedIcon = require('../../../assets/rankIcons/Diamond.webp').default;

export default function AccountElement({ account }: { account: Account }) {
  const writeClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const deleteAccount = (user: string, server: string) => {
    window.electron.textHandler.sendMessage('acc:delete', user, server);
  };
  return (
    <li className="group/item drop-shadow-lg hover:border-gray-500 border transition-all duration-150 list-none flex flex-row flex-nowrap w-full text-lg items-center justify-around rounded-xl bg-white py-4 pr-0 pl-4">
      <div className="max-h-24 gap-1 flex flex-col items-start w-48 font-medium">
        <div className="font-medium">{account.displayName}</div>
        <div className="flex items-center justify-center font-medium h-7 text-blue-700 border border-blue-700 rounded-lg px-2 py-1 text-sm">
          {account.server}
        </div>
      </div>
      <img className="h-20 w-20 mx-2" src={rankedIcon} alt="ranked icon" />
      <div className="w-36 bg-gray-200 drop-shadow-sm transition duration-100 rounded-lg px-2">
        <div className="font-medium">Diamond IV</div>
        <div>50 LP</div>
      </div>
      <div className="w-34 ml-3 mr-8 flex flex-col items-end">
        <div>1500W 1500L</div>
        <div className="">
          55% <span className="font-thin text-base">Win Rate</span>
        </div>
      </div>
      <div className="w-min flex flex-col gap-1 items-end">
        <button
          type="button"
          className="transition h-7 w-24 text-white  bg-blue-700 hover:bg-blue-800 rounded-lg px-2 py-1 text-sm"
          onClick={() => {
            writeClipboard(account.username);
          }}
        >
          username
        </button>

        <button
          type="button"
          className="transition h-7 w-24 text-white bg-blue-700 hover:bg-blue-800 rounded-lg px-2 py-1 text-sm"
          onClick={() => {
            writeClipboard(account.password);
          }}
        >
          password
        </button>
      </div>
      <div className="group/edit w-8 h-24 ml-auto pr-3 flex flex-col items-end gap-2">
        <button
          type="button"
          className="group-hover/edit:opacity-0 transition duration-150 ease-in-out "
        >
          <AiOutlineMore size={20} />
        </button>
        <button
          type="button"
          className="opacity-0 group-hover/edit:opacity-100 group-hover/edit:translate-y-0 -translate-y-3 hover:text-red-500 hover:text-bold transition duration-150 ease-in-out"
          onClick={() => {
            deleteAccount(account.username, account.server);
          }}
        >
          <AiOutlineMinusCircle size={20} />
        </button>
        <button
          type="button"
          className="opacity-0 group-hover/edit:opacity-100 group-hover/edit:translate-y-0 -translate-y-3 hover:text-blue-500 hover:text-bold transition duration-100 ease-in-out"
        >
          <AiOutlineEdit size={20} />
        </button>
      </div>
    </li>
  );
}
