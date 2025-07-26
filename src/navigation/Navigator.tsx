import { NavigationContainer } from "@react-navigation/native"
import RootStack from './stacks/RootStack'
import Navigation from "./Navigation"

const Navigator = () => {
  return (
    <NavigationContainer ref={Navigation.navigationRef}>
        <RootStack />
    </NavigationContainer>
  )
}

export default Navigator
