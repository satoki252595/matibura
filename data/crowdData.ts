import { CrowdData } from '../types/crowd';

// 混雑予測のモックデータ
export const eventDataMap: Record<string, CrowdData> = {
  '1': { // シーバンス夏祭り
    date: '7/26(金)',
    weather: {
      icon: 'sunny',
      temp: '35/25°C',
    },
    event: {
      time: '17:00〜21:00',
      name: 'シーバンス夏祭り',
      number: 1,
    },
    crowdness: {
      percentage: '125%',
      label: '平常比',
    },
    hourlyPrediction: [
      { hour: '16時', crowd: [true, false, false, false], value: 25 },
      { hour: '17時', crowd: [true, true, false, false], value: 50 },
      { hour: '18時', crowd: [true, true, true, false], value: 75 },
      { hour: '19時', crowd: [true, true, true, true], value: 100 },
      { hour: '20時', crowd: [true, true, true, false], value: 75 },
    ],
    restaurantAdvice: 'シフトを増やして対応！',
    customerAdvice: '18時以降は混雑します',
    storeName: 'シーバンス周辺店舗',
  },
  '2': { // 地蔵尊盆踊り大会
    date: '7/26(金)',
    weather: {
      icon: 'sunny',
      temp: '35/25°C',
    },
    event: {
      time: '17:00〜20:00',
      name: '地蔵尊盆踊り大会',
      number: 1,
    },
    crowdness: {
      percentage: '140%',
      label: '平常比',
    },
    hourlyPrediction: [
      { hour: '16時', crowd: [true, false, false, false], value: 25 },
      { hour: '17時', crowd: [true, true, false, false], value: 50 },
      { hour: '18時', crowd: [true, true, true, true], value: 100 },
      { hour: '19時', crowd: [true, true, true, false], value: 75 },
      { hour: '20時', crowd: [true, false, false, false], value: 25 },
    ],
    restaurantAdvice: '18時台に準備を！',
    customerAdvice: '19時以降がおすすめ',
    storeName: '増上寺周辺店舗',
  },
  '3': { // Hi-NODE
    date: '8/2(金)',
    weather: {
      icon: 'partly-sunny',
      temp: '32/24°C',
    },
    event: {
      time: '終日',
      name: 'Hi-NODE BLUE SUMMER FES',
      number: 1,
    },
    crowdness: {
      percentage: '180%',
      label: '平常比',
    },
    hourlyPrediction: [
      { hour: '10時', crowd: [true, false, false, false], value: 25 },
      { hour: '12時', crowd: [true, true, false, false], value: 50 },
      { hour: '14時', crowd: [true, true, true, false], value: 75 },
      { hour: '16時', crowd: [true, true, true, true], value: 100 },
      { hour: '18時', crowd: [true, true, true, false], value: 75 },
    ],
    restaurantAdvice: '終日の混雑に備えて！',
    customerAdvice: '10時台が比較的空いています',
    storeName: 'Hi-NODE周辺店舗',
  }
};

// APIサービスをシミュレートする関数
export const crowdDataService = {
  // イベントIDに基づいてデータを取得する関数
  getEventData: async (eventId: string): Promise<CrowdData> => {
    // 実際のAPIリクエストの代わりに、モックデータから取得
    return new Promise((resolve) => {
      // APIレスポンスを模倣するための短い遅延
      setTimeout(() => {
        const data = eventDataMap[eventId] || getDefaultEventData(eventId);
        resolve(data);
      }, 300);
    });
  },
  
  // 全てのイベントデータを取得
  getAllEvents: async (): Promise<CrowdData[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.values(eventDataMap));
      }, 300);
    });
  }
};

// イベントIDがない場合のデフォルトデータ
function getDefaultEventData(eventId: string): CrowdData {
  return {
    date: '7/19(金)',
    weather: {
      icon: 'sunny',
      temp: '35/25°C',
    },
    event: {
      time: '終日',
      name: 'イベント',
      number: 1,
    },
    crowdness: {
      percentage: '150%',
      label: '平常比',
    },
    hourlyPrediction: [
      { hour: '16時', crowd: [true, false, false, false], value: 25 },
      { hour: '17時', crowd: [true, true, false, false], value: 50 },
      { hour: '18時', crowd: [true, true, true, false], value: 75 },
      { hour: '19時', crowd: [true, true, true, true], value: 100 },
      { hour: '20時', crowd: [true, true, false, false], value: 50 },
    ],
    restaurantAdvice: 'シフトの調整をおすすめします',
    customerAdvice: '17時台がおすすめです',
    storeName: '周辺店舗',
  };
}