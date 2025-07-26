# Daily news

Project using latest RN version (0.80) hermes / new architecture

.env file is included since this is not some important thing. 

I don't know how many request is left for today since I used a lot request and the day limit is 100 so maybe you have to change the api key to your own if you test it on july 26. 



## Step 1


```sh
# node version - 22.17.1 ruby version - 3.4.3

nvm use #will set nvm to v22 
rbenv local 3.4.3
```
```sh
# Using Yarn recomended
yarn # install deps
```

### Setup

After cloning the repo and installing dependencies, run:

```sh
npx react-native-asset
```

## Step 2
```sh
# for ios install pods
cd ios/ && bundle exec pod install && cd ..
```

## Step 3
```sh
yarn start
```

## Run ios
```sh
yarn ios
```

## Run android
```sh
yarn android
```

