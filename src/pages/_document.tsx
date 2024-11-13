import { LanyardResponse } from "@/interfaces";
import { metaConfig } from '@k4itrunconfig';
import fetch from 'sync-fetch';

import { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

const getAvatar = (): string => {
  const defaultAvatar = "https://github.githubassets.com/favicons/favicon.png";
  try {
    const { data }: LanyardResponse = fetch(`https://api.lanyard.rest/v1/users/${metaConfig.accounts.discord.id}`).json();
    const profile = data;
    if (profile.discord_user?.avatar && profile.discord_user.id) {
      return `https://cdn.discordapp.com/avatars/${profile.discord_user.id}/${profile.discord_user.avatar}`;
    }
    return defaultAvatar;
  } catch (error) {
    return defaultAvatar;
  }
};

export default function MyDocument() {
  const avatar = getAvatar();

  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content='#00FF00' />
        <meta name="description" content={metaConfig.description} />

        <meta property="og:locale" content="en_US" />
        <meta property="og:title" content={metaConfig.title} />
        <meta property="og:site_name" content={metaConfig.title} />
        <meta property="og:description" content={metaConfig.shortDescription} />
        {/*<meta property="og:image" content={metaConfig.image} />*/}
        <meta property="og:url" content='https://9ll.fun' />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaConfig.title} />
        <meta name="twitter:description" content={metaConfig.shortDescription} />
        {/*<meta name="twitter:image" content={metaConfig.image} />*/}

        <link href="https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="https://pro.fontawesome.com/releases/v6.0.0-beta1/css/all.css" rel="stylesheet" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href={avatar} type="image/x-icon" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}