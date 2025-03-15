import { View, Text } from 'react-native'
import { Stack , SplashScreen } from 'expo-router'
import React from 'react'
import '../global.css'
import {useFonts} from 'expo-font'
import { useState , useEffect } from 'react'

const _layout = () => {

  SplashScreen.preventAutoHideAsync();
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
    "Al-Mushaf-Quran" : require("../assets/fonts/Al-Mushaf-Quran.ttf"),
    "Al-Qalam-Quran" : require('../assets/fonts/Al-Qalam-Quran.ttf'),
    "Clarendon-Regular" : require('../assets/fonts/Clarendon-Regular.otf'),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }


  return (
    <Stack>
        <Stack.Screen 
        name = 'index'
        options={{
            title : 'Home',
            headerShown : false,
        }}
         />
        {/* <Stack.Screen
        name='(auth)'
        options={{
            title : 'Auth',
        }}
        /> */}
        <Stack.Screen
        name='(homepage)'
        options={{
            title : 'Homepage',
            headerShown : false,
        }}
        />
    </Stack>
  )
}

export default _layout