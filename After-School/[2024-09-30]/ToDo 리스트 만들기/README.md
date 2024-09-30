# **로그인 버튼 만들기 - Button 컴포넌트 만들기**

- **먼저 버튼이 클릭되었을 때 사용할 색을 colors.js에 추가함. (`DARK: ‘#1e3a8a’`)**
    
    ```jsx
    export const WHITE = '#ffffff';
    export const BLACK = '#000000';
    
    export const PRIMARY = {
      DEFAULT: '#2563eb',
      DARK: '#1e3a8a',
    };
    
    export const GRAY = {
      DEFAULT: '#a3a3a3',
    };
    ```
    
- **그 다음에 components 폴더 밑에 Button.js 파일을 만들고 아래와 같이 코드를 작성함.**
    
    ```jsx
    import { Pressable, StyleSheet, Text } from 'react-native';
    import PropTypes from 'prop-types';
    import { PRIMARY, WHITE } from '../colors';
    
    const Button = ({ title, onPress }) => {
      return (
        <Pressable
          onPress={onPress}
          style={({ pressed }) => [
            styles.container,
            pressed && { backgroundColor: PRIMARY.DARK },
          ]}
        >
          <Text style={styles.title}>{title}</Text>
        </Pressable>
      );
    };
    
    Button.PropTypes = {
      title: PropTypes.string.isRequired,
      onPress: PropTypes.func.isRequired,
    };
    
    const styles = StyleSheet.creare({
      container: {
        borderRadius: 8,
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: PRIMARY.DEFAULT,
      },
    
      title: {
        color: WHITE,
        fontSize: 16,
        fontWeight: '700',
      },
    });
    
    export default Button;
    ```
    
    - **props로 title과 onPress 를 전달 받아서 각각 버튼의 타이틀과 클릭 시 호출하는 함수로 사용함.**
    - **버튼의 색은 프라이머리 컬러를 적용하고 클릭 여부에 따라 진한 색이 적용되도록 했음.**
    
    
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
    
    - **onSubmit 함수에서는 키보드가 있는 상태에서 로그인 버튼을 클릭했을 때 키보드가 사라지도록 keyboard.dismiss()를 호출했음.**
    - **추가로 console.log를 통해 입력된 이메일과 비밀번호를 확인 할 수 있음.**
    
    ![image](https://github.com/user-attachments/assets/97672626-ceb1-4872-869c-ebb8f2de8ab9)
  
<br>

# **로그인 버튼 만들기 - disabled로 버튼 비활성화**

- **로그인을 하기 위해서는 이메일과 비밀번호가 필수로 필요함.**
- **email 상태 변수와 password 상태 변수의 값 중 하나만이라도 비어있다면 버튼이 클릭 될 필요가 없음.**
- **disabled props를 사용하면 Pressable 컴포넌트의 클릭을 막을 수 있음.**
- **Button.js의 코드를 아래와 같이 수정함.**
    
    ```jsx
    import { Pressable, StyleSheet, Text } from 'react-native';
    import PropTypes from 'prop-types';
    import { PRIMARY, WHITE } from '../colors';
    
    const Button = ({ title, onPress }) => {
      return (
        <Pressable
          onPress={onPress}
          style={({ pressed }) => [
            styles.container,
            pressed && { backgroundColor: PRIMARY.DARK },
          ]}
          disabled={disabled}
        >
          <Text style={styles.title}>{title}</Text>
        </Pressable>
      );
    };
    
    Button.PropTypes = {
      title: PropTypes.string.isRequired,
      onPress: PropTypes.func.isRequired,
    };
    
    const styles = StyleSheet.creare({
      container: {
        borderRadius: 8,
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: PRIMARY.DEFAULT,
      },
    
      title: {
        color: WHITE,
        fontSize: 16,
        fontWeight: '700',
      },
    });
    
    export default Button;
    ```
    
- **버튼 비활성화 상태에서 사용할 색을 colors.js 에 추가함.**
    
    ```jsx
    export const WHITE = '#ffffff';
    export const BLACK = '#000000';
    
    export const PRIMARY = {
      LIGHT: '#93c5fd',
      DEFAULT: '#2563eb',
      DARK: '#1e3a8a',
    };
    
    export const GRAY = {
      DEFAULT: '#a3a3a3',
    };
    ```
  
- **Button.js의 코드를 아래와 같이 수정함.**
    
    ```jsx
    import { Pressable, StyleSheet, Text } from 'react-native';
    import PropTypes from 'prop-types';
    import { PRIMARY, WHITE } from '../colors';
    
    const Button = ({ title, onPress }) => {
      return (
        <Pressable
          onPress={onPress}
          style={({ pressed }) => [
            styles.container,
            pressed && { backgroundColor: PRIMARY.DARK },
            disabled && { backgroundColor: PRIMARY.LIGHT, opacity: 0.6 },
          ]}
          disabled={disabled}
        >
          <Text style={styles.title}>{title}</Text>
        </Pressable>
      );
    };
    
    Button.PropTypes = {
      title: PropTypes.string.isRequired,
      onPress: PropTypes.func.isRequired,
      disabled: PropTypes.bool,
    };
    
    const styles = StyleSheet.creare({
      container: {
        borderRadius: 8,
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: PRIMARY.DEFAULT,
      },
    
      title: {
        color: WHITE,
        fontSize: 16,
        fontWeight: '700',
      },
    });
    
    export default Button;
    ```
    
    - **disabled 가 true 일 때 배경색을 옅은 색으로 변경해서 비활성화 상태임을 표시하도록 함.**
    - **disabled 가 전달되지 않으면 undefined 가 되고, undefined 는 false로 처리되기 때문에 defaultProps 를 설정하지 않음.**
    
- **SignInScreen.js의 코드를 아래와 같이 수정함.**
    
    ```jsx
    import { Image, StyleSheet, Text, View } from 'react-native';
    import Input, {
      KeyboardTypes,
      ReturnKeyTypes,
      IconNames,
    } from '../components/Input';
    import { useState, useRef } from 'react';
    import Button from '../components/Button';
    
    const SignInScreen = () => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const passwordRef = useRef(null);
      const [disabled, setDisabled] = useState(true);
    
      const onSubmit = () => {
        keyboard.dimiss();
        console.log(email, password);
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
            <Button title="로그인" onPress={onSubmit} disabled={disabled} />
          </View>
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
    
    - **SignInScreen 컴포넌트에서 버튼의 활성화 여부를 관리하는 상태 변수를 만들고 Button 컴포넌트에 전달함.**
    - **처음 렌더링 될 때는 email 과 password의 값이 없으니 버튼이 비활성화하도록 disabled 상태 변수의 초기 값을 true로 만듦.**
        
        ![image](https://github.com/user-attachments/assets/8b9ef572-1e13-49fd-aa4c-8c8bb318eeff)

<br>

# **로그인 버튼 만들기 - useEffect Hook으로 원하는 작업 실행하기**

- **이제 email과 password 값에 따라 disabled의 값을 변경하면 됨.**
- **이렇게 특정 상황에서 원하는 작업을 하고 싶을 때 useEffect Hook을 사용함.**
- **useEffect는 리액트에서 제공하는 Hook으로 렌더링될 때마다 원하는 작업을 실행할 수 있도록 하는 Hook임.**
- **정보: https://ko.legacy.reactjs.org/docs/hooks-effect.html**
    
- **useEffect는 첫번째 파라미터에 실행하고 싶은 함수를 전달하고, 두 번째 파라미터에 조건을 배열 형태로 전달하는 방법으로 사용함.**
- **두 번째 파라미터에는 props 로 전달된 값이나 상태 변수를 가진 배열을 전달하며, 빈 배열을 전달하거나 생략할 수도 있음.**
- **두 번째 파라미터에 전달하는 배열은 일반적으로 deps 라고 하는데 이것은 dependencies의 줄임말임.**
    
    ![image](https://github.com/user-attachments/assets/46b865fb-016e-407a-b36c-bac28d8c1870)
    
- **SignInScreen.js의 코드를 아래와 같이 수정함.**
    
    ```jsx
    import { Image, StyleSheet, Text, View } from 'react-native';
    import Input, {
      KeyboardTypes,
      ReturnKeyTypes,
      IconNames,
    } from '../components/Input';
    import { useState, useRef, useEffect } from 'react';
    import Button from '../components/Button';
    
    const SignInScreen = () => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const passwordRef = useRef(null);
      const [disabled, setDisabled] = useState(true);
    
      useEffect(() => {
        console.log('always: ', email, password);
      });
    
      useEffect(() => {
        console.log('first rendering: ', email, password);
      }, []);
    
      useEffect(() => {
        console.log('only email: ', email, password);
      }, [email]);
    
      const onSubmit = () => {
        keyboard.dimiss();
        console.log(email, password);
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
            <Button title="로그인" onPress={onSubmit} disabled={disabled} />
          </View>
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
    
- **리액트는 Hook을 호출하는 순서대로 저장해놓고 다시 랜더링 될 때 마다 저장해둔 순서대로 Hook을 다시 호출함.**
- **useEffect 도 Hook 이기 때문에 순서대로 호출됨.**
- **따라서 위쪽에 정의한 useEffect 가 먼저 호출이 됨.**
- **이런 특징 때문에 여러 개의 useEffect 에서 같은 상태 변수를 변경하게 되면 그 순서에 따라 결과가 달라질 수 있으니 주의 하여야 함.**
    
- **SignInScreen.js의 코드를 아래와 같이 수정함.**
    
    ```jsx
    import { Image, StyleSheet, Text, View } from 'react-native';
    import Input, {
      KeyboardTypes,
      ReturnKeyTypes,
      IconNames,
    } from '../components/Input';
    import { useState, useRef, useEffect } from 'react';
    import Button from '../components/Button';
    
    const SignInScreen = () => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const passwordRef = useRef(null);
      const [disabled, setDisabled] = useState(true);
    
      useEffect(() => {
        setDisabled(!email || !password);
      }, [email, password]);
    
      const onSubmit = () => {
        keyboard.dimiss();
        console.log(email, password);
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
            <Button title="로그인" onPress={onSubmit} disabled={disabled} />
          </View>
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
    
    - **email 과 password 값이 변경될 때마다 확인해야 하니 deps는 [email, password] 로 설정함.**
    - **실행하는 함수는 email 과 password 중 하나라도 ‘’(빈 스트링) 이면 disabled의 값이 true가 되고, 두 상태 변수 모두 값이 있으면 false가 되도록 작성했음.**
    - **setDisabled 안에 사용된 || 는 OR 연산자임.**
        
        ![image](https://github.com/user-attachments/assets/9e5ea3e5-6ccd-4345-b421-edadefb1f49a)

<br>

# **로그인 버튼 만들기 - 로그인 기능 만들기**

- **이번에는 로그인 버튼을 클릭했을 때 호출할 로그인 기능을 만들어 봄.**
- **우리는 이 프로젝트에서 서버를 사용하지 않기 때문에 실제 사용자 인증 과정을 구현할 수 없음.**
- **대신 마치 서버를 통해 로그인을 진행하는 것 처럼 보이게 만들어 봄.**
    
- **Promise 살펴보기**
    - **자바스크립트에서는 서버와 통신할 때 비동기 처리를 위해 Promise를 많이 사용함.**
    - **Promise는 자바스크립트에서 비동기 처리에 사용되는 객체임. ([정보링크](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise))**
    - **Promise를 사용해서 서버와 통신할 때는 서버에 데이터를 요청하고, 데이터가 오기 전 까지 다른 작업을 하다가 요청이 성공해서 데이터가 도착하면 화면에 보여주고, 실패하면 실패 메시지를 보여줌.**
        - **대기(pending) - 아직 성공 혹은 실패가 결정되기 전**
        - **이행(fulfilled) - 요청이 성공적으로 완료됨**
        - **거부(rejected) - 어떤 이유 혹은 오류로 요청이 실패함**
        
- **src 폴더 밑에 api 폴더 생성함.**
- **api 폴더 안에 auth.js 파일을 생성하고 아래와 같이 작성함.**
    
    ```jsx
    const USER_EMAIL = 'my@email.com';
    const USER_PASSWORD = '1234';
    
    export const signIn = (email, password) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (email === USER_EMAIL && password === USER_PASSWORD) {
            resolve(email);
          } else {
            reject('이메일 혹은 비밀번호가 올바르지 않습니다');
          }
        }, 1000);
      });
    };
    ```
    
- **SignInScreen.js 파일도 아래와 같이 변경해줌.**
    
    ```jsx
    import { Image, StyleSheet, View, Keyboard } from 'react-native';
    import Input, {
      KeyboardTypes,
      ReturnKeyTypes,
      IconNames,
    } from '../components/Input';
    import { useState, useRef, useEffect } from 'react';
    import Button from '../components/Button';
    import { signIn } from '../api/auth';
    
    const SignInScreen = () => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const passwordRef = useRef(null);
      const [disabled, setDisabled] = useState(true);
    
      useEffect(() => {
        setDisabled(!email || !password);
      }, [email, password]);
    
      const onSubmit = () => {
        Keyboard.dimiss();
        // console.log(email, password);
        signIn(email, password)
          .then((data) => console.log(data))
          .catch((error) => console.log(error));
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
            <Button title="로그인" onPress={onSubmit} disabled={disabled} />
          </View>
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
    
    - **Promise 함수가 이행(fulfilled) 상태가 되면 .then()이 호출됨.**
    - **.then() 에는 실행될 함수를 작성하여 파라미터로 데이터가 전달됨.**
    - **Promise 함수가 거부(reject) 상태가 되면 .catch() 가 호출됨.**
    - **.then()과 마찬가지로 reject를 호출할 때 입력한 데이터가 .catch()에 작성된 함수의 파라미터로 전달됨.**
    
- **async-await 사용하기**
    - **Promise의 결과를 좀 더 가독성 좋게 처리하기 위해 자바스크립트 비동기 처리 방법인 async-await에 대해 알아 봄 ([정보 링크](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/async_function))**
    - **async-await 사용은 비동기 처리를 하는 함수에 async를 붙이고 비동기를 호출하는 곳에 await를 사용하면 됨.**
    - **이 문법을 사용하면 Promise 보다 읽기 좋은 코드를 작성할 수 있음.**
    - **async-await에서 비동기 작업에 실패하면 reject 함수를 통해 전달하는 데이터와 함께 throw가 발생함.**
    - **그래서 async-await 를 사용할 땐 try-catch로 await를 감싸주고 에러를 처리해야 함.**
    
- **SignInScreen.js 파일을 아래와 같이 변경해줌.**
    
    ```jsx
    import { Image, StyleSheet, View, Keyboard } from 'react-native';
    import Input, {
      KeyboardTypes,
      ReturnKeyTypes,
      IconNames,
    } from '../components/Input';
    import { useState, useRef, useEffect } from 'react';
    import Button from '../components/Button';
    import { signIn } from '../api/auth';
    
    const SignInScreen = () => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const passwordRef = useRef(null);
      const [disabled, setDisabled] = useState(true);
    
      useEffect(() => {
        setDisabled(!email || !password);
      }, [email, password]);
    
      const onSubmit = async () => {
        try {
          Keyboard.dismiss();
          const data = await SignInScreen(email, password);
          console.log(data);
        } catch (error) {
          console.log(error);
        }
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
            <Button title="로그인" onPress={onSubmit} disabled={disabled} />
          </View>
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
    
<br>

# **로그인 버튼 만들기 - 로그인 중복 요청 해결하기**

- **signIn 함수의 결과가 나오기까지 1초의 시간이 걸림.**
- **1초안에 로그인 버튼을 여러번 누르면, onSubmit 함수가 중복되어 호출되게 됨.**
- **로그인 성공 여부가 아직 결정되지 않았다면 그 결과가 나오기 전에 추가로 로그인 요청을 할 필요가 없음.**
- **또한 중복된 요청은 서버의 부하를 가중시키고 잘못된 작동을 유발할 수도 있으므로 막는것이 좋음.**
    
- **SignInScreen.js 파일을 아래와 같이 변경해줌.**
    
    ```jsx
    import { Image, StyleSheet, View, Keyboard } from 'react-native';
    import Input, {
      KeyboardTypes,
      ReturnKeyTypes,
      IconNames,
    } from '../components/Input';
    import { useState, useRef, useEffect } from 'react';
    import Button from '../components/Button';
    import { signIn } from '../api/auth';
    
    const SignInScreen = () => {
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
        } catch (error) {
          console.log(error);
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
    
    - **요청 진행 여부를 관리하는 isLoading 상태 변수를 만들어서 요청이 진행 중이거나 사용자 정보가 입력되지 않은 상태에서는 진행되지 않도록 했음.**
    - **그리고 요청 진행 중에 상태가 아니고 정보가 입력되어 있으면 isLoading을 true로 변경해서 중복 호출을 막고, 요청이 모두 처리되면 다시 false로 변경해서 호출이 가능하도록 만들었음.**
    - **마지막으로 버튼에서 진행 상태를 알 수 있게 isLoading 상태 변수를 Button 컴포넌트에 전달함.**
    
- **isLoading 상태 변수에 따라 버튼 디자인을 변경해서 사용자가 진행 상태를 알 수 있게 만들기 위해 ActivityIndicator 컴포넌트를 사용함. ([정보 링크](https://reactnative.dev/docs/activityindicator))**
- **요청 진행 중일 때 버튼의 타이틀 대신 ActivityIndicator 컴포넌트가 나타나도록 Button 컴포넌트를 수정함.**
    
    ```jsx
    import { Pressable, StyleSheet, Text, ActivityIndicator } from 'react-native';
    import PropTypes from 'prop-types';
    import { PRIMARY, WHITE, GRAY } from '../colors';
    
    const Button = ({ title, onPress, disabled, isLoading }) => {
      return (
        <Pressable
          onPress={onPress}
          style={({ pressed }) => [
            styles.container,
            pressed && { backgroundColor: PRIMARY.DARK },
            disabled && { backgroundColor: PRIMARY.LIGHT, opacity: 0.6 },
          ]}
          disabled={disabled}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={GRAY.DEFAULT} />
          ) : (
            <Text style={styles.title}>{title}</Text>
          )}
          <Text style={styles.title}>{title}</Text>
        </Pressable>
      );
    };
    
    Button.PropTypes = {
      title: PropTypes.string.isRequired,
      onPress: PropTypes.func.isRequired,
      disabled: PropTypes.bool,
      isLoading: PropTypes.bool,
    };
    
    const styles = StyleSheet.creare({
      container: {
        borderRadius: 8,
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: PRIMARY.DEFAULT,
      },
    
      title: {
        color: WHITE,
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 20,
      },
    });
    
    export default Button;
    ```
    
<br>

# **로그인 버튼 만들기 - Alert으로 결과 알려주기**

- **로그인에 실패했을 때 에러 메시지를 Alert로 보여주는 기능을 추가해 봄.**
- **원하는 버튼 정보를 객체로 만들어서 배열로 전달하면 해당 버튼이 Alert 창에 나타남.**
- **SignInScreen.js 파일을 아래와 같이 변경해줌.**
    
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
    
    const SignInScreen = () => {
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
    
    - **로그인에 실패하면 전달된 메시지를 Alert로 보여주고 ‘확인' 버튼을 누르면 요청 진행 상태를 false로 변경하도록 했음.**
    - **setIsLoading의 위치가 변경되었기 때문에 로그인에 성공했을 때에도 요청 진행 상태가 변경되도록 try 안에 setIsLoading을 추가했음.**
        
        ![image](https://github.com/user-attachments/assets/18904d9e-7cc3-428a-80a1-0788697f0f1d)
