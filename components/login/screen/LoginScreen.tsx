import { Button, StyleSheet, Text, View, Alert, ActivityIndicator } from 'react-native';
import React from 'react';
import 'expo-dev-client';
import { GoogleSignin, User } from '@react-native-google-signin/google-signin';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useEffect, useState } from 'react';

import { Platform } from 'react-native';
import { AccessToken, AuthenticationToken, LoginManager, Profile } from 'react-native-fbsdk-next';
import FBAccessToken from 'react-native-fbsdk-next/lib/typescript/src/FBAccessToken';
import FBAuthenticationToken from 'react-native-fbsdk-next/lib/typescript/src/FBAuthenticationToken';
import { sha256 } from 'react-native-sha256';
import uuid from 'react-native-uuid';

// Konfigurasi Google Sign-In di luar komponen agar tidak dijalankan berulang kali
// Cukup panggil ini sekali saat aplikasi Anda dimulai.
GoogleSignin.configure({
  webClientId: '620185224815-mj0uu4r4m88sgmj734s5dq6ot9bpsmfp.apps.googleusercontent.com',
});

LoginManager.setLoginBehavior('web_only')

const LoginScreen: React.FC = () => {
  // State untuk menyimpan informasi pengguna yang login
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  // State untuk menampilkan loading indicator saat proses login
  const [loading, setLoading] = useState<boolean>(false);

  // Fungsi untuk menangani proses login dengan Google
  const onGoogleButtonPress = async (): Promise<void> => {
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      // signIn() mengembalikan objek respons
      const signInResponse = await GoogleSignin.signIn();

      // PERBAIKAN: Ambil idToken dari signInResponse.data
      // Kita gunakan optional chaining (?.) untuk keamanan jika 'data' tidak ada
      const idToken = signInResponse.data?.idToken;

      if (!idToken) {
        throw new Error('Login gagal: idToken tidak ditemukan dalam respons.');
      }

      // Membuat kredensial Google dengan idToken
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Login ke Firebase dengan kredensial Google
      const userCredential = await auth().signInWithCredential(googleCredential);

      // Simpan informasi pengguna dari hasil Firebase ke state
      setUser(userCredential.user);

      Alert.alert('Sukses', `Berhasil login sebagai ${userCredential.user.displayName}`);

    } catch (error: any) {
      if (error.code === '12501' || error.code === 'SIGN_IN_CANCELLED') {
        Alert.alert('Batal', 'Anda membatalkan proses login dengan Google.');
      } else {
        console.error("Google Sign-In Error:", error);
        Alert.alert('Error', 'Terjadi kesalahan saat login: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk logout
  const onSignOut = async (): Promise<void> => {
    try {
      await GoogleSignin.signOut();
      await auth().signOut();
      setUser(null);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Gagal untuk logout.');
    }
  };


  // Tampilan UI
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {user ? (
        // Tampilan jika sudah login
        <View style={styles.userInfo}>
          <Text style={styles.welcomeText}>Selamat Datang!</Text>
          <Text>Nama: {user.displayName}</Text>
          <Text>Email: {user.email}</Text>
          <View style={styles.buttonContainer}>
            <Button title="Sign Out" onPress={onSignOut} color="red" />
          </View>
        </View>
      ) : (
        // Tampilan jika belum login
        <View>
          <Text style={styles.infoText}>Silakan login untuk melanjutkan</Text>
          <Button
            title="Login dengan Google"
            onPress={onGoogleButtonPress}
            disabled={loading}
          />
        </View>
      )}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  userInfo: {
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
  }
});