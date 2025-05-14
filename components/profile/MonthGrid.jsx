import { View, Text, FlatList } from "react-native";
import { format, parseISO } from "date-fns";
import ImageGrid from "./ImageGrid";

export default function MonthGrid({ images }) {
  const grouped = images.reduce((acc, img) => {
    const month = format(parseISO(img.createdAt), "MMMM yyyy");
    acc[month] = acc[month] || [];
    acc[month].push(img);
    return acc;
  }, {});

  const sortedMonths = Object.keys(grouped).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  return (
    <View style={{ marginTop: 16, flex: 1 }}>
      <FlatList
        contentContainerStyle={{ paddingBottom: 1, paddingHorizontal: 16 }}
        data={sortedMonths}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View className="mb-4">
            <Text className="text-lg font-bold mb-3">{item}</Text>
            <ImageGrid images={grouped[item]} />
          </View>
        )}
      />
    </View>
  );
}
