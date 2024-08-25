import { FiRefreshCcw, FiMoon } from 'react-icons/fi';
import { MdInput } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { BiPlus } from 'react-icons/bi';
import { useState } from 'react';
import logo from '../../../assets/logo.png';

export default function Header(props: {
  handleRefresh: () => void;
  switchDark: () => void;
  autoLoginActive: boolean;
  setAutoLoginActive: (arg0: boolean) => void;
}) {
  const { handleRefresh, switchDark, autoLoginActive, setAutoLoginActive } =
    props;

  const [isActive, setActive] = useState(false);

  function rotate() {
    setActive(true);
    setTimeout(() => {
      setActive(false);
    }, 500);
  }

  const handleAutoLoginToggle = () => {
    localStorage.setItem('autoLogin', JSON.stringify(!autoLoginActive));
    setAutoLoginActive(!autoLoginActive);
  };

  return (
    <div>
      <div className="flex gap-3 w-full pt-2 mb-2 items-center ">
        <Link to="/about">
          <img className="w-14 py-2 self-center" alt="logo icon" src={logo} />
        </Link>
        <div className="">
          <h1 className="text-3xl font-semibold">League Account Manager</h1>
          <div> v0.7-alpha</div>
        </div>
        <div className="flex flex-row gap-2 ml-auto">
          <button
            type="button"
            aria-label='Toggle "Auto Login" feature'
            className={`rounded-md border border-gray-500 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-2 shadow-sm ml-auto self-center hover:bg-gray-100 transition${
              autoLoginActive
                ? ' dark:bg-green-700 bg-green-400'
                : 'dark:bg-zinc-800'
            }`}
            onClick={handleAutoLoginToggle}
          >
            <MdInput />
          </button>
          <button
            type="button"
            aria-label='Toggle "Dark Mode" feature'
            className="rounded-md border border-gray-500 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-2 shadow-sm ml-auto self-center hover:bg-gray-100 transition"
            onClick={switchDark}
          >
            <FiMoon />
          </button>
          <Link
            to="/register"
            className="rounded-md border border-gray-500 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-2 shadow-sm ml-auto self-center hover:bg-gray-100"
          >
            <BiPlus />
          </Link>
          <button
            type="button"
            aria-label="Refresh the page"
            className="rounded-md border border-gray-500 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-2 shadow-sm ml-auto self-center hover:bg-gray-100 transition"
            onClick={() => {
              handleRefresh();
              rotate();
            }}
          >
            <FiRefreshCcw
              className={
                isActive
                  ? 'rotate-0 transition-all duration-300'
                  : 'rotate-180 transition-none'
              }
            />
          </button>
        </div>
      </div>
    </div>
  );
}
