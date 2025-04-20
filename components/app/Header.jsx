// Version1 = logo, noorshare, profileIcon(all white) ; used on homescreen
// Version2 = homeIcon, profile, logo (all white) ; used on profile screen
// Version3 = homeIcon, noorshare, profileIcon (all in 430C26) ; used almost everywhere else
// Version4 = chevron-back icon from Ionicons, noorshare, user (all white) ; used on Zikr Counter Screen

import { View, Text, Image, TouchableOpacity } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { router, useRouter } from "expo-router";
import Logo from "../../assets/images/logo.png";

const Header = ({ version }) => {
    if (version === 1) {
    return(
        <View className="absolute top-[20px] items-center flex-row gap-[70px]">
            <Image source={Logo} className="w-12 h-12" resizeMode="contain"/>
            <Text className= "text-[30px] font-sorga text-white">NoorShare</Text>
            <FontAwesome6 name="user" size={24} color="white" solid />
        </View>
    )
    }

    if (version === 2) {
        return (
        <View className="absolute top-[50px] items-center flex-row gap-[100px]">
            <MaterialIcons name="home" size={24} color="white" solid />
            <Text className="text-[28px] font-osregular text-white">Profile</Text>
            <Image source={Logo} className="w-10 h-10" resizeMode="contain" />
        </View>
        )
    }

    if (version === 3) {
        return(
        <View className="absolute top-[50px] items-center flex-row gap-[70px]">
            <MaterialIcons name="home" size={30} color="#430C26" solid/>
            <Text className= "text-[30px] font-sorga text-headerColor">NoorShare</Text>
            <FontAwesome6 name="user" size={24} color="#430C26" solid/>
        </View>
        )
    }

    if (version === 4) {
        return(
        <View className="items-center flex-row gap-[70px]">
            <TouchableOpacity
            onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={30} color="white" />
            </TouchableOpacity>
            <Text className= "text-[30px] font-sorga text-white">NoorShare</Text>
            <FontAwesome6 name="user" size={24} color="white" solid />
        </View>
        )
    }
};

export default Header;