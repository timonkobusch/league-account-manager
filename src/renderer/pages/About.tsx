import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="p-4">
      <div className="flex items-center gap-4 mb-4">
        <Link to="/">
          <button
            type="button"
            className="border border-gray-400 rounded-md p-2"
          >
            Back
          </button>
        </Link>
        <h1 className="text-2xl font-bold">About</h1>
      </div>
      <p>Made by Timon Kobusch</p>
      <p>2024</p>
    </div>
  );
}
