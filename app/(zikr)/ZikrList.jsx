import { SafeAreaView, TouchableWithoutFeedback, Keyboard, View, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import SectionBox from "../../components/app/SectionBox";
import Header from "../../components/app/Header";
import SearchBar from "../../components/app/SearchBar";
import ScrollMenu from "../../components/surahList/AnimatedMenu";
import CreateZikrModal from "../../components/surahList/CreateZikrModal";
import FloatingActionButton from "../../components/app/FloatingActionButton";
import CustomAlert from "../../components/app/CustomAlert";
import supabase from "../../lib/supabase";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const SurahListPage = () => {
  const [azkarData, setAzkarData] = useState([]);
  const [favoriteZikr, setFavoriteZikr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [alert, setAlert] = useState({
    visible: false,
    message: '',
    type: 'success',
  });
  const [sortOrder, setSortOrder] = useState('asc');

  const showAlert = (message, type = 'success') => {
    setAlert({ visible: true, message, type });
  };

  const hideAlert = () => {
    setAlert({ visible: false, message: '', type: 'success' });
  };

  const fetchAzkarData = async () => {
    setIsLoading(true);
    try {
      const { data: allData, error: allError } = await supabase
        .from("azkar")
        .select("*")
        .order('name', { ascending: sortOrder === 'asc' });

      if (allError) {
        showAlert(allError.message, 'error');
        return;
      }

      const { data: favoriteData, error: favoriteError } = await supabase
        .from("azkar")
        .select("*")
        .eq('favourite', true)
        .order('name', { ascending: sortOrder === 'asc' });

      if (favoriteError) {
        showAlert(favoriteError.message, 'error');
        return;
      }

      setAzkarData(allData || []);
      setFavoriteZikr(favoriteData || []);
    } catch (err) {
      showAlert(err.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFavoriteUpdate = async () => {
    await fetchAzkarData();
  };

  const toggleSort = () => {
    setSortOrder(prev => {
      const newOrder = prev === 'asc' ? 'desc' : 'asc';
      return newOrder;
    });
  };

  useEffect(() => {
    fetchAzkarData();
  }, [sortOrder]);

  useEffect(() => {
    fetchAzkarData();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView className="flex-1 bg-white items-center">
        <Header version={3} />
        <SectionBox text="ZIKR CORNER"/>
        <View className="flex-row items-center justify-between w-full px-4">
          <SearchBar />
          <TouchableOpacity 
            onPress={toggleSort}
            className="ml-2 p-2 rounded-full bg-burgundy/10"
          >
            <MaterialIcons 
              name={sortOrder === 'asc' ? 'sort-by-alpha' : 'sort-by-alpha'} 
              size={24} 
              color="#6A1A39" 
            />
          </TouchableOpacity>
        </View>
        
        <ScrollMenu 
          tabs={["ALL", "FAVORITE"]} 
          azkarData={azkarData}
          favoriteZikr={favoriteZikr}
          isLoading={isLoading}
          onFavoriteUpdate={handleFavoriteUpdate}
        />

        <FloatingActionButton onPress={() => setModalVisible(true)} />

        <CreateZikrModal 
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSuccess={() => {
            fetchAzkarData();
            showAlert('Zikr created successfully!');
          }}
        />

        <CustomAlert
          visible={alert.visible}
          message={alert.message}
          type={alert.type}
          duration={3000}
          onClose={hideAlert}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SurahListPage;
