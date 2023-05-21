import getTrash from '../(scrapers)/getTrash';
import type { NextApiRequest, NextApiResponse } from 'next';

const Trash = async (req: NextApiRequest, res: NextApiResponse) => {

    switch (req.method) {
        case "POST":
            const tableData = await getTrash(req.body)
            console.log('tabledata: ',tableData)
            if (!tableData[0].length) {res.status(204).json({ error: 'failed to fetch data' })}
            else {res.json(tableData)}
          break;
        case "GET":
          break;
      }

}

export default Trash