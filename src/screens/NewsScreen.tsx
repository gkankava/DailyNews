import { StyleSheet, View } from 'react-native'
import { WebView } from 'react-native-webview'
import { RouteProp, useRoute } from '@react-navigation/native'
import type { RootStackParamList } from '../navigation/stacks/RootStack'
import ScreenContainer from '../base/components/ScreenContainer'
import ScreenHeader from '../base/components/headers/ScreenHeader'
import LoadingIndicator from '../base/components/LoadingIndicator'
import React, { useState } from 'react'
import { Colors } from '../base/theme'
import { renderDomain } from '../helpers/contentRenderers'
import { SafeAreaView } from 'react-native-safe-area-context'

type NewsScreenRouteProp = RouteProp<RootStackParamList, 'NEWS_SCREEN'>

const NewsScreen = () => {
  const { params } = useRoute<NewsScreenRouteProp>()
  const [loading, setLoading] = useState(true)

  return (
    <View style={{ flex: 1 }}>
        <ScreenHeader title={renderDomain(params.url)} />
      <ScreenContainer edges={['left', 'right', 'bottom']} style={styles.content}>
        <WebView
          source={{ uri: params.url }}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
        />
        {loading && (
          <View style={styles.loadingOverlay}>
            <LoadingIndicator />
          </View>
        )}
    </ScreenContainer>
    </View>
  )
}

export default NewsScreen

const styles = StyleSheet.create({
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },

  headerSafeArea: {
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.background,
  },
})