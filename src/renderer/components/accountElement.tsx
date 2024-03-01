import {
  AiOutlineMinusCircle,
  AiOutlineMore,
  AiOutlineEdit,
} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useCallback, useMemo } from 'react';
import { Account, IQueueData } from '../../interface/accounts.interface';

const UnrankedIcon = require('../../../assets/rankIcons/Unranked.webp').default;
const BronzeIcon = require('../../../assets/rankIcons/Bronze.webp').default;
const SilverIcon = require('../../../assets/rankIcons/Silver.webp').default;
const GoldIcon = require('../../../assets/rankIcons/Gold.webp').default;
const PlatinumIcon = require('../../../assets/rankIcons/Platinum.webp').default;
const EmeraldIcon = require('../../../assets/rankIcons/Emerald.webp').default;
const DiamondIcon = require('../../../assets/rankIcons/Diamond.webp').default;
const MasterIcon = require('../../../assets/rankIcons/Master.webp').default;
const GrandmasterIcon =
  require('../../../assets/rankIcons/Grandmaster.webp').default;
const ChallengerIcon =
  require('../../../assets/rankIcons/Challenger.webp').default;

const rankedIcons: { [key: string]: string } = {
  Unranked: UnrankedIcon,
  Bronze: BronzeIcon,
  Silver: SilverIcon,
  Gold: GoldIcon,
  Platinum: PlatinumIcon,
  Emerald: EmeraldIcon,
  Diamond: DiamondIcon,
  Master: MasterIcon,
  Grandmaster: GrandmasterIcon,
  Challenger: ChallengerIcon,
};

interface IStats {
  displayName: string;
  displayTag: string;
  icon: string;
  league: string;
  lp: string;
  wins: number;
  losses: number;
  color: string;
  winrate: number;
}
function StatsDisplay({ stats }: { stats: IStats }) {
  const {
    displayName,
    displayTag,
    icon,
    league,
    lp,
    wins,
    losses,
    color,
    winrate,
  } = stats;
  return (
    <>
      <div className="max-h-24 gap-1 flex flex-col items-start w-44 font-semibold">
        <div className={displayName.length > 14 ? 'text-sm' : 'text-md'}>
          {displayName}
        </div>
        <div className="flex items-center justify-center dark:bg-zinc-800 font-semibold h-7 text-blue-700 dark:text-blue-600 border border-blue-700 dark:border-blue-600 rounded-lg px-2 py-1 text-sm">
          {displayTag}
        </div>
      </div>
      <img className="h-20 w-20 mx-2" src={icon} alt="ranked icon" />
      <div className="w-36 bg-zinc-300 dark:bg-zinc-600 dark:border dark:border-gray-800 drop-shadow-sm transition duration-100 rounded-lg px-2">
        <div className="font-medium">{league}</div>
        <div>{lp} LP</div>
      </div>
      <div className="w-36 ml-3 mr-8 flex flex-col items-end">
        <div className="">
          {wins}W {losses}L
        </div>
        <div className={`font-semibold ${color}`}>
          {winrate}% <span className="font-medium text-base">Win Rate</span>
        </div>
      </div>
    </>
  );
}

export default function AccountElement({
  account,
  soloActive,
}: {
  account: Account;
  soloActive: boolean;
}) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const deleteAccount = () => {
    window.electron.accountChangeHandler.sendMessage('acc:delete', account);
  };
  const calculateStats = useCallback(
    (data: IQueueData | undefined) => {
      const lp = data?.lp?.toString() || '0';
      const league = data?.league || 'Unranked';
      const icon = rankedIcons[league.split(' ')[0]];
      const wins = data?.win || 0;
      const losses = data?.lose || 0;
      const winrate =
        losses !== 0 ? Math.round((wins / (wins + losses)) * 100) : 0;
      const color = winrate <= 60 ? '' : 'text-red-700';

      return {
        displayName: account.displayName,
        displayTag: account.displayTag,
        lp,
        league,
        icon,
        wins,
        losses,
        winrate,
        color,
      };
    },
    [account.displayName, account.displayTag]
  );

  const stats = useMemo(() => {
    return soloActive
      ? calculateStats(account.data?.solo)
      : calculateStats(account.data?.flex);
  }, [account.data?.solo, account.data?.flex, soloActive, calculateStats]);

  return (
    <li className="group/item drop-shadow-lg hover:border-gray-500 dark:hover:border-gray-400 dark:border-zinc-700 border transition-all duration-150 list-none flex flex-row flex-nowrap w-full text-lg items-center justify-around rounded-xl bg-white dark:bg-zinc-800 py-4 pr-0 pl-4">
      <StatsDisplay stats={stats} />
      <div className="w-min flex flex-col gap-1 items-end">
        <button
          type="button"
          className="transition h-7 w-24 text-white  bg-blue-700 dark:bg-blue-900 dark:hover:bg-blue-800 hover:bg-blue-800 rounded-lg px-2 py-1 text-sm"
          onClick={() => {
            copyToClipboard(account.username);
          }}
        >
          username
        </button>

        <button
          type="button"
          className="transition h-7 w-24 text-white bg-blue-700 dark:bg-blue-900 hover:bg-blue-800 dark:hover:bg-blue-800 rounded-lg px-2 py-1 text-sm"
          onClick={() => {
            copyToClipboard(account.password);
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
            deleteAccount();
          }}
        >
          <AiOutlineMinusCircle size={20} />
        </button>
        <Link
          to={`/edit/${account.username}`}
          type="button"
          className="opacity-0 group-hover/edit:opacity-100 group-hover/edit:translate-y-0 -translate-y-3 hover:text-blue-500 hover:text-bold transition duration-100 ease-in-out"
        >
          <AiOutlineEdit size={20} />
        </Link>
      </div>
    </li>
  );
}
