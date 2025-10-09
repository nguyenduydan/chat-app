import { useRef, useState } from "react";
import useKeyboardSound from "hooks/useKeyBoardSound";
import { useChatStore } from "store/useChatStore";
import toast from "react-hot-toast";
import { ImageIcon, SendIcon, XIcon, SmileIcon } from "lucide-react";
import EmojiPicker from "emoji-picker-react";

const sendSound = new Audio("/sounds/send.mp3");

function MessageInput() {
    const { playRandomKeyStrokeSound } = useKeyboardSound();
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const fileInputRef = useRef(null);

    const { sendMessage, isSoundEnabled } = useChatStore();

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!text.trim() && !imagePreview) return;
        if (isSoundEnabled) sendSound.play().catch((error) => console.log("Audio play failed:", error));

        sendMessage({
            text: text.trim(),
            image: imagePreview,
        });
        setText("");
        setImagePreview("");
        if (fileInputRef.current) fileInputRef.current.value = "";
        setShowEmojiPicker(false); // đóng picker khi gửi
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleEmojiClick = (emojiData) => {
        setText((prev) => prev + emojiData.emoji);
    };

    return (
        <div className="p-4 border-t border-slate-700/50 relative">
            {/* IMAGE PREVIEW */}
            {imagePreview && (
                <div className="max-w-3xl mx-auto mb-3 flex items-center">
                    <div className="relative">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-20 h-20 object-cover rounded-lg border border-slate-700"
                        />
                        <button
                            onClick={removeImage}
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-200 hover:bg-slate-700"
                            type="button"
                        >
                            <XIcon className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

            <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto flex space-x-2 items-center">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => {
                        setText(e.target.value);
                        isSoundEnabled && playRandomKeyStrokeSound();
                    }}
                    className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-full py-2 px-4 text-white focus:outline-none"
                    placeholder="Aa"
                />

                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                />

                {/* EMOJI BUTTON */}
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setShowEmojiPicker((prev) => !prev)}
                        className="btn btn-circle btn-ghost text-slate-400 hover:text-slate-200 p-3 transition-colors"
                    >
                        <SmileIcon className="w-5 h-5" />
                    </button>

                    {showEmojiPicker && (
                        <div className="absolute bottom-12 right-0 z-50">
                            <EmojiPicker
                                onEmojiClick={handleEmojiClick}
                                theme="dark"
                                width={300}
                                height={380}
                            />
                        </div>
                    )}
                </div>

                {/* IMAGE BUTTON */}
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className={`btn btn-circle btn-ghost text-slate-400 hover:text-slate-200 p-3 transition-colors ${imagePreview ? "text-cyan-500" : ""}`}
                >
                    <ImageIcon className="w-5 h-5" />
                </button>

                {/* SEND BUTTON */}
                <button
                    type="submit"
                    disabled={!text.trim() && !imagePreview}
                    className="send-btn disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <SendIcon className="w-5 h-5 text-cyan-300" />
                </button>
            </form>
        </div>
    );
}

export default MessageInput;
