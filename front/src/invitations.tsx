import { Link } from "react-router-dom";
import {
  useAcceptInvite,
  useDeclineInvite,
  useGetMyInvites,
  useInvite,
} from "./api";

export default function Invitations() {
  const invites = useGetMyInvites();
  const invite = useInvite();

  function handleInvite(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    invite.mutate(email);
  }

  const accept = useAcceptInvite();
  const decline = useDeclineInvite();

  if (invites.isLoading) return <div>Loading...</div>;

  return (
    <div className="bg-violet-600 text-white min-h-screen grid place-content-center">
      <div>
        <h1 className="font-black text-3xl">Previet: Invitations</h1>
        <div className="py-10">
          {invites.data?.map((invite: any) => (
            <div
              key={invite.id}
              className="flex items-center space-x-5 justify-center py-2"
            >
              <h1>{invite.fullname}</h1>
              <button
                disabled={accept.isLoading}
                onClick={() => accept.mutate(invite.id)}
                className="bg-violet-500 text-white rounded-md p-2"
              >
                Accept
              </button>
              <button
                onClick={() => decline.mutate(invite.id)}
                disabled={decline.isLoading}
                className="bg-red-400 text-white rounded-md p-2"
              >
                Reject
              </button>
            </div>
          ))}

          <form
            onSubmit={handleInvite}
            className="flex items-center space-x-5 justify-center pt-20"
          >
            <input
              type="email"
              name="email"
              className="bg-white text-violet-500 p-1 rounded"
              placeholder="Type your friend's email here"
            />

            <button
              disabled={invite.isLoading}
              className="bg-violet-500 text-white rounded-md p-2"
            >
              Send Invitation
            </button>
          </form>
        </div>
        <div className="flex items-center space-x-5 justify-center py-10">
          <Link to="/chat">Chat</Link>
        </div>
      </div>
    </div>
  );
}
