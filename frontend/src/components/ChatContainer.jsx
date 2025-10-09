import { useEffect, useRef } from "react";
import { useAuthStore } from "store/useAuthStore";
import { useChatStore } from "store/useChatStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";

function ChatContainer() {
    const {
        selectedUser,
        getMessagesByUserId,
        messages,
        isMessagesLoading,
        subscribeToMessages,
        unsubscribeFromMessages,
    } = useChatStore();

    const { authUser } = useAuthStore();
    const messageEndRef = useRef(null);

    useEffect(() => {
        getMessagesByUserId(selectedUser._id);
        subscribeToMessages();
        return () => unsubscribeFromMessages();
    }, [selectedUser, getMessagesByUserId, subscribeToMessages, unsubscribeFromMessages]);

    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <div className="flex flex-col h-full bg-slate-900 rounded-2xl md:rounded-none">
            {/* Header cố định trên cùng */}
            <ChatHeader />

            {/* Khu vực chat messages */}
            <div
                className="
                    flex-1
                    overflow-y-auto
                    px-3 sm:px-6
                    py-4 sm:py-8
                    scrollbar-thin
                    scrollbar-thumb-slate-700
                    scrollbar-track-transparent
                "
            >
                {messages.length > 0 && !isMessagesLoading ? (
                    <div className="max-w-3xl mx-auto space-y-3">
                        {messages.map((msg) => (
                            <div
                                key={msg._id}
                                className={`chat ${msg.senderId === authUser._id ? "chat-end" : "chat-start"}`}
                            >
                                <div
                                    className={`chat-bubble relative text-sm sm:text-base ${msg.senderId === authUser._id
                                        ? "bg-cyan-600 text-white"
                                        : "bg-slate-800 text-slate-200"
                                        }`}
                                >
                                    {msg.image && (
                                        <img
                                            src={msg.image}
                                            alt="Shared"
                                            className="rounded-lg w-full sm:w-auto max-h-60 object-cover mb-1"
                                        />
                                    )}
                                    {msg.text && (
                                        <p className="text-wrap break-words whitespace-pre-wrap">
                                            {msg.text}
                                        </p>
                                    )}
                                    <time className="text-[10px] sm:text-xs mt-1 opacity-75 flex items-center gap-1">
                                        {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </time>
                                </div>
                            </div>
                        ))}
                        <div ref={messageEndRef} />
                    </div>
                ) : isMessagesLoading ? (
                    <MessagesLoadingSkeleton />
                ) : (
                    <NoChatHistoryPlaceholder name={selectedUser.fullName} />
                )}
            </div>
            <MessageInput />
        </div>
    );
}

export default ChatContainer;
