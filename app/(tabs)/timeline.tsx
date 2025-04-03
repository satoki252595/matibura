import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView,
  ActivityIndicator,
  Platform,
  Dimensions,
  ScrollView
} from 'react-native';
import { Stack } from 'expo-router';
import { WebView } from 'react-native-webview';

// 爽やかな青のカラーパレット
const COLORS = {
  background: '#f0f9ff', // 明るい水色の背景
  card: '#ffffff',
  text: '#2c3e50',
  lightText: '#7f8c8d',
  primary: '#3498db', // 爽やかな青
  minatoBlue: '#0057A8', // 港区カラー
};

const { width, height } = Dimensions.get('window');

// X（旧Twitter）のプロフィールページを埋め込むためのHTML
const generateProfileEmbedHTML = (profileUrl) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          background-color: transparent;
          overflow-x: hidden;
        }
        .twitter-profile {
          width: 100%;
          height: 100%;
          overflow-y: scroll;
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
        }
        a {
          color: ${COLORS.minatoBlue};
        }
      </style>
    </head>
    <body>
      <div class="twitter-profile">
        <a class="twitter-timeline" 
           data-width="100%" 
           data-height="100%" 
           data-theme="light"
           data-chrome="noheader nofooter noborders transparent"
           href="${profileUrl}">
           港区公式X（@minato_city）の投稿を読み込んでいます...
        </a>
        <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
      </div>
    </body>
    </html>
  `;
};

export default function TimelinePage() {
  const [loading, setLoading] = useState(true);
  const profileUrl = "https://x.com/minato_city";
  const htmlContent = generateProfileEmbedHTML(profileUrl);

  // WebViewの読み込み状態を処理
  const handleLoadStart = () => {
    setLoading(true);
  };

  const handleLoadEnd = () => {
    // 少し遅延させてローディングを非表示にする
    // Xのウィジェットがロードされるまで時間がかかることがあるため
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  // WebViewをサポートしているかどうかをチェック
  const isWebViewSupported = Platform.OS !== 'web';

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: '港区公式X',
          headerStyle: {
            backgroundColor: COLORS.minatoBlue,
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} 
      />
      
      {isWebViewSupported ? (
        <>
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={COLORS.minatoBlue} />
              <Text style={styles.loadingText}>港区公式Xプロフィールを読み込んでいます...</Text>
            </View>
          )}
          
          <WebView
            source={{ html: htmlContent }}
            style={styles.webview}
            onLoadStart={handleLoadStart}
            onLoadEnd={handleLoadEnd}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            originWhitelist={['*']}
            userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"
            injectedJavaScript={`
              // スクロール位置を調整するスクリプト
              setTimeout(() => {
                window.scrollTo(0, 0);
              }, 1000);
            `}
          />
        </>
      ) : (
        // WebViewが利用できない環境（Webプラットフォーム）での代替表示
        <ScrollView contentContainerStyle={styles.fallbackContainer}>
          <View style={styles.fallbackCard}>
            <Text style={styles.fallbackTitle}>港区公式X</Text>
            <Text style={styles.fallbackHandle}>@minato_city</Text>
            <Text style={styles.fallbackDescription}>
              港区公式X（旧Twitter）のタイムラインを表示できません。
              以下のリンクから直接ご覧ください：
            </Text>
            <Text style={styles.fallbackLink}>{profileUrl}</Text>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    zIndex: 10,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: COLORS.minatoBlue,
    textAlign: 'center',
  },
  fallbackContainer: {
    padding: 20,
    alignItems: 'center',
  },
  fallbackCard: {
    width: '100%',
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  fallbackTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 5,
  },
  fallbackHandle: {
    fontSize: 16,
    color: COLORS.lightText,
    marginBottom: 20,
  },
  fallbackDescription: {
    fontSize: 16,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 22,
  },
  fallbackLink: {
    fontSize: 16,
    color: COLORS.primary,
    textDecorationLine: 'underline',
  }
});