import { StyleSheet, View, ActivityIndicator, FlatList } from 'react-native'
import React, { useCallback, useMemo } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Colors, Spacing } from '../base/theme'
import ScreenContainer from '../base/components/ScreenContainer'
import ScreenHeader from '../base/components/headers/ScreenHeader'
import useInfiniteTrendingNews from '../features/trendingNews/api/useInfiniteTrendingNews'
import NewsCard from '../base/components/NewsCard'
import { Article, TrendingNewsResponse } from '../types/Article'
import Text from '../base/components/Text'
import LoadingIndicator from '../base/components/LoadingIndicator'

const TopHeadlinesScreen = () => {
  const insets = useSafeAreaInsets()
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteTrendingNews({ pageSize: 10 })

  const listContainerStyle = useMemo(() => ({
    ...styles.listContainer,
    paddingBottom: insets.bottom + Spacing.md,
  }), [insets.bottom])

  const flatData = useMemo(() => {
    return data?.pages.flatMap((page: TrendingNewsResponse) => page.articles) ?? []
  }, [data])

  const renderItem = useCallback(({ item }: { item: Article }) => {
    return (
      <View style={styles.itemContainer}>
        <NewsCard data={item} />
      </View>
    )
  }, [])

  const onEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  const renderFooter = useCallback(() => {
    if (isFetchingNextPage) {
      return (
        <View style={styles.footerLoader}>
          <ActivityIndicator size="small" color={Colors.action} />
        </View>
      )
    }
    return null
  }, [isFetchingNextPage])

  const keyExtractor = useCallback((item: Article, index: number) => {
    const uniqueId = item.url || item.title || `item-${index}`
    return `${uniqueId}-${index}-${item.publishedAt || ''}`
  }, [])

  if (isLoading) {
    return (
      <View style={{ flex: 1 }}>
        <ScreenHeader title='Trending news' />
        <ScreenContainer edges={['left', 'right']} style={styles.content}>
          <View style={styles.loadingContainer}>
            <LoadingIndicator />
          </View>
        </ScreenContainer>
      </View>
    )
  }

  if (error) {
    return (
      <View style={{ flex: 1 }}>
        <ScreenHeader title='Trending news' />
        <ScreenContainer edges={['left', 'right']} style={styles.content}>
          <View style={styles.errorContainer}>
            <Text>Error loading trending news</Text>
          </View>
        </ScreenContainer>
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader title='Trending news' />
      <ScreenContainer edges={['left', 'right']} style={styles.content}>
        <FlatList
          data={flatData}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          contentContainerStyle={listContainerStyle}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={false}
          windowSize={10}
          maxToRenderPerBatch={5}
          initialNumToRender={10}
        />
      </ScreenContainer>
    </View>
  )
}

export default TopHeadlinesScreen

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContainer: {
    padding: Spacing.md,
  },
  itemContainer: {
    marginBottom: Spacing.sm,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerLoader: {
    padding: Spacing.md,
    alignItems: 'center',
  },
})