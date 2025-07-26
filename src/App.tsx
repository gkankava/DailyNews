import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Navigator } from './navigation';
import { StatusBar } from 'react-native';

function App() {
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StatusBar barStyle={"dark-content"}  />
        <Navigator />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

export default App;