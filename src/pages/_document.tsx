import { MyDocumentProps, LanyardResponse } from "@/interfaces";
import { metaConfig } from '@k4itrunconfig';
import tailwindConfig from 'tailwind.config';

import { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import axios from 'axios';

export default function MyDocument({ profile }: MyDocumentProps) {
  const avatar = profile?.discord_user?.avatar
    ? `https://cdn.discordapp.com/avatars/${profile.discord_user.id}/${profile.discord_user.avatar}`
    : "https://github.githubassets.com/favicons/favicon.png";

  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content='#00FF00' />
        <meta name="description" content={metaConfig.description} />

        <meta property="og:title" content={metaConfig.title} />
        <meta property="og:description" content={metaConfig.shortDescription} />
        {/*<meta property="og:image" content={metaConfig.image} />*/}
        <meta property="og:url" content={metaConfig.url} />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaConfig.title} />
        <meta name="twitter:description" content={metaConfig.shortDescription} />
        {/*<meta name="twitter:image" content={metaConfig.image} />*/}

        <link href="https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
        <link href="https://pro.fontawesome.com/releases/v6.0.0-beta1/css/all.css" rel="stylesheet" />
        <link rel="icon" href={avatar} type="image/x-icon" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const props = await ctx.defaultGetInitialProps(ctx);

  let profile: LanyardResponse | null = null;

  try {
    const res = await axios.get(`https://api.lanyard.rest/v1/users/${metaConfig.accounts.discord.id}`);
    profile = res?.data?.data;
  } catch (error) {
  }

  return { ...props, profile };
};