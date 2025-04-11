import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
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

// イベントタイプ
const EventType = {
  NEARBY: '近隣施設・店舗',
  EVENT: 'イベント・観光',
  AREA: '地域',
  DISASTER: '防災'
};

// モックデータ
const eventsData = [
  {
    id: '1',
    type: EventType.EVENT,
    title: 'シーバンス夏祭り',
    time: '17:00 ~ 21:00',
    location: 'シーバンスアモール',
    date: '2024-07-26'
  },
  {
    id: '2',
    type: EventType.EVENT,
    title: '地蔵尊盆踊り大会',
    time: '17:00 ~ 20:00',
    location: '増上寺',
    date: '2024-07-26'
  },
  {
    id: '3',
    type: EventType.NEARBY,
    title: 'Hi-NODE BLUE SUMMER FES 2024',
    time: '開催!',
    location: '',
    date: '2024-08-02'
  }
];

export default function HomeScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('all');
  const currentDate = new Date();
  const formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}(${getDayOfWeek(currentDate)})`;
  
  // 曜日を取得する関数
  function getDayOfWeek(date) {
    const days = ['日', '月', '火', '水', '木', '金', '土'];
    return days[date.getDay()];
  }
  
  // イベントタイプでフィルタリングする関数
  const getFilteredEvents = () => {
    if (activeFilter === 'all') return eventsData;
    return eventsData.filter(event => event.type === activeFilter);
  };
  
  // イベントカードをタップした時の処理
  const handleEventPress = (event) => {
    router.push({
      pathname: '/(tabs)/crowdMonitor',
      // 必要に応じてパラメータを渡す
      params: { 
        eventId: event.id,
        eventTitle: event.title
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: '街ぶら',
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
          <FontAwesome5 name="sun" size={18} color="#ffffff" />
          <Text style={styles.tempText}>35/25°C</Text>
        </View>
      </View>
      
      {/* カテゴリーフィルター */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        <TouchableOpacity 
          style={[styles.filterButton, activeFilter === 'all' && styles.activeFilter]} 
          onPress={() => setActiveFilter('all')}
        >
          <Text style={[styles.filterText, activeFilter === 'all' && styles.activeFilterText]}>すべて</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, activeFilter === EventType.NEARBY && styles.activeFilter]} 
          onPress={() => setActiveFilter(EventType.NEARBY)}
        >
          <Text style={[styles.filterText, activeFilter === EventType.NEARBY && styles.activeFilterText]}>近隣施設・店舗</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, activeFilter === EventType.EVENT && styles.activeFilter]} 
          onPress={() => setActiveFilter(EventType.EVENT)}
        >
          <Text style={[styles.filterText, activeFilter === EventType.EVENT && styles.activeFilterText]}>イベント・観光</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, activeFilter === EventType.AREA && styles.activeFilter]} 
          onPress={() => setActiveFilter(EventType.AREA)}
        >
          <Text style={[styles.filterText, activeFilter === EventType.AREA && styles.activeFilterText]}>地域</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, activeFilter === EventType.DISASTER && styles.activeFilter]} 
          onPress={() => setActiveFilter(EventType.DISASTER)}
        >
          <Text style={[styles.filterText, activeFilter === EventType.DISASTER && styles.activeFilterText]}>防災</Text>
        </TouchableOpacity>
      </ScrollView>
      
      {/* イベントリスト */}
      <ScrollView style={styles.eventListContainer}>
        {getFilteredEvents().map((event, index) => (
          <TouchableOpacity 
            key={event.id} 
            style={styles.eventCard}
            onPress={() => handleEventPress(event)}
          >
            <View style={styles.eventHeader}>
              <View style={styles.categoryTag}>
                <FontAwesome5 
                  name={
                    event.type === EventType.EVENT ? 'calendar-alt' : 
                    event.type === EventType.NEARBY ? 'store' : 
                    event.type === EventType.AREA ? 'map-marker-alt' : 'exclamation-triangle'
                  } 
                  size={12} 
                  color="#ffffff" 
                />
                <Text style={styles.categoryText}>{event.type}</Text>
              </View>
            </View>
            
            <Text style={styles.eventTitle}>{event.title}</Text>
            
            <View style={styles.eventDetails}>
              {event.time && (
                <View style={styles.detailRow}>
                  <FontAwesome5 name="clock" size={14} color={COLORS.primary} style={styles.detailIcon} />
                  <Text style={styles.detailText}>{event.time}</Text>
                </View>
              )}
              
              {event.location && (
                <View style={styles.detailRow}>
                  <FontAwesome5 name="map-marker-alt" size={14} color={COLORS.primary} style={styles.detailIcon} />
                  <Text style={styles.detailText}>{event.location}</Text>
                </View>
              )}
            </View>
            
            <View style={styles.cardFooter}>
              <Text style={styles.viewMoreText}>混雑状況を確認</Text>
              <FontAwesome5 name="chevron-right" size={12} color={COLORS.lightText} />
            </View>
          </TouchableOpacity>
        ))}
        
        {getFilteredEvents().length === 0 && (
          <View style={styles.noEventsContainer}>
            <FontAwesome5 name="calendar-times" size={48} color={COLORS.lightText} />
            <Text style={styles.noEventsText}>イベントがありません</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
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
  filterContainer: {
    backgroundColor: COLORS.card,
    paddingVertical: 12,
  },
  filterContent: {
    paddingHorizontal: 12,
  },
  filterButton: {
    height: 35,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginHorizontal: 2,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  activeFilter: {
    backgroundColor: COLORS.primary,
  },
  filterText: {
    fontSize: 12,
    color: COLORS.text,
  },
  activeFilterText: {
    color: '#ffffff',
    fontWeight: '500',
  },
  eventListContainer: {

    padding: 16,
  },
  eventCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  eventHeader: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  categoryTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  categoryText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 5,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 12,
  },
  eventDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailIcon: {
    width: 20,
    textAlign: 'center',
    marginRight: 8,
  },
  detailText: {
    fontSize: 14,
    color: COLORS.text,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 10,
  },
  viewMoreText: {
    fontSize: 13,
    color: COLORS.lightText,
  },
  noEventsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  noEventsText: {
    marginTop: 16,
    fontSize: 16,
    color: COLORS.lightText,
  }
});