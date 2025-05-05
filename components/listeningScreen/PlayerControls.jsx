import { TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function PlayerControls({ isPlaying, handlePlay, handlePrev, handleNext }) {
  return (
    <>
      <View className="flex-row gap-9 justify-center items-center">
        {/* previous button */}
        <TouchableOpacity hitSlop={20} onPress={handlePrev} >
          <AntDesign name="stepbackward" size={22} color="white" />
        </TouchableOpacity>
        {/* play/pause button */}
        <TouchableOpacity hitSlop={20} onPress={handlePlay}>
          <AntDesign
            name={isPlaying ? "pausecircleo" : "playcircleo"}
            size={64}
            color="white"
          />
        </TouchableOpacity>
        {/* next button */}
        <TouchableOpacity hitSlop={20} onPress={handleNext}>
          <AntDesign name="stepforward" size={22} color="white" />
        </TouchableOpacity>
      </View>
    </>
  );
}
