import {IMAGE_URL} from '../../constants';
import {Buffer} from 'buffer';

export class ImageUtils {
  private static httpUrlPattern =
    /(http(s)?:\/\/.)(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/g;
  private static dataUrlPattern = /data:\S+\/\S+;base64,.*/g;
  private static thumbnailPostfix = '/thumbnail';

  public static getImage = (url: string): string => ImageUtils.handleUrl(url, false);

  public static getThumbnail = (url: string): string => ImageUtils.handleUrl(url, true);

  private static handleUrl = (url: string, isThumbnail: boolean): string => {
    return ImageUtils.isUrl(url) ? url : IMAGE_URL + url + (isThumbnail ? ImageUtils.thumbnailPostfix : '');
  };

  private static isUrl = (url: string): boolean => {
    const isHttpUrl = url.match(ImageUtils.httpUrlPattern) !== null;
    const isDataUrl = url.match(ImageUtils.dataUrlPattern) !== null;
    return isHttpUrl || isDataUrl;
  };

  public static blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => resolve(reader.result as string));
      reader.readAsArrayBuffer(blob);
    });
  };

  public static base64ToBlob = (base64: string): Blob => {
    let bytes = Buffer.from(base64, 'base64');
    return new Blob([bytes.toString()]);
  };

  public static base64ToUrl = (mime: string, base64: string): string => {
    return `data:${mime};base64,${base64}`;
  };
}
