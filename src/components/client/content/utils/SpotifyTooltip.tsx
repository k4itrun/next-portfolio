import { toImgB64, formatTime } from "@9ll-fun/utils";

interface ISpotify {
 timestamps: {
  start: number;
  end: number;
 };
 album: string;
 album_art_url: string;
 artist: string;
 song: string;
 track_id: string;
}

export const SpotifyTooltip = ({ spotify, elapsedSpotifyTime, progressSpotify }: { spotify: ISpotify; elapsedSpotifyTime: number; progressSpotify: number }) => {
 return (
  <>
   <div className="p-4 w-72 text-left bg-white dark:bg-black shadow-lg rounded-md">
    <div className="flex items-center space-x-3">
     <img src={toImgB64(spotify.album_art_url)} alt="Spotify Album Art" className="w-10 h-10 rounded-md" />
     <div>
      <p className="text-lg font-semibold">{spotify.song?.length > 15 ? `${spotify.song.substring(0, 15)}...` : spotify.song}</p>
      <p className="text-sm text-green-500 flex items-center">
       <i className="fab fa-spotify mr-1" /> Listening to Spotify
      </p>
     </div>
    </div>
    <div className="flex justify-between mt-2 text-sm">
     <p className="text-gray-500">{spotify.artist?.length > 15 ? `${spotify.artist.substring(0, 15)}...` : spotify.artist}</p>
     <p>{spotify.album?.length > 15 ? `${spotify.album.substring(0, 15)}...` : spotify.album}</p>
    </div>
    <div className="flex items-center space-x-2 mt-3">
     <img src={toImgB64(spotify.album_art_url)} alt="Spotify Album Art Small" className="w-5 h-5 rounded-md" />
     <div className="w-full bg-gray-300 rounded-full h-0.5 mt-1 relative">
      <div className="bg-green-500 h-0.5 rounded-full" style={{ width: `${progressSpotify}%` }} />
      <div className="absolute top-1 left-0 text-xs text-green-500" style={{ transform: "translateX(5px)" }}>
       {formatTime(elapsedSpotifyTime)}
      </div>
      <div className="absolute top-1 right-0 text-xs text-gray-500" style={{ transform: "translateX(-5px)" }}>
       {formatTime(spotify.timestamps.end - spotify.timestamps.start)}
      </div>
     </div>
    </div>
   </div>
  </>
 );
};
