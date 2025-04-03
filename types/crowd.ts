/**
 * 混雑度表示に関する拡張型定義
 */

// 天気情報の型
export interface WeatherInfo {
  icon: string;    // アイコン名（Ioniconsで利用可能なもの）
  temp: string;    // 気温（表示用文字列）
}

// イベント情報の型
export interface EventInfo {
  time: string;    // イベント時間
  name: string;    // イベント名
  number: number;  // イベント番号
}

// 時間ごとの混雑データの型
export interface CrowdHour {
  hour: string;    // 時間帯
  crowd: boolean[]; // 混雑度を表す人アイコンの配列（trueなら表示）
  value: number;    // 混雑度の数値 (0-100%)
}

// 混雑データ全体の型
export interface CrowdData {
  date: string;    // 日付
  weather: WeatherInfo;  // 天気情報
  event: EventInfo;      // イベント情報
  crowdness: {
    percentage: string;  // 混雑率
    label: string;       // ラベル
  };
  hourlyPrediction: CrowdHour[];  // 時間帯ごとの予測
  restaurantAdvice: string;       // 店舗へのアドバイス
  customerAdvice: string;         // 顧客へのアドバイス
  storeName: string;              // 店舗名
}

// グラフ表示用の週間データ型
export interface WeeklyData {
  day: string;     // 曜日
  value: number;   // 混雑度
}

// 日別混雑度比較データ型
export interface DailyComparisonData {
  name: string;          // 日付/時間
  today: number;         // 今日の値
  yesterday: number;     // 昨日の値
  lastWeek: number;      // 先週の値
}

// 時間帯別混雑度データ型
export interface HourlyTrendData {
  hour: string;          // 時間
  average: number;       // 平均混雑度
  predicted: number;     // 予測混雑度
}