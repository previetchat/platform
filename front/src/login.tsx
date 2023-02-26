import { Link } from "react-router-dom";
import { useLogin } from "./api";

export default function Login() {

    const { mutate, isLoading, error } = useLogin()

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);

        const data = {
            email: formData.get("email"),
            password: formData.get("password"),
        }

        mutate(data);
    }


  return (
    <div className="bg-violet-600 text-white min-h-screen grid place-content-center">
    <div >

    <h1 className="font-black text-3xl">Previet: Login</h1>
    <div className="py-10">

        <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-5 w-96 text-black">
                <div className="flex flex-col">
                    <label htmlFor="email" className="text-white">Email</label>
                    <input required type="email" name="email" id="email" className="border border-gray-300 rounded-md p-2" />
                </div>
                <div className="flex flex-col">

                    <label htmlFor="password" className="text-white">Password</label>
                    <input required type="password" name="password" id="password" className="border border-gray-300 rounded-md p-2" />
                </div>  
                <div>
                        {error ? <div className="text-white">{(error as any)?.response.data?.message}</div> : null}
                    </div>
                <button disabled={isLoading} type="submit" className="bg-violet-500 text-white rounded-md p-2">Login</button>
            </div>

        </form>
    </div>
    <div className="flex items-center space-x-5 justify-center py-10">
    <Link to="/">Home</Link>
    <Link to="/register">Register</Link>
    </div>
    </div>
  </div>
  );
}
