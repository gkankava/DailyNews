import { StyleSheet, View, ActivityIndicator, FlatList, RefreshControl } from 'react-native'
import React, { useCallback, useMemo, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Header from '../base/components/headers/Header'
import TrendingNews from '../features/trendingNews/components'
import ScreenContainer from '../base/components/ScreenContainer'
import useInfiniteNews from '../features/news/api/useInfiniteNews'
import NewsCard from '../base/components/NewsCard'
import { Article, TrendingNewsResponse } from '../types/Article'
import { Colors, Spacing } from '../base/theme'
import LoadingIndicator from '../base/components/LoadingIndicator'
import Text from '../base/components/Text'


const HomeScreen = () => {
  const insets = useSafeAreaInsets()
  const [refreshing, setRefreshing] = useState(false)
  
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteNews({ pageSize: 20 })

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

  const renderHeader = useCallback(() => {
    return (
      <View style={styles.headerContainer}>
        <Header />
        <TrendingNews />
        <View style={styles.latestNewsHeader}>
          <Text style={styles.latestNewsTitle}>Latest news</Text>
        </View>
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

  const listContainerStyle = useMemo(() => ({
    paddingBottom: insets.bottom + Spacing.md,
  }), [insets.bottom])

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    try {
      await refetch()
    } finally {
      setRefreshing(false)
    }
  }, [refetch])


  return (
    <ScreenContainer edges={['top', 'left', 'right']} style={styles.container}>
      <FlatList
        data={flatData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={renderHeader}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        contentContainerStyle={listContainerStyle}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={false}
        windowSize={10}
        maxToRenderPerBatch={5}
        initialNumToRender={10}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.action]}
            tintColor={Colors.action}
          />
        }
        ListEmptyComponent={isLoading ? (
          <View style={styles.loadingContainer}>
            <LoadingIndicator />
          </View>
        ) : error ? (
            <View style={styles.errorContainer}>
              <Text>Error loading news</Text>
            </View>
        ) : null}
      />
    </ScreenContainer>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerContainer: {
    backgroundColor: Colors.background,
  },
  latestNewsHeader: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.sm,
  },
  latestNewsTitle: {
    fontSize: 20,
    color: Colors.text,
    fontWeight: '600',
  },
  itemContainer: {
    marginBottom: Spacing.sm,
    marginHorizontal: Spacing.md,
  },
  loadingContainer: {
    padding: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.md,
  },
  footerLoader: {
    padding: Spacing.md,
    alignItems: 'center',
  },
})