import { Link, useParams } from "react-router-dom";
import { useGetMessages, useGetUserById, useSendMessage } from "./api";

export default function Chat() {
  const { id } = useParams();
  const { isLoading, mutate } = useSendMessage();

  const _messages = useGetMessages();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      message: formData.get("message"),
    };

    mutate({
      ...data,
      to: Number(id),
    });

    form.reset();
  };


  
  const friend = useGetUserById()

  if (_messages.isLoading || friend.isLoading) {
    return <div>Loading...</div>;
  }


  

  return (
    <div className="bg-violet-600 text-white min-h-screen grid place-content-center">
      <div>
        <h1 className="font-black text-3xl">Previet: Chat with {friend.data.fullname}</h1>
        <div className="py-10 flex flex-col w-96">
          {_messages.data?.map((message: {
            id: number;
            from: { id: number; }
            message: string;
            to: { id: number; }
          }) => (
            <div
              key={message.id}
              className={`flex py-2 w-full ${
                message.from.id !== Number(id) ? "justify-end" : "justify-start"
              } `}
            >
              <h1 className={`bg-white text-violet-500 p-1 rounded`}>
                {message.message}
              </h1>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex items-center space-x-5">
          <input
            type="text"
            className="bg-white text-violet-500 p-1 rounded"
            placeholder="Type your message here"
            name="message"
          />
          <button
            disabled={isLoading}
            className="bg-violet-500 text-white rounded-md p-2"
          >
            Send
          </button>
        </form>
        <div className="flex items-center space-x-5 justify-center py-10">
          <Link to="/invites">Invites</Link>
          <Link to="/chat">Friends</Link>
        </div>
      </div>
    </div>
  );
}
