import { Link } from 'react-router-dom';
import { MdOutlineArrowBackIos } from 'react-icons/md';
import { FormEvent } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Account } from 'interface/accounts.interface';

const InputField = ({
  label,
  placeholder,
  id,
  type,
}: {
  label: string;
  placeholder: string;
  id: string;
  type?: string | undefined;
}) => {
  return (
    <div>
      <label
        className="block text-gray-700 text-sm font-semibold mb-2"
        htmlFor={id}
      >
        {label}
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name={id}
          type={type ?? 'text'}
          placeholder={placeholder}
        />
      </label>
    </div>
  );
};

export default function About() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const formJSON = Object.fromEntries(formData.entries());
    const { summoner, username, password } = formJSON;
    if (!summoner || !username || !password) {
      toast.error('Please fill out all fields');
      return;
    }
    // regex test of summoner variable for name and tag with #
    if (!/.+#[A-Z0-9]+/.test(summoner as string)) {
      toast.error('Summoner name must be in the format of "Hide on Bush#KR"');
      return;
    }
    const acc: Account = {
      displayName: summoner.toString().split('#')[0],
      displayTag: `#${summoner.toString().split('#')[1]}`,
      username: username.toString(),
      password: password.toString(),
      server: 'euw',
    };
    window.electron.accountChangeHandler.sendMessage('acc:add', acc);

    window.location.href = '/';
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
        <div className="p-8">
          <div className="flex gap-6">
            <div>
              <InputField
                label="Summoner Name"
                id="summoner"
                placeholder="Hide on Bush#KR"
              />
            </div>
            <div>
              <InputField
                label="Username"
                id="username"
                placeholder="JohnDoe34"
              />
              <InputField
                label="Password"
                id="password"
                type="password"
                placeholder="******************"
              />
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
        </div>
      </form>
    </div>
  );
}
