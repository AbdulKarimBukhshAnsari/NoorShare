import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, Modal, StyleSheet } from 'react-native';
import { X } from 'lucide-react-native';
import { asmaUlHusna } from '../../constants/asmaData';

export default function AsmaUlHusna() {
  const [selectedName, setSelectedName] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.headerArabic, { fontFamily: 'Al-Mushaf-Quran' }]}>
          أسماء الحسنى
        </Text>
        <Text style={styles.headerEnglish}>Asma ul Husna</Text>
      </View>

      <ScrollView style={styles.gridContainer}>
        <View style={styles.grid}>
          {asmaUlHusna.map((name) => (
            <Pressable
              key={name.id}
              style={styles.nameButton}
              onPress={() => setSelectedName(name)}
            >
              <Text style={styles.idText}>{name.id}</Text>
              <Text style={[styles.arabicName, { fontFamily: 'Al-Mushaf-Quran' }]}>
                {name.name}
              </Text>
              <Text style={styles.transliteration}>{name.transliteration}</Text>
              <Text style={styles.translation}>{name.translation}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <Modal
        visible={selectedName !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedName(null)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setSelectedName(null)}
        >
          <Pressable style={styles.modalContent} onPress={e => e.stopPropagation()}>
            <Pressable
              style={styles.closeButton}
              onPress={() => setSelectedName(null)}
            >
              <X size={24} color="#760513" />
            </Pressable>
            
            {selectedName && (
              <>
                <Text style={styles.modalId}>{selectedName.id}</Text>
                <Text style={[styles.modalArabic, { fontFamily: 'Al-Mushaf-Quran' }]}>
                  {selectedName.name}
                </Text>
                <Text style={styles.modalTransliteration}>
                  {selectedName.transliteration}
                </Text>
                <Text style={styles.modalTranslation}>
                  {selectedName.translation}
                </Text>
                <Text style={styles.modalDescription}>
                  {selectedName.description}
                </Text>
              </>
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDD0',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  headerArabic: {
    fontSize: 32,
    color: '#760513',
    marginBottom: 8,
  },
  headerEnglish: {
    fontSize: 24,
    color: '#760513',
    fontWeight: '500',
  },
  gridContainer: {
    flex: 1,
    padding: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  nameButton: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: '#FFFDD0',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#760513',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  idText: {
    fontSize: 20,
    color: '#760513',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  arabicName: {
    fontSize: 28,
    color: '#760513',
    marginBottom: 8,
  },
  transliteration: {
    fontSize: 16,
    color: '#760513',
    fontWeight: '500',
    marginBottom: 4,
  },
  translation: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFFDD0',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  modalId: {
    fontSize: 24,
    color: '#760513',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalArabic: {
    fontSize: 36,
    color: '#760513',
    marginBottom: 16,
  },
  modalTransliteration: {
    fontSize: 24,
    color: '#760513',
    fontWeight: '500',
    marginBottom: 8,
  },
  modalTranslation: {
    fontSize: 20,
    color: '#760513',
    marginBottom: 16,
  },
  modalDescription: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    lineHeight: 24,
  },
});
