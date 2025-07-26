import Config from 'react-native-config';


export const AppConfig = {
    API_BASE_URL:Config.API_BASE_URL || '',
    API_VERSION:Config.API_VERSION || "",
    API_KEY:Config.API_KEY || ""
} as const