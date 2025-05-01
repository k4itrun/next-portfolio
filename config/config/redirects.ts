interface IRedirect {
 source: string;
 destination: string | any;
 permanent: boolean;
}

export const urls = {
 discord: "https://discord.gg/FpFxs8A9JH",
 github: "https://github.com/k4itrun",
 youtube: "https://youtube.com/@k4itrvn",
 spotify: "https://open.spotify.com/intl-es/artist/3EiLUeyEcA6fbRPSHkG5kb",
 instagram: "https://instagram.com/kobebryant",
};

export const redirects: IRedirect[] = [
 { source: "/discord", destination: urls.discord, permanent: true },
 { source: "/discord-server", destination: "/discord", permanent: true },
 { source: "/youtube", destination: urls.youtube, permanent: true },
 { source: "/spotify", destination: urls.spotify, permanent: true },
 { source: "/github", destination: urls.github, permanent: true },
 { source: "/instagram", destination: urls.instagram, permanent: true },
 { source: "/youngxsanty", destination: "https://guns.lol/youngxsanty", permanent: true },
 { source: "/r/:path*", destination: "/:path*", permanent: true },
];
