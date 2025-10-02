import { EggFried } from "lucide-react";

function PageLoader() {
    return (
        <div className="flex items-center justify-center h-full">
            <EggFried className="size-10 animate-spin" />
        </div>
    );
}

export default PageLoader;
