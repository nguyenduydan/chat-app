import BorderAnimatedContainer from "components/BorderAnimatedContainer";
import { MessageCircleIcon, LockIcon, MailIcon, UserIcon } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "store/useAuthStore";
import { Link } from "react-router";

function RegisterPage() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: ""
    });
    const { signup, isSigningUp } = useAuthStore();

    const handleSubmit = (e) => {
        e.preventDefault();

        signup(formData);
    };

    return (
        <div className="w-full flex items-center justify-center p-4 bg-slate-900">
            <div className="relative flex items-center justify-center w-full max-w-6xl md:h-[800px] h-[650px]">
                <div className="w-full flex flex-col md:flex-row bg-gradient-to-r from-cyan-950/80 to-indigo-950/80 backdrop-blur-md rounded-xl p-2 md:p-10">
                    {/* FORM CLOUMN - LEFT SIDE */}
                    <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
                        <div className="w-full max-w-md">
                            {/* HEADING TEXT */}
                            <div className="text-center mb-8">
                                <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                                <h2 className="text-2xl font-bold text-slate-200 mb-2">Tạo tài khoản</h2>
                                <p className="text-slate-400">Đăng ký một tài khoản mới</p>
                            </div>

                            {/* FORM */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* FULL NAME */}
                                <div>
                                    <label className="auth-input-label">Tên đầy đủ</label>
                                    <div className="relative">
                                        <UserIcon className="auth-input-icon" />

                                        <input
                                            type="text"
                                            value={formData.fullName}
                                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                            className="input"
                                            placeholder="Nguyễn Văn A"
                                        />
                                    </div>
                                </div>

                                {/* EMAIL INPUT */}
                                <div>
                                    <label className="auth-input-label">Email</label>
                                    <div className="relative">
                                        <MailIcon className="auth-input-icon" />

                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="input"
                                            placeholder="abc@gmail.com"
                                        />
                                    </div>
                                </div>

                                {/* PASSWORD INPUT */}
                                <div>
                                    <label className="auth-input-label">Mật khẩu</label>
                                    <div className="relative">
                                        <LockIcon className="auth-input-icon" />

                                        <input
                                            type="password"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            className="input"
                                            placeholder="Nhập mật khẩu"
                                        />
                                    </div>
                                </div>

                                {/* SUBMIT BUTTON */}
                                <button className="auth-btn" type="submit" disabled={isSigningUp}>
                                    {isSigningUp ? (
                                        <span className="loading loading-dots loading-md"></span>
                                    ) : (
                                        "Đăng ký"
                                    )}
                                </button>
                            </form>

                            <div className="mt-6 text-center">
                                <Link to="/login" className="auth-link">
                                    Bạn đã có tài khoản? Đăng nhập
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* FORM ILLUSTRATION - RIGHT SIDE */}
                    <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-transparent">
                        <div>
                            <img
                                src="/signup.png"
                                alt="People using mobile devices"
                                className="w-full h-auto object-contain"
                            />
                            <div className="mt-6 text-center">
                                <h3 className="text-xl font-medium text-cyan-400">Bắt đầu một ngày mới nào</h3>

                                <div className="mt-4 flex justify-center gap-4">
                                    <span className="auth-badge">Miễn Phí</span>
                                    <span className="auth-badge">Dễ Thiết Lập</span>
                                    <span className="auth-badge">Riêng tư</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
