import { ResponseData, ResponseError } from "@/interfaces";

import { NextApiRequest, NextApiResponse } from 'next';

const data: ResponseData = {
  success: true,
  message: '🖤',
  data: {
    timestamp: new Date().toISOString(),
  },
};

export default (
  request: NextApiRequest,
  response: NextApiResponse<ResponseData|ResponseError>
) => {
  try {
    response.send(data);
  } catch (error) {
    response.status(500);
  }
}
