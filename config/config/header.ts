import { meta } from './meta';

interface Social {
    name: 'Spotify' | 'Github' | 'Youtube' | 'Instagram' | 'Discord';
    link: string;
}

interface Header {
    title: string;
    description: string;
    shortDescription: string;
    socials: Social[];
}

export const header: Header = {
    title: meta.title,
    description: meta.description,
    shortDescription: meta.shortDescription,
    socials: [
        { name: "Spotify", link: meta.accounts.spotify.url },
        { name: "Github", link: meta.accounts.github.url },
        { name: "Youtube", link: meta.accounts.youtube.url },
        { name: "Instagram", link: meta.accounts.instagram.url },
        { name: "Discord", link: meta.accounts.discord.server },
    ],
};
