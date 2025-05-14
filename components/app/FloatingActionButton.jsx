import { TouchableOpacity, Text } from 'react-native';

const FloatingActionButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="absolute bottom-8 right-8 w-16 h-16 bg-burgundy rounded-2xl items-center justify-center shadow-lg z-50"
    >
      <Text className="text-white text-4xl font-bold">+</Text>
    </TouchableOpacity>
  );
};

export default FloatingActionButton;