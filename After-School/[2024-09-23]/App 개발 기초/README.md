# **Expo 프로젝트 생성하기**

- **Expo를 사용하기 위해 expo-cli를 설치해야 함.**
- **VSC에 `npm install -g expo-cli` 치기**
- **Expo 설치가 완료되면 `expo init 프로젝트 이름` 을 쳐서 프로젝트 생성하기**
- **프로젝트 생성할 때 가장 위에 있는 black를 엔터를 눌러 선택하고 진행하기**
- **프로젝트 생성이 완료되면 레파지토리 옮기기 (`cd 위에서 만든 프로젝트 이름`)**
- **`npm start` 명령어로 프로젝트 실행함.**
    
    ![image](https://github.com/user-attachments/assets/9e8573d7-777c-4c1a-90b7-ce5d1a25cd5a)
  
    
- **그 다음 “A”를 눌러서 Android Studio에 접속하기**


<br>


# **React Native 실행하기**

- **위의 과정이 완료되면 “Expo”라는 어플을 깔아 줌.**
- **그 다음 핸드폰으로 카메라를 켜서 위의 QR 코드를 찍어줌.**
- **실물 기기를 흔들면 메뉴가 나옴**
- **React Native는 코드가 변경되면 자동으로 새로고침 되지만, 강제로 하고 싶으면 메뉴에서 해도 됨.**

<br>

# **JSX 문법 알아보기**

- **VSC에서 프로젝트 폴더를 열고 `App.js` 파일을 확인하기**
    
    ```jsx
    import { StatusBar } from 'expo-status-bar';
    import { StyleSheet, Text, View } from 'react-native';
    
    export default function App() {
      return (
        <View style={styles.container}>
          <Text>Open up App.js to start working on your app!</Text>
          <StatusBar style="auto" />
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    });
    ```
    
    <br>
    
- **마치 HTML을 작성한 듯한 코드가 JSX(Javascript XML)임.**
- **반드시 하나의 태그로 감싸야 함!**
    
    ![image](https://github.com/user-attachments/assets/dc5aed1d-b958-439c-91da-f852ba5476aa)
    
    [Text 태그가 View 태그에 감싸져 있지 않기 때문에 오류가 생김]
    
    <br>
    
- **JS 사용해보기**
    
    ```jsx
    import { StatusBar } from 'expo-status-bar';
    import { StyleSheet, Text, View } from 'react-native';
    
    export default function App() {
      console.log('Expo React Native')
    
      const name = 'Seongjun';
      const isFullname = true;
    
      const add = (a, b) => {
        return a + b;
      }
    
      return (
        <View style={styles.container}>
          <Text>My name is {name}</Text>
          <Text>a + 2 = {add(1, 2)}</Text>
          <Text>{isFullname ? name + ' Jang' : name}</Text>
          <StatusBar style="auto" />
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    });
    ```
    
    <br>
    
- **Prettier 설정하기**
    - **Prettier는 코드 스타일 정리 도구로 규칙을 정해 놓으면 자동으로 설정된 규칙에 맞게 코드를 변경해주는 역할임.**
    - **파일 이름을 `.prettierrc`로 설정하고 아래와 같이 규칙을 설정해 줌.**

  <br>

    ```json
    {
      "singleQuote": true,
      "arrowParens": "always",
      "tabWidth": 2,
      "printWidth": 80
    }
    ```
    
