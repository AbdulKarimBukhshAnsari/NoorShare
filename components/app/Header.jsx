// Version1 = logo, noorshare, profileIcon(all white) ; used on homescreen
// Version2 = homeIcon, profile, logo (all white) ; used on profile screen
// Version3 = homeIcon, noorshare, profileIcon (all in 430C26) ; used almost everywhere else
// Version4 = chevron-back icon from Ionicons, noorshare, user (all white) ; used on Zikr Counter Screen

import { View, Text, Image } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { router, useRouter } from "expo-router";
import Logo from "../../assets/images/logo.png";

const Header = ({ version }) => {
    if (version === 1) {
    return(
        <View className="absolute top-[50px] items-center flex-row gap-[70px]">
            <Image source={Logo} className="w-12 h-12" resizeMode="contain"/>
            <Text className= "text-[30px] font-sorga text-white">NoorShare</Text>
            <FontAwesome6 name="user" size={24} color="white" solid />
        </View>
    )
    }

  if (version === 2) {
    return (
      <View className="mt-8 flex-row items-center justify-between px-6 w-full">
        <Pressable onPress={({}) => router.push("/HomePage")}>
          <MaterialIcons name="home" size={24} color="#430C26" solid />
        </Pressable>
        <Text className="text-3xl font-osregular text-white">Profile</Text>
        <Image source={Logo} className="w-10 h-10" resizeMode="contain" />
      </View>
    );
  }

  if (version === 3) {
    return (
      <View className="mt-8 flex-row items-center justify-between px-6 w-full">
        <Pressable onPress={({}) => router.push("/HomePage")}>
          <MaterialIcons name="home" size={30} color="#430C26" solid />
        </Pressable>

        <Text className="text-4xl font-sorga text-headerColor">NoorShare</Text>

        <Pressable onPress={({}) => router.push("/HomePage")}>
            <FontAwesome6 name="user" size={24} color="#430C26" solid />
        </Pressable>
      </View>
    );
  }

    if (version === 4) {
        return(
        <View className="absolute top-[50px] items-center flex-row gap-[70px]">
            <Ionicons name="chevron-back" size={30} color="white" />
            <Text className= "text-[30px] font-sorga text-white">NoorShare</Text>
            <FontAwesome6 name="user" size={24} color="white" solid />
        </View>
        )
    }
};

export default Header;
