import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Animated,
  PanResponder,
} from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import { useState, useRef, useMemo } from "react";
import * as ImagePicker from "expo-image-picker";
import { useGlobalSearchParams } from "expo-router/build/hooks";
import { router } from "expo-router";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { ImageEditor } from "expo-image-editor";
import FontSize from "../../components/bottomSheet/fontSize";
import FontStyle from "../../components/bottomSheet/fontStyle";
import FontColour from "../../components/bottomSheet/fontColour";
import supabase from "../../lib/supabase"; // adjust path as needed
import { Alert } from "react-native";


export default function Editor() {
  // for moving text
  const panArabic = useRef(new Animated.ValueXY()).current;
  const panTranslation = useRef(new Animated.ValueXY()).current;

  const panResponderArabic = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, { dx: panArabic.x, dy: panArabic.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        panArabic.extractOffset();
      },
    })
  ).current;

  const panResponderTranslation = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, { dx: panTranslation.x, dy: panTranslation.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        panTranslation.extractOffset();
      },
    })
  ).current;
  // for passing arabic and text
  const { Arabic, Translation } = useGlobalSearchParams();

  // to open and close image editor for crop
  const [editorVisible, setEditorVisible] = useState(false);

  // function to handle saving the image once cropping is complete
  const handleSave = (img) => {
    setImage(img.uri);
    setEditorVisible(!editorVisible);
  };

  const handleCancel = () => {
    setEditorVisible(!editorVisible);
  };

  // for image picker
  const [image, setImage] = useState(undefined);

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

  // font style english 
  const [fontEnglish, setFontEnglish] = useState("bold");

  // font style arabic
  const [fontArabic, setFontArabic] = useState("aquran")

  // font colour
  const [colour, setColour] = useState("#6A1A39");

  // for bottom sheet, text size increase or decrease
  const points = useMemo(() => ["30%"], []);
  const BottomSheetRef = useRef(null); // for font size

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
    // Check if an image is selected
    if (!image) {
      Alert.alert("Pick an image", "You must pick an image from gallery first.");
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
            // Get the current authenticated user
            const { data: { user } } = await supabase.auth.getUser();
            
            if (!user) {
              Alert.alert("Error", "User not authenticated");
              return;
            }

            // Generate a unique filename for the image
            const timestamp = new Date().getTime();
            const fileExt = image.split('.').pop();
            const fileName = `${user.id}_${timestamp}.${fileExt}`;
            
            // Read the image file
            const formData = new FormData();
            formData.append('file', {
              uri: image,
              name: fileName,
              type: `image/${fileExt === 'jpg' ? 'jpeg' : fileExt}`,
            });

            // Upload to Supabase storage
            const { data: uploadData, error: uploadError } = await supabase
              .storage
              .from('post') // your bucket name
              .upload(fileName, formData, {
                contentType: `image/${fileExt === 'jpg' ? 'jpeg' : fileExt}`,
              });

            if (uploadError) {
              console.error("Upload error:", uploadError);
              Alert.alert("Error", "Failed to upload image");
              return;
            }
            
            // Get the public URL of the uploaded image
            const { data: urlData } = supabase
              .storage
              .from('post')
              .getPublicUrl(fileName);

            // Insert post record into the database
            const { error: insertError } = await supabase
              .from('posts')
              .insert([
                { 
                  user_id: user.id,
                  image: urlData.publicUrl,
                  // Add any other fields you need
                }
              ]);

            if (insertError) {
              console.error("Insert error:", insertError);
              Alert.alert("Error", "Failed to save post");
              return;
            }

            // Success - navigate back
            router.push("/HomePage");
          },
        },
      ]
    );
  } catch (error) {
    console.error("Error saving image:", error);
    Alert.alert("Error", "An unexpected error occurred");
  }
};

  // for bottom screen content
  const [type, setType] = useState(undefined);
  return (
    <>
      {/* header */}
      <View className="flex-row justify-between p-3 mr-2">
        <TouchableOpacity onPress={confirmAndExit}>
          <Entypo name="chevron-left" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={saveAndExit}>
          <FontAwesome6 name="check" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* image view */}
      <View className="h-[86%] w-screen">
        <>
          <ImageBackground
            source={
              image ? { uri: image } : require("../../assets/images/image.jpg")
            }
            className="w-screen h-full"
            style={{ transform: [{ rotate: `${rotation}deg` }] }}
            resizeMode="contain"
          >
            <View className="flex-1 items-center justify-center">
              <Animated.View
                style={{
                  transform: [
                    { translateX: panArabic.x },
                    { translateY: panArabic.y },
                  ],
                }}
                {...panResponderArabic.panHandlers}
              >
                <View>
                  <Text
                    className={` font-${fontArabic} text-center`}
                    style={{ fontSize: arabicFontSize, color: colour }}
                  >
                    {Arabic}
                  </Text>
                </View>
              </Animated.View>
              <Animated.View
                style={{
                  transform: [
                    { translateX: panTranslation.x },
                    { translateY: panTranslation.y },
                  ],
                }}
                {...panResponderTranslation.panHandlers}
              >
                <View>
                  <Text
                    className={` font-${fontEnglish} text-center`}
                    style={{ fontSize: translationFontSize, color: colour }}
                  >
                    {Translation}
                  </Text>
                </View>
              </Animated.View>
            </View>
          </ImageBackground>
        </>
      </View>

      {/* Edit options  */}

      {/* crop, rotate, image picker, font style, size and colour */}
      <View className="mt-6">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            className="mx-8"
            onPress={() => {
              openBottomSheet();
              setType("style");
            }}
          >
            <FontAwesome name="font" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            className="mx-8"
            onPress={() => {
              openBottomSheet();
              setType("size");
            }}
          >
            <MaterialIcons name="format-size" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            className="mx-8"
            onPress={() => {
              openBottomSheet();
              setType("colour");
            }}
          >
            <MaterialIcons name="color-lens" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            className="mx-8"
            onPress={() => {
              if (image) {
                setEditorVisible(!editorVisible);
              }
            }}
          >
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
          {type == "size" ? (
            <FontSize
              fontsizeArabic={arabicFontSize}
              fontsizeTranslation={translationFontSize}
              increaseArabic={increaseArabicSize}
              decreaseArabic={decreaseArabicSize}
              increaseTranslation={increaseTranslationFont}
              decreaseTranslation={decreaseTranslationFont}
            />
          ) : null}

          {type == "style" ? <FontStyle setEng={setFontEnglish} setArabic={setFontArabic} /> : null}

          {type == "colour" ? <FontColour setColour={setColour} /> : null}
        </BottomSheetView>
      </BottomSheet>

      {/* crop modal */}
      <View className="h-screen-safe">
        <ImageEditor
          visible={editorVisible}
          onCloseEditor={() => handleCancel()}
          onEditingComplete={(img) => handleSave(img)}
          imageUri={image}
          minimumCropDimensions={{ height: 100, width: 100 }}
          fixedCropAspectRatio={9 / 16}
          lockAspectRatio={false}
          mode="crop-only"
        />
      </View>
    </>
  );
}
