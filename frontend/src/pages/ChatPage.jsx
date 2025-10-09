import ActiveTabSwitch from "components/ActiveTabSwitch";
import BorderAnimatedContainer from "components/BorderAnimatedContainer";
import ChatContainer from "components/ChatContainer";
import ChatsList from "components/ChatsList";
import ContactList from "components/ContactList";
import NoConversationPlaceholder from "components/NoConversationPlaceholder";
import ProfileHeader from "components/ProfileHeader";
import { useChatStore } from "store/useChatStore";

function ChatPage() {
    const { activeTab, selectedUser } = useChatStore();

    // Xác định xem có đang ở mobile view không
    const showChatList = !selectedUser;
    const showChatContainer = selectedUser;

    return (
        <div className="relative w-full max-w-6xl h-[90vh] md:h-[800px]">
            <div className="flex w-full h-full rounded-xl">
                {/* LEFT SIDE - Danh sách chat */}
                <div
                    className={`
                        w-full md:w-80
                        rounded-2xl
                        md:rounded-none
                        md:rounded-l-2xl
                        md:rounded-tl-2xl
                        bg-slate-800/80
                        backdrop-blur-sm
                        flex flex-col
                        h-full
                        ${showChatContainer ? 'hidden md:flex' : 'flex'}
                    `}
                >
                    <ProfileHeader />
                    <ActiveTabSwitch />

                    <div className="flex-1 overflow-y-auto px-4 space-y-2 pb-4">
                        {activeTab === "chats" ? <ChatsList /> : <ContactList />}
                    </div>
                </div>

                {/* RIGHT SIDE - Khung chat */}
                <div className={`
                        flex-1
                        flex flex-col
                        bg-slate-900 md:bg-slate-900/80
                        backdrop-blur-sm md:backdrop-blur-sm
                        h-full
                        transition-all duration-300
                        ${showChatList ? "hidden md:flex" : "flex"}
                        rounded-none md:rounded-none md:rounded-r-2xl
                    `}
                >
                    {selectedUser ? (
                        <ChatContainer />
                    ) : (
                        <NoConversationPlaceholder />
                    )}
                </div>

            </div>
        </div>
    );
}

export default ChatPage;
