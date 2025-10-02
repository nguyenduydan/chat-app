import { MessageCircleIcon } from "lucide-react";

const NoConversationPlaceholder = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <div className="size-20 bg-cyan-500/20 rounded-full flex items-center justify-center mb-6">
                <MessageCircleIcon className="size-10 text-cyan-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-200 mb-2">Chọn một cuộc trò chuyện</h3>
            <p className="text-slate-400 max-w-md">
                Chọn một liên hệ từ thanh bên trái để bắt đầu trò chuyện hoặc tiếp tục cuộc trò chuyện trước đó.
            </p>
        </div>
    );
};

export default NoConversationPlaceholder;
