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
import { Stack, useRouter } from 'expo-router';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { eventDataService, dateUtils } from '../../services/dataService';

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
  eventColor: '#3498db',
  calendarColor: '#2ecc71',
};

// イベントのタイプ
interface Event {
  id: string;
  title: string;
  time: string;
  venue?: string;
  type: 'festival' | 'performance' | 'traditional';
}

// イベントセクション
interface EventSection {
  id: string;
  title: string;
  events: Event[];
}

export default function EventTourismScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [eventData, setEventData] = useState(null);
  const [formattedDate, setFormattedDate] = useState('');
  
  // イベントデータを取得
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const data = await eventDataService.getEventData();
        setEventData(data);
        
        // 現在の日付をフォーマット
        const currentDate = new Date();
        setFormattedDate(dateUtils.getFormattedDate(currentDate));
      } catch (error) {
        console.error('Error fetching event data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);
  
  // ウェブサイトを開く処理
  const handleWebsite = () => {
    Linking.openURL('https://www.city.minato.tokyo.jp/');
  };
  
  // 混雑状況ページに遷移する処理
  const handleCrowdCheck = (event: Event) => {
    router.push({
      pathname: '/(tabs)/crowdMonitor',
      params: { 
        eventId: event.id,
        eventTitle: event.title
      }
    });
  };

  // ローディング中の表示
  if (loading || !eventData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>イベントデータを読み込んでいます...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'イベント・観光情報',
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
          <Ionicons name={eventData.weather.icon} size={18} color="#ffffff" />
          <Text style={styles.tempText}>{eventData.weather.temp}</Text>
        </View>
      </View>
      
      <ScrollView style={styles.scrollView}>
        {/* イベント情報 */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>イベント・観光情報</Text>
        </View>
        
        {eventData.eventSections.map((section) => (
          <View key={section.id} style={styles.eventSection}>
            <Text style={styles.eventSectionTitle}>{section.title}</Text>
            
            {section.events.map((event) => (
              <View key={event.id} style={styles.eventItem}>
                <View style={styles.timeContainer}>
                  <Text style={styles.timeText}>{event.time}</Text>
                </View>
                <View style={styles.eventDetails}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  
                  <TouchableOpacity 
                    style={styles.crowdButton}
                    onPress={() => handleCrowdCheck(event)}
                  >
                    <FontAwesome5 name="users" size={12} color={COLORS.lightText} style={styles.crowdIcon} />
                    <Text style={styles.crowdButtonText}>混雑状況</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        ))}
        
        {/* 公式サイトリンク */}
        <TouchableOpacity style={styles.websiteButton} onPress={handleWebsite}>
          <Text style={styles.websiteButtonText}>公式ホームページ（他サイト遷移）</Text>
        </TouchableOpacity>
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
  },
  sectionHeaderText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  eventSection: {
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
  eventSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 16,
  },
  eventItem: {
    flexDirection: 'row',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  timeContainer: {
    width: 100,
    marginRight: 12,
  },
  timeText: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '500',
  },
  eventDetails: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '500',
    marginBottom: 6,
  },
  crowdButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  crowdIcon: {
    marginRight: 4,
  },
  crowdButtonText: {
    fontSize: 12,
    color: COLORS.lightText,
  },
  websiteButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'center',
    marginVertical: 16,
  },
  websiteButtonText: {
    color: '#ffffff',
    fontWeight: '500',
    fontSize: 14,
  },
});