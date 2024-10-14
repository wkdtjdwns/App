# **리액트 네이게이션으로 화면 전환하기**

- **리액트 네이티브에서는 네비게이션 기능을 제공하지 않기 때문에 라이브러리를 추가적으로 사용해야 함.**
- **리액트 네이티브에서 가장 많이 사용하는 네비게이션 라이브러리는 리액트 네비게이션(React Navigation)임.**
- [https://reactnavigation.org](https://reactnavigation.org/)
    
- **리액트 네비게이션 사용을 위해 라이브러리를 설치함.**
- **`npm install @react-navigation/native`**
- **함께 사용되는 추가 라이브러리를 설치함.**
- **`expo install react-native-screens react-native-safe-area-context`**
- **expo 명령어를 사용해서 설치를 진행하면 현재 사용중인 Expo 프로젝트 버전과 호환되는 버전이 있는지 확인해서 가장 적절한 버전의 라이브러리를 설치해 줌.**
- **대부분의 라이브러리는 npm install을 사용해서 설치해도 문제없이 사용할 수 있음.**
- **SignInScreen.js의 코드를 아래와 같이 수정함.**

<br>

# **NavigationContainer 컴포넌트로 전체 감싸기**

- **리액트 네이티브에서 리액트 네비게이션을 사용하기 위해서는 NavigationContainer 컴포넌트로 전체를 감싸줘야 함.**
- **프로젝트 시작 파일에서 NavigationContainer 컴포넌트를 사용하면 전체를 감싸게 되니, App 컴포넌트를 다음과 같이 수정함. (src/App.js 수정)**
    
    ```jsx
    import { StatusBar } from 'expo-status-bar';
    import SignInScreen from './screen/SignInScreen';
    import { NavigationContainer } from '@react-navigation/native';
    
    const App = () => {
      return (
        <NavigationContainer>
          <StatusBar style="dark" />
          <SignInScreen />
        </NavigationContainer>
      );
    };
    
    export default App;
    ```

<br>

# **리액트 네비게이션 사용하기**

- **리액트 네비게이션에서는 스택(stack), 탭(tab), 드로어(drawer) 네비게이터를 제공함.**
- **이번에는 스택 네비게이터 중 하나인 네이티브 스택 네비게이터(Native Stack Navigator)를 사용해서 화면을 전환하는 방법에 대해 알아보기.**
- https://reactnavigation.org/docs/stack-navigator/
    
    ![image](https://github.com/user-attachments/assets/13fd945d-6d57-43b1-94f9-f97121645534)
    
<br>

# **네이티브 스택 네비게이터 사용하기**

- **스택 네비게이터를 사용하기 위해서는 추가로 패키지 설치가 필요함.**
- **`npm install @react-navigation/native-stack`**
- **src 폴더 밑에 navigations 폴더를 생성함.**
- **사용자 인증을 처리하는 파일을 하나 생성함.
AuthStack.js 파일을 navigations 폴더 아래 생성하자.**
- **createNativeStackNavigator 함수를 사용해서 네이티브 스택 네비게이터를 호출해서 생성 및 사용함.**
- **createNativeStackNavigator 함수는 Navigator 컴포넌트와 Screen 컴포넌트가 포함된 객체를 반환함.**
- **Screen 컴포넌트는 화면을 담당하는 역할을 하고, Navigator 컴포넌트는 자식 컴포넌트로 Screen 컴포넌트를 받아서 이를 관리하는 역할을 함.**
    
    ```jsx
    import { createNativeStackNavigator } from '@react-navigation/native-stack';
    import SignInScreen from '../screen/SignInScreen';
    
    const Stack = createNativeStackNavigator();
    
    const AuthStack = () => {
      return (
        <Stack.Navigator>
          <Stack.Screen name="SignIn" component={SignInScreen} />
        </Stack.Navigator>
      );
    };
    
    export default AuthStack;
    ```
    
- **createNativeStackNavigator 함수를 사용해서 네이티브 스택 네비게이터를 생성하고, Navigator 컴포넌트와 Screen 컴포넌트를 사용해서 AuthStack 컴포넌트를 만들었음.**
- **Screen 컴포넌트에는 SignInScreen 컴포넌트를 화면으로 사용하도록 하고 이름을 SignIn으로 설정했음.**
- **src/App.js 에 SignInScreen 컴포넌트 대신 로그인 화면이 포함된 AuthStack 컴포넌트를 사용함. (src/App.js 파일 수정)**
    
    ```jsx
    import { StatusBar } from 'expo-status-bar';
    import { NavigationContainer } from '@react-navigation/native';
    import AuthStack from './navigations/AuthStack';
    
    const App = () => {
      return (
        <NavigationContainer>
          <StatusBar style="dark" />
          <AuthStack />
        </NavigationContainer>
      );
    };
    
    export default App;
    ```
    
    ![image](https://github.com/user-attachments/assets/e6edf5a0-86d9-4e38-9f62-f54d7d1e025b)

<br>

# **화면 이동하기 / 이동할 화면 준비하기**

- **로그인을 성공했을 때에 이동할 화면을 만들기.**
- **로그인 성공 후에는 ToDO 리스트 화면이 나와야 하니 screens 폴더 안에 ListScreen.js 파일을 생성해서 아래와 같이 작성함.**
    
    ```jsx
    import { StyleSheet, Text, View } from 'react-native';
    
    const ListScreen = () => {
      return (
        <View style={styles.container}>
          <Text style={{ FontSize: 30 }}>List Screen</Text>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    });
    
    export default ListScreen;
    ```
    
- **그리고 ListScreen 컴포넌트 작성이 완료되면 AuthStack 컴포넌트에서 Screen 컴포넌트를 사용하여 화면을 추가해야 하므로 AuthStack.js 컴포넌트도 수정 되어야 함.**
    
    ```jsx
    import { createNativeStackNavigator } from '@react-navigation/native-stack';
    import SignInScreen from '../screen/SignInScreen';
    import ListScreen from '../screen/ListScreen';
    
    const Stack = createNativeStackNavigator();
    
    const AuthStack = () => {
      return (
        <Stack.Navigator>
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="List" component={ListScreen} />
        </Stack.Navigator>
      );
    };
    
    export default AuthStack;
    ```
  
<br>

# **push 함수와 navigate 함수로 화면 이동하기**

- **Stack.screen 컴포넌트의 component로 지정된 컴포넌트에는 props 로 navigation 과 route가 전달됨.**
- **navigation에서 제공하는 함수는 화면을 이동하거나 이전 화면으로 되돌아가는 등 다양한 기능을 제공함.**
- **그 중 push와 navigation 함수를 사용해서 화면을 이동하는 방법에 대해 알아보기.**
    
- **함수의 첫 번째 파라미터에 이동하고 싶은 화면의 이름을 전달하면 됨.**
- **이때 전달하는 이름은 Screen 컴포넌트의 name 으로 설정된 값 중 하나여야 함.**
- **두 번째 파라미터 에는 이동하는 화면에 전달하고 싶은 데이터를 입력함.**
- **두 번째 파라미터로 전달된 값은 화면의 route props 를 통해 확인할 수 있음.**
- **로그인이 성공했을 때 화면이 목록 화면으로 이동하도록 다음과 같이 SignInScreen 컴포넌트를 수정함.**
    
    ```jsx
    import { Image, StyleSheet, View, Keyboard, Alert } from 'react-native';
    import Input, {
      KeyboardTypes,
      ReturnKeyTypes,
      IconNames,
    } from '../components/Input';
    import { useState, useRef, useEffect } from 'react';
    import Button from '../components/Button';
    import { signIn } from '../api/auth';
    import PropTypes from 'prop-types';
    
    const SignInScreen = ({ navigation }) => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const passwordRef = useRef(null);
      const [disabled, setDisabled] = useState(true);
      const [isLoading, setIsLoading] = useState(false);
    
      useEffect(() => {
        setDisabled(!email || !password);
      }, [email, password]);
    
      const onSubmit = async () => {
        try {
          Keyboard.dismiss();
          const data = await SignInScreen(email, password);
          console.log(data);
          setIsLoading(false);
          navigation.navigation('List');
        } catch (error) {
          Alert.alert('로그인 실패', error, [
            { text: '확인', onPress: () => setIsLoading(false) },
          ]);
        }
        setIsLoading(false);
      };
    
      return (
        <View style={styles.container}>
          <Image source={require('../../assets/main.png')} style={styles.Image} />
    
          <Input
            title={'이메일'}
            placeholder="test@email.com"
            keyboardType={KeyboardTypes.EMAIL}
            returnKeyType={ReturnKeyTypes.NEXT}
            value={email}
            onChangeText={(email) => setEmail(email.trim())}
            iconName={IconNames.EMAIL}
            onSubmitEditing={() => passwordRef.current.focus()}
          />
          <Input
            ref={passwordRef}
            title={'비밀번호'}
            returnKeyType={ReturnKeyTypes.DONE}
            secureTextEntry
            value={password}
            onChangeText={(password) => setEmail(password.trim())}
            iconName={IconNames.PASSWORD}
            onSubmitEditing={onSubmit}
          />
          <View style={styles.buttonContainer}>
            <Button
              title="로그인"
              onPress={onSubmit}
              disabled={disabled}
              isLoading={isLoading}
            />
          </View>
        </View>
      );
    };
    
    SignInScreen.protoTypes = {
      navigator: PropTypes.object,
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    
      image: {
        width: 200,
        height: 200,
      },
      buttonContainer: {
        width: '100%',
        marginTop: 30,
        paddingHorizontal: 20,
      },
    });
    
    export default SignInScreen;
    ```
    
    ![image](https://github.com/user-attachments/assets/103d048f-2730-459c-8685-9b64d24c31fd)
    
- **push 와 navigate는 모두 화면을 이동하는데 사용하는 함수이지만 다른 점이 있음.**
- **navigate는 다른 종류의 네비게이터에서도 사용 가능한 함수이지만, push 함수는 네이티브스택 네비게이터나 스택 네비게이터서만 사용할 수 있음.**
- **예를 들어 탭 네비게이터에서도 화면을 이동할 때 사용하는 함수는 navigate 함수임.**
- **하지만 탭 네비게이터에서는 push 함수를 사용할 수 없음.**
    
- **ListScreen 컴포넌트에 다음과 같이 push 함수와 navigate 함수를 사용하는 버튼을 추가해 보자.**
- **버튼 2개를 추가하는데, 하나는 push 함수를 사용해서 목록 화면으로 이동하는 것이고, 다른 하나는 navigate 함수를 사용해서 목록 화면으로 이동하는 버튼임.**
- **그리고 console.log를 추가해서 스택에 화면이 새로 추가되면 렌더링 되면서 터미널에 메시지가 출력되도록 만들었음.(ListScreen.js 파일 수정)**
    
    ```jsx
    import { StyleSheet, Text, View, Button } from 'react-native';
    
    const ListScreen = ({ navigation }) => {
      console.log('Rendering ListScreen');
    
      return (
        <View style={styles.container}>
          <Text style={{ FontSize: 30 }}>List Screen</Text>
          <Button title="push" onPress={() => navigation.push('List')} />
          <Button title="navigate" onPress={() => navigation.navigate('List')} />
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    });
    
    export default ListScreen;
    ```
    
- **push 버튼과 navigate 버튼을 눌러 테스트를 해 보면, push 버튼을 클릭하면 계속 화면이 쌓이고, 터미널에도 메시지가 나타남.**
- **하지만 navigate 버튼을 클릭하면 화면이 쌓이지 않고 터미널에도 메시지가 나타나지 않음.**
- **navigate 함수는 화면을 이동할 때 같은 화면이라면 특별한 작업을 하지 않음.**
- **하지만 두 번째 파라미터에 데이터를 전달하면 조금 다르게 작동함.**
- **같은 화면이라도 전달하는 데이터에 변화가 있다면 화면이 추가되지는 않지만 변경된 데이터는 전달함. (ListScreen.js 파일 수정)**
    
    ```jsx
    import { StyleSheet, Text, View, Button } from 'react-native';
    
    const ListScreen = ({ navigation, route }) => {
      console.log('Rendering ListScreen', route.params);
    
      return (
        <View style={styles.container}>
          <Text style={{ FontSize: 30 }}>List Screen</Text>
          <Button title="push" onPress={() => navigation.push('List')} />
          <Button title="navigate" onPress={() => navigation.navigate('List', { ts: Date.now() })} />
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    });
    
    export default ListScreen;
    ```
    
<br>

# **시작 화면 설정하기**

- **우리는 두 개의 화면을 사용하고 있지만 새로고침 할 때 마다 항상 로그인 화면이 시작 화면으로 나타남.**
- **다른 화면을 시작 화면을 사용하고 싶다면 어떻게 해야 하는지 알아보자.**
- **지금처럼 Screen 컴포넌트가 여러 개일 때에는 첫 번째 Screen 컴포넌트가 첫 번째 화면으로 사용됨.**
- **ListScreen을 첫 번째 화면으로 쓰기 위해 AuthStack.js를 수정함.**
    
    ```jsx
    import { createNativeStackNavigator } from '@react-navigation/native-stack';
    import SignInScreen from '../screen/SignInScreen';
    import ListScreen from '../screen/ListScreen';
    
    const Stack = createNativeStackNavigator();
    
    const AuthStack = () => {
      return (
        <Stack.Navigator>
          <Stack.Screen name="List" component={ListScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
        </Stack.Navigator>
      );
    };
    
    export default AuthStack;
    ```
    
- **Screen 컴포넌트의 순서를 변경하지 않아도 Navigator 컴포넌트에 initialRouteName props 를 전달하면 시작 화면을 원하는 화면으로 설정할 수 있음.**
- **AuthStack.js를 다음과 같이 수정함.**
    
    ```jsx
    import { createNativeStackNavigator } from '@react-navigation/native-stack';
    import SignInScreen from '../screen/SignInScreen';
    import ListScreen from '../screen/ListScreen';
    
    const Stack = createNativeStackNavigator();
    
    const AuthStack = () => {
      return (
        <Stack.Navigator initialRouteName="SignIn">
          <Stack.Screen name="List" component={ListScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
        </Stack.Navigator>
      );
    };
    
    export default AuthStack;
    ```
  
<br>

# **헤더 타이틀**

- **네이티브 스택 네비게이터를 적용하면서 화면 위쪽에 헤더가 자동으로 추가되었음.**
- **이 추가된 헤더를 원하는 모습으로 변경해 봄.**
- **헤더에 있는 타이틀은 Screen 컴포넌트의 name에 설정한 값이 나타남.**
- **AuthStack.js 파일을 다음과 같이 수정함.**
    
    ```jsx
    import { createNativeStackNavigator } from '@react-navigation/native-stack';
    import SignInScreen from '../screen/SignInScreen';
    import ListScreen from '../screen/ListScreen';
    import { WHITE } from '../colors';
    
    const Stack = createNativeStackNavigator();
    
    const AuthStack = () => {
      return (
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            contentStyle: { backgroundColor: WHITE },
          }}
        >
          <Stack.Screen name="List" component={ListScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
        </Stack.Navigator>
      );
    };
    
    export default AuthStack;
    ```
    
    ![image](https://github.com/user-attachments/assets/a60e5c89-711a-4f68-884d-a21d8ef71e2a)
    
- **Screen 컴포넌트의 name을 변경하면 헤더 타이틀이 변경되지만, initialRouteName 처럼 SignIn이 사용된 곳을 찾아다니며 수정해야 한다는 불편함이 있음.**
- **또한 Screen 컴포넌트의 name은 중복될 수 없으므로, 서로 다른 화면에서 같은 헤더 타이틀을 사용해야 하는 상황이라면 문제가 생김.**
- **title 옵션을 사용하면 Screen 컴포넌트의 name을 변경하지 않아도 원하는 값으로 헤더 타이틀을 변경할 수 있음.**
- **AuthStack.js 파일을 수정함.**
    
    ```jsx
    import { createNativeStackNavigator } from '@react-navigation/native-stack';
    import SignInScreen from '../screen/SignInScreen';
    import ListScreen from '../screen/ListScreen';
    import { WHITE } from '../colors';
    
    const Stack = createNativeStackNavigator();
    
    const AuthStack = () => {
      return (
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            contentStyle: { backgroundColor: WHITE },
          }}
        >
          <Stack.Screen
            name="List"
            component={ListScreen}
            options={{
              title: 'ToDo List',
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
    ```
    
    ![image](https://github.com/user-attachments/assets/0230041f-86cb-435e-a542-526b0df16571)

<br>

# **headerTitleAlign으로 헤더 타이틀 정렬하기**

- **현재 코드로는 헤더 타이틀의 정렬 위치가 iOS 에서는 중앙이지만 안드로이드 왼쪽에 위치하고 있을 것임.**
- **이번에는 두 플랫폼에서 헤더 타이틀 위치가 같아지도록 수정함.**
- **headerTitleAlign 을 사용하면 헤더 타이틀 정렬 방법을 설정할 수 있음.**
- **단, 이 옵션은 안드로이드에만 적용된다. 하지만 헤더 타이틀 정렬 방법은 모든 화면에서 같아야 하니 Navigator 컴포넌트의 screenOptions를 사용해서 headerTitleAlign을 설정함.**
- **AuthStack.js 파일을 다음과 같이 수정함.**
    
    ```jsx
    import { createNativeStackNavigator } from '@react-navigation/native-stack';
    import SignInScreen from '../screen/SignInScreen';
    import ListScreen from '../screen/ListScreen';
    import { WHITE } from '../colors';
    
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
    ```
    
    ![image](https://github.com/user-attachments/assets/5eb7f60a-c867-4f47-9751-51cee1cdc0ba)

<br>

# **headerTitle로 헤더 타이틀 컴포넌트 변경하기**

- **headerTitle에 컴포넌트를 반환하는 함수를 전달하면 해당 컴포넌트를 헤더 타이틀로 사용함.**
- **헤더 타이틀을 이미지로 나타내고 싶거나 터치 이벤트를 넣는 등 좀 더 자유롭게 헤더 타이틀을 수정하고 싶을 때에는 headerTitle을 사용하면 됨.**
- **AuthStack.js를 수정함.**
    
    ```jsx
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
    ```
    
    ![image](https://github.com/user-attachments/assets/9460855d-a9d9-4252-9116-528637d75159)
