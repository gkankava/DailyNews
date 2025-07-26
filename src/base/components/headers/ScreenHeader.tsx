import { StyleSheet, View } from 'react-native'
import React from 'react'
import BackButton from '../button/BackButton'
import Text from '../Text'
import { Colors, Spacing } from '../../theme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type Props = {
  title?: string,
  children?: React.ReactNode
}

const HEADER_HEIGHT = 50

const ScreenHeader = ({ title, children }: Props) => {
  const insets = useSafeAreaInsets()
  return (
    <View style={[styles.container, { paddingTop: insets.top, height: HEADER_HEIGHT + insets.top, backgroundColor: Colors.white }]}>
      <BackButton />
      {title && <Text style={styles.title}>{title}</Text>}
      {children}
    </View>
  )
}

export default ScreenHeader

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.sm,
    borderBottomWidth:1,
    borderColor:Colors.divider
  },
  title: {
    fontSize: 18
  }
})