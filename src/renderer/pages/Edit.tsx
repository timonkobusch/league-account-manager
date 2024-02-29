import { Link, useNavigate, useParams } from 'react-router-dom';
import { MdOutlineArrowBackIos } from 'react-icons/md';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Account } from 'interface/accounts.interface';
import { AiOutlineEdit } from 'react-icons/ai';

const Header = () => {
  return (
    <>
      <ToastContainer />
      <div className="flex items-center gap-2 mb-6">
        <Link to="/">
          <div className="flex justify-center items-center rounded-md border dark:border-zinc-700 dark:bg-zinc-800 border-gray-500 bg-white shadow-sm w-8 h-8 hover:bg-gray-100">
            <MdOutlineArrowBackIos />
          </div>
        </Link>
        <h1 className="font-semibold text-xl">Edit account</h1>
      </div>
    </>
  );
};

const InputField = ({
  label,
  id,
  type,
  value,
  onChange,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string | undefined;
}) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="w-2/4">
      <label
        className="block text-gray-700 dark:text-zinc-300 text-sm font-semibold mb-2 "
        htmlFor={id}
      >
        {label}
        <div>
          <input
            className="shadow appearance-none border rounded w-64 py-2 px-3 mr-4 text-gray-700 leading-tight dark:border-zinc-700 dark:bg-zinc-800 focus:outline-none focus:shadow-outline"
            name={id}
            onChange={onChange}
            style={{
              pointerEvents: isEditing ? 'auto' : 'none',
              color: isEditing ? 'black' : 'gray',
            }}
            type={type === 'password' && !isEditing ? 'password' : 'text'}
            value={value}
          />
          <AiOutlineEdit
            className="inline-block h-6 w-6 cursor-pointer hover:text-blue-500 transition duration-150 ease-in-out"
            onClick={() => setIsEditing(!isEditing)}
          />
        </div>
      </label>
    </div>
  );
};
// TODO add server selection
export default function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [account, setAccount] = useState({} as Account);
  const [formData, setFormData] = useState({
    summoner: '',
    password: '',
  });

  useEffect(() => {
    window.electron.accountLoadHandler.sendMessage('acc:load', id ?? '');
  }, [id]);

  let accountSetOnce = false;
  const handleReload = (accs: Account[]) => {
    if (!accountSetOnce) {
      setAccount(accs[0]);
      setFormData({
        summoner: `${accs[0].displayName}${accs[0].displayTag}`,
        password: accs[0].password, // Keep password empty initially
      });
      accountSetOnce = true;
    }
  };

  window.electron.accountLoadHandler.once('acc:load', handleReload);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { summoner, password } = formData;
    if (!summoner || !password) {
      toast.error('Please fill out all fields');
      return;
    }
    // regex test of summoner variable for name and tag with #
    if (!/.+#[A-Z0-9]+/.test(summoner as string)) {
      toast.error('Summoner name must be in the format of "Hide on Bush#KR"');
      return;
    }
    const acc: Account = {
      username: account.username,
      displayName: summoner.toString().split('#')[0],
      displayTag: `#${summoner.toString().split('#')[1]}`,
      password: password.toString(),
      server: 'euw',
    };

    window.electron.accountChangeHandler.sendMessage('acc:edit', acc);
    navigate('/');
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="p-4 dark:bg-zinc-900 dark:text-zinc-300 min-h-screen ">
      <Header />
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex flex-col p-8 gap-4">
          <div>
            <div>Username</div>
            <div className="font-bold mb-2 text-lg">{account.username}</div>
          </div>
          <InputField
            label="Summoner Name"
            id="summoner"
            value={formData.summoner}
            onChange={handleChange}
          />

          <InputField
            label="Password"
            id="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            className="w-48 bg-blue-500 hover:bg-blue-700 dark:bg-blue-900 dark:hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
