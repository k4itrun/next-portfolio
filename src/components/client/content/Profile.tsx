'use client';

import { header } from '@9ll-fun/config';
import { ActivityTooltip } from '@/components/client/content/utils/ActivityTooltip';
import { SpotifyTooltip } from '@/components/client/content/utils/SpotifyTooltip';
import { GlowEffect } from '@/components/client/GlowEffect';
import { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react';
import { useSWR } from '@/lib/hooks/useSWR';

interface IProfileUser {
  activities: {
    id: string;
    name: string;
    type: number;
    state: string;
    created_at: number;
    emoji?: {
      name: string;
      id: number;
      animated: boolean;
    };
    flags?: number;
    session_id?: string;
    details?: string;
    timestamps?: {
      start: number;
      end?: number;
    };
    assets?: {
      large_image?: string;
      large_text?: string;
      small_image: string;
      small_text: string;
    };
    sync_id?: string;
    party?: {
      id: string;
    };
    application_id?: string;
    buttons?: string[];
  }[];
  discord_user: {
    id: string;
    global_name: string;
    username: string;
    avatar: string;
  };
  discord_status: 'dnd' | 'idle' | 'online' | 'offline';
  active_on_discord_web: boolean;
  active_on_discord_desktop: boolean;
  active_on_discord_mobile: boolean;
  listening_to_spotify: boolean;
  spotify: {
    timestamps: {
      start: number;
      end: number;
    };
    album: string;
    album_art_url: string;
    artist: string;
    song: string;
    track_id: string;
  } | null;
}

const statuses = {
  dnd: { label: 'Do not Disturb' },
  idle: { label: 'Idle' },
  online: { label: 'Online' },
  offline: { label: 'Offline' },
};

// ILL FINISH IT LATER !!

export const Profile = () => {
  const { data: _profile } = useSWR<IProfileUser>('/api/lanyard');
  const profile = _profile;

  const [elapsedActivityTime, setElapsedActivityTime] = useState<string>('');
  const [elapsedSpotifyTime, setElapsedSpotifyTime] = useState<number>(0);

  const activities = profile?.activities.filter((activity) => activity.type !== 2 && activity.type !== 4) || [];

  const activity = activities?.[0];
  const spotify = profile?.spotify;

  useEffect(() => {
    if (activity && activity?.timestamps) {
      const startTimeActivity = activity.timestamps.start;

      const updateElapsedActivityTime = () => {
        const now = Date.now();
        const elapsed = now - startTimeActivity;

        const seconds = Math.floor((elapsed / 1000) % 60);
        const minutes = Math.floor((elapsed / 1000 / 60) % 60);
        const hours = Math.floor((elapsed / 1000 / 60 / 60) % 24);
        const days = Math.floor((elapsed / 1000 / 60 / 60 / 24) % 7);
        const weeks = Math.floor((elapsed / 1000 / 60 / 60 / 24 / 7) % 4);
        const months = Math.floor(elapsed / 1000 / 60 / 60 / 24 / 30);

        let timeString = '';
        if (months > 0) timeString = `${months} month${months > 1 ? 's' : ''}`;
        else if (weeks > 0) timeString = `${weeks} week${weeks > 1 ? 's' : ''}:${days}d:${hours}h`;
        else if (days > 0) timeString = `${days}d:${hours}h:${minutes}m`;
        else if (hours > 0) timeString = `${hours}h:${minutes}m:${seconds}s`;
        else timeString = `${minutes}m:${seconds}s`;

        setElapsedActivityTime(timeString);
      };

      updateElapsedActivityTime();
      const interval = setInterval(updateElapsedActivityTime, 1000);

      return () => clearInterval(interval);
    }
  }, [activity]);

  useEffect(() => {
    if (spotify && spotify?.timestamps) {
      const startTimeSpotify = spotify.timestamps.start;
      const endTimeSpotify = spotify.timestamps.end;

      const totalDuration = endTimeSpotify - startTimeSpotify;

      const storedElapsedTime = localStorage.getItem('elapsedSpotifyTime');
      const initialElapsedTime = storedElapsedTime ? Math.min(Number(storedElapsedTime), totalDuration) : 0;

      setElapsedSpotifyTime(initialElapsedTime);

      const interval = setInterval(() => {
        setElapsedSpotifyTime((prevElapsedTime) => {
          if (prevElapsedTime < totalDuration) {
            const newElapsedTime = prevElapsedTime + 1000;
            localStorage.setItem('elapsedSpotifyTime', String(newElapsedTime));
            return newElapsedTime;
          }
          return prevElapsedTime;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [spotify]);

  useEffect(() => {
    if (spotify && spotify?.timestamps) {
      const currentStart = spotify.timestamps.start;
      const currentEnd = spotify.timestamps.end;

      if (currentStart !== undefined && currentEnd !== undefined) {
        const storedStart = Number(localStorage.getItem('elapsedSpotifyTimeStart'));
        const storedEnd = Number(localStorage.getItem('elapsedSpotifyTimeEnd'));

        if (currentStart !== storedStart || currentEnd !== storedEnd) {
          setElapsedSpotifyTime(0);
          localStorage.setItem('elapsedSpotifyTimeStart', String(currentStart));
          localStorage.setItem('elapsedSpotifyTimeEnd', String(currentEnd));
          localStorage.removeItem('elapsedSpotifyTime');
        }
      }
    }
  }, [spotify]);

  const progressSpotify = spotify?.timestamps?.start && spotify?.timestamps?.end ? (elapsedSpotifyTime / (spotify.timestamps.end - spotify.timestamps.start)) * 100 : 0;

  return (
    <>
      <GlowEffect>
        <div className="bg-white/50 dark:bg-black/50 shadow-xl rounded-lg w-full h-auto mt-6">
          {_profile ? (
            profile ? (
              <div className="relative">
                <div className="flex flex-col lg:flex-row justify-between w-full p-6 px-8 items-center h-full">
                  <div className="flex flex-col items-center lg:items-start lg:justify-start justify-center w-full mt-5 lg:mt-0">
                    <div className="flex flex-col lg:flex-row items-center lg:items-start">
                      <Tippy
                        content={
                          activity && activity.name ? <ActivityTooltip activity={activity} elapsedActivityTime={elapsedActivityTime} /> : profile.listening_to_spotify && spotify ? <SpotifyTooltip spotify={spotify} elapsedSpotifyTime={elapsedSpotifyTime} progressSpotify={progressSpotify} /> : null
                        }
                        animation="shift-away"
                        arrow={true}
                      >
                        <p className="flex items-center text-black dark:text-white text-4xl font-semibold cursor-pointer">{profile.discord_user.global_name || `${header.title}†`}</p>
                      </Tippy>

                      {profile.discord_status !== 'offline' && (
                        <Tippy content={`${statuses[profile.discord_status].label} on Discord`} className={`text-${profile.discord_status}`} animation="shift-away" arrow={false}>
                          <span className={`text-${profile.discord_status} px-2 py-1 font-normal rounded-md text-sm mt-2 lg:mt-0 lg:ml-2 flex items-center`}>
                            <i className={`fa fa-circle text-${profile.discord_status} mr-2`} />
                            {statuses[profile.discord_status].label}
                          </span>
                        </Tippy>
                      )}
                    </div>

                    <p className="text-black dark:text-white text-md mt-3 text-center lg:text-left">{header.description}</p>
                  </div>

                  <div className="order-first lg:order-last flex-shrink-0 relative w-[160px] h-[160px] rounded-full">
                    <img
                      alt="k4itrun"
                      src={profile.discord_user.avatar ? `https://cdn.discordapp.com/avatars/${profile.discord_user.id}/${profile.discord_user.avatar}.webp?size=1024` : `https://cdn.discordapp.com/embed/avatars/${Math.floor(Math.random() * 6)}.png`}
                      width="160"
                      height="160"
                      className="bg-neutral-700 w-[160px] h-[160px] rounded-full"
                    />
                    <div className={`pulse-avatar-${profile.discord_status} rounded-full flex items-center absolute bottom-2 right-2`}>
                      <Tippy
                        //content={statuses[profile.discord_status].label}
                        className={`text-${profile.discord_status}`}
                        animation="shift-away"
                        arrow={false}
                      >
                        <div className={`bg-white dark:bg-black w-8 h-8 border-2 border-${profile.discord_status} rounded-full`} />
                      </Tippy>
                    </div>
                  </div>
                </div>

                <span style={{ zIndex: '-1' }} className="text-black/10 dark:text-white/5 absolute bottom-3 left-7 text-xl sm:text-2xl md:text-4xl lg:text-3xl font-semibold">
                  {header.shortDescription}
                </span>
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row justify-between w-full p-6 px-8 items-center h-full">
                <div className="flex flex-col lg:justify-start justify-center items-center lg:items-start mt-5 lg:mt-0 w-full">
                  <div className="bg-neutral-400 dark:bg-neutral-700/50 animate-pulse w-1/2 h-[24px] rounded-md" />
                  <div className="mt-2 bg-neutral-400 dark:bg-neutral-700/50 animate-pulse w-[95%] h-[96px] rounded-md" />
                </div>
                <div className="order-first lg:order-last flex-shrink-0 relative w-[160px] h-[160px] rounded-full">
                  <div className="bg-neutral-400 dark:bg-neutral-700/50 animate-pulse w-[160px] h-[160px] rounded-full" />
                  <div className="absolute bottom-1 right-5 bg-neutral-400 dark:bg-neutral-700/50 border-4 border-neutral-800 animate-pulse w-[32px] h-[32px] rounded-full" />
                </div>
              </div>
            )
          ) : (
            <div className="flex flex-col lg:flex-row justify-between w-full p-6 px-8 items-center h-full">
              <div className="flex flex-col lg:justify-start justify-center items-center lg:items-start mt-5 lg:mt-0 w-full">
                <div className="bg-neutral-400 dark:bg-neutral-700/50 animate-pulse w-1/2 h-[24px] rounded-md" />
                <div className="mt-2 bg-neutral-400 dark:bg-neutral-700/50 animate-pulse w-[95%] h-[96px] rounded-md" />
              </div>
              <div className="order-first lg:order-last flex-shrink-0 relative w-[160px] h-[160px] rounded-full">
                <div className="bg-neutral-400 dark:bg-neutral-700/50 animate-pulse w-[160px] h-[160px] rounded-full" />
                <div className="absolute bottom-1 right-5 bg-neutral-400 dark:bg-neutral-700/50 border-4 border-neutral-800 animate-pulse w-[32px] h-[32px] rounded-full" />
              </div>
            </div>
          )}
        </div>
      </GlowEffect>
    </>
  );
};
