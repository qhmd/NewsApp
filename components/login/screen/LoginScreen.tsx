// file: LoginScreen.tsx (Gunakan Kode Ini!)

import * as Facebook from 'expo-auth-session/providers/facebook';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import {
    FacebookAuthProvider,
    GoogleAuthProvider,
    signInWithCredential,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { Alert, Button, StyleSheet, View } from 'react-native';
import { auth, db } from '../firebaseConfig';

WebBrowser.maybeCompleteAuthSession();

// --- PASTIKAN BAGIAN INI 100% BENAR ---
// Ganti dengan Client ID tipe "Aplikasi web" Anda
const WEB_CLIENT_ID = '726812145169-m6c5b5st54ei9emb7h2q7bt45uaa5b99.apps.googleusercontent.com'; 

// Ini sudah diisi dari screenshot Anda. JANGAN DIUBAH.
const ANDROID_CLIENT_ID = '726812145169-lm5m9neu73cnh5p48vai5nhveb7nod54.apps.googleusercontent.com'; 

// Ganti dengan Client ID tipe "iOS" Anda
const IOS_CLIENT_ID = '726812145169-qeg4qpu6jrqhv5bb8nt5muv2heljo4td.apps.googleusercontent.com';

// Ganti dengan Facebook App ID Anda
const FACEBOOK_APP_ID = 'GANTI_DENGAN_FACEBOOK_APP_ID_ANDA';

// --- SISA KODE TIDAK PERLU DIUBAH ---

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

export default function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  
  const [googleRequest, googleResponse, googlePromptAsync] = Google.useIdTokenAuthRequest({
    clientId: WEB_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
  });

  const [facebookRequest, facebookResponse, facebookPromptAsync] = Facebook.useAuthRequest({
    clientId: FACEBOOK_APP_ID,
  });

  useEffect(() => {
    if (googleResponse?.type === 'success') {
      const { id_token } = googleResponse.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithFirebase(credential);
    } else if (googleResponse?.type === 'error') {
      Alert.alert('Login Google Gagal', googleResponse.params.error_description || 'Terjadi kesalahan.');
    }
  }, [googleResponse]);

  useEffect(() => {
    if (facebookResponse?.type === 'success') {
      const { access_token } = facebookResponse.params;
      const credential = FacebookAuthProvider.credential(access_token);
      signInWithFirebase(credential);
    } else if (facebookResponse?.type === 'error') {
        Alert.alert('Login Facebook Gagal', 'Terjadi kesalahan.');
    }
  }, [facebookResponse]);

  const signInWithFirebase = async (credential: any) => {
    try {
      const userCredential = await signInWithCredential(auth, credential);
      const { user } = userCredential;
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        lastLogin: new Date(),
      }, { merge: true });
      onLoginSuccess();
    } catch (error: any) {
      Alert.alert('Login Firebase Gagal', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title="Masuk dengan Google"
        disabled={!googleRequest}
        onPress={() => googlePromptAsync()}
      />
      <View style={{ marginVertical: 10 }} />
      <Button
        title="Masuk dengan Facebook"
        disabled={!facebookRequest}
        onPress={() => facebookPromptAsync()}
      />
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
});