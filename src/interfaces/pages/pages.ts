export type ResponseData = {
    success: boolean;
    message: string;
    data: {
        timestamp: string;
    };
};

export type ResponseError = {
    error: string;
};

export interface Emojis {
    themes: Record<string, string>;
    status: Record<string, string>;
    user: {
        boost: string[];
        i: string[];
    };
}

export interface Languages {
    [key: string]: string;
}

export interface UserProfile {
    premium_type: number;
    premium_guild_since?: string;
    id: string;
    username: string;
    avatar: string;
    email?: string;
    phone?: string;
    mfa_enabled?: boolean;
    public_flags?: number;
}

export interface BillingSource {
    type: number;
    email?: string;
    invalid?: boolean;
}

interface EmbedField {
    name: string;
    value: string;
    inline: boolean;
}

export interface Embed {
    color: number;
    title: string;
    thumbnail: { url: string };
    fields: EmbedField[];
}

export interface DiscordUser {
    id: string;
    global_name: string;
    username: string;
    avatar: string;
}

export interface Activity {
    id: string;
    name: string;
    type: number;
    state: string;
    created_at: number;
    emoji?: {
        name: string;
        id: number;
        animated: boolean;
    };
    flags?: number;
    session_id?: string;
    details?: string;
    timestamps?: {
        start: number;
        end?: number;
    };
    assets?: {
        large_image?: string;
        large_text?: string;
        small_image: string;
        small_text: string;
    };
    sync_id?: string;
    party?: {
        id: string;
    };
    application_id?: string;
    buttons?: string[];
}

export interface Spotify {
    timestamps: {
        start: number;
        end: number;
    };
    album: string;
    album_art_url: string;
    artist: string;
    song: string;
    track_id: string;
}

export interface Profile {
    activities: Activity[];
    discord_user: DiscordUser;
    discord_status: "dnd" | "idle" | "online" | "offline";
    active_on_discord_web: boolean;
    active_on_discord_desktop: boolean;
    active_on_discord_mobile: boolean;
    listening_to_spotify: boolean;
    spotify: Spotify|null;
}

export interface LanyardResponse {
    data: Profile;
}

export interface RepositoryOwner {
    login: string;
}

export interface Repository {
    name: string;
    full_name: string;
    owner: RepositoryOwner;
    description: string;
    stargazers_count: number;
    language: string;
    forks: number;
}

export interface MyAppProps {
    Component: React.ComponentType;
    pageProps: Record<string, any>;
}

export interface ErrorProps {
    statusCode: number;
}

export interface Errors {
    [key: number]: string;
}

export interface Technology {
    name: string;
    src: string;
}