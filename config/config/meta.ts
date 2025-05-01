export interface IAccount {
 username?: string;
 url: string;
 repo?: string;
 server?: string;
 id?: string | boolean;
}

export interface IMeta {
 version: string;
 title: string;
 description: string;
 shortDescription: string;
 url: string;
 webhook?: string;
 accounts: {
  github: IAccount;
  discord: {
   username?: string;
   server: string;
   id?: string | boolean;
  };
  youtube: IAccount;
  instagram: IAccount;
  spotify: IAccount;
 };
}

export const meta: IMeta = {
 version: "1.0.0",
 title: "k4itrun",
 description: "Currently working on various projects. Stay tuned for updates.",
 shortDescription: "Random developer from this planet.",
 url: "https://9ll.fun",
 webhook: `${process.env.DISCORD_WEBHOOK_URL}`,
 accounts: {
  github: {
   username: "k4itrun",
   repo: "next-portfolio",
   url: `https://github.com/k4itrun`,
  },
  discord: {
   username: "@k4itrun",
   server: "/discord",
   id: /^(\d{17,20})$/.test(`${process.env.DISCORD_USER_ID}`) ? `${process.env.DISCORD_USER_ID}` : "1208098209063379065",
  },
  youtube: {
   username: "k4itrvn",
   url: "/youtube",
  },
  instagram: {
   username: "kobebryant",
   url: "/instagram",
  },
  spotify: {
   url: "/spotify",
  },
 },
};
