import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Article } from '../../types/Article'
import { Fonts, Spacing } from '../theme'
import Text from './Text'
import { renderDate, renderTitle } from '../../helpers/contentRenderers'
import placeholderImg from '../images/news_image_placeholder.png' 
import Navigation from '../../navigation/Navigation'
import { Screens } from '../../navigation/consts/Screens'


type Props = {
  data: Article
}

const NewsCard = ({ data }: Props) => {
  const [imgSource, setImgSource] = useState(
    data.urlToImage ? { uri: data.urlToImage } : placeholderImg
  );
  const handlePress = () => { 
    Navigation.navigate(Screens.NEWS_SCREEN, {url:data.url})
  }
  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <Image source={imgSource} style={styles.image} onError={() => setImgSource(placeholderImg)} />
        <Text style={styles.title} numberOfLines={2}>{renderTitle(data.title)}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.source}>{data.source.name}</Text>
          <Text style={styles.date}>{renderDate(data.publishedAt)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default NewsCard

const styles = StyleSheet.create({
  container: {
    rowGap: Spacing.xs,
    width: "100%",
  },
  image: {
    width: "100%",
    height: 170,
    borderRadius: 5,
    resizeMode: 'cover'
  },
  title: {
    fontFamily: Fonts.primary
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  source: {},
  date: {},
})