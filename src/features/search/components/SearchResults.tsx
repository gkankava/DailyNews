import { StyleSheet, View, FlatList } from 'react-native'
import React, { useCallback } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Article } from '../../../types/Article'
import NewsCard from '../../../base/components/NewsCard'
import { Colors, Spacing } from '../../../base/theme'
import LoadingIndicator from '../../../base/components/LoadingIndicator'
import Text from '../../../base/components/Text'

type Props = {
  data: Article[]
  isLoading: boolean
  error: any
  searchQuery: string
}

const SearchResults = ({ data, isLoading, error, searchQuery }: Props) => {
  const insets = useSafeAreaInsets()

  const renderItem = useCallback(({ item }: { item: Article }) => {
    return (
      <View style={styles.itemContainer}>
        <NewsCard data={item} />
      </View>
    )
  }, [])

  const keyExtractor = useCallback((item: Article, index: number) => {
    const uniqueId = item.url || item.title || `item-${index}`
    return `${uniqueId}-${index}-${item.publishedAt || ''}`
  }, [])

  const renderHeader = useCallback(() => {
    if (!searchQuery || searchQuery.length < 3) return null
    
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.searchTitle}>Search results for "{searchQuery}"</Text>
        <Text style={styles.resultsCount}>
          {data.length} {data.length === 1 ? 'result' : 'results'} found
        </Text>
      </View>
    )
  }, [searchQuery, data.length])

  const renderEmpty = useCallback(() => {
    if (isLoading) {
      return (
        <View style={styles.centerContainer}>
          <LoadingIndicator />
        </View>
      )
    }

    if (error) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Error searching news</Text>
        </View>
      )
    }

    if (searchQuery && searchQuery.length >= 3 && data.length === 0) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>No results found for "{searchQuery}"</Text>
          <Text style={styles.emptySubtext}>Try different keywords</Text>
        </View>
      )
    }

    if (!searchQuery || searchQuery.length < 3) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>Start typing to search news</Text>
          <Text style={styles.emptySubtext}>Enter at least 3 characters</Text>
        </View>
      )
    }

    return null
  }, [isLoading, error, searchQuery, data.length])

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListHeaderComponent={renderHeader}
      ListEmptyComponent={renderEmpty}
      contentContainerStyle={[
        styles.listContainer,
        { paddingBottom: insets.bottom + Spacing.md }
      ]}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews={false}
      windowSize={10}
      maxToRenderPerBatch={5}
      initialNumToRender={10}
    />
  )
}

export default SearchResults

const styles = StyleSheet.create({
  listContainer: {
    flexGrow: 1,
    paddingHorizontal: Spacing.md,
  },
  itemContainer: {
    marginBottom: Spacing.sm,
  },
  headerContainer: {
    paddingVertical: Spacing.md,
    paddingBottom: Spacing.lg,
  },
  searchTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  resultsCount: {
    fontSize: 14,
    color: Colors.secondaryText,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  emptySubtext: {
    fontSize: 14,
    color: Colors.secondaryText,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: Colors.text,
    textAlign: 'center',
  },
})
