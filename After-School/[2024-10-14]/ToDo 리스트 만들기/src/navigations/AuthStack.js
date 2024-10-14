import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screen/SignInScreen';
import ListScreen from '../screen/ListScreen';
import { WHITE } from '../colors';
import { Pressable, Text } from 'react-native';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        contentStyle: { backgroundColor: WHITE },
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="List"
        component={ListScreen}
        options={{
          title: 'ToDo List',
          headerTitle: (props) => {
            return (
              <Pressable onPress={() => console.log('test')}>
                <Text>Test</Text>
              </Pressable>
            );
          },
        }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          title: '로그인',
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
