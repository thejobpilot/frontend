import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import FormData from "form-data";
import formidable from "formidable";
import fs from "fs";
import api from "@/utils/utils";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function addVideoResponse(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const form = new formidable.IncomingForm();
  const responseId: number = parseInt(req.query.responseId as string);
  const questionId: number = parseInt(req.query.questionId as string);
  form.parse(req, async (err: any, fields: any, files: any) => {
    if (err) {
      console.error("Error parsing form data:", err);
      res.status(500).send("Internal Server Error: Error parsing form data");
      return;
    }

    const videoBlob = files.video;
    // Read the file as a Buffer
    const fileBuffer = fs.readFileSync(videoBlob.filepath);

    // Create a FormData object using the form-data library
    const formData = new FormData();
    formData.append("file", fileBuffer, "uploaded_video");

    try {
      const response = await api.post(
        `/response/${responseId}/question/${questionId}/videoanswer`
      );
      if (!response.ok) {
        console.log("Failed to create videoanswer", response?.data);
        res.status(500).send(`Internal Server Error: ${response?.data}`);
        return;
      }
      console.log("VIDEO ID: ");
      console.log(response.data);
      // @ts-ignore
      let id = response.data!!.id;
      const uploadResponse = await api.post(
        `/response/${responseId}/question/${questionId}/videoanswer/upload-video?id=${id}`,
        formData,
        {
          headers: {
            ...formData.getHeaders(),
          },
        }
      );

      if (uploadResponse.ok) {
        res.status(200).send(uploadResponse.data);
      } else {
        console.log("fail", uploadResponse?.data);
        res.status(500).send(`Internal Server Error: ${uploadResponse?.data}`);
      }
    } catch (error) {
      console.error("Error making request:", error);
      res.status(500).send("Internal Server Error: Error making request");
    }
  });
}
