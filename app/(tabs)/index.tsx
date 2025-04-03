import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';

// 爽やかな青のカラーパレット
const COLORS = {
  background: '#f0f9ff', // 明るい水色の背景
  card: '#ffffff',
  text: '#2c3e50',
  lightText: '#7f8c8d',
  primary: '#3498db', // 爽やかな青
  secondary: '#4bb6e8', // 明るい青
  accent: '#2ecc71', // 爽やかな緑
  highlight: '#e3f2fd', // 明るい青の背景
  border: '#e6f7ff',
};

export default function HomeScreen() {
  const router = useRouter();
  
  const goToCrowdMonitor = () => {
    router.push('/(tabs)/crowdMonitor');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: '混雑可視化',
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} 
      />
      
      <View style={styles.content}>
        {/* ヘッダーセクション */}
        <View style={styles.header}>
          <Text style={styles.title}>混雑度可視化</Text>
          <Text style={styles.subtitle}>
            店舗の混雑状況をリアルタイムで確認
          </Text>
        </View>
        
        {/* 統計カード */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>142%</Text>
            <Text style={styles.statLabel}>前日比</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>19:00</Text>
            <Text style={styles.statLabel}>ピーク時間</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>イベント数</Text>
          </View>
        </View>
        
        {/* メインアクションボタン */}
        <TouchableOpacity 
          style={styles.mainButton}
          onPress={goToCrowdMonitor}
        >
          <LinearGradient
            colors={[COLORS.primary, COLORS.secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          >
            <Text style={styles.buttonText}>混雑状況を確認</Text>
            <FontAwesome5 name="arrow-right" size={16} color="#ffffff" />
          </LinearGradient>
        </TouchableOpacity>
        
        {/* 情報カード */}
        <View style={styles.infoCard}>
          <View style={styles.infoIconContainer}>
            <FontAwesome5 name="info-circle" size={24} color={COLORS.primary} />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>本日のイベント</Text>
            <Text style={styles.infoDescription}>
              17:00〜19:00 B'zコンサート開催中
            </Text>
          </View>
        </View>
        
        {/* 天気カード */}
        <View style={styles.weatherCard}>
          <LinearGradient
            colors={[COLORS.secondary, COLORS.primary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.weatherGradient}
          >
            <View style={styles.weatherContent}>
              <FontAwesome5 name="cloud-sun" size={36} color="#ffffff" style={styles.weatherIcon} />
              <View>
                <Text style={styles.weatherTemp}>20°C / 13°C</Text>
                <Text style={styles.weatherDate}>6月13日（火）</Text>
              </View>
            </View>
          </LinearGradient>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 25,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.lightText,
    textAlign: 'center',
    marginBottom: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.lightText,
  },
  divider: {
    width: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: 10,
  },
  mainButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 25,
    elevation: 4,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  infoIconContainer: {
    marginRight: 15,
    justifyContent: 'center',
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 5,
  },
  infoDescription: {
    fontSize: 14,
    color: COLORS.lightText,
    lineHeight: 20,
  },
  weatherCard: {
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  weatherGradient: {
    padding: 20,
  },
  weatherContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherIcon: {
    marginRight: 20,
  },
  weatherTemp: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  weatherDate: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.9,
  },
});