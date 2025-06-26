import React, { useState } from "react";

export default function AiChat() {
  const [inputValue, setInputValue] = useState("");
  const [isDark, setIsDark] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

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
      // Try different common API endpoints
      const endpoints = [
        "/api/chat",
        "/chat",
        "/api/message",
        "/message",
        "/api/query",
        "/query",
      ];

      let response = null;
      let responseData = null;

      for (const endpoint of endpoints) {
        try {
          response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              message: userMessage,
              query: userMessage,
              text: userMessage,
              input: userMessage,
            }),
          });

          if (response.ok) {
            responseData = await response.json();
            break;
          }
        } catch (err) {
          console.log(`Endpoint ${endpoint} failed:`, err);
          continue;
        }
      }

      if (responseData) {
        // Handle different response formats
        let botResponse = "";
        if (responseData.response) {
          botResponse = responseData.response;
        } else if (responseData.message) {
          botResponse = responseData.message;
        } else if (responseData.result) {
          botResponse = responseData.result;
        } else if (responseData.data) {
          botResponse =
            typeof responseData.data === "string"
              ? responseData.data
              : JSON.stringify(responseData.data);
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
        throw new Error("No valid endpoint found");
      }
    } catch (error) {
      console.error("API Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          type: "error",
          content:
            "Sorry, I encountered an error while processing your request. The API might be unavailable or the endpoints might have changed.",
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

  const handleLogout = () => {
    // Clear any stored user data
    localStorage.removeItem("authToken");
    localStorage.removeItem("userSession");
    localStorage.removeItem("chatHistory");

    // Clear session storage
    sessionStorage.clear();

    // Reset component state
    setMessages([]);
    setInputValue("");
    setIsDark(false);
    setIsLoading(false);
    setShowLogoutModal(false);

    // Redirect to login page or home page
    // If using React Router:
    // navigate('/login');

    // If using plain JavaScript:
    window.location.href = "/login";

    // Or reload the page to clear everything
    // window.location.reload();
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div
      className={`min-h-screen flex ${isDark ? "bg-gray-900" : "bg-gray-50"}`}
    >
      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`${
              isDark ? "bg-gray-800" : "bg-white"
            } rounded-lg p-6 max-w-md w-mx-4`}
          >
            <h3
              className={`text-lg font-semibold mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Confirm Logout
            </h3>
            <p className={`mb-6 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              Are you sure you want to logout? Your current chat session will be
              lost.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowLogoutModal(false)}
                className={`px-4 py-2 rounded-md ${
                  isDark
                    ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                } transition-colors`}
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

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
          <div
            className="flex items-center gap-2 text-red-500 cursor-pointer hover:text-red-600 transition-colors"
            onClick={() => setShowLogoutModal(true)}
          >
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
