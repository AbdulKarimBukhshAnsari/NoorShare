import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/app/Header";

const ZikrCounter = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <Header version={4} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ZikrCounter;
