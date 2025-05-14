import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Alert,
} from "react-native";
import {
  FontAwesome6,
  FontAwesome,
  Feather,
  MaterialIcons,
  Entypo,
  AntDesign,
} from "@expo/vector-icons";
import { useState, useRef, useMemo } from "react";
import * as ImagePicker from "expo-image-picker";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";
import { useGlobalSearchParams } from "expo-router/build/hooks";
import { router } from "expo-router";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

export default function Editor() {
  const { Arabic, Translation } = useGlobalSearchParams();

  // for image picker
  const [image, setImage] = useState(null);

  // function for selecting images from gallery
  const pickImg = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled && result.assets.length > 0) {
      const selectedImg = result.assets[0].uri;
      setImage(selectedImg);
    }
  };

  // font size, translation and arabic
  const [arabicFontSize, setArabicFontSize] = useState(18);
  const [translationFontSize, setTranslationFontSize] = useState(18);

  const increaseArabicSize = () => {
    setArabicFontSize((size) => {
      const newSize = Math.min(size + 1, 40);
      return newSize;
    });
  };

  const decreaseArabicSize = () => {
    setArabicFontSize((size) => {
      const newSize = Math.max(size - 1, 10);
      return newSize;
    });
  };

  const increaseTranslationFont = async () =>
    setTranslationFontSize((size) => {
      const newSize = Math.min(size + 1, 30);
      return newSize;
    });

  const decreaseTranslationFont = async () =>
    setTranslationFontSize((size) => {
      const newSize = Math.max(size - 1, 10);
      return newSize;
    });

  // for bottom sheet, text size increase or decrease
  const points = useMemo(() => ["30%"], []);
  const BottomSheetRef = useRef(null);

  const openBottomSheet = () => {
    BottomSheetRef.current?.expand();
  };

  // for rotating images

  const [rotation, setRotation] = useState(0);

  const rotateImage = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  // close + confirm function

  const confirmAndExit = () => {
    Alert.alert(
      "Discard Changes?",
      "Are you sure you want to exit without saving?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Exit",
          style: "destructive",
          onPress: () => router.push("/HomePage"),
        },
      ]
    );
  };

  // save + confirm function

  const saveAndExit = async () => {
    try {
      // Check if an image is selected and is a valid file URI
      if (!image || !image.startsWith("file://")) {
        Alert.alert(
          "Pick an image",
          "You must pick an image from gallery first."
        );
        return;
      }

      // Show confirmation alert before saving
      Alert.alert(
        "Save Changes?",
        "Are you sure you want to save your changes?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Save",
            style: "destructive",
            onPress: async () => {
              // Proceed with saving the image if confirmed
              const result = await manipulateAsync(
                image,
                [{ rotate: rotation }],
                {
                  compress: 1,
                  format: SaveFormat.JPEG,
                }
              );

              console.log("Saved Image URI:", result.uri);
              router.push("/HomePage");
            },
          },
        ]
      );
    } catch (error) {
      console.error("Error saving image:", error);
    }
  };

  return (
    <>
      {/* header view */}
      <View className="flex-row justify-between p-3 mr-2">
        <TouchableOpacity onPress={confirmAndExit}>
          <Entypo name="chevron-left" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={saveAndExit}>
          <FontAwesome6 name="check" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View className="h-[86%] w-screen">
        {image ? (
          <>
            <ImageBackground
              source={{ uri: image }}
              resizeMode="contain"
              className="w-screen h-full justify-center items-center"
              style={{ transform: [{ rotate: `${rotation}deg` }] }}
            >
              <View className="flex-1 items-center justify-center">
                <Text
                  className="text-burgundy font-bold mb-4 text-center"
                  style={{ fontSize: arabicFontSize }}
                >
                  {Arabic}
                </Text>
                <Text
                  className="text-burgundy font-bold mb-4 text-center"
                  style={{ fontSize: translationFontSize }}
                >
                  {Translation}
                </Text>
              </View>
            </ImageBackground>
          </>
        ) : (
          <>
            <ImageBackground
              source={require("../../assets/sharedimg/img1.jpeg")}
              resizeMode="contain"
              className="w-screen h-full justify-center items-center"
              style={{ transform: [{ rotate: `${rotation}deg` }] }}
            >
              <View className="flex-1 items-center justify-center">
                <Text
                  className="text-burgundy font-bold mb-4 text-center"
                  style={{ fontSize: arabicFontSize }}
                >
                  {Arabic}
                </Text>
                <Text
                  className="text-burgundy font-bold mb-4 text-center"
                  style={{ fontSize: translationFontSize }}
                >
                  {Translation}
                </Text>
              </View>
            </ImageBackground>
          </>
        )}
      </View>

      {/* Edit options  */}

      {/* crop, rotate, image picker, font style, size and colour */}
      <View className="mt-6 flex-row px-1">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
          }}
        >
          <TouchableOpacity onPress={rotateImage}>
            <FontAwesome name="font" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity className="mx-6" onPress={openBottomSheet}>
            <MaterialIcons name="format-size" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity className="mx-6">
            <MaterialIcons name="color-lens" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity className="mx-6">
            <Feather name="crop" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity className="mx-6" onPress={rotateImage}>
            <MaterialIcons
              name="rotate-90-degrees-ccw"
              size={24}
              color="purple"
            />
          </TouchableOpacity>

          <TouchableOpacity className="mx-6" onPress={pickImg}>
            <Feather name="image" size={24} color="black" />
          </TouchableOpacity>
        </ScrollView>
      </View>

      <BottomSheet
        ref={BottomSheetRef}
        index={-1}
        snapPoints={points}
        enablePanDownToClose={true}
        handleIndicatorStyle={{ backgroundColor: "#6A1A39" }}
        handleStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
      >
        <BottomSheetView>
          <View className="px-5 py-2">
            <Text className=" mb-2 text-burgundy font-[Poppins-Medium]">
              Font Settings
            </Text>

            {/* Arabic font size */}
            <Text className="mt-2 text-gray-700 font-[Poppins-Light]">
              Arabic Font Size
            </Text>
            <View className="flex-row items-center justify-between mt-1 bg-gray-100 p-2 rounded-lg">
              <TouchableOpacity
                onPress={decreaseArabicSize}
                className="p-2 bg-pinkLavender rounded-full"
              >
                <AntDesign name="minus" size={24} color="#6A1A39" />
              </TouchableOpacity>
              <Text className="text-gray-800 text-lg">{arabicFontSize}</Text>
              <TouchableOpacity
                onPress={increaseArabicSize}
                className="p-2 bg-pinkLavender rounded-full"
              >
                <AntDesign name="plus" size={24} color="#6A1A39" />
              </TouchableOpacity>
            </View>

            {/* Translation size */}
            <Text className="mt-2 text-gray-700 font-[Poppins-Light]">
              Translation Font Size
            </Text>
            <View className="flex-row items-center justify-between mt-1 bg-gray-100 p-2 rounded-lg">
              <TouchableOpacity
                onPress={decreaseTranslationFont}
                className="p-2 bg-pinkLavender rounded-full"
              >
                <AntDesign name="minus" size={24} color="#6A1A39" />
              </TouchableOpacity>
              <Text className="text-gray-800 text-lg">
                {translationFontSize}
              </Text>
              <TouchableOpacity
                onPress={increaseTranslationFont}
                className="p-2 bg-pinkLavender rounded-full"
              >
                <AntDesign name="plus" size={24} color="#6A1A39" />
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
}
