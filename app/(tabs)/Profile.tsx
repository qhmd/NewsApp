import { auth } from "@/components/login/firebaseConfig"
import LoginScreen from "@/components/login/screen/LoginScreen"
import ProfillScreen from "@/components/login/screen/ProfileScreen"
import { onAuthStateChanged, User } from "firebase/auth"
import { useEffect, useState } from "react"
import { ActivityIndicator, StyleSheet, View } from "react-native"

const Profile = () => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authenticatedUser) => {
            setUser(authenticatedUser)
            setLoading(false);
        })

        return () => unsubscribe()
    }, [])

    if (loading) {
        // Tampilkan loading indicator saat memeriksa status auth
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
            </View>
        );
    }
    return user ? (
        <ProfillScreen user={user} onLogout={() => setUser(null)} />
    ) : (
        <LoginScreen onLoginSuccess={() => { }} />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default Profile