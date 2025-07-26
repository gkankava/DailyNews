import { StyleSheet, TextInput, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { Colors, Spacing } from '../../../base/theme'
import SearchIcon from '../../../base/icons/SearchIcon'

type Props = {
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
  autoFocus?: boolean
}

const SearchInput = ({ value, onChangeText, placeholder = "Search...", autoFocus = true }: Props) => {
  const inputRef = useRef<TextInput>(null)

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [autoFocus])

  return (
    <View style={styles.container}>
      <View style={styles.searchIcon}>
        <SearchIcon />
      </View>
      <TextInput
        ref={inputRef}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.secondaryText}
        autoFocus={autoFocus}
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
      />
    </View>
  )
}


export default SearchInput

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 8,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    marginRight: Spacing.md,
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.divider,
  },
  searchIcon: {
    marginRight: Spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
    paddingVertical: 0, 
  },
  iconContainer: {
    width: 16,
    height: 16,
    position: 'relative',
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.secondaryText,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  handle: {
    width: 6,
    height: 2,
    backgroundColor: Colors.secondaryText,
    position: 'absolute',
    bottom: 0,
    right: 0,
    transform: [{ rotate: '45deg' }],
  },
})
