import {
  ImageBackground,
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import Header from "../../components/app/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { surahs } from "../../constants/quranData.js";
import { qaris } from "../../constants/qari.js";
import { useEffect, useState } from "react";
import DropDownMenu from "../../components/listeningScreen/DropDownMenu.jsx";
import Panel from "../../components/listeningScreen/Panel.jsx";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import DialogueBox from "../../components/listeningScreen/DialogueBox.jsx";
import PlayerControls from "../../components/listeningScreen/PlayerControls.jsx";
import { Audio } from "expo-av";
import { surahAudio } from "../../constants/surahAudio.js";
import Slider from "@react-native-community/slider";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function tilawat_page() {
  // for drop down menu (surah name) and modal (reciter/qari)
  const [audioData, setAudioData] = useState({});
  const [show, setShow] = useState(false);
  const [qari, setQari] = useState(qaris[0]);
  const [surah, setSurah] = useState(surahs[0]);
 
  const handleSurah = async (selectedSurah) => {
    setSurah(selectedSurah);
    console.log('Handle Surah', audioData);
    await AsyncStorage.setItem("selectedSurah", JSON.stringify(selectedSurah));
    const newIndex = selectedSurah.id;
    console.log(newIndex);
    await stopAndUnload();
    setIndex(newIndex);

    setPosition(0);
    setHistory((prev) => {
      if (prev[prev.length - 1] !== newIndex) {
        return [...prev, newIndex];
      }
      return prev;
    });

    // Update history index
    setHistoryIndex((prev) => {
      const alreadyExists = history[prev] === newIndex;
      return alreadyExists ? prev : prev + 1;
    });
    await PlaySound(newIndex);
  };
  const handleReciter = async (selectedReciter) => {
    setQari(selectedReciter);
    await AsyncStorage.setItem(
      "selectedReciter",
      JSON.stringify(selectedReciter)
    );
  };

  // for async storage
  useEffect(() => {
    const loadSelections = async () => {
      const storedSurah = await AsyncStorage.getItem("selectedSurah");
      const storedReciter = await AsyncStorage.getItem("selectedReciter");

      if (storedSurah) {
        setSurah(JSON.parse(storedSurah));
      }
      if (storedReciter) {
        setQari(JSON.parse(storedReciter));
      }
    };
    loadSelections();
  }, []);

  // for favourite (will be implemented by Scrum Master :) )
  const [fav, setFav] = useState(false);

  const handleFav = () => {
    setFav(!fav);
  };

  // for playing sound
  const [play, setPlay] = useState(false);
  const [sound, setSound] = useState(null);
  const [index, setIndex] = useState(surahs[0].id); // for surah id (moving throught sequence)
  const [position, setPosition] = useState(0); // for resuming surah
  const [duration, setDuration] = useState(1); //for setting surah duration

  // for keepng track of played surahs
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // for unloading sound when we leave the page
  useEffect(() => {
    return () => {
      if (sound) {
        {
          console.log("unloading sound");
        }
        sound.unloadAsync();
      }
    };
  }, [sound]);

  // for stoping and playing the audio
  async function togglePlay() {
    if (sound) {
      const status = await sound.getStatusAsync();
      if (status.isPlaying) {
        console.log("Pausing sound...");
        await sound.pauseAsync();
        setPlay(false);
        setPosition(status.positionMillis); // Save current position
      } else {
        console.log("Resuming sound...");
        await sound.playFromPositionAsync(position); // Resume from saved position
        setPlay(true);
      }
    } else {
      console.log("no sound loaded");
    }
  }

  // for playing the audio according to surah id
  async function PlaySound(id) {
    console.log("loading sound");
    const { sound: newSound } = await Audio.Sound.createAsync(surahAudio[id]);

    console.log(surahAudio);
    setSound(newSound);
    setPlay(true);

    console.log("Playing sound from position", position);
    await newSound.playAsync();

    //tracking playback position for slider
    newSound.setOnPlaybackStatusUpdate((status) => {
      if (status.positionMillis) {
        setPosition(status.positionMillis);
        setDuration(status.durationMillis || 1);
      }
      if (status.didJustFinish) {
        setPlay(false);
        setPosition(0);
      }
      if (status.isLoaded && status.isPlaying && !status.didJustFinish) {
        const newSurah = surahs.find((surah) => surah.id === id);
        setSurah(newSurah);
      }
    });
  }

  // for stopping and unloadding the sound
  async function stopAndUnload() {
    if (sound) {
      await sound.unloadAsync();
      setSound(null);
      setPosition(0);
      setPlay(false);
    }
  }

  // for playing next surah in the history
  async function PlayNext() {
    if (historyIndex + 1 < history.length) {
      const next = history[historyIndex + 1];
      await stopAndUnload();
      setHistoryIndex(historyIndex + 1);
      await PlaySound(next);
    } else {
      console.log("no next surah available");
    }
  }

  // for playing previous surah in history
  async function PlayPrev() {
    if (historyIndex > 0) {
      const prev = history[historyIndex - 1];
      await stopAndUnload();
      setHistoryIndex(historyIndex - 1);
      await PlaySound(prev);
    } else {
      console.log("no previous surah available");
    }
  }

  // for playing next surah in the sequence
  async function nextSurah() {
    const curr = surahs.findIndex((surah) => surah.id === index);
    const next = surahs[curr + 1];
    if (next) {
      console.log("next surah id: ", next);
      setIndex(next.id);
      setSurah(next);
    } else {
      console.log("no next surah available");
    }
  }

  // for playing previous surah in sequence
  async function prevSurah() {
    const curr = surahs.findIndex((surah) => surah.id === index);
    const prev = surahs[curr - 1];
    if (prev) {
      console.log("prev surah id: ", prev);
      setIndex(prev.id);
      setSurah(prev);
    } else {
      console.log("no previous surah available");
    }
  }

  // for setting position on the slider / handling its movement
  async function handleSlider(value) {
    if (sound) {
      await sound.setPositionAsync(value);
      setPosition(value);
    }
  }

  // for formatting time
  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // for handling replay (continuing from the start)
  async function handleReplay() {
    if (sound) {
      await sound.stopAsync();
      await sound.setPositionAsync(0);
      setPosition(0);
      await sound.playAsync();
      setPlay(true);
    }
  }

  return (
    <>
      <SafeAreaView className="flex-1 bg-white items-center ">
        <ImageBackground
          source={require("../../assets/images/bg(1).jpg")}
          className="flex-1"
        >
          {/* HEADER */}
          <Header version={4} destination={"/HomePage"} />

          <View className = "flex-1 mt-6">
            {/* DROPDOWN MENU */}
            <View className="flex-row items-center justify-center space-x-2 mt-4">
              <TouchableOpacity onPress={prevSurah} hitSlop={20}>
                <AntDesign name="leftcircleo" size={28} color="white" />
              </TouchableOpacity>
              <DropDownMenu
                setAudioData = {setAudioData}
                data={surahs}
                onChange={handleSurah}
                selection={"Select Surah"}
              />
              <TouchableOpacity onPress={nextSurah} hitSlop={20}>
                <AntDesign name="rightcircleo" size={28} color="white" />
              </TouchableOpacity>
            </View>

            {/* SURAH PANEL */}
            <Panel name={surah.arabic}></Panel>

            {/* SURAH AND QARI NAME */}
            <View className="pl-10 mt-6">
              <Text className="text-white text-3xl font-ossemibold">
                Surah {surah.name}
              </Text>
              <View className="flex-row gap-2">
                <Text className="text-white text-xl font-oslight">
                  {qari.name}
                </Text>
                <TouchableOpacity
                  hitSlop={20}
                  onPress={() => {
                    setShow(true);
                  }}
                >
                  <Feather
                    name="edit-2"
                    size={18}
                    color="white"
                    className="mt-1"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* QARI SELECTION MENU */}
            {show ? (
              <Modal
                visible={show}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShow(false)}
              >
                <TouchableWithoutFeedback onPress={() => setShow(false)}>
                  <View className="flex-1 justify-center items-center bg-black/50">
                    <DialogueBox data={qaris} onSelect={handleReciter} />
                  </View>
                </TouchableWithoutFeedback>
              </Modal>
            ) : null}

            {/* SLIDER */}
            <View className="px-4 mb-0">
              <Slider
                style={{ width: "100%", height: 60 }}
                minimumValue={0}
                maximumValue={duration}
                value={position}
                onSlidingComplete={handleSlider} // Correctly passes value when released
                minimumTrackTintColor="white"
                maximumTrackTintColor="gray"
                thumbTintColor="white"
              />
            </View>

            {/* TIME STAMPS */}
            <View className="flex-row justify-between px-8 mt-0">
              <Text className="text-white font-ossemibold">
                {formatTime(position)}
              </Text>
              <Text className="text-white font-ossemibold">
                {formatTime(duration)}
              </Text>
            </View>

            {/* PLAYER CONTROLS, FAVOURITE, RESTART */}
            <View className="px-8 flex-row gap-20 items-center justify-center mt-6">
              <TouchableOpacity onPress={handleFav}>
                <MaterialIcons
                  name={fav ? "favorite" : "favorite-outline"}
                  size={28}
                  color="white"
                />
              </TouchableOpacity>
              <PlayerControls
                isPlaying={play}
                handlePlay={togglePlay}
                handlePrev={PlayPrev}
                handleNext={PlayNext}
              />
              <TouchableOpacity onPress={handleReplay}>
                <MaterialIcons name="replay" size={28} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
}
