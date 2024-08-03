/* eslint-disable @typescript-eslint/no-explicit-any */
export function transformUploadUrls(imageURL: string | undefined) {
  return imageURL
    ? imageURL.startsWith('/upload')
      ? `https://cms.spinbet.com${imageURL}`
      : imageURL
    : '';
}
