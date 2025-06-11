// src/screens/ProfillScreen.tsx
import { User } from 'firebase/auth';
import React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { auth } from '../firebaseConfig';

interface ProfillScreenProps {
  user: User;
  onLogout: () => void;
}

export default function ProfillScreen({ user, onLogout }: ProfillScreenProps) {
  const handleLogout = () => {
    auth.signOut().then(onLogout);
  };
  console.log(user.photoURL)
  return (
    <View style={styles.container}>
      {user.photoURL && <Image source={{ uri: user.photoURL }} resizeMode='center' style={styles.avatar} />}
      <Text style={styles.title}>Selamat Datang!</Text>
      <Text style={styles.text}>Nama: {user.displayName || 'Tidak ada nama'}</Text>
      <Text style={styles.text}>Email: {user.email}</Text>
      <View style={{ marginVertical: 15 }} />
      <Button title="Logout" onPress={handleLogout} color="#ff6347" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});