import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "../../screens/HomeScreen";
import SearchScreen from "../../screens/SearchScreen";
import TopHeadlinesScreen from "../../screens/TopHeadlinesScreen";
import { Screens } from "../consts/Screens";
import NewsScreen from "../../screens/NewsScreen";

const Stack = createNativeStackNavigator()

const RootStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown:false }}>  
            <Stack.Screen name={Screens.HOME_SCREEN} component={HomeScreen} />
            <Stack.Screen name={Screens.SEARCH_SCREEN} component={SearchScreen} />
            <Stack.Screen name={Screens.TOP_HEADLINES_SCREEN} component={TopHeadlinesScreen} />
            <Stack.Screen name={Screens.NEWS_SCREEN} component={NewsScreen} />
        </Stack.Navigator>
    );
  }

  export default RootStack

export type RootStackParamList = {
  HOME_SCREEN: undefined;         
  SEARCH_SCREEN: undefined;       
  TOP_HEADLINES_SCREEN: undefined;
  NEWS_SCREEN: { url: string };
}