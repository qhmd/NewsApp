// file: LoginScreen.tsx (Versi Manual & Paling Kuat)

import * as WebBrowser from 'expo-web-browser';
import React, { useEffect } from 'react';
import { Alert, Button, StyleSheet, View } from 'react-native';
// Perhatikan perubahan import di sini
import { exchangeCodeAsync, makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import {
    GoogleAuthProvider,
    signInWithCredential,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

WebBrowser.maybeCompleteAuthSession();

// Endpoint discovery untuk Google
const discovery = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
};

// --- Kredensial Anda ---
const WEB_CLIENT_ID = '726812145169-m6c5b5st54ei9emb7h2q7bt45uaa5b99.apps.googleusercontent.com';
const ANDROID_CLIENT_ID = '726812145169-lm5m9neu73cnh5p48vai5nhveb7nod54.apps.googleusercontent.com';
const IOS_CLIENT_ID = '726812145169-qeg4qpu6jrqhv5bb8nt5muv2heljo4td.apps.googleusercontent.com'; // Isi meski belum dipakai
const FACEBOOK_APP_ID = 'GANTI_DENGAN_FACEBOOK_APP_ID_ANDA';

const appScheme = 'com.qhmd.rnnytts';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

export default function LoginScreen({ onLoginSuccess }: LoginScreenProps) {

  const redirectUri = makeRedirectUri({
    native: `${appScheme}://`,
  });

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: ANDROID_CLIENT_ID,
      redirectUri: redirectUri,
      scopes: ['profile', 'email', 'openid'],
      responseType: 'code', // Meminta authorization_code
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      // Tukarkan authorization_code dengan token
      exchangeCodeAsync(
        {
          clientId: ANDROID_CLIENT_ID, // Harus Web Client ID untuk menukar token
          code: code,
          redirectUri: redirectUri,
          extraParams: {
            code_verifier: request?.codeVerifier || '',
          },
        },
        discovery
      ).then(tokenResponse => {
        // Jika berhasil, kita dapat id_token, lalu login ke Firebase
        if (tokenResponse.idToken) {
          const credential = GoogleAuthProvider.credential(tokenResponse.idToken);
          signInWithFirebase(credential);
        }
      }).catch(error => {
        Alert.alert('Gagal Menukar Token', error.message);
      });
    } else if (response?.type === 'error') {
      Alert.alert('Login Google Gagal', response.params.error_description || 'Terjadi kesalahan.');
    }
  }, [response, request]);

  const signInWithFirebase = async (credential: any) => {
    try {
      const userCredential = await signInWithCredential(auth, credential);
      const { user } = userCredential;
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        uid: user.uid, email: user.email, displayName: user.displayName,
        photoURL: user.photoURL, lastLogin: new Date(),
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
        disabled={!request}
        onPress={() => promptAsync()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20,
  },
});