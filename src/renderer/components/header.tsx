import { FiRefreshCcw } from 'react-icons/fi';
import { useState } from 'react';
import logo from '../../../assets/logo.png';

export default function Header({ ...props }) {
  const [isActive, setActive] = useState(false);
  function rotate() {
    setActive(true);
    setTimeout(() => {
      setActive(false);
    }, 300);
  }

  return (
    <div className="flex gap-3 w-full mt-2 mb-4 ">
      <img className="w-14 py-2 self-center" alt="logo icon" src={logo} />
      <h1 className="text-3xl my-4 flex flex-row items-center gap-2 font-semibold">
        League Accounts Manager
      </h1>
      <button
        type="button"
        className="rounded-md border border-gray-500 bg-white p-2 shadow-sm ml-auto self-center hover:bg-gray-100 transition"
        onClick={() => {
          props.handleRefresh();
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
  );
}
