import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const Bucket = process.env.BACKBLAZE_BUCKET;
const s3 = new S3Client({
  endpoint: process.env.BACKBLAZE_ENDPOINT,
  region: process.env.BACKBLAZE_REGION,
  credentials: {
    accessKeyId: process.env.BACKBLAZE_APPLICATION_ID as string,
    secretAccessKey: process.env.BACKBLAZE_APPLICATION_KEY as string,
  },
});

export async function uploadFile(file: File) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileName = crypto.randomUUID();

    const res = await s3.send(
      new PutObjectCommand({
        Bucket: Bucket,
        Key: fileName,
        Body: buffer,
        ContentType: "image/png",
      }),
    );

    if (res.$metadata.httpStatusCode !== 200) {
      throw new Error("버킷에 업로드가 실패했습니다.");
    }

    const imgUrl = `${process.env.APP_URL}/api/media/${fileName}`;

    return imgUrl;
  } catch (err) {
    if (err instanceof Error) console.error(err.message);
  }
}
