import getTrash from '../(scrapers)/getTrash';
import type { NextApiRequest, NextApiResponse } from 'next';

const Trash = async (req: NextApiRequest, res: NextApiResponse) => {

    switch (req.method) {
        case "POST":
            getTrash(req.body)
            res.json({hello: 'bitch'})
          break;
        case "GET":
          break;
      }

}

export default Trash