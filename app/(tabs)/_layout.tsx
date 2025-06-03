import { Tabs } from 'expo-router';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppThemes } from '@/hooks/useAppThemes';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function TabLayout() {
    const { theme } = useAppThemes()
    console.log({ theme })
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: theme.primary,
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: theme.background,
                        borderColor: theme.border
                    }
                }}
            >
                <Tabs.Screen
                    name="AllNewsScreen"
                    options={{
                        title: 'Home',
                        tabBarIcon: ({ color }) => <FontAwesome6 name="newspaper" size={24} color={color} />
                    }}
                />
                <Tabs.Screen name="Inbox" options={{
                    title: 'Inbox',
                    tabBarIcon: ({ color }) => <FontAwesome5 name="inbox" size={24} color={color} />
                }} />
                <Tabs.Screen name="Profile" options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <FontAwesome name="user" size={24} color={color} />
                }} />
            </Tabs>
        </SafeAreaView>
    );
}
