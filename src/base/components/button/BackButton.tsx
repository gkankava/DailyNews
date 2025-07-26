import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import SearchIcon from '../../../base/icons/SearchIcon'
import { Colors, Spacing } from '../../../base/theme'
import Navigation from '../../../navigation/Navigation'
import ArrowLeftIcon from '../../icons/ArrowLeftIcon'


const BackButton = () => {

    const handleNavigation = () => {
        Navigation.pop()
    }

    return (
        <TouchableOpacity onPress={handleNavigation}>
            <View style={styles.container}>
                <ArrowLeftIcon />
            </View>
        </TouchableOpacity>
    )
}

export default BackButton

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "white",
        borderColor: Colors.divider,
        borderBottomWidth:1,
        borderRadius: 50,
        width:35,
        height:35,
        paddingVertical: Spacing.sm,
        paddingHorizontal: Spacing.sm,
        
    },
})