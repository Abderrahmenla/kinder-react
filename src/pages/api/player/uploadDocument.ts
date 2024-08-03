import { NextApiRequest, NextApiResponse } from 'next';
import { AxiosError } from 'axios';
import FormData from 'form-data';
import { ErrorResponse } from '../types';
import createAxiosInstance from '../../../services/serverAxios';
import { CustomError } from '@/utils/ErrorClass';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = createAxiosInstance(req, res);
  if (req.method === 'POST') {
    const form = formidable({ multiples: true });

    try {
      const { files, fields }: any = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          else {
            resolve({ fields, files });
          }
        });
      });

      const file = Array.isArray(files.file) ? files.file[0] : files.file;
      const formData = new FormData();
      formData.append('request', fs.createReadStream(file.filepath), {
        filename: file.originalFilename,
        contentType: file.mimetype,
        knownLength: file.size
      });

      const config = {
        headers: {
          ...formData.getHeaders()
        },
        params: {
          DocumentCategory: fields.DocumentCategory[0]
        }
      };
      await client.post('/player/document', formData, config);

      res.status(200).json({ message: 'Player data uploaded successfully' });
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.status).json({ error: error.message });
        return;
      }
      const axiosError = error as AxiosError<ErrorResponse>;

      if (axiosError.response) {
        const status = axiosError.response.status;
        if (status === 413) {
          res.status(status).json({ errorMessage: 'Request Entity Too Large' });
          return;
        }

        const isClientError = status >= 400 && status < 500;

        res.status(isClientError ? status : 500).json(axiosError.response.data);
        return;
      }

      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
