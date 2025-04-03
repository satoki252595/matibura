import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface CrowdIndicatorProps {
  level: boolean[];
  size?: number;
  color?: string;
}

/**
 * 混雑度を人アイコンで表示するコンポーネント
 * @param level 混雑度の配列（trueで表示、falseで薄く表示）
 * @param size アイコンサイズ（デフォルト: 24）
 * @param color アイコンの色（デフォルト: #666）
 */
export default function CrowdIndicator({ 
  level, 
  size = 24, 
  color = '#666' 
}: CrowdIndicatorProps) {
  return (
    <View style={styles.container}>
      {level.map((isActive, index) => (
        <View
          key={index}
          style={[
            styles.iconContainer,
            { opacity: isActive ? 1 : 0.2 }
          ]}
        >
          <MaterialCommunityIcons
            name="account"
            size={size}
            color={color}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginHorizontal: 2,
  },
});