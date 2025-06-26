import React, { useEffect, useState } from "react";

const ChatListFetcher = () => {
  const [chats, setChats] = useState([]);
  const [error, setError] = useState(null);

  // Replace with your actual Bearer token
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzUxNzAyMDE0LCJpYXQiOjE3NTA4MzgwMTQsImp0aSI6ImJhN2ViOTAzZjcxNzQ5M2FhMGViNzFhNzI0YzI4ZDgxIiwidXNlcl9pZCI6NDB9.2xm0qRO4Nl7K5dPzodjorOf9R5MKM4KX4ALMii7KQZk";

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await fetch(
          "https://alibackend.duckdns.org/chat/get_users_chat_list/",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }

        const data = await res.json();
        console.log(data);
        setChats(data.messages); // assuming data is an array of chat items
      } catch (err) {
        setError(err.message);
        console.error("Fetch error:", err);
      }
    };

    fetchChats();
  }, []);

  return (
    <div className="p-4 bg-slate-900 text-white">
      <h2 className="text-xl font-bold mb-4">Chat List</h2>

      {error && <p className="text-red-400">Error: {error}</p>}

      {chats.length === 0 && !error && <p>Loading or no chats found...</p>}

      <ul className="list-disc pl-6">
        {chats.map((chat, index) => (
          <li key={index}>
            {typeof chat === "string" ? chat : JSON.stringify(chat)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatListFetcher;
