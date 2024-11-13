export interface MetaConfig {
  version: string;
  title: string;
  description: string;
  shortDescription: string;
  email?: string;
  url?: string;
  accounts: {
    github: {
      username: string;
      repo: string;
      url: string;
      key?: string;
    };
    youtube: {
      username: string;
      url: string;
    };
    discord: {
      username: string;
      server: string;
      id: string | any;
    };
    instagram: {
      username: string;
      url: string;
    };
    spotify: {
      url: string;
    };
  };
  webhook?: string | any;
  errors: {
    404: string;
    500: string;
  };
}

export interface TechnologiesConfig {
  name: string;
  src: string;
}

interface Social {
  name: string;
  link: string;
}

export interface HeaderConfig {
  title: string;
  description: string;
  shortDescription: string;
  socials: Social[];
}

export interface SWRIConfig {
  interval: number;
}

export interface RedirectConfig {
  source: string;
  destination: string;
  permanent: boolean;
}