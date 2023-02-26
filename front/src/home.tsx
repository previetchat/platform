import { Link } from "react-router-dom";

export default function Home() {
    return (
      <div className="bg-violet-600 text-white min-h-screen grid place-content-center">
        <div >

        <h1 className="font-black text-3xl">Previet: Home</h1>
        <div className="flex items-center space-x-5 justify-center py-10">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        </div>
        </div>
      </div>
    );
  }
  