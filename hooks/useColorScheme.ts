import { useColorScheme as _useColorScheme } from 'react-native';

// useColorSchemeの拡張バージョン
// デフォルトでライトモードを強制することもできます
export default function useColorScheme(): 'light' | 'dark' {
  // 爽やかな青ベースのデザインのため、常にライトモードを返すこともできます
  // return 'light';
  
  // またはシステムの設定を使用
  return _useColorScheme() || 'light';
}