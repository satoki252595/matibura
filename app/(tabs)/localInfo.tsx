import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView,
  Linking,
  ActivityIndicator
} from 'react-native';
import { Stack } from 'expo-router';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { localInfoDataService, dateUtils } from '../../services/dataService';

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
};

export default function LocalInfoScreen() {
  const [loading, setLoading] = useState(true);
  const [localInfoData, setLocalInfoData] = useState(null);
  const [formattedDate, setFormattedDate] = useState('');
  
  // 地域情報データを取得
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const data = await localInfoDataService.getLocalInfoData();
        setLocalInfoData(data);
        
        // 現在の日付をフォーマット
        const currentDate = new Date();
        setFormattedDate(dateUtils.getFormattedDate(currentDate));
      } catch (error) {
        console.error('Error fetching local info data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);
  
  // 電話をかける処理
  const handlePhoneCall = () => {
    if (localInfoData && localInfoData.contactInfo) {
      Linking.openURL(`tel:${localInfoData.contactInfo.phone}`);
    }
  };
  
  // メールを送る処理
  const handleEmail = () => {
    if (localInfoData && localInfoData.contactInfo) {
      Linking.openURL(`mailto:${localInfoData.contactInfo.email}`);
    }
  };
  
  // ウェブサイトを開く処理
  const handleWebsite = () => {
    if (localInfoData && localInfoData.contactInfo) {
      Linking.openURL(localInfoData.contactInfo.website);
    }
  };

  // ローディング中の表示
  if (loading || !localInfoData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>地域情報を読み込んでいます...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: '地域情報',
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} 
      />
      
      {/* 日付と天気表示 */}
      <View style={styles.dateWeatherContainer}>
        <Text style={styles.dateText}>{formattedDate}</Text>
        <View style={styles.weatherInfo}>
          <Ionicons name={localInfoData.weather.icon} size={18} color="#ffffff" />
          <Text style={styles.tempText}>{localInfoData.weather.temp}</Text>
        </View>
      </View>
      
      <ScrollView style={styles.scrollView}>
        {/* 地域情報セクション */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>地域情報</Text>
        </View>
        
        <View style={styles.infoItem}>
          {localInfoData.localInfoItems.map((item, index) => (
            <Text key={index} style={index === 0 ? styles.infoItemTitle : styles.infoItemDetail}>
              {item.title}
            </Text>
          ))}
        </View>
        
        {/* お問い合わせセクション */}
        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>お問合せ</Text>
          <View style={styles.contactButtons}>
            <TouchableOpacity style={styles.contactButton} onPress={handleEmail}>
              <Ionicons name="mail" size={20} color={COLORS.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactButton} onPress={handlePhoneCall}>
              <Ionicons name="call" size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.websiteButton} onPress={handleWebsite}>
            <Text style={styles.websiteButtonText}>公式ホームページ（他サイト遷移）</Text>
          </TouchableOpacity>
        </View>
        
        {/* 港区セクション */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>港区</Text>
        </View>
        
        <View style={styles.districtSection}>
          <Text style={styles.districtText}>{localInfoData.districtInfo.title}</Text>
        </View>
        
        {/* SNSアカウント */}
        <View style={styles.snsSection}>
          {localInfoData.snsAccounts.map((account, index) => (
            <View key={index} style={styles.snsAccount}>
              <View style={styles.snsIconContainer}>
                <FontAwesome5 name={account.icon} size={36} color={account.iconColor} />
              </View>
              <View style={styles.snsInfo}>
                <Text style={styles.snsName}>{account.name}</Text>
                {account.handle && <Text style={styles.snsHandle}>{account.handle}</Text>}
                {!account.handle && (
                  <TouchableOpacity style={styles.followButton}>
                    <Text style={styles.followButtonText}>フォロー</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: COLORS.text,
  },
  dateWeatherContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  weatherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tempText: {
    marginLeft: 8,
    color: '#ffffff',
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  sectionHeader: {
    backgroundColor: '#57606f',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginBottom: 16,
    marginTop: 16,
  },
  sectionHeaderText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  infoItem: {
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
  infoItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  infoItemDetail: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 6,
  },
  contactSection: {
    backgroundColor: COLORS.card,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 12,
  },
  contactButtons: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  contactButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.highlight,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  websiteButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  websiteButtonText: {
    color: '#ffffff',
    fontWeight: '500',
    fontSize: 14,
  },
  districtSection: {
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
  districtText: {
    fontSize: 16,
    color: COLORS.text,
  },
  snsSection: {
    marginBottom: 20,
  },
  snsAccount: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  snsIconContainer: {
    marginRight: 16,
  },
  snsInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  snsName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  snsHandle: {
    fontSize: 12,
    color: COLORS.lightText,
  },
  followButton: {
    backgroundColor: COLORS.highlight,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 15,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  followButtonText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '500',
  },
});