import type { NextApiRequest, NextApiResponse } from 'next';

const Alerts = async (req: NextApiRequest, res: NextApiResponse) => {

    let {coordinates} = req.query
    coordinates = coordinates?.toString()
    let split = coordinates!.split(',')

    const result = await fetch (`https://maps.googleapis.com/maps/api/geocode/json?latlng=${split[0]},${split[1]}&key=${process.env.GOOGLE_MAPS_API_KEY}`, { });
    const response = await result.json()

    switch (req.method) {
        case "POST":
          break;
        case "GET":
          res.json(response.results[0]);
          break;
      }

}

export default Alerts