import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Article } from '../../../types/Article'
import TrendingNewsCard from './TrendingNewsCard'
import { Spacing } from '../../../base/theme'

type Props = {
  data: Article[]
}

const TrendingNewsList = ({data}: Props) => {
  const keyExtractor = (item:Article) => {
    return item.title
  }
  const renderItem = ({item, index} : {item:Article, index:number}) => {
    return <TrendingNewsCard data={item} />
  }
  return (
    <FlatList 
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
     />
  )
}

export default TrendingNewsList

const styles = StyleSheet.create({
  container:{
    marginVertical:Spacing.sm
  },
  contentContainer: {
    paddingHorizontal: Spacing.md,
    columnGap: Spacing.lg,
  },
})