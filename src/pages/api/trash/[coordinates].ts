import type { NextApiRequest, NextApiResponse } from 'next';

const Alerts = async (req: NextApiRequest, res: NextApiResponse) => {

    let {coordinates} = req.query
    coordinates = coordinates?.toString()
    let split = coordinates!.split(',')
    console.log('split: ', split)

    switch (req.method) {
        case "POST":
          break;
        case "GET":

          break;
      }

}

export default Alerts