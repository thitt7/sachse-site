import type { NextApiRequest, NextApiResponse } from 'next';
import getWeather from './getWeather';

const News = async (req: NextApiRequest, res: NextApiResponse) => {
    
    const weather = await getWeather();

    switch (req.method) {
        case "POST":
          break;
        case "GET":
            res.json(weather);
          break;
      }

}

export default News