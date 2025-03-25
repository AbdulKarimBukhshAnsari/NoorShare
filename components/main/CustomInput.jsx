import { View, TextInput, Pressable , Text, TouchableOpacity} from "react-native";
import { useState } from "react";


const CustomInput = ({ placeholder = "Enter text", value, onChangeText, secureTextEntry = false, setSecureTextEntry ,  keyboardType = "default", className = "" }) => {




  return (
    <View className={` border-b border-white py-2 ${className} flex-row items-center justify-between`}>
        <TextInput
        placeholder={placeholder}
        placeholderTextColor="rgba(255, 255, 255, 0.6)" // Light placeholder
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        className="text-white text-lg font-medium bg-transparent py-1"
        />
        {
          placeholder === 'Password' && (
            <TouchableOpacity onPress={() => setSecureTextEntry((prev) => !prev)}>
              <Text className = {`text-white ${secureTextEntry ? 'line-through' : ''}`}>
                Show 
              </Text>
            </TouchableOpacity>
          )
        }
      
    </View>
  );
};

export default CustomInput;
