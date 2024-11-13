import { Activity } from "@/interfaces";
import { encodeImgBase64 } from '@/utils/toImgBase64';

interface ActivityTooltipProps {
    activity: Activity;
    elapsedActivityTime: string;
}

interface IconUnknownProps {
    className?: string;
};

const ActivityTooltip = ({ activity, elapsedActivityTime }: ActivityTooltipProps) => {
    return (
        <>
            <div className="p-4 w-72 text-left bg-white dark:bg-black shadow-lg rounded-md">
                <div className="flex items-center space-x-3">
                    {activity?.assets?.large_image ? (
                        <img
                            src={
                                encodeImgBase64(
                                    activity.assets.large_image.startsWith("mp:external/")
                                        ? `https://media.discordapp.net/external/${activity.assets.large_image.replace("mp:external/", "")}`
                                        : `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.webp`

                                )
                            }
                            alt={
                                activity?.assets?.large_text
                                    ? activity.assets.large_text
                                    : 'Activity'
                            }
                            className="w-10 h-10 rounded-md"
                        />
                    ) : (
                        <IconUnknown 
                            className="w-10 h-10 rounded-md"
                        />
                    )}
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
                        activity?.details
                            ? activity.details.length > 40
                                ? `${activity.details.substring(0, 40)}...`
                                : activity.details
                            : 'No details available'
                    }
                </p>
                <div className="flex items-center space-x-2 mt-3">
                    {activity?.assets?.small_image ? (
                        <img
                            src={
                                encodeImgBase64(
                                    activity.assets.small_image.startsWith("mp:external/")
                                        ? `https://media.discordapp.net/external/${activity.assets.small_image.replace("mp:external/", "")}`
                                        : `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.small_image}.webp`
                                )
                            }
                            alt={activity.assets?.small_text}
                            className="w-5 h-5 rounded-md"
                        />
                    ) : (
                        <IconUnknown 
                            className="w-5 h-5 rounded-md"
                        />
                    )}
                    <p className="text-sm text-gray-500">
                        {
                            activity?.assets?.small_text
                                ? activity.assets.small_text.length > 15
                                    ? `${activity.assets.small_text.substring(0, 15)}...`
                                    : activity.assets.small_text
                                : `Chillin' with ${activity.name.substring(0, 5)}...`
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
  
export function IconUnknown({ className }: IconUnknownProps) {
    return (
        <svg
            className={className}
            aria-hidden="true"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="var(--icon-unknown-color)"
            viewBox="0 0 24 24"
            style={{ maxWidth: '60px' }}
        >
            <path
                fillRule="evenodd"
                d="M5 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3H5Zm6.81 7c-.54 0-1 .26-1.23.61A1 1 0 0 1 8.92 8.5 3.49 3.49 0 0 1 11.82 7c1.81 0 3.43 1.38 3.43 3.25 0 1.45-.98 2.61-2.27 3.06a1 1 0 0 1-1.96.37l-.19-1a1 1 0 0 1 .98-1.18c.87 0 1.44-.63 1.44-1.25S12.68 9 11.81 9ZM13 16a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm7-10.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM18.5 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM7 18.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM5.5 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
                clipRule="evenodd"
            />
        </svg>
    );
}


export default ActivityTooltip;