import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../Screens/LoginScreen';
import RegisterScreen from '../Screens/RegisterScreen';
import ProfileScreen from '../Screens/ProfileScreen';

const AuthNavigation = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator initialRouteName={'Profile'}>
            <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Register' component={RegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Profile' component={ProfileScreen} />
        </Stack.Navigator>
    );
};

export default AuthNavigation;
