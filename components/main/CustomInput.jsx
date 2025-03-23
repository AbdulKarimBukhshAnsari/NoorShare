import { View, TextInput } from "react-native";


const CustomInput = ({ placeholder = "Enter text", value, onChangeText, secureTextEntry = false, keyboardType = "default", className = "" }) => {
  return (
    <View className={`w-full border-b border-white py-2 ${className}`}>
        <TextInput
        placeholder={placeholder}
        placeholderTextColor="rgba(255, 255, 255, 0.7)" // Light placeholder
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        className="text-white text-lg font-medium bg-transparent py-1"
        />
      
    </View>
  );
};

export default CustomInput;
