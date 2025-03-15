import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { CreditCard as Edit2, History, Star, Image as ImageIcon, Settings, LogOut } from 'lucide-react-native';

export default function Profile() {
  const menuItems = [
    { icon: History, label: 'Reading History' },
    { icon: Star, label: 'Favorites' },
    { icon: ImageIcon, label: 'Shared Images' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        {/* Profile image placeholder - replace with actual Google profile image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg'}}
            style={styles.profileImage}
          />
        </View>
        
        <View style={styles.nameContainer}>
          <Text style={styles.name}>User Name</Text>
          <Pressable style={styles.editButton}>
            <Edit2 size={20} color="#760513" />
          </Pressable>
        </View>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <Pressable key={index} style={styles.menuItem}>
            <item.icon size={24} color="#760513" />
            <Text style={styles.menuText}>{item.label}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.logoutButton}>
        <LogOut size={24} color="#FFFDD0" />
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDD0',
    padding: 16,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: '#FFF',
    elevation: 4,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#760513',
  },
  editButton: {
    padding: 8,
  },
  menuContainer: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 32,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    gap: 16,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#760513',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  logoutText: {
    color: '#FFFDD0',
    fontSize: 16,
    fontWeight: '500',
  },
});