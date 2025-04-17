import { meta } from './meta';

export interface ISocial {
  name: 'Spotify' | 'Github' | 'Youtube' | 'Instagram' | 'Discord';
  link: string;
}

export interface IHeader {
  title: string;
  description: string;
  shortDescription: string;
  socials: ISocial[];
}

export const header: IHeader = {
  title: meta.title,
  description: meta.description,
  shortDescription: meta.shortDescription,
  socials: [
    { name: 'Spotify', link: meta.accounts.spotify.url },
    { name: 'Github', link: meta.accounts.github.url },
    { name: 'Youtube', link: meta.accounts.youtube.url },
    { name: 'Instagram', link: meta.accounts.instagram.url },
    { name: 'Discord', link: meta.accounts.discord.server },
  ],
};
