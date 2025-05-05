import { View, Text, TouchableOpacity, FlatList, TouchableWithoutFeedback } from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import Modal from "react-native-modal";

export default function Dropdown({ data, onChange, selection }) 
{
  const [expanded, setExpanded] = useState(false);
  const [value, setValue] = useState("");
  const buttonRef = useRef(null);
  const [top, setTop] = useState(0);

  const toggleExpanded = useCallback(() => setExpanded(!expanded), [expanded]);

  const onSelect = useCallback((item) => {
    onChange(item);
    setValue(item.name);
    setExpanded(false);
  }, []);

  return (
    <View
      ref={buttonRef}
      onLayout={(event) => {
        const layout = event.nativeEvent.layout;
        setTop(layout.y + layout.height );
      }}
      className = "items-center"
    >
      <TouchableOpacity
        className="flex-row justify-between items-center p-4 rounded-xl w-[77%]"
        style={{ backgroundColor: "rgba(250, 192, 199, 0.39)" }}
        activeOpacity={0.8}
        onPress={toggleExpanded}
      >
        <Text className="text-white text-base">
          {value || selection}
        </Text>
        <AntDesign name={expanded ? "caretup" : "caretdown"} color="white" size={16} />
      </TouchableOpacity>
      {expanded && (
        <Modal 
        isVisible={expanded} 
        onBackdropPress={() => setExpanded(false)}
        backdropOpacity={0}
        style={{ margin: 0, justifyContent: "flex-start" }}
        animationIn="fadeInDown"
        animationOut="fadeOutUp">
          <TouchableWithoutFeedback onPress={() => setExpanded(false)}>
            <View style={{ position: "absolute", top: top + 78, left: "20.5%", width: "59%" }}>
              <View className="w-full p-3 rounded-b-md max-h-64 bg-white shadow-lg">
                <FlatList
                  keyExtractor={(item) => item.id.toString()}
                  data={data}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      className="p-3 rounded-md"
                      activeOpacity={0.8}
                      onPress={() => onSelect(item)}
                    >
                      <Text className="text-burgundy text-center">{item.name}</Text>
                    </TouchableOpacity>
                  )}
                  ItemSeparatorComponent={() => <View className="h-4" />}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );

};



