import { Text, View, ImageBackground, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import images from "../constants/images";
import GlobalProvider, { useGlobalContext } from "../context/GlobalProvider";

export default function App() {
  const { isLoggedIn } = useGlobalContext();

  return (
    <ImageBackground
      source={images.Main}
      className="flex-1 justify-center bg-cover"
    >
      {/* 
      <View className="flex-1 justify-center items-center bg-black/10">
        <Text className="text-[#760513] text-5xl font-bold font-serif mt-2.5">
          {" "}
          NoorShare
        </Text>
        <Text className="text-[#760513] text-2xl font-bold font-sans mt-2 -bottom-2.5">
          {" "}
          Illuminate Your Life with the Quran
        </Text>

        <View className="absolute bottom-24 w-full items-center">
          <TouchableOpacity
            className="bg-white py-2.5 px-10 rounded-full items-center justify-center w-[70%] shadow-lg shadow-black/30"
            onPress={() => {
              // Add navigation logic here
              console.log("Get Started Pressed");
              router.push("/sign-up");
            }}
          >
            {console.log("pressed")}
            <Text className="text-[#760513] text-lg font-bold">
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
      </View> */}

      {/* uncomment above  or below for different styles keep note of the Imagebackgrund tag*/}
      <View className="flex-1 justify-center items-center bg-black/10">
        <Text className="text-[#760F13] text-5xl font-bold font-serif mt-2.5">
          {" "}
          NoorShare
        </Text>

        <View className="mt-8 w-full items-center">
          <TouchableOpacity
            className="bg-white py-2.5 px-5 rounded-full items-center justify-center w-[40%] shadow-lg shadow-black/30"
            onPress={() => {
              setTimeout(() => {
                if (isLoggedIn) {
                  router.replace("./index_page"); // Use replace to prevent going back to sign-in
                } else {
                  router.replace("./sign-in");
                }
              }, 100); // Small delay to ensure state is properly checked
            }}
          >
            <Text className="text-[#760F13] text-lg font-bold">
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
        <Text className="text-[#760F13] text-2xl font-light font-sans absolute bottom-20">
          {" "}
          Illuminate Your Life with the Quran
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  link: {
    fontSize: 18,
    color: 'blue',
    marginVertical: 10,
  },
});
