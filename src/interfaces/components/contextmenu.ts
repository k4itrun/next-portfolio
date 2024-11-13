import { ReactNode } from "react";

export type EventActions = {
    hasForward: boolean;
    hasBack: boolean;
    goBack: () => void;
    goForward: () => void;
    refreshPage: () => void;
    viewGithub: () => void;
    viewYoutube: () => void;
};

export type ContextMenuProps = {
    content: (event: EventActions) => ReactNode;
    children: ReactNode;
};

export type ItemProps = {
    icon?: ReactNode;
    text: string;
    kbd?: string[];
    onClick?: () => void;
};
