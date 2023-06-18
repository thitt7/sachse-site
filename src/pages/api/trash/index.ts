import getTrash from '../(scrapers)/getTrash';
import type { NextApiRequest, NextApiResponse } from 'next';

const Trash = async (req: NextApiRequest, res: NextApiResponse) => {
  const {address} = req.query

    switch (req.method) {
        case "POST":
          break;
        case "GET":
            const tableData = await getTrash(address as string)
            if (!tableData[0].length) {res.status(204).json({ error: 'failed to fetch data' })}
            else {res.json(tableData)}
          break;
      }

}

export default Trash