import { Link } from "react-router-dom";
import { useGetMyFriends } from "./api";

export default function Friends() {
  const friends = [
    {
      id: 1,
      fullname: "John Doe",
    },
    {
      id: 2,
      fullname: "Jane Doe",
    },
  ];

  const _friends = useGetMyFriends()

  if (_friends.isLoading) {
    return <div>Loading...</div>
  }


  return (
    <div className="bg-violet-600 text-white min-h-screen grid place-content-center">
      <div>
        <h1 className="font-black text-3xl">Previet: Friends</h1>
        <div className="py-10">
          {_friends.data?.map((friend: any) => (
            <div
              key={friend.id}
              className="flex items-center space-x-5 justify-center py-2"
            >
              <h1>{friend.fullname}</h1>
              <Link to={`/chat/${friend.id}`} className="bg-violet-500 text-white rounded-md p-2">
                go to chat
              </Link>
            </div>
          ))}
        </div>
        <div className="flex items-center space-x-5 justify-center py-10">
          <Link to="/invites">Invitations</Link>
        </div>
      </div>
    </div>
  );
}
