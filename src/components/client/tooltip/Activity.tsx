import { encodeImgBase64 } from '@/utils/toImgBase64';

interface ActivityTooltipProps {
    activity: any;
    elapsedActivityTime: string;
}

const ActivityTooltip = ({ activity, elapsedActivityTime }: ActivityTooltipProps) => {
    return (
        <>
            <div className="p-4 w-72 text-left bg-white dark:bg-black shadow-lg rounded-md">
                <div className="flex items-center space-x-3">
                    <img
                        src={
                            encodeImgBase64(
                                activity.assets.large_image?.startsWith("mp:external/")
                                    ? `https://media.discordapp.net/external/${activity.assets.large_image.replace("mp:external/", "")}`
                                    : `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.webp`
                            )
                        }
                        alt={activity.assets.large_text || 'Activity'}
                        className="w-10 h-10 rounded-md"
                    />
                    <div>
                        <p className="text-lg font-semibold">
                            {
                                activity.name?.length > 15
                                    ? `${activity.name.substring(0, 15)}...`
                                    : activity.name
                            }
                        </p>
                        <p className="text-sm text-gray-500">
                            {
                                activity.state?.length > 30
                                    ? `${activity.state.substring(0, 30)}...`
                                    : activity.state
                            }
                        </p>
                    </div>
                </div>
                <p className="mt-2 text-sm">
                    {
                        activity.details
                            ? (
                                activity.details?.length > 40
                                    ? `${activity.details.substring(0, 40)}...`
                                    : activity.details
                            )
                            : 'No details available'
                    }
                </p>
                <div className="flex items-center space-x-2 mt-3">
                    <img
                        src={
                            encodeImgBase64(
                                activity.assets.small_image?.startsWith("mp:external/")
                                    ? `https://media.discordapp.net/external/${activity.assets.small_image.replace("mp:external/", "")}`
                                    : `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.small_image}.webp`
                            )
                        }
                        alt={activity.assets?.small_text}
                        className="w-5 h-5 rounded-md"
                    />
                    <p className="text-sm text-gray-500">
                        {
                            activity.assets.small_text?.length > 15
                                ? `${activity.assets.small_text.substring(0, 15)}...`
                                : activity.assets.small_text
                        }
                    </p>
                    <p className="text-sm text-green-500 ml-2 flex items-center">
                        <i className="fa fa-gamepad mr-2"></i>
                        {elapsedActivityTime}
                    </p>
                </div>
            </div>
        </>
    );
}

export default ActivityTooltip;
