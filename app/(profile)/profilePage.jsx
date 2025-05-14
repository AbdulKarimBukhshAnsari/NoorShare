import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import Header from "../../components/app/Header";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AntDesign from "@expo/vector-icons/AntDesign";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";

export default function ProfilePage() {
  return (
    <>
      <ImageBackground
        className="w-screen h-60"
        source={require("../../assets/images/bg(1).jpg")}
      >
        {/* header */}
        <View>
          <Header version={2}></Header>
        </View>

        {/* info */}
        <View className="flex-row items-center mt-8">
          <FontAwesome6 name="user" size={64} color="white" className="mx-8" />
          <View className="m-4 items-center">
            <Text className="text-4xl font-osmedium color-white">
              Hafsa Ishaque
            </Text>
            <Text className="text-lg font-oslight color-white ">
              hafsaishaque@gmail.com
            </Text>
          </View>
        </View>
      </ImageBackground>

      {/* account settings */}
      <View className="px-6 mt-8">
        <Text className="text-2xl color-burgundy font-oslight">
          Account Settings
        </Text>
        <View className="flex-row mt-5 px-3">
          <FontAwesome6 name="user" size={20} color="black" />
          <Text className="color-black text-lg font-oslight px-6">
            Personal Information
          </Text>
        </View>
        <View className="flex-row mt-5 px-1">
          <Ionicons name="key-outline" size={24} color="black" />
          <Text className="color-black text-lg font-oslight px-6">
            Password and Security
          </Text>
        </View>
        <View className="flex-row mt-5 px-2">
          <AntDesign name="bells" size={20} color="black" />
          <Text className="color-black text-lg font-oslight px-6">
            Notification Preferences
          </Text>
        </View>
      </View>

      {/* shared Ayats  */}
      <View className="px-6 mt-8">
        <Text className="text-2xl color-burgundy font-oslight">
          Shared Ayats
        </Text>
        <View className="flex-row mt-5 px-2">
          <MaterialIcons name="favorite-outline" size={22} color="black" />
          <Text className="color-black text-lg font-oslight px-6">
            Favourite Template
          </Text>
        </View>
        <View className="flex-row mt-5 px-2">
          <SimpleLineIcons name="share" size={20} color="black" />
          <TouchableOpacity onPress={() => router.push("/SharedImages")}>
            <Text className="color-black text-lg font-oslight px-6">
              Shared Ayats
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* others */}
      <View className="px-6 mt-8">
        <Text className="text-2xl color-burgundy font-oslight">Others</Text>
        <View className="flex-row mt-5 px-2">
          <SimpleLineIcons name="question" size={20} color="black" />
          <Text className="color-black text-lg font-oslight px-6">FAQs</Text>
        </View>
        <View className="flex-row mt-5 px-2">
          <AntDesign name="info" size={24} color="black" />
          <Text className="color-black text-lg font-oslight px-6">Help</Text>
        </View>
      </View>
    </>
  );
}
