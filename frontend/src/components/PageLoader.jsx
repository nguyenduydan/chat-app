import { MessagesSquare } from "lucide-react";

function PageLoader() {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="relative">
                <div className="absolute inset-0 bg-cyan-500/30 blur-2xl animate-pulse rounded-full"></div>
                <MessagesSquare className="size-24 text-cyan-300 animate-ping-slow drop-shadow-[0_0_10px_#22d3ee]" />
            </div>
            <h1 className="mt-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 text-2xl font-bold animate-pulse">
                Chat App
            </h1>
        </div>
    );
}

export default PageLoader;
