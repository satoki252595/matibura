import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

// SplashScreen関連のコードを削除または正しくインポート
// import * as SplashScreen from 'expo-splash-screen';
// SplashScreen.preventAutoHideAsync(); 

export default function RootLayout() {
  const colorScheme = useColorScheme();
  
  // アプリの準備ができたらスプラッシュ画面を非表示にする代替コード
  React.useEffect(() => {
    // ここでアプリの初期化（フォントのロードなど）を行えます
    // 従来のスプラッシュ画面制御はExpo Router内で自動的に処理されます
  }, []);

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#3498db', // 爽やかな青
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    />
  );
}