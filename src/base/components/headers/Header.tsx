import { StyleSheet, View } from 'react-native'
import React from 'react'
import Logo from '../../icons/Logo'
import SearchButton from '../../../features/search/components/SearchButton'
import { Spacing } from '../../theme'


const Header = () => {
  return (
    <View style={styles.container}>
      <Logo />
      <SearchButton />
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm
  }
})