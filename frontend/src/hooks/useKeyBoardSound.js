// 🎵 Khởi tạo danh sách các âm thanh gõ phím
// Mỗi phần tử là một file âm thanh .mp3 trong thư mục /sounds/
const keyStrokeSounds = [
    new Audio("/sounds/keystroke1.mp3"),
    new Audio("/sounds/keystroke2.mp3"),
    new Audio("/sounds/keystroke3.mp3"),
    new Audio("/sounds/keystroke4.mp3"),
];

// Custom Hook: useKeyboardSound
// → Dùng để phát ngẫu nhiên một âm thanh gõ phím mỗi khi người dùng nhập ký tự
function useKeyboardSound() {

    // Hàm phát ngẫu nhiên một âm thanh gõ phím
    const playRandomKeyStrokeSound = () => {

        // Chọn ngẫu nhiên 1 file âm thanh trong mảng keyStrokeSounds
        const randomSound = keyStrokeSounds[
            Math.floor(Math.random() * keyStrokeSounds.length)
        ];

        // Đặt lại thời gian phát về đầu (0s)
        // → Giúp âm thanh có thể phát liên tục, không bị delay khi gõ nhanh
        randomSound.currentTime = 0;

        // Phát âm thanh
        // → Nếu phát thất bại (VD: chưa có tương tác với trang), log lỗi ra console
        randomSound.play().catch((error) => console.log("Audio play failed:", error));
    };

    return { playRandomKeyStrokeSound };
}

export default useKeyboardSound;
