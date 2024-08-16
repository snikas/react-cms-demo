import DOMPurify from 'dompurify';

export default async function getS3Content(s3path) {
    const response = await fetch(s3path);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const s3dataText = await response.text();
    return DOMPurify.sanitize(s3dataText);
}