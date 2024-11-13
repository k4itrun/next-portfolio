import { KeyKeyShortcutProps } from "@/interfaces";

import { ReactNode } from "react";

const KeyShortcut = ({
    keys,
    ...extraAttributes
}: KeyKeyShortcutProps) => {
    const keyElements = keys.reduce<ReactNode[]>((acc, key, idx) => {
        if (idx > 0) acc.push(<span key={`separator-${idx}`}>+</span>);
        acc.push(<span key={`key-${idx}`}>{key}</span>);
        return acc;
    }, []);

    return (
        <div
            className="rounded-lg px-2 py-1 bg-black/10 dark:bg-white/10 text-zinc-400 flex gap-2 items-center justify-center text-xs transition-colors duration-200"
            {...extraAttributes}
        >
            {keyElements}
        </div>
    );
}

export default KeyShortcut;
