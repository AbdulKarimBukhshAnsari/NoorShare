import { Modal, View, Text, TouchableOpacity, Animated } from 'react-native';
import { useEffect, useRef } from 'react';

const CustomAlert = ({ 
  visible, 
  message, 
  type = 'success', // 'success' | 'error' | 'info'
  duration = 3000,
  onClose 
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const handleClose = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onClose?.();
    });
  };

  const getColors = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-100',
          border: 'border-green-500',
          text: 'text-green-800'
        };
      case 'error':
        return {
          bg: 'bg-red-100',
          border: 'border-red-500',
          text: 'text-red-800'
        };
      default:
        return {
          bg: 'bg-burgundy/10',
          border: 'border-burgundy',
          text: 'text-burgundy'
        };
    }
  };

  const { bg, border, text } = getColors();

  if (!visible) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={handleClose}
    >
      <View className="flex-1 justify-center items-center px-4">
        <Animated.View 
          style={{ opacity: fadeAnim }}
          className={`w-full max-w-sm p-4 rounded-lg border ${bg} ${border} shadow-lg`}
        >
          <View className="flex-row items-center justify-between">
            <Text className={`flex-1 font-osregular text-base ${text}`}>
              {message}
            </Text>
            <TouchableOpacity 
              onPress={handleClose}
              className="ml-4"
            >
              <Text className={`font-osbold text-lg ${text}`}>×</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default CustomAlert;