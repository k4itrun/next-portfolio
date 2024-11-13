import { Profile, Repository } from "@/interfaces";

import ProfileComponent from "@/components/Profile";
import ReposComponent from "@/components/Repos";
import TechsComponent from "@/components/Tech";

import useSWR from '@/lib/useSWR';

export default function Home() {
  const { data: _profile } = useSWR<Profile|any>("/api/lanyard");
  const profile = _profile;

  const { data: _repositories } = useSWR<Repository[]|any>("/api/repos");
  const repositories = _repositories;

  return (
    <>
      <ProfileComponent profile={profile} _profile />
      <ReposComponent repositories={repositories} _repositories />
      <TechsComponent />
    </>
  );
}
