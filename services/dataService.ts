import { CrowdData, HourlyTrendData, DailyComparisonData } from '../types/crowd';
import crowdDataJson from '../data/crowdData.json';
import homeDataJson from '../data/homeData.json';
import eventDataJson from '../data/eventData.json';
import disasterDataJson from '../data/disasterData.json';
import localInfoDataJson from '../data/localInfoData.json';

// 型アサーション
const crowdData = crowdDataJson as unknown as {
  events: Record<string, CrowdData>;
  default: CrowdData;
  hourlyTrendData: HourlyTrendData[];
  dailyComparisonData: DailyComparisonData[];
};
/**
 * 混雑予測データサービス
 */
export const crowdDataService = {
  // イベントIDに基づいてデータを取得する関数
  getEventData: async (eventId: string): Promise<CrowdData> => {
    return new Promise((resolve) => {
      // APIレスポンスを模倣するための短い遅延
      setTimeout(() => {
        const data = crowdData.events[eventId] || crowdData.default;
        resolve(data);
      }, 300);
    });
  },
  
  // 全てのイベントデータを取得
  getAllEvents: async (): Promise<CrowdData[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.values(crowdData.events));
      }, 300);
    });
  },

  // 時間推移グラフのデータを取得
  getHourlyTrendData: async (): Promise<HourlyTrendData[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(crowdData.hourlyTrendData);
      }, 300);
    });
  },

  // 日別比較グラフのデータを取得
  getDailyComparisonData: async (): Promise<DailyComparisonData[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(crowdData.dailyComparisonData);
      }, 300);
    });
  }
};

/**
 * ホームデータサービス
 */
export const homeDataService = {
  // ホーム画面のデータを取得
  getHomeData: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(homeDataJson);
      }, 300);
    });
  }
};

/**
 * イベント情報サービス
 */
export const eventDataService = {
  // イベント情報を取得
  getEventData: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(eventDataJson);
      }, 300);
    });
  }
};

/**
 * 防災情報サービス
 */
export const disasterDataService = {
  // 防災情報を取得
  getDisasterData: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(disasterDataJson);
      }, 300);
    });
  }
};

/**
 * 地域情報サービス
 */
export const localInfoDataService = {
  // 地域情報を取得
  getLocalInfoData: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(localInfoDataJson);
      }, 300);
    });
  }
};

/**
 * 日付ユーティリティ
 */
export const dateUtils = {
  // 曜日を取得する関数
  getDayOfWeek: (date: Date): string => {
    const days = ['日', '月', '火', '水', '木', '金', '土'];
    return days[date.getDay()];
  },
  
  // フォーマットされた日付を取得する関数
  getFormattedDate: (date: Date): string => {
    return `${date.getMonth() + 1}/${date.getDate()}(${dateUtils.getDayOfWeek(date)})`;
  }
};