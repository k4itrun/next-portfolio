import { Repository } from "@/interfaces";
import {metaConfig} from '@k4itrunconfig';

import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async (
    request: NextApiRequest,
    response: NextApiResponse
): Promise<void> => {
    let repos: Repository[] | null = null;
    try {
        const res = await axios.get(`https://api.github.com/users/${metaConfig.accounts.github.username}/repos`);
        repos = res?.data;
        response.send(repos);
    } catch (error) {
        response.status(500);
    }
}