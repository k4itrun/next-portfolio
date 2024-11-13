import { MyDocumentProps, LanyardResponse } from "@/interfaces";
import { metaConfig, headerConfig } from '@k4itrunconfig';
import tailwindConfig from 'tailwind.config';

import { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import axios from 'axios';

export default function MyDocument({ profile }: MyDocumentProps) {
  const avatarUrl = profile?.discord_user?.avatar
    ? `https://cdn.discordapp.com/avatars/${profile.discord_user.id}/${profile.discord_user.avatar}`
    : "https://github.githubassets.com/favicons/favicon.png";

  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content={tailwindConfig.theme.extend.colors['color-layout']} />
        <meta name="description" content={headerConfig.description} />
        <link href="https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
        <link href="https://pro.fontawesome.com/releases/v6.0.0-beta1/css/all.css" rel="stylesheet" />
        <link rel="icon" href={avatarUrl} type="image/x-icon" />
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