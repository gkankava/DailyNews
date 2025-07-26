import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import SearchIcon from '../../../base/icons/SearchIcon'
import { Colors, Spacing } from '../../../base/theme'
import Text from '../../../base/components/Text'
import { Screens } from '../../../navigation'
import Navigation from '../../../navigation/Navigation'


const SearchButton = () => {

    const handleNavigation = () => {
        Navigation.navigate(Screens.SEARCH_SCREEN)
    }
    
    return (
        <TouchableOpacity onPress={handleNavigation}>
            <View style={styles.container}>
                <SearchIcon />
            </View>
        </TouchableOpacity>
    )
}

export default SearchButton

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "white",
        borderColor: Colors.divider,
        borderWidth: 1,
        borderRadius: 50,
        width: 40,
        height: 40,
        paddingVertical: Spacing.sm,
        paddingHorizontal: Spacing.sm,
    },
})