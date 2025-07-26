import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import useTrendingNews from '../api/useTrendingNews'
import Text from '../../../base/components/Text'
import { Colors, Spacing } from '../../../base/theme'
import Navigation from '../../../navigation/Navigation'
import { Screens } from '../../../navigation'
import LoadingIndicator from '../../../base/components/LoadingIndicator'
import TrendingNewsList from './TrendingNewsList'

const TrendingNews = () => {
  const { data, isLoading, error } = useTrendingNews({ page: 1, pageSize: 5 })
  const handleViewMore = () => {
    Navigation.navigate(Screens.TOP_HEADLINES_SCREEN)
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContaienr}>
        <Text style={styles.heading}>Trending news</Text>
        <TouchableOpacity onPress={handleViewMore}>
          <Text style={styles.link}>View more</Text>
        </TouchableOpacity>
      </View>
      {error && (
        <View style={styles.activityContainer}>
          <Text>Error loading trending news</Text>
        </View>
      )}
      {isLoading ? (
        <View style={styles.activityContainer}>
          <LoadingIndicator />
          </View>
      ) : data && <TrendingNewsList data={data.articles} />}
    </View>
  )
}

export default TrendingNews

const styles = StyleSheet.create({
  activityContainer:{
    width:'100%',
    height:150,
    justifyContent:'center',
    alignItems:'center'
  },
  container: {},
  headerContaienr: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md

  },
  heading: {
    fontSize: 20,
    color: Colors.text
  },
  link: {
    color: Colors.action
  }
})