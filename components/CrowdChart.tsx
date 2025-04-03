import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { HourlyTrendData, DailyComparisonData } from '../types/crowd';

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
  graph: {
    line1: '#3498db', // 青
    line2: '#2ecc71', // 緑
    bar1: '#4bb6e8', // 明るい青
    bar2: '#3498db', // 青
    bar3: '#b2d6f5', // 薄い青
  }
};

// チャートのデフォルト設定
const screenWidth = Dimensions.get('window').width - 40;

interface CrowdLineChartProps {
  data: HourlyTrendData[];
  title: string;
}

interface CrowdBarChartProps {
  data: DailyComparisonData[];
  title: string;
}

/**
 * 混雑度の時間推移を表す折れ線グラフ
 */
export const CrowdLineChart: React.FC<CrowdLineChartProps> = ({ data, title }) => {
  // グラフデータの整形
  const chartData = {
    labels: data.map(item => item.hour),
    datasets: [
      {
        data: data.map(item => item.average),
        color: (opacity = 1) => `rgba(52, 152, 219, ${opacity})`, // 青色
        strokeWidth: 2,
      },
      {
        data: data.map(item => item.predicted),
        color: (opacity = 1) => `rgba(46, 204, 113, ${opacity})`, // 緑色
        strokeWidth: 2,
        strokeDashArray: [5, 5], // 点線
      },
    ],
    legend: ['平均', '予測'],
  };

  const chartConfig = {
    backgroundColor: COLORS.card,
    backgroundGradientFrom: COLORS.card,
    backgroundGradientTo: COLORS.card,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(44, 62, 80, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(44, 62, 80, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
    },
    propsForBackgroundLines: {
      strokeDasharray: '',
      stroke: 'rgba(52, 152, 219, 0.1)',
    },
    formatYLabel: (value: string) => `${parseInt(value)}`,
  };

  return (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>{title}</Text>
      <LineChart
        data={chartData}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
        withInnerLines={true}
        withOuterLines={true}
        withDots={true}
        withShadow={false}
        fromZero
        yAxisLabel=""
        yAxisSuffix="%"
        segments={5}
      />
    </View>
  );
};

/**
 * 日別の混雑度比較を表す棒グラフ
 */
export const CrowdBarChart: React.FC<CrowdBarChartProps> = ({ data, title }) => {
  // グラフデータの整形
  const chartData = {
    labels: data.map(item => item.name),
    datasets: [
      {
        data: data.map(item => item.today),
        color: (opacity = 1) => `rgba(75, 182, 232, ${opacity})`, // 明るい青
      },
      {
        data: data.map(item => item.yesterday),
        color: (opacity = 1) => `rgba(52, 152, 219, ${opacity})`, // 青
      },
      {
        data: data.map(item => item.lastWeek),
        color: (opacity = 1) => `rgba(178, 214, 245, ${opacity})`, // 薄い青
      },
    ],
    legend: ['今日', '昨日', '先週'],
  };

  const chartConfig = {
    backgroundColor: COLORS.card,
    backgroundGradientFrom: COLORS.card,
    backgroundGradientTo: COLORS.card,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(44, 62, 80, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(44, 62, 80, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    barPercentage: 0.7,
    propsForBackgroundLines: {
      strokeDasharray: '',
      stroke: 'rgba(52, 152, 219, 0.1)',
    },
    formatYLabel: (value: string) => `${parseInt(value)}`,
  };

  return (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>{title}</Text>
      <BarChart
        data={chartData}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        style={styles.chart}
        withInnerLines={true}
        withHorizontalLabels={true}
        fromZero
        yAxisLabel=""
        yAxisSuffix="%"
        segments={5}
        showValuesOnTopOfBars={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  chart: {
    borderRadius: 16,
    paddingRight: 20,
  },
});