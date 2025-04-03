// constants/Colors.ts

// デフォルトのテーマカラー
const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

// フォールバック値を含む色定義
export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
  // フォールバック値（テーマが undefined の場合に使用）
  default: {
    text: '#000',
    background: '#fff',
    tint: '#3498db',
    tabIconDefault: '#ccc',
    tabIconSelected: '#3498db',
  }
};