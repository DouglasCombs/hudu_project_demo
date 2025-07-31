const imageExtension = ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd'];
const videoExtension = [
  'mp4',
  'm4a',
  'fmp4',
  'flv',
  'mkv',
  'mov',
  'wmv',
  'avi',
  'avchd',
  'f4v',
  'swf',
];
export function getFileExtension(url: string) {
  if (url) {
    const fileExtension = url?.slice(
      (Math.max(0, url.lastIndexOf('.')) || Infinity) + 1,
    );

    if (imageExtension.includes(fileExtension.toLowerCase())) {
      return formats.Image;
    } else if (videoExtension.includes(fileExtension.toLowerCase())) {
      return formats.Video;
    } else {
      return formats.None;
    }
  } else {
    return formats.None;
  }
}
enum formats {
  Image = 'image',
  Video = 'video',
  None = 'none',
}
