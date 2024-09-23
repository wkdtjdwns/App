# **라이브러리 추가/삭제**

- **`npm install -D @types/react @types/react-native`**
- **`npm uninstall react-native-web`**
- **`npm install prop types`**
- **중간 과정에서 warning이 뜬다면 `npm audit fix --force`를 실행함.**

<br>

# **프로젝트 폴더 구조 변경**

1. **프로젝트 안에 src 폴더 생성**
2. **src 폴더 안에 App.js 파일을 만들고 아래와 같이 작성함.**
    
    ```jsx
    import { StatusBar } from 'expo-status-bar';
    import { StyleSheet, Text, View } from 'react-native';
    
    export default function App() {
      return (
        <View style={styles.container}>
          <StatusBar style="dark" />
          <Text style={{ fontSize: 30 }}>ToDo App</Text>
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#ffffff',
      },
    });
    ```
    
    <br>
    
3. **이전에 있던 App.js를 아래와 같이 변경함.**
    
    ```jsx
    import App from './src/App';
    export default App;
    ```
    
<br>

# **로그인 화면 만들기**

1. **src 폴더 안에 screen 폴더를 만들고 그 안에 SignInScreen.js 파일을 아래와 같이 작성함.**
    
    ```jsx
    import { StyleSheet, Text, View } from 'react-native';
    
    const SignInScreen = () => {
      return (
        <View style={styles.container}>
          <Text>SignIn Screen</Text>
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
    
    export default SignInScreen;
    ```
    
    <br>
    
2. **src 폴더 안에 있는 App.js 파일의 코드를 아래와 같이 변경함.**
    
    ```jsx
    import { StatusBar } from 'expo-status-bar';
    import { StyleSheet, Text, View } from 'react-native';
    import SignInScreen from './screen/SignInScreen';
    
    export default function App() {
      return (
        <View style={styles.container}>
          <StatusBar style="dark" />
          <SignInScreen />
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#ffffff',
      },
    });
    ```
    
    <br>
    
# **Image 컴포넌트로 이미지 넣기**

- **React Native에서 제공하는 Image 컴포넌트를 사용함.**
- **다운받은 이미지를 assets 폴더에 넣어줌.**
- **Image 컴포넌트의 source props를 이용해 이미지의 경로를 전달하면 해당 이미지가 랜더링 됨.**
    
    ---
    
- **SignInScreen.js의 코드를 아래와 같이 수정함.**
    
    ```jsx
    import { Image, StyleSheet, Text, View } from 'react-native';
    
    const SignInScreen = () => {
      return (
        <View style={styles.container}>
          <Image source={require('../../assets/test.png')} style={styles.Image} />
          <Text>SignIn Screen</Text>
        </View>
      );
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
    });
    
    export default SignInScreen;
    ```
    
