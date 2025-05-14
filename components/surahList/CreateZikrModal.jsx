import { View, Text, Modal, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import CustomAlert from '../app/CustomAlert';
import supabase from '../../lib/supabase';

const CreateZikrModal = ({ visible, onClose, onSuccess }) => {
  const [zikrName, setZikrName] = useState('');
  const [count, setCount] = useState('0');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    visible: false,
    message: '',
    type: 'success',
  });

  const showAlert = (message, type = 'success') => {
    setAlert({ visible: true, message, type });
  };

  const hideAlert = () => {
    setAlert({ visible: false, message: '', type: 'success' });
  };

  const validateInputs = () => {
    if (!zikrName.trim()) {
      showAlert('Please enter a Zikr name', 'error');
      return false;
    }

    if (zikrName.trim().split(' ').length > 2) {
      showAlert('Zikr name should not be more than 2 words', 'error');
      return false;
    }

    const numberCount = parseInt(count);
    if (isNaN(numberCount) || numberCount <= 0) {
      showAlert('Count must be greater than 0', 'error');
      return false;
    }

    return true;
  };

  const handleCreate = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        showAlert('Please login first', 'error');
        return;
      }

      const { error } = await supabase
        .from('azkar')
        .insert([{
          user_id: user.id,
          name: zikrName.trim(),
          count: parseInt(count),
          status: 'not completed'
        }]);

      if (error) throw error;

      showAlert('Zikr created successfully', 'success');
      setZikrName('');
      setCount('0');
      onSuccess();
      // Delay closing the modal to show the success message
      setTimeout(() => {
        onClose();
      }, 0);
    } catch (error) {
      showAlert(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white w-[90%] rounded-2xl p-6">
          <Text className="text-2xl font-osregular text-burgundy text-center mb-6">
            Create Zikr
          </Text>

          <View className="gap-4">
            <View>
              <Text className="text-base font-osregular text-gray-600 mb-2">
                Zikr Name
              </Text>
              <TextInput
                value={zikrName}
                onChangeText={setZikrName}
                className="border border-gray-300 rounded-lg p-3 text-base"
                placeholder="Enter Zikr name"
                maxLength={50}
              />
            </View>

            <View>
              <Text className="text-base font-osregular text-gray-600 mb-2">
                Total Count
              </Text>
              <View className="flex-row items-center border border-gray-300 rounded-lg">
                <TouchableOpacity 
                  onPress={() => setCount(prev => Math.max(0, parseInt(prev) - 1).toString())}
                  className="p-3"
                >
                  <Text className="text-xl text-burgundy">-</Text>
                </TouchableOpacity>
                <TextInput
                  value={count}
                  onChangeText={(text) => setCount(text.replace(/[^0-9]/g, ''))}
                  keyboardType="numeric"
                  className="flex-1 text-center text-base"
                />
                <TouchableOpacity 
                  onPress={() => setCount(prev => (parseInt(prev) + 1).toString())}
                  className="p-3"
                >
                  <Text className="text-xl text-burgundy">+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View className="flex-row justify-end gap-3 mt-6">
            <TouchableOpacity
              onPress={onClose}
              className="px-6 py-3 rounded-lg bg-gray-200"
            >
              <Text className="text-base font-osregular text-gray-700">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCreate}
              disabled={loading}
              className="px-6 py-3 rounded-lg bg-burgundy"
            >
              <Text className="text-base font-osregular text-white">
                {loading ? 'Creating...' : 'Create'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <CustomAlert
          visible={alert.visible}
          message={alert.message}
          type={alert.type}
          duration={3000}
          onClose={hideAlert}
        />
      </View>
    </Modal>
  );
};

export default CreateZikrModal;