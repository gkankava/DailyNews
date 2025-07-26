import React from 'react';
import { Text as RNText, StyleProp, StyleSheet, TextProps } from 'react-native';
import { Colors, Fonts } from '../theme';

type Props = TextProps & { children?: React.ReactNode };


const Text = ({ children, style, ...rest }: Props) => {
    
    return (
        <RNText
            {...rest}
            style={[styles.defaultStyles, style]}>
            {children}
        </RNText>
    );
};

export default Text;

const styles = StyleSheet.create({
    defaultStyles: {
        color: Colors.text,
        fontWeight: '400',
        fontFamily: Fonts.secondary,
    },
});
