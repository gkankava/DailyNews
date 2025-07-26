import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import ScreenContainer from '../base/components/ScreenContainer'
import ScreenHeader from '../base/components/headers/ScreenHeader'
import SearchInput from '../features/search/components/SearchInput'
import SearchResults from '../features/search/components/SearchResults'
import useDebounce from '../base/hooks/useDebounce'
import useSearchNews from '../features/search/api/useSearchNews'
import { Colors } from '../base/theme'

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedQuery = useDebounce(searchQuery, 500) // 500ms debounce
  
  const { data, isLoading, error } = useSearchNews(debouncedQuery)

  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader>
        <SearchInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search..."
          autoFocus={true}
        />
      </ScreenHeader>
      <ScreenContainer edges={['left', 'right']} style={styles.content}>
        <SearchResults
          data={data?.articles || []}
          isLoading={isLoading}
          error={error}
          searchQuery={debouncedQuery}
        />
      </ScreenContainer>
    </View>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: Colors.background,
  },
})