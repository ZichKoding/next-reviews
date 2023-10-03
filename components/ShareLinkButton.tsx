"use client";

export default function ShareLinkButton() {
    const handleClick = () => {
        console.log("Clicked!");
    };

    console.log('[ShareLinkButton] rendering');
    
    return (
        <button onClick={handleClick}
            className="border px-2 py-1 rounded text-slate-500 text-sm
                hover:bg-orange-100 hover:text-slate-700">
            Share Link
        </button>
    );
};