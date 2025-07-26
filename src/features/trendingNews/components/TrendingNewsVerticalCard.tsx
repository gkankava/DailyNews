import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Article } from '../../../types/Article'
import { Colors, Fonts, Spacing } from '../../../base/theme'
import Text from '../../../base/components/Text'
import { renderDate, renderTitle } from '../../../helpers/contentRenderers'
import placeholderImg from '../../../base/images/news_image_placeholder.png' 
import Navigation from '../../../navigation/Navigation'
import { Screens } from '../../../navigation'

type Props = {
  data: Article
}

const TrendingNewsVerticalCard = ({ data }: Props) => {
  const [imgSource, setImgSource] = useState(
    data.urlToImage ? { uri: data.urlToImage } : placeholderImg
  );
  
  const handlePress = () => { 
    Navigation.navigate(Screens.NEWS_SCREEN, { url: data.url })
  }
  
  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Image source={imgSource} style={styles.image} onError={() => setImgSource(placeholderImg)} />
      <View style={styles.contentContainer}>
        <Text style={styles.title} numberOfLines={3}>{renderTitle(data.title)}</Text>
        <Text style={styles.description} numberOfLines={2}>{data.description}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.source}>{data.source.name}</Text>
          <Text style={styles.date}>{renderDate(data.publishedAt)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default TrendingNewsVerticalCard

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: Spacing.md,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'cover'
  },
  contentContainer: {
    flex: 1,
    padding: Spacing.md,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    lineHeight: 20,
    marginBottom: Spacing.xs,
  },
  description: {
    fontSize: 14,
    color: Colors.secondaryText,
    lineHeight: 18,
    marginBottom: Spacing.sm,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  source: {
    fontSize: 12,
    color: Colors.action,
    fontWeight: '500',
    flex: 1,
  },
  date: {
    fontSize: 12,
    color: Colors.secondaryText,
  },
})
