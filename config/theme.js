import {Dimensions, PixelRatio} from 'react-native';

export const {width, height} = Dimensions.get('window');

export const widthToDp = number => {
  let actualWidth = typeof number === 'number' ? number : parseFloat(number);
  return PixelRatio.roundToNearestPixel((width * actualWidth) / 100);
};

export const heightToDp = number => {
  let actualHeight = typeof number === 'number' ? number : parseFloat(number);
  return PixelRatio.roundToNearestPixel((width * actualHeight) / 100);
};

export const ITEM_WIDTH = width * 0.71;
export const ITEM_HEIGHT = height * 0.2;
export const SPACING = 16;
export const ICON_SIZE = 65;
export const ICON_MED_SIZE = 52;
export const FULL_SIZE = width + SPACING * 0.1;

export const BANNER_H = heightToDp('70%');
export const TOPNAVI_H = 50;
