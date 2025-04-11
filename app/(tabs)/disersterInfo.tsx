import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView,
  Linking,
  Image
} from 'react-native';
import { Stack } from 'expo-router';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

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
  darkGrey: '#57606f',
  alert: '#e74c3c', // 警告色
  alertLight: '#fadbd8', // 薄い警告色
  safe: '#2ecc71', // 安全色
  safeLight: '#d5f5e3', // 薄い安全色
};

export default function DisasterInfoScreen() {
  const currentDate = new Date();
  const formattedTime = `${currentDate.getHours()}:${String(currentDate.getMinutes()).padStart(2, '0')}`;
  
  // SNSリンクを開く
  const openTwitter = () => {
    Linking.openURL('https://twitter.com/minato_city');
  };
  
  const openLine = () => {
    Linking.openURL('https://line.me/ti/p/@minatocity');
  };
  
  // 現在地地図を開く
  const openCurrentLocationMap = () => {
    // 実際のアプリでは現在位置の取得処理を入れる
    alert('現在地の地図を表示します');
  };
  
  // 避難所地図を開く
  const openEvacuationMap = () => {
    alert('避難所の地図を表示します');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: '防災情報',
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} 
      />
      
      <View style={styles.headerContainer}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>その他緊急情報</Text>
          <Text style={styles.headerTime}>{formattedTime}</Text>
        </View>
        <Text style={styles.emergencyNotice}>
          住宅火災が消⽕！
          <Text style={styles.subNotice}>（東京消防庁からのお知らせ）</Text>
        </Text>
      </View>
      
      <ScrollView style={styles.scrollView}>
        {/* 防災情報 */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>防災情報</Text>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>避難情報：</Text>
            <Text style={styles.infoValue}>現在ありません</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>避難所：</Text>
            <Text style={styles.infoValue}>麻布図書館一時滞在施設</Text>
          </View>
        </View>
        
        {/* 地図ボタン */}
        <View style={styles.mapButtonsContainer}>
          <TouchableOpacity 
            style={styles.mapButton}
            onPress={openCurrentLocationMap}
          >
            <FontAwesome5 name="map-marker-alt" size={20} color="#e74c3c" />
            <Text style={styles.mapButtonText}>現在地から探す</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.mapButton}
            onPress={openEvacuationMap}
          >
            <FontAwesome5 name="map" size={20} color="#3498db" />
            <Text style={styles.mapButtonText}>所在地を設定</Text>
          </TouchableOpacity>
        </View>
        
        {/* 気象情報 */}
        <View style={styles.weatherSection}>
          <View style={styles.weatherTitleRow}>
            <Text style={styles.weatherTitle}>港区気象情報：</Text>
            <Text style={styles.weatherStatus}>あり</Text>
          </View>
          
          <View style={styles.warningContainer}>
            <Text style={styles.warningLabel}>【警報】</Text>
            <Text style={styles.warningValue}>なし</Text>
          </View>
          
          <View style={styles.warningContainer}>
            <Text style={styles.warningLabel}>【注意報】</Text>
            <Text style={styles.warningValue}>乾燥</Text>
          </View>
        </View>
        
        {/* 防災SNS */}
        <View style={styles.snsSection}>
          <Text style={styles.snsTitle}>港区防災SNS</Text>
          
          <View style={styles.snsAccount}>
            <View style={styles.snsIconContainer}>
              <FontAwesome5 name="twitter" size={36} color="#1DA1F2" />
            </View>
            <View style={styles.snsInfo}>
              <Text style={styles.snsName}>港区防災情報</Text>
              <Text style={styles.snsHandle}>@minato_city</Text>
            </View>
          </View>
          
          <View style={styles.snsButtonsContainer}>
            <TouchableOpacity 
              style={styles.snsButton}
              onPress={openTwitter}
            >
              <Text style={styles.snsButtonText}>X ポスト</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.snsButton, styles.lineButton]}
              onPress={openLine}
            >
              <Text style={styles.snsButtonText}>LINE で送る</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerContainer: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  headerTime: {
    fontSize: 16,
    color: COLORS.text,
  },
  emergencyNotice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.alert,
  },
  subNotice: {
    fontSize: 14,
    fontWeight: 'normal',
    color: COLORS.lightText,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  infoSection: {
    backgroundColor: COLORS.card,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: COLORS.lightText,
    width: 80,
  },
  infoValue: {
    fontSize: 14,
    color: COLORS.text,
    flex: 1,
  },
  mapButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  mapButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 6,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  mapButtonText: {
    fontSize: 14,
    color: COLORS.text,
    marginLeft: 8,
  },
  weatherSection: {
    backgroundColor: COLORS.card,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  weatherTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  weatherTitle: {
    fontSize: 14,
    color: COLORS.text,
  },
  weatherStatus: {
    fontSize: 14,
    color: COLORS.accent,
    fontWeight: '600',
  },
  warningContainer: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  warningLabel: {
    fontSize: 14,
    color: COLORS.lightText,
    width: 70,
  },
  warningValue: {
    fontSize: 14,
    color: COLORS.text,
  },
  snsSection: {
    backgroundColor: COLORS.card,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  snsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 12,
  },
  snsAccount: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  snsIconContainer: {
    marginRight: 12,
  },
  snsInfo: {
    justifyContent: 'center',
  },
  snsName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  snsHandle: {
    fontSize: 12,
    color: COLORS.lightText,
  },
  snsButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  snsButton: {
    flex: 1,
    backgroundColor: '#1DA1F2',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  lineButton: {
    backgroundColor: '#06C755',
  },
  snsButtonText: {
    color: '#ffffff',
    fontWeight: '500',
    fontSize: 14,
  },
});