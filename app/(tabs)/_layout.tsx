import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';

// 爽やかな青をベースにしたカラースキーム
const Colors = {
  light: {
    background: '#f0f9ff', // 明るい水色の背景
    card: '#ffffff',
    text: '#2c3e50',
    tint: '#3498db', // 爽やかな青
    tabBar: '#ffffff',
    tabIconDefault: '#a0d2eb',
    tabIconSelected: '#3498db',
    accent: '#2ecc71', // 爽やかな緑（アクセント）
  },
  dark: {
    background: '#e3f2fd', // 明るい青の背景
    card: '#ffffff',
    text: '#2c3e50',
    tint: '#3498db', // 爽やかな青
    tabBar: '#ffffff',
    tabIconDefault: '#a0d2eb',
    tabIconSelected: '#3498db',
    accent: '#2ecc71', // 爽やかな緑（アクセント）
  }
};

/**
 * タブレイアウトの関数コンポーネント
 * 爽やかな青をベースにしたデザイン
 */
function TabLayout() {
  const colorScheme = useColorScheme();
  // 爽やかな青のテーマを強制適用するため、ダークモードでも light テーマを使用
  const theme = Colors.light;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.tint,
        tabBarInactiveTintColor: theme.tabIconDefault,
        tabBarStyle: {
          backgroundColor: theme.tabBar,
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 60,
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontWeight: '600',
          fontSize: 12,
        },
        headerStyle: {
          backgroundColor: theme.tint, // ヘッダーを爽やかな青に
          shadowColor: 'transparent',
          elevation: 0,
          borderBottomWidth: 0,
        },
        headerTintColor: '#ffffff', // ヘッダーテキストは白
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'ホーム',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="crowdMonitor"
        options={{
          title: '混雑予測',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="bar-chart" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

export default TabLayout;