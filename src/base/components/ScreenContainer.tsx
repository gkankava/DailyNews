import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context'
import { Colors } from '../theme'

type Props = SafeAreaViewProps & { children?: React.ReactNode, style?: ViewStyle }

const ScreenContainer = ({ children, style, ...rest }: Props) => {
    return (
        <SafeAreaView edges={['left', 'top' , 'right']} {...rest} style={[styles.defaultStyles, style]}>
            {children}
        </SafeAreaView>
    )
}

export default ScreenContainer

const styles = StyleSheet.create({
    defaultStyles: {
        flex: 1,
        backgroundColor: Colors.background
    }
})