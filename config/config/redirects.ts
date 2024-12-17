interface Redirect {
    source: string;
    destination: string | any;
    permanent: boolean;
}

const routes: Record<string, string> = {
    discord: 'https://discord.gg/FpFxs8A9JH',
    github: 'https://github.com/k4itrun',
    youtube: 'https://youtube.com/@k4itrvn',
    spotify: 'https://open.spotify.com/intl-es/artist/3EiLUeyEcA6fbRPSHkG5kb',
    instagram: 'https://instagram.com/kobebryant',
}

export const redirects: Redirect[] = [
    { source: "/discord", destination: routes.discord, permanent: true },
    { source: "/discord-server", destination: "/discord", permanent: true },
    { source: "/youtube", destination: routes.youtube, permanent: true },
    { source: "/spotify", destination: routes.spotify, permanent: true },
    { source: "/github", destination: routes.github, permanent: true },
    { source: "/instagram", destination: routes.instagram, permanent: true },
    { source: "/youngxsanty", destination: "https://guns.lol/youngxsanty", permanent: true },
    { source: "/r/:path*", destination: "/:path*", permanent: true },
];