import {IMAGE_API_URL} from '../../constants';

export class ImageUtils {
  private static thumbnailPostfix = '/thumbnail';

  public static getImage = (url: string): string => ImageUtils.handleUrl(url, false);

  public static getThumbnail = (url: string): string => ImageUtils.handleUrl(url, true);

  private static handleUrl = (url: string, isThumbnail: boolean): string => {
    return ImageUtils.isUrl(url) ? url : IMAGE_API_URL + url + (isThumbnail ? ImageUtils.thumbnailPostfix : '');
  };

  private static isUrl = (url: string): boolean => {
    const res = url.match(
      /(http(s)?:\/\/.)(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/g,
    );
    return res !== null;
  };

  public static blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => resolve(reader.result as string));
      reader.readAsArrayBuffer(blob);
    });
  };
}
