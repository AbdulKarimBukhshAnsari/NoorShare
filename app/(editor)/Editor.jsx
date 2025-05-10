import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
} from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState, useRef, useMemo } from "react";
import * as ImagePicker from "expo-image-picker";
import ImageManipulator, {
  FlipType,
  SaveFormat,
  useImageManipulator,
} from "expo-image-manipulator";
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

  // for rotating images
  const rotateImg = async (img) => {
    if (image) {
      const manipulate = ImageManipulator.useImageManipulator(img);
      const result = await manipulate.renderAsync();
      console.log(result);
      setImage(result);
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
  const closeBottomSheet = () => {
    BottomSheetRef.current?.close();
  };

  return (
    <>
      {/* image view */}
      <View className="flex-row justify-between p-3 mr-2">
        <TouchableOpacity
          onPress={() => {
            router.push("/HomePage");
          }}
        >
          <Entypo name="chevron-left" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome6 name="check" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View className="h-[86%] w-screen">
        {image ? (
          <>
            <ImageBackground
              source={{ uri: image }}
              className="w-screen h-full justify-center items-center"
            >
              <View className="flex-1 items-center justify-center">
                <Text className="text-burgundy font-bold mb-4 text-center" style = {{fontSize:arabicFontSize}}>
                  {Arabic}
                </Text>
                <Text className="text-burgundy font-bold mb-4 text-center" style = {{fontSize:translationFontSize}} >
                  {Translation}
                </Text>
              </View>
            </ImageBackground>
          </>
        ) : (
          <>
            <ImageBackground
              source={require("../../assets/images/image.jpg")}
              className="w-screen h-full justify-center items-center"
            >
              <View className="flex-1 items-center justify-center">
                <Text className="text-burgundy font-bold mb-4 text-center" style = {{fontSize:arabicFontSize}}>
                  {Arabic}
                </Text>
                <Text className="text-burgundy font-bold mb-4 text-center" style = {{fontSize:translationFontSize}} >
                  {Translation}
                </Text>
              </View>
            </ImageBackground>
          </>
        )}
      </View>

      {/* Edit options  */}
      {/* crop, rotate, image picker, font style, size and colour */}
      <View className="mt-6">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity className="mx-8">
            <FontAwesome name="font" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity className="mx-8" onPress={openBottomSheet}>
            <MaterialIcons name="format-size" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity className="mx-8">
            <MaterialIcons name="color-lens" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity className="mx-8">
            <Feather name="crop" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            className="mx-8"
            onPress={() => {
              rotateImg(image);
            }}
          >
            <MaterialIcons
              name="rotate-90-degrees-ccw"
              size={24}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={pickImg} className="mx-8">
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
          <View className = "px-5 py-2">
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
