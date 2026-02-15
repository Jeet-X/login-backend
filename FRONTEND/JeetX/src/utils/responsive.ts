import { Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const scale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;

/**
 * Height Percentage
 * @param percentage string or number
 * @returns calculated height
 */
const hp = (percentage: number) => {
    return Math.round((percentage * height) / 100);
};

/**
 * Width Percentage
 * @param percentage string or number
 * @returns calculated width
 */
const wp = (percentage: number) => {
    return Math.round((percentage * width) / 100);
};

export { scale, verticalScale, moderateScale, hp, wp, width, height };
