import { useState, useRef } from "react";
import { LogOutIcon, VolumeOffIcon, Volume2Icon } from "lucide-react";
import { useAuthStore } from "store/useAuthStore";
import { useChatStore } from "store/useChatStore";
import toast from "react-hot-toast";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

function ProfileHeader() {
    const { logout, authUser, updateProfile } = useAuthStore();
    const { isSoundEnabled, toggleSound } = useChatStore();
    const [selectedImg, setSelectedImg] = useState(null);

    const fileInputRef = useRef(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // ✅ Giới hạn dung lượng ảnh <= 100KB
        const maxSize = 100 * 1024; // 100KB
        if (file.size > maxSize) {
            toast.error("Ảnh quá lớn! Vui lòng chọn ảnh nhỏ hơn 100KB.");
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = async () => {
            const base64Image = reader.result;
            setSelectedImg(base64Image);
            await updateProfile({ profilePic: base64Image });
        };
    };


    return (
        <div className="p-6 border-b border-slate-700/50">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {/* AVATAR */}
                    <div className="avatar relative ring-white ring-offset-base-100 ring ring-offset-1 rounded-full">
                        <button
                            className="size-14 rounded-full overflow-hidden relative group"
                            onClick={() => fileInputRef.current.click()}
                        >
                            <img
                                src={selectedImg || authUser.profilePic || "/avatar.png"}
                                alt="User image"
                                className="size-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <span className="text-white text-xs">Change</span>
                            </div>
                        </button>

                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                        {/* Ping effect */}
                        <span className="absolute top-0 right-1 flex h-3 w-3">
                            <span className="absolute inline-flex h-full w-full rounded-full  bg-green-400 opacity-75 animate-ping"></span>
                            <span className="relative border-2 border-black inline-flex h-3 w-3 rounded-full bg-green-500"></span>
                        </span>
                    </div>

                    {/* USERNAME & ONLINE TEXT */}
                    <div>
                        <h3 className="text-slate-200 font-medium text-base max-w-[180px] truncate">
                            {authUser.fullName}
                        </h3>

                        <p className="text-slate-400 text-xs">Online</p>
                    </div>
                </div>

                {/* BUTTONS */}
                <div className="flex gap-4 items-center">
                    {/* LOGOUT BTN */}
                    <button
                        className="text-slate-400 hover:text-slate-200 transition-colors"
                        onClick={logout}
                    >
                        <LogOutIcon className="size-5 hover:scale-[1.2] transition-all ease-out" />
                    </button>

                    {/* SOUND TOGGLE BTN */}
                    <button
                        className="text-slate-400 hover:text-slate-200 transition-colors"
                        onClick={() => {
                            // play click sound before toggling
                            mouseClickSound.currentTime = 0; // reset to start
                            mouseClickSound.play().catch((error) => console.log("Audio play failed:", error));
                            toggleSound();
                        }}
                    >
                        {isSoundEnabled ? (
                            <Volume2Icon className="size-5" />
                        ) : (
                            <VolumeOffIcon className="size-5" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
export default ProfileHeader;
