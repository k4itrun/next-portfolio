import { LanyardResponse } from "@/interfaces";
import { metaConfig } from '@k4itrunconfig';

import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async (
    request: NextApiRequest,
    response: NextApiResponse
): Promise<void> => {
    let lanyard: LanyardResponse | null = null;

    try {
        const res = await axios.get(`https://api.lanyard.rest/v1/users/${metaConfig.accounts.discord.id}`);
        lanyard = res?.data?.data;
        response.send(lanyard);
    } catch (error) {
        response.status(500);
    }
};
