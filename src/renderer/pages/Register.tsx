import { Link } from 'react-router-dom';
import { MdOutlineArrowBackIos } from 'react-icons/md';
import { FormEvent, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const serverList = [
  'EUW',
  'NA',
  'EUNE',
  'KR',
  'JP',
  'OCE',
  'BR',
  'TR',
  'RU',
  'LAN',
  'LAS',
];

export default function About() {
  const [open, setOpen] = useState(false);
  const [server, setServer] = useState('Server');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const formJSON = Object.fromEntries(formData.entries());
    const { summoner, username, password } = formJSON;
    if (!summoner || !username || !password || server === 'Server') {
      toast.error('Please fill out all fields');
      return;
    }

    window.electron.textHandler.sendMessage(
      'acc:add',
      summoner.toString(),
      username.toString(),
      password.toString(),
      server
    );
    window.location.href = '/home/';
  };

  return (
    <div className="p-4">
      <ToastContainer />
      <div className="flex items-center gap-2 mb-6">
        <Link to="/">
          <div className="flex justify-center items-center rounded-md border border-gray-500 bg-white shadow-sm w-8 h-8 hover:bg-gray-100">
            <MdOutlineArrowBackIos />
          </div>
        </Link>
        <h1 className="font-semibold text-xl">Add account</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex gap-6">
          <div>
            <div>
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="username"
              >
                Summoner Name
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="summoner"
                  type="text"
                  placeholder="Summoner Name"
                />
              </label>
            </div>
            <div>
              <p className="text-gray-700 text-sm font-semibold">Server</p>
              <button
                className="border bg-white border-gray-700 hover:bg-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                type="button"
                onClick={() => setOpen(!open)}
              >
                {server}{' '}
                <svg
                  className="w-2.5 h-2.5 ml-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {open && (
                <div className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow">
                  <ul
                    className="grid grid-cols-3 p-2 text-sm text-gray-600 font-semibold"
                    aria-labelledby="dropdownDefaultButton"
                  >
                    {serverList.map((s) => (
                      <div key={s}>
                        <button
                          type="button"
                          className="block px-4 py-2 hover:bg-gray-100 "
                          onClick={() => {
                            setServer(s);
                            setOpen(false);
                          }}
                        >
                          {s}
                        </button>
                      </div>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div>
            <div>
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="username"
              >
                Username
                <span className="text-gray-400 ml-2 italic">Login</span>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="username"
                  type="text"
                  placeholder="Username"
                />
              </label>
            </div>
            <div className="mt-4">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="password"
              >
                Password
                <span className="text-gray-400 ml-2 italic">Login</span>
                <input
                  className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  name="password"
                  type="password"
                  placeholder="******************"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-8">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Register Account
          </button>
        </div>
      </form>
    </div>
  );
}
