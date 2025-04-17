import { Profile } from '@/components/client/content/Profile';
import { Repos } from '@/components/client/content/Repos';
import { Techs } from '@/components/client/content/Tech';
import { header, meta } from '@9ll-fun/config';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: header.title,
  description: meta.shortDescription,
};

export default function HomePage() {
  return (
    <>
      <Profile />
      <Repos />
      <Techs />
    </>
  );
}
