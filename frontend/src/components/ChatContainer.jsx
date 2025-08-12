import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "../components/ChatHeader";
import MessageInput from "../components/MessageInput";
import MessageSkeleton from "./skeleton/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto bg-gradient-to-b from-white to-blue-200">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-gradient-to-b from-white to-blue-200">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-10 space-y-4">
        {messages.map((message, idx) => {
          const isCurrentUser = message.senderId._id === authUser._id;
          return (
            <div
              key={message._id}
              className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
              ref={idx === messages.length - 1 ? messageEndRef : null}
            >
              <div
                className={`flex flex-col max-w-[75%] ${
                  isCurrentUser ? "items-end" : "items-start"
                }`}
              >
                <div className="flex items-center mb-1 gap-2">
                  <div className="size-8 rounded-full border overflow-hidden">
                    <img
                      src={
                        isCurrentUser
                          ? authUser.profilePic || "/avatar.png"
                          : message.senderId.profilePic || "/avatar.png"
                      }
                      alt="profile pic"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <span
                    className={`font-bold text-l ${
                      isCurrentUser ? "text-blue-600" : "text-gray-800"
                    }`}
                  >
                    {isCurrentUser
                      ? authUser.fullName
                      : message.senderId.fullName}
                  </span>
                </div>
                <div
                  className={`chat-bubble flex flex-col px-4 py-2 rounded-lg shadow-md ${
                    isCurrentUser
                      ? "bg-blue-300 text-white text-l rounded-br-none"
                      : "bg-gray-200 text-gray-900 text- rounded-bl-none"
                  }`}
                >
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="sm:max-w-[200px] rounded-md mb-2"
                    />
                  )}
                  {message.text && <p>{message.text}</p>}
                </div>
                <span className="text-s text-gray-200 mt-1">
                  {formatMessageTime(message.createdAt)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
