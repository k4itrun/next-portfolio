import { EventActions, ContextMenuProps, ItemProps } from "@/interfaces";
import KeyShortcut from "@/components/client/KeyShortcut";

import { useEffect, useState } from "react";

export const ContextMenu = ({ content, children }: ContextMenuProps) => {
    const [isBackEnabled, setIsBackEnabled] = useState(false);
    const [isForwardEnabled, setIsForwardEnabled] = useState(false);

    useEffect(() => {
        const handleContextMenu = (event: MouseEvent) => {
            event.preventDefault();
            const menu = document.querySelector(".context-menu") as HTMLElement;
            const { pageX: x, pageY: y } = event;
            const { innerWidth: windowWidth, innerHeight: windowHeight } = window;

            if (menu) {
                menu.style.left = x + menu.offsetWidth > windowWidth ? `${windowWidth - menu.offsetWidth - 24}px` : `${x}px`;
                menu.style.top = `${y}px`;
                menu.style.display = "block";
            }
        };

        const handleClickOutside = () => {
            const menu = document.querySelector(".context-menu") as HTMLElement;
            if (menu) menu.style.display = "none";
        };

        document.addEventListener("contextmenu", handleContextMenu);
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const hasHistory = window.history.length > 1;
        setIsBackEnabled(hasHistory);
        setIsForwardEnabled(hasHistory);
    }, []);

    const actions: EventActions = {
        hasForward: isForwardEnabled,
        hasBack: isBackEnabled,
        goBack: () => window.history.back(),
        goForward: () => window.history.forward(),
        refreshPage: () => window.location.reload(),
        viewGithub: () => window.open("https://github.com/k4itrun/", "_blank"),
        viewYoutube: () => window.open("https://youtube.com/channel/UCa6sR_p87T0kB4FdvOJiVjw", "_blank"),
    };

    return (
        <>
            <div
                className="context-menu absolute bg-white dark:bg-black rounded-lg shadow-xl py-2 w-72 divide-y divide-gray-600/10 space-y-2"
                style={{
                    display: "none",
                    zIndex: 9*10000,
                }}
            >
                {content(actions)}
            </div>
            {children}
        </>
    );
}

export const MenuItem = ({ icon, text, kbd, onClick, ...props }: ItemProps) => {
    return (
        <div className="text-sm flex flex-col" onClick={onClick} {...props}>
            <div className="flex gap-2 justify-between items-center w-full hover:bg-black/5 dark:hover:bg-white/5 p-2 px-4 transition-all duration-200">
                <div className="flex items-center gap-2">
                    {icon}
                    <p>{text}</p>
                </div>
                {kbd && <KeyShortcut keys={kbd} />}
            </div>
        </div>
    );
}
