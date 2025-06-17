import { auth } from "@/components/login/firebaseConfig"
import LoginScreen from "@/components/login/screen/LoginScreen"
import ProfillScreen from "@/components/login/screen/ProfileScreen"
import { onAuthStateChanged, User } from "firebase/auth"
import { useEffect, useState } from "react"
import { ActivityIndicator, StyleSheet, View } from "react-native"


const Profile = () => {
    return (
        <View style={styles.container}>
            <LoginScreen/>
        </View>
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