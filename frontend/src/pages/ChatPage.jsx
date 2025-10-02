import React from 'react';
import { useAuthStore } from 'store/useAuthStore';

function ChatPage() {
    const { logout } = useAuthStore();

    return (
        <div className='w-full flex items-center justify-center p-4 bg-slate-900 z-10'>
            ChatPage
            <button className='btn btn-error' onClick={logout}>Logout</button>
        </div>
    );
}

export default ChatPage;
