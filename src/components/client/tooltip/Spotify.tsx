import { Spotify } from "@/interfaces";
import { encodeImgBase64 } from '@/utils/toImgBase64';

interface SpotifyTooltipProps {
    spotify: Spotify;
    elapsedSpotifyTime: number;
    progressSpotify: number;
}

const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const SpotifyTooltip = ({ spotify, elapsedSpotifyTime, progressSpotify }: SpotifyTooltipProps) => {
    return (
        <>
            <div className="p-4 w-72 text-left bg-white dark:bg-black shadow-lg rounded-md">
                <div className="flex items-center space-x-3">
                    <img
                        src={
                            encodeImgBase64(spotify.album_art_url)
                        }
                        alt="Spotify Album Art"
                        className="w-10 h-10 rounded-md"
                    />
                    <div>
                        <p className="text-lg font-semibold">
                            {
                                spotify.song?.length > 15
                                    ? `${spotify.song.substring(0, 15)}...`
                                    : spotify.song
                            }
                        </p>
                        <p className="text-sm text-green-500 flex items-center">
                            <i className="fab fa-spotify mr-1" /> Listening to Spotify
                        </p>
                    </div>
                </div>
                <div className="flex justify-between mt-2 text-sm">
                    <p className="text-gray-500">
                        {
                            spotify.artist?.length > 15
                                ? `${spotify.artist.substring(0, 15)}...`
                                : spotify.artist
                        }
                    </p>
                    <p>
                        {
                            spotify.album?.length > 15
                                ? `${spotify.album.substring(0, 15)}...`
                                : spotify.album
                        }
                    </p>
                </div>
                <div className="flex items-center space-x-2 mt-3">
                    <img
                        src={
                            encodeImgBase64(spotify.album_art_url)
                        }
                        alt="Spotify Album Art Small"
                        className="w-5 h-5 rounded-md"
                    />
                    <div className="w-full bg-gray-300 rounded-full h-0.5 mt-1 relative">
                        <div
                            className="bg-green-500 h-0.5 rounded-full"
                            style={{ width: `${progressSpotify}%` }}
                        />
                        <div
                            className="absolute top-1 left-0 text-xs text-green-500"
                            style={{ transform: 'translateX(5px)' }}
                        >
                            {
                                formatTime(elapsedSpotifyTime)
                            }
                        </div>
                        <div
                            className="absolute top-1 right-0 text-xs text-gray-500"
                            style={{ transform: 'translateX(-5px)' }}
                        >
                            {
                                formatTime(spotify.timestamps.end - spotify.timestamps.start)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SpotifyTooltip;