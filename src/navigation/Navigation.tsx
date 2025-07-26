import {
    NavigationContainerRef,
    ParamListBase,
} from '@react-navigation/native';
import * as React from 'react';
import { RootStackParamList } from './stacks/RootStack';

type RouteName = keyof RootStackParamList;
type RouteParams<T extends RouteName> = RootStackParamList[T];

export default class Navigation {
    static navigationRef = React.createRef<NavigationContainerRef<ParamListBase>>();

    static canGoBack = () => {
        return this.navigationRef.current?.canGoBack() || false;
    };

    static pop = () => {
        this.navigationRef.current?.goBack();
      };

    static navigate<T extends RouteName>(
        routeName: T,
        params?: RouteParams<T>
    ) {
        setTimeout(() => {
            this.navigationRef.current?.navigate(routeName as string, params);
        }, 0);
    }

    static replace<T extends RouteName>(
        routeName: T,
        params?: RouteParams<T>
    ) {
        setTimeout(() => {
            this.navigationRef.current?.reset({
                index: 0,
                routes: [{ name: routeName as string, params }],
            });
        }, 0);
    }
  }