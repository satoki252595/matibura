import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Animated,
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import CrowdIndicator from '../../components/CrowdIndicator';
import { CrowdLineChart, CrowdBarChart } from '../../components/CrowdChart';
import { CrowdData, HourlyTrendData, DailyComparisonData } from '../../types/crowd';

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
  tabActive: '#e3f2fd',
  tabInactive: '#ffffff',
};

export default function CrowdMonitorScreen() {
  const [activeTab, setActiveTab] = useState('overview');
  
  // アニメーション用のState
  const [fadeAnim] = useState(new Animated.Value(1));

  // タブ切り替え時のアニメーション
  const changeTab = (tab: string) => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      })
    ]).start();
    
    setActiveTab(tab);
  };

  // サンプルデータ
  const data: CrowdData = {
    date: '6/13(火)',
    weather: {
      icon: 'umbrella',
      temp: '20/13°C',
    },
    event: {
      time: '17〜19時',
      name: 'B\'z',
      number: 1,
    },
    crowdness: {
      percentage: '140%',
      label: '前日比',
    },
    hourlyPrediction: [
      { hour: '16時', crowd: [true, false, false, false], value: 25 },
      { hour: '17時', crowd: [false, false, false, false], value: 10 },
      { hour: '18時', crowd: [false, false, false, false], value: 15 },
      { hour: '19時', crowd: [true, true, false, false], value: 50 },
      { hour: '20時', crowd: [true, true, true, true], value: 100 },
    ],
    restaurantAdvice: 'シフトを減らして！',
    customerAdvice: '夜ご飯は18時台に！',
    storeName: '焼肉XX屋',
  };

  // 時間推移グラフのデータ
  const hourlyTrendData: HourlyTrendData[] = [
    { hour: '15時', average: 20, predicted: 15 },
    { hour: '16時', average: 25, predicted: 25 },
    { hour: '17時', average: 15, predicted: 10 },
    { hour: '18時', average: 20, predicted: 15 },
    { hour: '19時', average: 45, predicted: 50 },
    { hour: '20時', average: 80, predicted: 100 },
    { hour: '21時', average: 60, predicted: 75 },
    { hour: '22時', average: 40, predicted: 35 },
  ];

  // 日別比較グラフのデータ
  const dailyComparisonData: DailyComparisonData[] = [
    { name: '17時', today: 10, yesterday: 15, lastWeek: 25 },
    { name: '18時', today: 15, yesterday: 20, lastWeek: 30 },
    { name: '19時', today: 50, yesterday: 35, lastWeek: 45 },
    { name: '20時', today: 100, yesterday: 70, lastWeek: 80 },
    { name: '21時', today: 75, yesterday: 55, lastWeek: 60 },
  ];

  return (
    <>
      <Stack.Screen 
        options={{
          title: '混雑予測',
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerShadowVisible: false,
        }} 
      />

      <View style={styles.container}>
        {/* 日付と天気 */}
        <View style={styles.dateWeatherContainer}>
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>{data.date}</Text>
            <View style={styles.eventTag}>
              <FontAwesome5 name="calendar-alt" size={12} color="#ffffff" style={styles.eventIcon} />
              <Text style={styles.eventText}>{data.event.name}</Text>
            </View>
          </View>
          <View style={styles.weatherContainer}>
            <Ionicons name={data.weather.icon as any} size={28} color="#ffffff" />
            <Text style={styles.tempText}>{data.weather.temp}</Text>
          </View>
        </View>

        {/* タブナビゲーション */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[
              styles.tab, 
              activeTab === 'overview' ? [styles.activeTab] : {}
            ]} 
            onPress={() => changeTab('overview')}
          >
            <Text style={[
              styles.tabText, 
              activeTab === 'overview' ? styles.activeTabText : {}
            ]}>概要</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.tab, 
              activeTab === 'trends' ? [styles.activeTab] : {}
            ]} 
            onPress={() => changeTab('trends')}
          >
            <Text style={[
              styles.tabText, 
              activeTab === 'trends' ? styles.activeTabText : {}
            ]}>トレンド</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.tab, 
              activeTab === 'comparison' ? [styles.activeTab] : {}
            ]} 
            onPress={() => changeTab('comparison')}
          >
            <Text style={[
              styles.tabText, 
              activeTab === 'comparison' ? styles.activeTabText : {}
            ]}>比較</Text>
          </TouchableOpacity>
        </View>

        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View style={{ opacity: fadeAnim }}>
            {activeTab === 'overview' && (
              <View>
                {/* 混雑予報カード */}
                <View style={styles.card}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>混雑予報</Text>
                    <View style={styles.percentageContainer}>
                      <Text style={styles.percentageLabel}>{data.crowdness.label}</Text>
                      <Text style={styles.percentageValue}>{data.crowdness.percentage}</Text>
                    </View>
                  </View>

                  <Text style={styles.sectionTitle}>{data.storeName}の来訪予測</Text>

                  {/* 時間別予測 */}
                  <View style={styles.tableContainer}>
                    {data.hourlyPrediction.map((hourData, index) => (
                      <View key={index} style={styles.tableRow}>
                        <View style={styles.tableCell}>
                          <Text style={styles.hourText}>{hourData.hour}</Text>
                        </View>
                        <View style={styles.tableCellIcons}>
                          <CrowdIndicator level={hourData.crowd} color="#3498db" />
                        </View>
                      </View>
                    ))}
                  </View>

                  {/* アドバイス */}
                  <View style={styles.adviceContainer}>
                    <View style={styles.adviceCard}>
                      <FontAwesome5 name="store" size={18} color={COLORS.primary} style={styles.adviceIcon} />
                      <View style={styles.adviceContent}>
                        <Text style={styles.adviceTitle}>{data.storeName}へのアドバイス</Text>
                        <Text style={styles.adviceText}>{data.restaurantAdvice}</Text>
                      </View>
                    </View>

                    <View style={styles.adviceCard}>
                      <FontAwesome5 name="user-friends" size={18} color={COLORS.primary} style={styles.adviceIcon} />
                      <View style={styles.adviceContent}>
                        <Text style={styles.adviceTitle}>お客さんへのアドバイス</Text>
                        <Text style={styles.adviceText}>{data.customerAdvice}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            )}

            {activeTab === 'trends' && (
              <View>
                {/* 時間推移グラフ */}
                <CrowdLineChart 
                  data={hourlyTrendData} 
                  title="時間帯別混雑度推移" 
                />
                
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>今日のハイライト</Text>
                  
                  <View style={styles.highlightContainer}>
                    <View style={styles.highlightItem}>
                      <View style={styles.highlightIconContainer}>
                        <FontAwesome5 name="clock" size={20} color={COLORS.primary} />
                      </View>
                      <View style={styles.highlightContent}>
                        <Text style={styles.highlightLabel}>ピーク時間</Text>
                        <Text style={styles.highlightValue}>20:00</Text>
                      </View>
                    </View>
                    
                    <View style={styles.highlightItem}>
                      <View style={styles.highlightIconContainer}>
                        <FontAwesome5 name="arrow-down" size={20} color={COLORS.accent} />
                      </View>
                      <View style={styles.highlightContent}>
                        <Text style={styles.highlightLabel}>空いている時間</Text>
                        <Text style={styles.highlightValue}>17:00</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            )}

            {activeTab === 'comparison' && (
              <View>
                {/* 日別比較グラフ */}
                <CrowdBarChart 
                  data={dailyComparisonData} 
                  title="日別・時間帯混雑度比較" 
                />
                
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>週間傾向分析</Text>
                  
                  <View style={styles.comparisonBox}>
                    <View style={styles.comparisonIconContainer}>
                      <FontAwesome5 name="arrow-up" size={20} color="#f87171" />
                    </View>
                    <View style={styles.comparisonContent}>
                      <Text style={styles.comparisonTitle}>昨日より混雑</Text>
                      <Text style={styles.comparisonDescription}>
                        昨日より40%混雑が増加しています。20時に最大の差があります。
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.comparisonBox}>
                    <View style={styles.comparisonIconContainer}>
                      <FontAwesome5 name="calendar-week" size={20} color={COLORS.primary} />
                    </View>
                    <View style={styles.comparisonContent}>
                      <Text style={styles.comparisonTitle}>先週同日との比較</Text>
                      <Text style={styles.comparisonDescription}>
                        先週の同じ曜日よりも25%混雑が増加しています。イベントの影響と考えられます。
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
          </Animated.View>
        </ScrollView>
      </View>
    </>
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
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingBottom: 25,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: COLORS.primary,
  },
  dateContainer: {
    flexDirection: 'column',
  },
  dateText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 5,
  },
  eventTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  eventIcon: {
    marginRight: 5,
  },
  eventText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  weatherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tempText: {
    fontSize: 18,
    marginLeft: 6,
    color: '#fff',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: -20,
    borderRadius: 15,
    padding: 5,
    backgroundColor: COLORS.card,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: COLORS.tabInactive,
  },
  activeTab: {
    backgroundColor: COLORS.tabActive,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.lightText,
  },
  activeTabText: {
    fontWeight: '700',
    color: COLORS.primary,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 15,
    padding: 16,
    marginBottom: 20,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  percentageContainer: {
    alignItems: 'flex-end',
  },
  percentageLabel: {
    fontSize: 12,
    color: COLORS.lightText,
    marginBottom: 2,
  },
  percentageValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: COLORS.text,
  },
  tableContainer: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tableCell: {
    padding: 12,
    width: 60,
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
  },
  tableCellIcons: {
    flex: 1,
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
  },
  hourText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    color: COLORS.text,
  },
  adviceContainer: {
    gap: 12,
  },
  adviceCard: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 12,
    backgroundColor: COLORS.highlight,
  },
  adviceIcon: {
    marginRight: 12,
    alignSelf: 'center',
  },
  adviceContent: {
    flex: 1,
  },
  adviceTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    color: COLORS.text,
  },
  adviceText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.primary,
  },
  highlightContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '47%',
  },
  highlightIconContainer: {
    width: 45,
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: COLORS.highlight,
  },
  highlightContent: {
    flex: 1,
  },
  highlightLabel: {
    fontSize: 12,
    marginBottom: 2,
    color: COLORS.lightText,
  },
  highlightValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  comparisonBox: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    backgroundColor: COLORS.highlight,
  },
  comparisonIconContainer: {
    marginRight: 15,
    alignSelf: 'center',
  },
  comparisonContent: {
    flex: 1,
  },
  comparisonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: COLORS.text,
  },
  comparisonDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.lightText,
  },
});