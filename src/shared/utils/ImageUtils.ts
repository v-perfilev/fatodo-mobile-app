import {API_CONFIG, IMAGE_PATH} from '../../constants';
import {Platform} from 'react-native';

export class ImageUtils {
  private static httpUrlPattern = /(http(s)?:\/\/)(.*)/g;
  private static fileUrlPattern = /(file:\/\/)(.*)/g;
  private static thumbnailPostfix = '/thumbnail';

  public static buildImageUri = (url: string, isThumbnail: boolean): string => {
    return API_CONFIG.baseUrl + IMAGE_PATH + url + (isThumbnail ? ImageUtils.thumbnailPostfix : '');
  };

  public static isUrl = (url: string): boolean => {
    const isHttpUrl = url.match(ImageUtils.httpUrlPattern) !== null;
    const isFileUrl = url.match(ImageUtils.fileUrlPattern) !== null;
    return isHttpUrl || isFileUrl;
  };

  public static convertPathToUri = (path: string): string => (Platform.OS === 'ios' ? `file:///${path}` : path);

  public static convertPathToContent = (path: string): any => ({
    uri: Platform.OS === 'ios' ? `file:///${path}` : path,
    type: 'image/jpeg',
    name: 'image.jpg',
  });
}
