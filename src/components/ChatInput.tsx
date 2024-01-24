import { FormEvent, useState } from "react";
import { MdSend } from "react-icons/md";

type ChatInputProps = {
  onSendMessage: (message: string) => void;
};

const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSendMessage(message);
    setMessage("");
  };

  return (
    <form
      className="mt-8 border border-white rounded-md flex justify-between"
      onSubmit={handleSubmit}
    >
      <input
        className="p-3 w-full rounded-md bg-[#343a40] text-white placeholder-gray-500 focus:outline-none focus:border-white focus:ring-0"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
      />
      <button className="flex items-center justify-center bg-[#343a40] text-white rounded-md border-l border-gray-500" type="submit">
        <MdSend className="text-3xl mx-2 p-1" />
      </button>
    </form>
  );
};

export default ChatInput;
