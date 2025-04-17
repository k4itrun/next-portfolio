import { meta } from '@9ll-fun/config';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

interface ILanyardUser {
  data: {
    activities: {
      id: string;
      name: string;
      type: number;
      state: string;
      created_at: number;
      emoji?: { name: string; id: number; animated: boolean };
      flags?: number;
      session_id?: string;
      details?: string;
      timestamps?: { start: number; end?: number };
      assets?: {
        large_image?: string;
        large_text?: string;
        small_image: string;
        small_text: string;
      };
      sync_id?: string;
      party?: { id: string };
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
      timestamps: { start: number; end: number };
      album: string;
      album_art_url: string;
      artist: string;
      song: string;
      track_id: string;
    } | null;
  };
}

export async function GET(_request: NextRequest) {
  let lanyard: ILanyardUser | null = null;
  try {
    const res = await axios.get(`https://api.lanyard.rest/v1/users/${meta.accounts.discord.id}`);
    lanyard = res?.data?.data;
    return NextResponse.json(lanyard);
  } catch (_error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
