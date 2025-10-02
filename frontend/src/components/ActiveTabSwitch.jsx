import { useChatStore } from "store/useChatStore";

function ActiveTabSwitch() {
    const { activeTab, setActiveTab } = useChatStore();

    return (
        <div className="tabs tabs-boxed bg-transparent p-2 m-2 space-x-2">
            <button
                onClick={() => setActiveTab("chats")}
                className={`tab transition-all duration-200 ease-in-out
                        ${activeTab === "chats"
                        ? "bg-cyan-500/20 text-cyan-400 font-bold scale-105 shadow-md"
                        : "text-slate-400 hover:text-cyan-300 hover:bg-cyan-500/10"
                    }`}
            >
                Chats
            </button>

            <button
                onClick={() => setActiveTab("contacts")}
                className={`tab transition-all duration-200 ease-in-out
                        ${activeTab === "contacts"
                        ? "bg-cyan-500/20 text-cyan-400 font-bold scale-105 shadow-md"
                        : "text-slate-400 hover:text-cyan-300 hover:bg-cyan-500/10"
                    }`}
            >
                Contacts
            </button>
        </div>
    );
}
export default ActiveTabSwitch;
