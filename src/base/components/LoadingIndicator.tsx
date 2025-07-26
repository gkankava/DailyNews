import Lottie from 'lottie-react-native';


const LoadingIndicator = () => {
  return (
        <Lottie
            source={require('../lottie/loader.json')}
            autoPlay
            loop={true}
          style={{ width: "100%", height: "100%" }}
            resizeMode="contain"
        />
    )
}

export default LoadingIndicator
