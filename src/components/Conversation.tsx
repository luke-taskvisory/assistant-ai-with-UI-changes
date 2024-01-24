import React, { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import { FaUser, FaRobot } from 'react-icons/fa';

type Message = {
  role: string;
  content: string;
};

type ConversationProps = {
  conversationId: string;
};

const Conversation: React.FC<ConversationProps> = ({ conversationId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<null | HTMLDivElement>(null); // Create a ref

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setLoading(true);
    fetch(`https://taskvisory-ai-assistants.azurewebsites.net/api/assistant/conversation/${conversationId}`)
      .then((response) => response.json())
      .then((data) => {
        setMessages(data.Thread.messages as Message[]);
        setLoading(false);
        scrollToBottom(); // Scroll to bottom after messages are loaded
      })
      .catch((error) => {
        console.error("Error fetching conversation:", error);
        setLoading(false);
      });
  }, [conversationId]); // Dependency array ensures useEffect is called when conversationId changes

  const handleSendMessage = (userMessage: string) => {
    const newMessage = { role: "User", content: userMessage };
    setMessages(prevMessages => [...prevMessages, newMessage]);

    fetch(`https://taskvisory-ai-assistants.azurewebsites.net/api/assistant/conversation/${conversationId}`, {
      method: "POST",
      body: JSON.stringify({ user_message: userMessage }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => response.json())
      .then(data => {
        setMessages(prevMessages => [...prevMessages, { role: "assistant", content: data.Response }]);
        scrollToBottom(); // Scroll to bottom after new message is sent
      })
      .catch(error => console.error("Error sending message:", error));
  };

  if (loading) return <div>Loading conversation...</div>;

  return (
    <div className="flex flex-col h-full">
      <div className="overflow-auto flex-grow"> {/* Messages area */}
        {messages.map((message, index) => (
          <div key={index} className="my-2 p-3 rounded-md bg-[#343a40] text-white">
            <div className="flex flex-col">
              <div className="flex items-center mb-1">
                {message.role === "assistant" ? (
                  <FaRobot className="mr-2" />
                ) : (
                  <FaUser className="mr-2" />
                )}
                <strong>{message.role === "assistant" ? "AI" : "You"}</strong>
              </div>
              <p>{message.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* Empty div for scrolling into view */}
      </div>
      <div className="sticky bottom-16"> {/* Chat input area */}
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default Conversation;
