import { MetaConfig, TechnologiesConfig, HeaderConfig, SWRIConfig, RedirectConfig } from "@/interfaces";
import { version } from "./package.json";

export const metaConfig: MetaConfig = {
    version,
    title: 'k4itrun',
    description: "Currently working on various projects. Stay tuned for updates.",
    shortDescription: "Random developer from this planet.",
    webhook: process.env.WEBHOOK,
    accounts: {
        github: {
            username: "k4itrun",
            repo: "next-portfolio",
            url: `https://github.com/k4itrun`,
        },
        discord: {
            username: "@k4itrun",
            server: "https://discord.gg/FpFxs8A9JH",
            id: /^(\d{17,20})$/.test(process.env.DISCORD_ID ?? "") ? process.env.DISCORD_ID : "1208098209063379065",
        },
        youtube: {
            username: "k4itrvn",
            url: "https://youtube.com/@k4itrvn"
        },
        instagram: {
            username: "kobebryant",
            url: "https://instagram.com/kobebryant",
        },
        spotify: {
            url: "https://open.spotify.com/intl-es/artist/3EiLUeyEcA6fbRPSHkG5kb",
        },
    },
    errors: {
        404: "Page not found.",
        500: "Error processing your request."
    }
};

export const technologiesConfig: TechnologiesConfig[] = [
    "HTML", "CSS", "TailwindCSS", "Bootstrap", "JavaScript", "TypeScript",
    "Node.js", "Next.js", "React", "Express", "Nest.js", "Elixir",
    "Go", "Rust", "Bash", "Python", "PHP", "Git"
].map(name => ({
    name,
    src: `https://skillicons.dev/icons?i=${name.replace(/\.| /g, "").toLowerCase()}`
}));


export const headerConfig: HeaderConfig = {
    title: metaConfig.title,
    description: metaConfig.description,
    shortDescription: metaConfig.shortDescription,
    socials: [
        { name: "spotify", link: metaConfig.accounts.spotify.url },
        { name: "github", link: metaConfig.accounts.github.url },
        { name: "youtube", link: metaConfig.accounts.youtube.url },
        { name: "instagram", link: metaConfig.accounts.instagram.url },
    ],
};

export const SWRConfig: SWRIConfig = {
    interval: 3 * 1000,
};

export const redirectsConfig: RedirectConfig[] = [
    { source: "/discord", destination: metaConfig.accounts.discord.server, permanent: true },
    { source: "/discord-server", destination: "/discord", permanent: true },
    { source: "/spotify", destination: metaConfig.accounts.spotify.url, permanent: true },
    { source: "/github", destination: metaConfig.accounts.github.url, permanent: true },
    { source: "/instagram", destination: metaConfig.accounts.instagram.url, permanent: true },
    { source: "/youngxsanty", destination: "https://guns.lol/youngxsanty", permanent: true },
    { source: "/r/:path*", destination: "/:path*", permanent: true },
];
