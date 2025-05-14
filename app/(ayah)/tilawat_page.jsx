import {
  ImageBackground,
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  ActivityIndicator,
} from "react-native";
import Header from "../../components/app/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { surahs } from "../../constants/quranData.js";
import { qaris } from "../../constants/qari.js";
import { useEffect, useState, useRef } from "react";
import DropDownMenu from "../../components/listeningScreen/DropDownMenu.jsx";
import Panel from "../../components/listeningScreen/Panel.jsx";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import DialogueBox from "../../components/listeningScreen/DialogueBox.jsx";
import PlayerControls from "../../components/listeningScreen/PlayerControls.jsx";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions } from "react-native";


// Get screen dimensions
const { width, height } = Dimensions.get("window");

// Responsive sizing function
const responsiveSize = (size) => {
  const scaleFactor = Math.min(width, height) / 375; // 375 is standard iPhone width
  return Math.round(size * scaleFactor);
};

export default function tilawat_page() {
  // States
  const [audioData, setAudioData] = useState({});
  const [show, setShow] = useState(false);
  const [qari, setQari] = useState(qaris[0]);
  const [surah, setSurah] = useState(surahs[0]);
  const [fav, setFav] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Audio states
  const soundRef = useRef(null);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(1);
  const [index, setIndex] = useState(surahs[0].id);

  // History tracking
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [value, setValue] = useState("");

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  // Add this useEffect after your other state declarations
  useEffect(() => {
    // Update value whenever surah changes
    setValue(surah.name);
  }, [surah]);

  // Handle surah selection
  const handleSurah = async (selectedSurah) => {
    try {
      setIsLoading(true);
      setSurah(selectedSurah);
      setValue(selectedSurah.name); // Update value when surah changes
      await AsyncStorage.setItem(
        "selectedSurah",
        JSON.stringify(selectedSurah)
      );

      // Stop current playback immediately
      await stopAndUnload();

      // Reset position
      setPosition(0);

      // Update index and history
      const newIndex = selectedSurah.id;
      setIndex(newIndex);

      setHistory((prev) => {
        if (prev[prev.length - 1] !== newIndex) {
          return [...prev, newIndex];
        }
        return prev;
      });

      setHistoryIndex((prev) => {
        const alreadyExists = history[prev] === newIndex;
        return alreadyExists ? prev : prev + 1;
      });

      // Load and play new audio
      await PlaySound(newIndex);
    } catch (error) {
      console.error("Error in handleSurah:", error);
      Alert.alert("Error", "Failed to load surah");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle reciter change
  const handleReciter = async (selectedReciter) => {
    setIsLoading(true);
    setQari(selectedReciter);
  };

  useEffect(() => {
    const handleChangeReciter = async () => {
      try {
        await stopAndUnload();
        setPosition(0); // Reset position
        await PlaySound(surah.id); // Play current surah with new reciter
      } catch (error) {
        console.error("Error in handleReciter:", error);
        Alert.alert("Error", "Failed to change reciter");
      } finally {
        setIsLoading(false);
      }
    };
    handleChangeReciter();
  }, [qari, setQari]);

  // Toggle play/pause
  async function togglePlay() {
    if (!soundRef.current) return;

    try {
      const status = await soundRef.current.getStatusAsync();
      if (status.isPlaying) {
        await soundRef.current.pauseAsync();
        setIsPlaying(false);
      } else {
        await soundRef.current.playFromPositionAsync(position);
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error in togglePlay:", error);
    }
  }

  // Play audio function
  async function PlaySound(id) {
    try {
      setIsLoading(true);

      // Format surah number with leading zeros
      const surahNumber = String(id).padStart(3, "0");
      const audioUrl = `https://${qari.server}.mp3quran.net/${qari.link}/${surahNumber}.mp3`;

      console.log("Loading audio from:", audioUrl);

      // Configure audio
      await Audio.setAudioModeAsync({
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
      });

      // Unload any existing sound
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
      }

      // Create and load new sound
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioUrl },
        {
          shouldPlay: true,
          progressUpdateIntervalMillis: 1000,
          positionMillis: 0, // Always start from beginning
          shouldCorrectPitch: true,
          volume: 1.0,
          rate: 1.0,
          androidImplementation: "MediaPlayer",
          iOS: {
            buffer: true,
            toleranceSeconds: 5,
          },
        }
      );

      soundRef.current = newSound;
      setIsPlaying(true);

      // Set up status update listener
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setPosition(status.positionMillis);
          setDuration(status.durationMillis || 1);

          if (status.didJustFinish) {
            setIsPlaying(false);
            setPosition(0);
          }
        }
      });
    } catch (error) {
      console.error("Error in PlaySound:", error);
      Alert.alert(
        "Playback Error",
        "Unable to play the audio. Please check your internet connection and try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  // Stop and unload audio
  async function stopAndUnload() {
    if (soundRef.current) {
      try {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
        soundRef.current = null;
        setIsPlaying(false);
        setPosition(0);
      } catch (error) {
        console.error("Error stopping audio:", error);
      }
    }
  }

  // Navigation functions
  async function PlayNext() {
    if (historyIndex + 1 < history.length) {
      const next = history[historyIndex + 1];
      await stopAndUnload();
      setHistoryIndex(historyIndex + 1);
      await PlaySound(next);
    }
  }

  async function PlayPrev() {
    if (historyIndex > 0) {
      const prev = history[historyIndex - 1];
      await stopAndUnload();
      setHistoryIndex(historyIndex - 1);
      await PlaySound(prev);
    }
  }

  async function nextSurah() {
    const curr = surahs.findIndex((s) => s.id === index);
    const next = surahs[curr + 1];
    if (next) {
      setValue(next.name); // Update value before changing surah
      await handleSurah(next);
    }
  }

  async function prevSurah() {
    const curr = surahs.findIndex((s) => s.id === index);
    const prev = surahs[curr - 1];
    if (prev) {
      setValue(prev.name); // Update value before changing surah
      await handleSurah(prev);
    }
  }

  // Slider handler
  async function handleSlider(value) {
    if (soundRef.current) {
      await soundRef.current.setPositionAsync(value);
      setPosition(value);
    }
  }

  // Format time
  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Replay handler
  async function handleReplay() {
    if (soundRef.current) {
      await soundRef.current.setPositionAsync(0);
      setPosition(0);
      await soundRef.current.playAsync();
      setIsPlaying(true);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white items-center">
      <ImageBackground
        source={require("../../assets/images/bg(1).jpg")}
        className="flex-1"
        resizeMode="cover"
      >
        {/* HEADER */}
        <Header version={4} destination={"/HomePage"} />

        <View className="flex-1 mt-2" style={{ marginTop: responsiveSize(8) }}>
          {/* Loading indicator */}
          {isLoading && (
            <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center z-50">
              <ActivityIndicator size="large" color="white" />
            </View>
          )}

          {/* DROPDOWN MENU */}
          <View
            className="flex-row items-center justify-center space-x-2 mt-2"
            style={{ marginTop: responsiveSize(10) }}
          >
            <TouchableOpacity onPress={prevSurah} hitSlop={20}>
              <AntDesign
                name="leftcircleo"
                size={responsiveSize(24)}
                color="white"
              />
            </TouchableOpacity>
            <DropDownMenu
              setAudioData={setAudioData}
              data={surahs}
              onChange={handleSurah}
              selection={"Select Surah"}
              value={value}
              setValue={setValue}
              style={{ width: width * 0.6 }} // 60% of screen width
            />
            <TouchableOpacity onPress={nextSurah} hitSlop={20}>
              <AntDesign
                name="rightcircleo"
                size={responsiveSize(24)}
                color="white"
              />
            </TouchableOpacity>
          </View>

          {/* SURAH PANEL */}
          <View style={{ marginTop: responsiveSize(15) }}>
            <Panel
              name={surah.arabic}
              textStyle={{ fontSize: responsiveSize(32) }}
            />
          </View>

          {/* SURAH AND QARI NAME */}
          <View className="pl-8 mt-4" style={{ marginTop: responsiveSize(20) }}>
            <Text
              className="text-white font-ossemibold"
              style={{ fontSize: responsiveSize(24) }}
            >
              Surah {surah.name}
            </Text>
            <View className="flex-row gap-2 items-center">
              <Text
                className="text-white font-oslight"
                style={{ fontSize: responsiveSize(16) }}
              >
                {qari.name}
              </Text>
              <TouchableOpacity hitSlop={20} onPress={() => setShow(true)}>
                <Feather
                  name="edit-2"
                  size={responsiveSize(16)}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* QARI SELECTION MODAL */}
          <Modal
            visible={show}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setShow(false)}
          >
            <TouchableWithoutFeedback onPress={() => setShow(false)}>
              <View className="flex-1 justify-center items-center bg-black/50">
                <DialogueBox
                  data={qaris}
                  onSelect={handleReciter}
                  style={{ width: width * 0.85 }}
                />
              </View>
            </TouchableWithoutFeedback>
          </Modal>

          {/* SLIDER */}
          <View className="px-4 mb-0" style={{ marginTop: responsiveSize(20) }}>
            <Slider
              style={{ width: "100%", height: responsiveSize(40) }}
              minimumValue={0}
              maximumValue={duration}
              value={position}
              onSlidingComplete={handleSlider}
              minimumTrackTintColor="white"
              maximumTrackTintColor="gray"
              thumbTintColor="white"
              disabled={isLoading}
            />
          </View>

          {/* TIME STAMPS */}
          <View
            className="flex-row justify-between px-8 mt-0"
            style={{ marginTop: responsiveSize(5) }}
          >
            <Text
              className="text-white font-ossemibold"
              style={{ fontSize: responsiveSize(14) }}
            >
              {formatTime(position)}
            </Text>
            <Text
              className="text-white font-ossemibold"
              style={{ fontSize: responsiveSize(14) }}
            >
              {formatTime(duration)}
            </Text>
          </View>

          {/* PLAYER CONTROLS */}
          <View
            className="flex-row items-center justify-center mt-4"
            style={{
              marginTop: responsiveSize(30),
              gap: responsiveSize(40),
            }}
          >
            <TouchableOpacity onPress={() => setFav(!fav)}>
              <MaterialIcons
                name={fav ? "favorite" : "favorite-outline"}
                size={responsiveSize(28)}
                color="white"
              />
            </TouchableOpacity>

            <PlayerControls
              isPlaying={isPlaying}
              handlePlay={togglePlay}
              handlePrev={PlayPrev}
              handleNext={PlayNext}
              isLoading={isLoading}
              size={responsiveSize(40)}
            />

            <TouchableOpacity onPress={handleReplay}>
              <MaterialIcons
                name="replay"
                size={responsiveSize(28)}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
