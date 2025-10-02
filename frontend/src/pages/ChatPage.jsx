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
        <div className="relative w-full max-w-6xl h-[80vh] md:h-[800px]">
            <BorderAnimatedContainer>
                {/* LEFT SIDE - Danh sách chat */}
                <div
                    className={`
                        w-full md:w-80
                        rounded-l-2xl
                        bg-slate-800/50
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
                <div
                    className={`
                        flex-1
                        rounded-r-2xl
                        md:rounded-r-2xl
                        rounded-l-2xl md:rounded-l-none
                        flex flex-col
                        bg-slate-900/50
                        backdrop-blur-sm
                        h-full
                        ${showChatList ? 'hidden md:flex' : 'flex'}
                    `}
                >
                    {selectedUser ? (
                        <>
                            <ChatContainer />
                        </>
                    ) : (
                        <NoConversationPlaceholder />
                    )}
                </div>
            </BorderAnimatedContainer>
        </div>
    );
}

export default ChatPage;
