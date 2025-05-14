import { Stack, SplashScreen } from "expo-router";
import React from "react";
import "../global.css";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import GlobalProvider from "../context/GlobalProvider";
import supabase from "../lib/supabase";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const _layout = () => {
  SplashScreen.preventAutoHideAsync();

  const [fontsLoaded, error] = useFonts({
    // Poppins Font Variants
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),

    // Quranic & Special Fonts
    "Al-Mushaf-Quran": require("../assets/fonts/Al-Mushaf-Quran.ttf"),
    "Al-Qalam-Quran": require("../assets/fonts/Al-Qalam-Quran.ttf"),
    "Clarendon-Regular": require("../assets/fonts/Clarendon-Regular.otf"),
    "Indopak-Nastaleeq-font": require("../assets/fonts/Indopak-Nastaleeq-font.ttf"),

    // Newly Added Fonts
    "Sorga-Demo": require("../assets/fonts/Sorga Demo.ttf"),
    "OpenSans-Bold": require("../assets/fonts/OpenSans-Bold.ttf"),
    "OpenSans-BoldItalic": require("../assets/fonts/OpenSans-BoldItalic.ttf"),
    "OpenSans-ExtraBold": require("../assets/fonts/OpenSans-ExtraBold.ttf"),
    "OpenSans-ExtraBoldItalic": require("../assets/fonts/OpenSans-ExtraBoldItalic.ttf"),
    "OpenSans-Light": require("../assets/fonts/OpenSans-Light.ttf"),
    "OpenSans-LightItalic": require("../assets/fonts/OpenSans-LightItalic.ttf"),
    "OpenSans-SemiBold": require("../assets/fonts/OpenSans-SemiBold.ttf"),
    "OpenSans-SemiBoldItalic": require("../assets/fonts/OpenSans-SemiBoldItalic.ttf"),
    "OpenSans-Medium": require("../assets/fonts/OpenSans-Medium.ttf"),
    "OpenSans-MediumItalic": require("../assets/fonts/OpenSans-MediumItalic.ttf"),
    "OpenSans-Italic": require("../assets/fonts/OpenSans-Italic.ttf"),
    "OpenSans-Regular": require("../assets/fonts/OpenSans-Regular.ttf"),
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
    <GestureHandlerRootView>
      <GlobalProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              title: "Home (Sign Up/ LogIn)",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(homepage)"
            options={{
              title: "Profile Page",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(ayah)"
            options={{
              title: "Quran Reading Page",
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="(asma)"
            options={{
              title: "Asma-ul-husna",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(surahList)"
            options={{
              title: "Ayah",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(zikr)"
            options={{
              title: "Zikr Page",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(editor)"
            options={{
              title: "Editor Page",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(profile)"
            options={{
              title: "Profile Page",
              headerShown: false,
            }}
          />
          
        </Stack>
      </GlobalProvider>
    </GestureHandlerRootView>
  );
};

export default _layout;
