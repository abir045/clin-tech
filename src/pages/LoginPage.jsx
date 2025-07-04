import React, { useState } from "react";

export default function ALIApiInterface() {
  const [inputValue, setInputValue] = useState("");
  const [isDark, setIsDark] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const API_BASE_URL = "https://alibackend.duckdns.org";

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    setInputValue("");
    setIsLoading(true);

    // Add user message to chat
    setMessages((prev) => [
      ...prev,
      { type: "user", content: userMessage, timestamp: new Date() },
    ]);

    try {
      // Try different common API endpoints with various HTTP methods
      const endpoints = [
        // Standard REST endpoints
        { path: "/api/chat", method: "POST" },
        { path: "/api/v1/chat", method: "POST" },
        { path: "/chat", method: "POST" },
        { path: "/api/message", method: "POST" },
        { path: "/api/messages", method: "POST" },
        { path: "/message", method: "POST" },
        { path: "/messages", method: "POST" },
        { path: "/api/query", method: "POST" },
        { path: "/query", method: "POST" },
        { path: "/api/send", method: "POST" },
        { path: "/send", method: "POST" },
        { path: "/api/completion", method: "POST" },
        { path: "/completion", method: "POST" },
        { path: "/api/generate", method: "POST" },
        { path: "/generate", method: "POST" },
        // Try GET endpoints as well
        { path: "/api/chat", method: "GET" },
        { path: "/chat", method: "GET" },
        { path: "/api/status", method: "GET" },
        { path: "/status", method: "GET" },
        { path: "/health", method: "GET" },
        { path: "/", method: "GET" },
      ];

      let response = null;
      let responseData = null;
      let workingEndpoint = null;

      // First, try to check if the server is accessible
      try {
        const healthCheck = await fetch(API_BASE_URL, {
          method: "GET",
          mode: "cors",
          timeout: 5000,
        });
        console.log("Server accessible:", healthCheck.status);
      } catch (err) {
        console.log("Server may not be accessible:", err);
      }

      for (const endpoint of endpoints) {
        try {
          const requestOptions = {
            method: endpoint.method,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            mode: "cors",
            timeout: 10000,
          };

          // Only add body for POST requests
          if (endpoint.method === "POST") {
            requestOptions.body = JSON.stringify({
              message: userMessage,
              query: userMessage,
              text: userMessage,
              input: userMessage,
              prompt: userMessage,
              content: userMessage,
              data: userMessage,
            });
          }

          console.log(
            `Trying ${endpoint.method} ${API_BASE_URL}${endpoint.path}`
          );

          response = await fetch(
            `${API_BASE_URL}${endpoint.path}`,
            requestOptions
          );

          console.log(`Response status: ${response.status}`);

          if (response.ok) {
            try {
              responseData = await response.json();
              workingEndpoint = endpoint;
              console.log(
                "Success with endpoint:",
                endpoint,
                "Response:",
                responseData
              );
              break;
            } catch (jsonErr) {
              // Try to get text response
              const textResponse = await response.text();
              if (textResponse) {
                responseData = { message: textResponse };
                workingEndpoint = endpoint;
                break;
              }
            }
          } else if (response.status === 404) {
            console.log(`404 - Endpoint ${endpoint.path} not found`);
          } else if (response.status === 405) {
            console.log(
              `405 - Method ${endpoint.method} not allowed for ${endpoint.path}`
            );
          } else {
            console.log(`Error ${response.status} for ${endpoint.path}`);
          }
        } catch (err) {
          console.log(
            `Endpoint ${endpoint.path} (${endpoint.method}) failed:`,
            err.message
          );
          continue;
        }
      }

      if (responseData && workingEndpoint) {
        // Handle different response formats
        let botResponse = "";
        if (typeof responseData === "string") {
          botResponse = responseData;
        } else if (responseData.response) {
          botResponse = responseData.response;
        } else if (responseData.message) {
          botResponse = responseData.message;
        } else if (responseData.result) {
          botResponse = responseData.result;
        } else if (responseData.content) {
          botResponse = responseData.content;
        } else if (responseData.data) {
          botResponse =
            typeof responseData.data === "string"
              ? responseData.data
              : JSON.stringify(responseData.data);
        } else if (responseData.text) {
          botResponse = responseData.text;
        } else {
          botResponse = JSON.stringify(responseData);
        }

        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            content: botResponse,
            timestamp: new Date(),
          },
        ]);
      } else {
        // Provide more specific error information
        const errorMsg = `Unable to connect to ALI API at ${API_BASE_URL}. 

Possible issues:
• Server might be down or unreachable
• CORS (Cross-Origin) restrictions
• API endpoints may have different paths
• Authentication might be required

Check the browser console for detailed error logs.`;

        setMessages((prev) => [
          ...prev,
          {
            type: "error",
            content: errorMsg,
            timestamp: new Date(),
          },
        ]);
      }
    } catch (error) {
      console.error("API Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          type: "error",
          content: `Connection failed: ${error.message}. Please check if the API server is running and accessible.`,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleNewChat = () => {
    setMessages([]);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div
      className={`min-h-screen flex ${isDark ? "bg-gray-900" : "bg-gray-50"}`}
    >
      {/* Sidebar */}
      <div
        className={`w-60 ${
          isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        } border-r flex flex-col`}
      >
        <div className="p-4">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-lg">
              🤖
            </div>
            <span
              className={`font-medium ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              ALI
            </span>
          </div>

          {/* New Chat Button */}
          <button
            onClick={handleNewChat}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-3 px-4 text-sm font-medium mb-6 transition-colors"
          >
            + New Chat
          </button>

          {/* Navigation Items */}
          <div className="space-y-2">
            <div
              className={`flex items-center justify-between py-3 ${
                isDark
                  ? "text-gray-300 hover:text-blue-400"
                  : "text-gray-600 hover:text-blue-600"
              } cursor-pointer transition-colors`}
            >
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 flex items-center justify-center">
                  💡
                </span>
                <span className="text-sm">Light</span>
              </div>
              <div className="bg-blue-100 rounded-full p-1">
                <button
                  onClick={() => setIsDark(!isDark)}
                  className="bg-white rounded-full px-3 py-1 text-xs text-blue-600 font-medium"
                >
                  ✕
                </button>
              </div>
            </div>

            <div
              className={`flex items-center gap-3 py-3 ${
                isDark
                  ? "text-gray-300 hover:text-blue-400"
                  : "text-gray-600 hover:text-blue-600"
              } cursor-pointer transition-colors`}
            >
              <span className="w-5 h-5 flex items-center justify-center">
                ⚡
              </span>
              <span className="text-sm">Manage Subscript...</span>
            </div>

            <div
              className={`flex items-center gap-3 py-3 ${
                isDark
                  ? "text-gray-300 hover:text-blue-400"
                  : "text-gray-600 hover:text-blue-600"
              } cursor-pointer transition-colors`}
            >
              <span className="w-5 h-5 flex items-center justify-center">
                👥
              </span>
              <span className="text-sm">Users</span>
            </div>

            <div
              className={`flex items-center gap-3 py-3 ${
                isDark
                  ? "text-gray-300 hover:text-blue-400"
                  : "text-gray-600 hover:text-blue-600"
              } cursor-pointer transition-colors`}
            >
              <span className="w-5 h-5 flex items-center justify-center">
                🔗
              </span>
              <span className="text-sm">Help And Support</span>
            </div>

            <div
              className={`flex items-center gap-3 py-3 ${
                isDark
                  ? "text-gray-300 hover:text-blue-400"
                  : "text-gray-600 hover:text-blue-600"
              } cursor-pointer transition-colors`}
            >
              <span className="w-5 h-5 flex items-center justify-center">
                ❓
              </span>
              <span className="text-sm">FAQ</span>
            </div>
          </div>
        </div>

        {/* Logout */}
        <div className="mt-auto p-4">
          <div className="flex items-center gap-2 text-red-500 cursor-pointer hover:text-red-600 transition-colors">
            <span>▶</span>
            <span className="text-sm">Logout</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div
          className={`${
            isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          } border-b px-6 py-4 flex items-center justify-between`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 ${
                isDark ? "bg-gray-700" : "bg-gray-100"
              } rounded-full flex items-center justify-center`}
            >
              <span className="text-sm">👤</span>
            </div>
            <div>
              <h3
                className={`font-medium ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Guest
              </h3>
              <p
                className={`text-xs ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Welcome back
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
              Chartwright
            </button>
            <button
              className={`${
                isDark
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-200 border-gray-600"
                  : "bg-white hover:bg-gray-50 text-gray-700 border-gray-300"
              } border px-4 py-2 rounded-md text-sm transition-colors`}
            >
              TranscriptX
            </button>
            <button
              className={`${
                isDark
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-200 border-gray-600"
                  : "bg-white hover:bg-gray-50 text-gray-700 border-gray-300"
              } border px-4 py-2 rounded-md text-sm transition-colors`}
            >
              Redactify
            </button>
            <button
              className={`${
                isDark
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-200 border-gray-600"
                  : "bg-white hover:bg-gray-50 text-gray-700 border-gray-300"
              } border px-4 py-2 rounded-md text-sm transition-colors`}
            >
              Validity
            </button>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center max-w-2xl">
                <h1 className="text-5xl font-light text-blue-500 mb-2">
                  Hello,
                </h1>
                <p
                  className={`text-2xl ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  How Can I Help You Today
                </p>
              </div>
            </div>
          ) : (
            <div className="p-6 space-y-4 max-w-4xl mx-auto">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-3xl rounded-lg p-4 ${
                      message.type === "user"
                        ? "bg-blue-500 text-white ml-12"
                        : message.type === "error"
                        ? `${
                            isDark
                              ? "bg-red-900 text-red-200"
                              : "bg-red-100 text-red-800"
                          } mr-12`
                        : `${
                            isDark
                              ? "bg-gray-700 text-gray-100"
                              : "bg-gray-100 text-gray-900"
                          } mr-12`
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    <div className={`text-xs mt-2 opacity-70`}>
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div
                    className={`max-w-3xl rounded-lg p-4 mr-12 ${
                      isDark
                        ? "bg-gray-700 text-gray-100"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="animate-pulse">●</div>
                      <div
                        className="animate-pulse"
                        style={{ animationDelay: "0.2s" }}
                      >
                        ●
                      </div>
                      <div
                        className="animate-pulse"
                        style={{ animationDelay: "0.4s" }}
                      >
                        ●
                      </div>
                      <span className="ml-2">ALI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Input Area */}
        <div
          className={`${
            isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          } border-t px-6 py-4`}
        >
          <div className="flex items-center gap-3 max-w-4xl mx-auto">
            <button
              className={`${
                isDark
                  ? "text-gray-400 hover:text-gray-300"
                  : "text-gray-500 hover:text-gray-600"
              } transition-colors`}
            >
              📎
            </button>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              placeholder={
                isLoading
                  ? "ALI is responding..."
                  : "Type your message (Shift + Enter for new line)"
              }
              className={`flex-1 ${
                isDark
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              } border rounded-full px-5 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-50`}
            />
            <button
              className={`${
                isDark
                  ? "text-gray-400 hover:text-gray-300"
                  : "text-gray-500 hover:text-gray-600"
              } transition-colors`}
            >
              🎤
            </button>
            <button
              onClick={sendMessage}
              disabled={isLoading || !inputValue.trim()}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
            >
              {isLoading ? "⏳" : "▶"}
            </button>
          </div>
        </div>
      </div>

      {/* Time Button */}
      <button className="fixed top-5 right-5 bg-blue-500 hover:bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors">
        🕐
      </button>
    </div>
  );
}
