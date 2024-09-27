# **Image 컴포넌트로 이미지 넣기**

- **React Native에서 제공하는 Image 컴포넌트를 사용함.**
- **다운받은 이미지를 assets 폴더에 넣어줌.**
- **Image 컴포넌트의 source props를 이용해 이미지의 경로를 전달하면 해당 이미지가 랜더링 됨.**
    
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
    
    <br>
    
    - **아래과 같이 이미지가 테스트에서 나타나면 성공임.**
    - **기종에 따라 @2x, @3x 이미지가 나타날 수 있음. (정상작동임)**
    - **리액트는 dp(density-independent pixcels) 라는 단위를 씀.**
    - **dp는 픽셀과 상관없이 독립적인 크기를 가지는 단위로 화면의 밀도와 상관없이 일정한 크기를 지정할 수 있음.**
    - **이러한 dp 의 특징 때문에 기기마다 픽셀값의 차이가 있어도 같은 크기로 화면에 표현할 수 있음.**
    
    ![image](https://github.com/user-attachments/assets/0e5921cf-e7d5-4f1f-b25c-571d6cb42a34)

<br>

# **resizeMode로 이미지 조절하기**

- **위에 작성된 코드는 가로, 세로 비율과 Image 컴포넌트의 style에 적용된 width, height의 비율이 같음.**
- **이렇게 비율이 같을 때에는 Image 컴포넌트의 크기에 맞춰 이미지가 나타남.**
- **하지만 비율이 다르다면? → 이런 때는 Image 컴포넌트의 높이에 맞춰 영역을 모두 채울 수 있도록 확대되어 나타남.**

![image](https://github.com/user-attachments/assets/fbf72aee-2560-4a3d-a141-1af22a18e53b)

<br>

# **이미지 교체하기**

- **SignInScreen.js의 코드를 아래와 같이 수정함.**
    
    ```jsx
    import { Image, StyleSheet, Text, View } from 'react-native';
    
    const SignInScreen = () => {
      return (
        <View style={styles.container}>
          <Image source={require('../../assets/main.png')} style={styles.Image} />
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

<br>

# **input 컴포넌트 만들기**

- [**사용자의 ID와 비밀번호를 입력받는 입력 칸을 만들기**](https://reactnative.dev/docs/textinput)
- **ID와 비밀번호 입력 칸은 역할과 모양이 거의 같으니 커스텀 컴포넌트로 만들어서 재사용함.**
- **리액트 네이티브에서 제공하는 TextInput 컴포넌트를 사용하면 사용자가 키보들르 통해 입력하는 텍스트를 전달받을 수 있음.**
    
- **src 폴더 밑에 components 폴더를 만들고 그 안에 Input.js 파일을 생성함.**
- **그리고 아래과 같이 코드를 작성함.**
    
    ```jsx
    import { StyleSheet, Text, TextInput, View } from 'react-native';
    import PropTypes from 'prop-types';
    
    const Input = ({ title, placeholder }) => {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <TextInput
            style={styles.input}
            placeholder={placeholder ?? title}
            placeholderTextColor={'#a3a3a3'}
          />
        </View>
      );
    };
    
    Input.PropTypes = {
      title: PropTypes.string.isRequired,
      placeholder: PropTypes.string,
    };
    
    const styles = StyleSheet.create({
      container: {
        width: '100%',
        paddingHorizontal: 20,
        marginVertical: 10,
      },
    
      title: {
        marginBottom: 4,
      },
    
      input: {
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 42,
      },
    });
    
    export default Input;
    ```
    
- **placeholder: ??(nullish 병합 연산자)를 사용해서 전달되지 않았을 때 title이 나타나도록 하는 것.**
    
- **SignInScreen.js 파일도 아래와 같이 변경해줌.**
    
    ```jsx
    import { Image, StyleSheet, Text, View } from 'react-native';
    import Input from '../components/Input';
    
    const SignInScreen = () => {
      return (
        <View style={styles.container}>
          <Image source={require('../../assets/main.png')} style={styles.Image} />
    
          <Input title={'이메일'} placeholder="test@email.com" />
          <Input title={'비밀번호'} />
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

# **자동 수정과 자동 대문자**

- **첫 글자가 대문자로 입력, 자동 오타 수정이 되는 불편함 해소를 위해 Input.js 파일을 아래와 같이 변경함.**
    - **`autoCapitalize = “none”`**
    - **`autoCorrect = {false}`**
    
    ```jsx
    import { StyleSheet, Text, TextInput, View } from 'react-native';
    import PropTypes from 'prop-types';
    
    const Input = ({ title, placeholder }) => {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <TextInput
            style={styles.input}
            placeholder={placeholder ?? title}
            placeholderTextColor={'#a3a3a3'}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
      );
    };
    
    Input.PropTypes = {
      title: PropTypes.string.isRequired,
      placeholder: PropTypes.string,
    };
    
    const styles = StyleSheet.create({
      container: {
        width: '100%',
        paddingHorizontal: 20,
        marginVertical: 10,
      },
    
      title: {
        marginBottom: 4,
      },
    
      input: {
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 42,
      },
    });
    
    export default Input;
    
    ```
<br>

# **keyboardType으로 키보드 종류 변경**

- **이메일을 입력해야 할 때, keyboardType을 email-address로 설정하면 좀 더 이메일을 입력하기 좋은 키보드로 변경됨.**
- **email-address외에도 uri, phone-pad 등 상황에 맞는 다양한 값을 설정할 수 있음.**
- **Input.js 파일을 아래와 같이 변경함.**
    
  ```jsx
  import { StyleSheet, Text, TextInput, View } from 'react-native';
  import PropTypes from 'prop-types';
  
  export const keyboardTypes = {
    DEFAULT: 'default',
    EMAIL: 'email-address',
  };
  
  const Input = ({ title, placeholder, keyboardType, returnKeyType }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <TextInput
          style={styles.input}
          placeholder={placeholder ?? title}
          placeholderTextColor={'#a3a3a3'}
          autoCapitalize="none"
          autoCorrect={false}
          KeyboardTyps={keyboardType}
          ReturnKeyTypes={returnKeyType}
        />
      </View>
    );
  };
  
  Input.defaultProps = {
    keyboardType: keyboardTypes.DEFAULT,
  };
  
  Input.PropTypes = {
    title: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    keyboardTypes: PropTypes.oneOf(Object.values(keyboardTypes)),
  };
  
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      paddingHorizontal: 20,
      marginVertical: 10,
    },
  
    title: {
      marginBottom: 4,
    },
  
    input: {
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 10,
      height: 42,
    },
  });
  
  export default Input;
  ```
    
- **SignInScreen.js에서 사용하고 있는 Input 컴포넌트에 keyboardType을 전달하기**
- **SignInScreen.js 파일을 아래와 같이 변경함.**
    
    ```jsx
    import { Image, StyleSheet, Text, View } from 'react-native';
    import Input, { KeyboardTypes } from '../components/Input';
    
    const SignInScreen = () => {
      return (
        <View style={styles.container}>
          <Image source={require('../../assets/main.png')} style={styles.Image} />
    
          <Input
            title={'이메일'}
            placeholder="test@email.com"
            keyboardType={KeyboardTypes.EMAIL}
          />
          <Input title={'비밀번호'} />
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
    
- **변경했다면 아래와 같은 키보드가 나오게 됨.**
    
    ![image](https://github.com/user-attachments/assets/aca52756-f927-4416-8636-05685a50d40c)

<br>

# **returnKeyType으로 키보드 완료 버튼 변경하기**

- **TextInput 컴포넌트의 설정 가능한 props 중 returnKeyType을 사용하면 done, next, send등 다양한 값으로 키보드의 완료 버튼을 수정할 수 있음.**
- **Input.js 파일을 아래와 같이 변경함.**
    
    ```jsx
    import { StyleSheet, Text, TextInput, View } from 'react-native';
    import PropTypes from 'prop-types';
    
    export const keyboardTypes = {
      DEFAULT: 'default',
      EMAIL: 'email-address',
    };
    
    export const ReturnKeyTypes = {
      DONE: 'done',
      NEXT: 'next',
    };
    
    const Input = ({ title, placeholder, keyboardType, returnKeyType }) => {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <TextInput
            style={styles.input}
            placeholder={placeholder ?? title}
            placeholderTextColor={'#a3a3a3'}
            autoCapitalize="none"
            autoCorrect={false}
            KeyboardTyps={keyboardType}
            ReturnKeyTypes={returnKeyType}
          />
        </View>
      );
    };
    
    Input.defaultProps = {
      keyboardType: keyboardTypes.DEFAULT,
      returnKeyType: ReturnKeyTypes.DONE,
    };
    
    Input.PropTypes = {
      title: PropTypes.string.isRequired,
      placeholder: PropTypes.string,
      keyboardTypes: PropTypes.oneOf(Object.values(keyboardTypes)),
      returnKeyType: PropTypes.oneOf(Object.values(ReturnKeyTypes)),
    };
    
    const styles = StyleSheet.create({
      container: {
        width: '100%',
        paddingHorizontal: 20,
        marginVertical: 10,
      },
    
      title: {
        marginBottom: 4,
      },
    
      input: {
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 42,
      },
    });
    
    export default Input;
    ```
    
    ![image](https://github.com/user-attachments/assets/5604fcea-c449-4ce9-86e8-02b5dffa8080)

<br>

# **secureTextEntry로 민감한 데이터 감추기**

- **현재는 비밀번호를 입력해도 그대로 화면에 나타남.**
- **비밀번호같이 민감한 내용이 화면에 노출되면 좋지 않기 때문에 secureTextEntry를 true로 설정하면 입력되는 텍스트를 다른 문자로 대체할 수 있음.**
- **Input.js 파일을 아래와 같이 변경함.**
    
    ```jsx
    import { StyleSheet, Text, TextInput, View } from 'react-native';
    import PropTypes from 'prop-types';
    
    export const keyboardTypes = {
      DEFAULT: 'default',
      EMAIL: 'email-address',
    };
    
    export const ReturnKeyTypes = {
      DONE: 'done',
      NEXT: 'next',
    };
    
    const Input = ({
      title,
      placeholder,
      keyboardType,
      returnKeyType,
      secureTextEntry,
    }) => {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <TextInput
            style={styles.input}
            placeholder={placeholder ?? title}
            placeholderTextColor={'#a3a3a3'}
            autoCapitalize="none"
            autoCorrect={false}
            KeyboardTyps={keyboardType}
            ReturnKeyTypes={returnKeyType}
            secureTextEntry={secureTextEntry}
          />
        </View>
      );
    };
    
    Input.defaultProps = {
      keyboardType: keyboardTypes.DEFAULT,
      returnKeyType: ReturnKeyTypes.DONE,
    };
    
    Input.PropTypes = {
      title: PropTypes.string.isRequired,
      placeholder: PropTypes.string,
      keyboardTypes: PropTypes.oneOf(Object.values(keyboardTypes)),
      returnKeyType: PropTypes.oneOf(Object.values(ReturnKeyTypes)),
      secureTextEntry: PropTypes.bool,
    };
    
    const styles = StyleSheet.create({
      container: {
        width: '100%',
        paddingHorizontal: 20,
        marginVertical: 10,
      },
    
      title: {
        marginBottom: 4,
      },
    
      input: {
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 42,
      },
    });
    
    export default Input;
    ```
    
- **SignInScreen.js 파일을 아래와 같이 변경함.**
    
    ```jsx
    import { Image, StyleSheet, Text, View } from 'react-native';
    import Input, { KeyboardTypes, ReturnKeyTypes } from '../components/Input';
    
    const SignInScreen = () => {
      return (
        <View style={styles.container}>
          <Image source={require('../../assets/main.png')} style={styles.Image} />
    
          <Input
            title={'이메일'}
            placeholder="test@email.com"
            keyboardType={KeyboardTypes.EMAIL}
            returnKeyType={ReturnKeyTypes.NEXT}
          />
          <Input
            title={'비밀번호'}
            returnKeyType={ReturnKeyTypes.DONE}
            secureTextEntry
          />
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
    
![image](https://github.com/user-attachments/assets/ec3046d1-4ee5-4b8b-87a6-dd213dd6d29b)

<br>

# **구조 분해 할당을 활용한 props 간소화**

- **현재 Input 컴포넌트는 5개의 props를 전달받고 있음.**
- **그 중 몇 개는 특별한 추가 작업 없이 TextInput 컴포넌트의 props로 전달하고 있음.**
- **이렇게 props의 수가 많아지고 그 중 일부가 특별한 작업 없이 컴포넌트의 props로 다시 전달될 때 구조 분해 할당을 사용하면 코드를 간소화 할 수 있음.**
- **Input.js 파일을 아래와 같이 변경함.**
    
    ```jsx
    import { StyleSheet, Text, TextInput, View } from 'react-native';
    import PropTypes from 'prop-types';
    
    export const keyboardTypes = {
      DEFAULT: 'default',
      EMAIL: 'email-address',
    };
    
    export const ReturnKeyTypes = {
      DONE: 'done',
      NEXT: 'next',
    };
    
    const Input = ({ title, placeholder, ...props }) => {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <TextInput
            {...props}
            style={styles.input}
            placeholder={placeholder ?? title}
            placeholderTextColor={'#a3a3a3'}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
      );
    };
    
    Input.defaultProps = {
      keyboardType: keyboardTypes.DEFAULT,
      returnKeyType: ReturnKeyTypes.DONE,
    };
    
    Input.PropTypes = {
      title: PropTypes.string.isRequired,
      placeholder: PropTypes.string,
      keyboardTypes: PropTypes.oneOf(Object.values(keyboardTypes)),
      returnKeyType: PropTypes.oneOf(Object.values(ReturnKeyTypes)),
      secureTextEntry: PropTypes.bool,
    };
    
    const styles = StyleSheet.create({
      container: {
        width: '100%',
        paddingHorizontal: 20,
        marginVertical: 10,
      },
    
      title: {
        marginBottom: 4,
      },
    
      input: {
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 42,
      },
    });
    
    export default Input;
    
    ```

# **input 컴포넌트 입력 값 받기**

- **지금은 Input 컴포넌트에서 값을 입력하면 화면에 텍스트가 잘 나타남.**
- **하지만 어떤 변수에도 그 값이 저장되어 있지 않음.**
- **그래서 입력된 값을 사용할 수 없는 상태임.**
- **SignInScreen 컴포넌트에 이메일과 비밀번호를 저장할 상태 변수를 만들기.**
- **변수는 어디에 설정해야 할까? → 그 값을 쓰는 화면 → SignInScreen.js를 변경함.**
    
    ```jsx
    import { Image, StyleSheet, Text, View } from 'react-native';
    import Input, { KeyboardTypes, ReturnKeyTypes } from '../components/Input';
    import { useState } from 'react';
    
    const SignInScreen = () => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
    
      return (
        <View style={styles.container}>
          <Image source={require('../../assets/main.png')} style={styles.Image} />
    
          <Input
            title={'이메일'}
            placeholder="test@email.com"
            keyboardType={KeyboardTypes.EMAIL}
            returnKeyType={ReturnKeyTypes.NEXT}
          />
          <Input
            title={'비밀번호'}
            returnKeyType={ReturnKeyTypes.DONE}
            secureTextEntry
          />
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
    
- **생성한 상태 변수를 사용해서 Input 컴포넌트를 통해 입력되는 값을 저장함.**
- **TextInput 컴포넌트에 입력된 텍스트가 변할 때마다 호출되는 props는 onChange와 onChangeText가 있음.**
- **단순히 변경되는 텍스트만 처리하면 될 때에는 onChangeText를 사용함.**
- **TextInput 컴포넌트에 특정 변숫값을 보여주고 싶을 때에는 value라는 props를 사용함.**
- **우리는 onChangeText를 통해 변경된 상태 변수를 보여줘야 하므로 email 혹은 password를 value로 전달하면 됨.**
- **SignInScreen.js 파일을 아래와 같이 변경함.**
    
    ```jsx
    import { Image, StyleSheet, Text, View } from 'react-native';
    import Input, { KeyboardTypes, ReturnKeyTypes } from '../components/Input';
    import { useState } from 'react';
    
    const SignInScreen = () => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
    
      console.log(email, password);
    
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
          />
          <Input
            title={'비밀번호'}
            returnKeyType={ReturnKeyTypes.DONE}
            secureTextEntry
            value={password}
            onChangeText={(password) => setEmail(password.trim())}
          />
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

# **input 컴포넌트 꾸미기 - 색 관리 하기**

- **프로젝트에서 사용할 색을 관리하기.**
- **프로젝트의 대표색을 보통 프라이머리 컬러(Primary Color)라고 함.**
- **우리 프로젝트에서는 프라이머리 컬러를 파란색으로 정하도록 함.**
- **그리고 현재 Input 컴포넌트에서 placeholderTextColor에 사용되고 있는 회색을 GRAY의 DEFAULT로 만듦.**
- **추가로, 기본이 되는 검은색과 흰색도 추가함.**
- **src 폴더 밑에 colors.js 파일을 만들고 다음과 같이 작성함.**
    
    ```jsx
    export const WHITE = '#ffffff';
    export const BLACK = '#000000';
    
    export const PRIMARY = {
      DEFAULT: '#2563eb',
    };
    
    export const GRAY = {
      DEFAULT: '#a3a3a3',
    };
    ```
    
- **App.js 파일을 아래와 같이 수정함.**
    
    ```jsx
    import { StatusBar } from 'expo-status-bar';
    import { StyleSheet, Text, View } from 'react-native';
    import SignInScreen from './screen/SignInScreen';
    import { WHITE } from './colors';
    
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
        backgroundColor: WHITE,
        alignItems: 'center',
        justifyContent: 'center',
      },
    });
    ```
    
- **Input.js 파일을 아래와 같이 수정함.**
    
    ```jsx
    import { StyleSheet, Text, TextInput, View } from 'react-native';
    import PropTypes from 'prop-types';
    import { GRAY } from '../colors';
    
    export const keyboardTypes = {
      DEFAULT: 'default',
      EMAIL: 'email-address',
    };
    
    export const ReturnKeyTypes = {
      DONE: 'done',
      NEXT: 'next',
    };
    
    const Input = ({ title, placeholder, ...props }) => {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <TextInput
            {...props}
            style={styles.input}
            placeholder={placeholder ?? title}
            placeholderTextColor={GRAY.DEFAULT}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
      );
    };
    
    Input.defaultProps = {
      keyboardType: keyboardTypes.DEFAULT,
      returnKeyType: ReturnKeyTypes.DONE,
    };
    
    Input.PropTypes = {
      title: PropTypes.string.isRequired,
      placeholder: PropTypes.string,
      keyboardTypes: PropTypes.oneOf(Object.values(keyboardTypes)),
      returnKeyType: PropTypes.oneOf(Object.values(ReturnKeyTypes)),
      secureTextEntry: PropTypes.bool,
    };
    
    const styles = StyleSheet.create({
      container: {
        width: '100%',
        paddingHorizontal: 20,
        marginVertical: 10,
      },
    
      title: {
        marginBottom: 4,
      },
    
      input: {
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 42,
      },
    });
    
    export default Input;
    
    ```
  
<br>

# **input 컴포넌트 꾸미기 - 포커스 유무에 따라 스타일 변경하기**

- **TextInput 컴포넌트의 포스트 유무에 따라 스타일이 다르게 적용되도록 만들어 봄.**
- **TextInput 컴포넌트에는 onFocus 와 onBlur라는 props가 있는데, 각각 TextInput 컴포넌트가 포커스를 얻거나 읽었을 때 호출되는 함수임.**
- **Input.js 파일을 아래와 같이 수정함.**
    
    ```jsx
    import { StyleSheet, Text, TextInput, View } from 'react-native';
    import PropTypes from 'prop-types';
    import { GRAY, PRIMARY } from '../colors';
    import { useState } from 'react';
    
    export const keyboardTypes = {
      DEFAULT: 'default',
      EMAIL: 'email-address',
    };
    
    export const ReturnKeyTypes = {
      DONE: 'done',
      NEXT: 'next',
    };
    
    const Input = ({ title, placeholder, ...props }) => {
      const [isFocused, setIsFocused] = useState(false);
    
      return (
        <View style={styles.container}>
          <Text style={[styles.title, isFocused && styles.focusedTitle]}>
            {title}
          </Text>
          <TextInput
            {...props}
            style={[styles.input, isFocused && styles.focusedInput]}
            placeholder={placeholder ?? title}
            placeholderTextColor={GRAY.DEFAULT}
            autoCapitalize="none"
            autoCorrect={false}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </View>
      );
    };
    
    Input.defaultProps = {
      keyboardType: keyboardTypes.DEFAULT,
      returnKeyType: ReturnKeyTypes.DONE,
    };
    
    Input.PropTypes = {
      title: PropTypes.string.isRequired,
      placeholder: PropTypes.string,
      keyboardTypes: PropTypes.oneOf(Object.values(keyboardTypes)),
      returnKeyType: PropTypes.oneOf(Object.values(ReturnKeyTypes)),
      secureTextEntry: PropTypes.bool,
    };
    
    const styles = StyleSheet.create({
      container: {
        width: '100%',
        paddingHorizontal: 20,
        marginVertical: 10,
      },
    
      title: {
        marginBottom: 4,
        color: GRAY.DEFAULT,
      },
    
      focusedTitle: {
        fontWeight: '600',
        color: PRIMARY.DEFAULT,
      },
    
      input: {
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 42,
        borderColor: GRAY.DEFAULT,
      },
    
      focusedInput: {
        borderWidth: 2,
        borderColor: PRIMARY.DEFAULT,
        color: PRIMARY.DEFAULT,
      },
    });
    
    export default Input;
    ```
    
    ![image](https://github.com/user-attachments/assets/ee223fbd-c29c-4783-b090-8d485691faac)
    
<br>

# **input 컴포넌트 꾸미기 - 값의 입력 여부에 따라 스타일 변경하기**

- **포커스가 없는 상태에서도 값이 있을 때와 없을 때, 다른 모습으로 보여지게 스타일을 변경함.**
- **Input.js 파일을 아래와 같이 수정함.**
    
    ```jsx
    import { StyleSheet, Text, TextInput, View } from 'react-native';
    import PropTypes from 'prop-types';
    import { BLACK, GRAY, PRIMARY } from '../colors';
    import { useState } from 'react';
    
    export const keyboardTypes = {
      DEFAULT: 'default',
      EMAIL: 'email-address',
    };
    
    export const ReturnKeyTypes = {
      DONE: 'done',
      NEXT: 'next',
    };
    
    const Input = ({ title, placeholder, value, ...props }) => {
      const [isFocused, setIsFocused] = useState(false);
    
      return (
        <View style={styles.container}>
          <Text
            style={[
              styles.title,
              isFocused && styles.focusedTitle,
              isFocused && styles.hasValueTitle,
            ]}
          >
            {title}
          </Text>
          <TextInput
            {...props}
            style={[
              styles.input,
              isFocused && styles.focusedInput,
              isFocused && styles.hasValueInput,
            ]}
            placeholder={placeholder ?? title}
            placeholderTextColor={GRAY.DEFAULT}
            autoCapitalize="none"
            autoCorrect={false}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </View>
      );
    };
    
    Input.defaultProps = {
      keyboardType: keyboardTypes.DEFAULT,
      returnKeyType: ReturnKeyTypes.DONE,
    };
    
    Input.PropTypes = {
      title: PropTypes.string.isRequired,
      placeholder: PropTypes.string,
      keyboardTypes: PropTypes.oneOf(Object.values(keyboardTypes)),
      returnKeyType: PropTypes.oneOf(Object.values(ReturnKeyTypes)),
      secureTextEntry: PropTypes.bool,
      value: PropTypes.string,
    };
    
    const styles = StyleSheet.create({
      hasValueTitle: {
        color: BLACK,
      },
    
      hasValueInput: {
        borderColor: BLACK,
        color: BLACK,
      },
    
      container: {
        width: '100%',
        paddingHorizontal: 20,
        marginVertical: 10,
      },
    
      title: {
        marginBottom: 4,
        color: GRAY.DEFAULT,
      },
    
      focusedTitle: {
        fontWeight: '600',
        color: PRIMARY.DEFAULT,
      },
    
      input: {
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 42,
        borderColor: GRAY.DEFAULT,
      },
    
      focusedInput: {
        borderWidth: 2,
        borderColor: PRIMARY.DEFAULT,
        color: PRIMARY.DEFAULT,
      },
    });
    
    export default Input;
    ```
    
    ![image](https://github.com/user-attachments/assets/000af559-c75e-477f-bb84-8ff0b777592a)
    
<br>

# **input 컴포넌트 꾸미기 - 벡터 아이콘 추가하기**

- [**벡터 아이콘](https://icons.expo.fyi/)은 크기를 변경해도 흐려지지 않고 다양한 해상도에서 선명하게 나타난다는 장점이 있음.**
- **또한 색상 변경이 쉬워서 스타일을 적용하는데 용이함.**
- **Expo에서 제공하는 vector-icons를 이용하여 작업 함.**
- **아이콘 적용하는 과정**
    - **TextInput 컴포넌트를 감싸는 View 컴포넌트 (A)를 만듦.**
    - **A 컴포넌트의 자식 컴포넌트로 View 컴포넌트 (B)를 만들고 높이를 100%로 설정함.**
    - **B 컴포넌트에서 중앙 정렬을 하고 자식 컴포넌트로 아이콘을 사용함.**
- **Input.js 파일을 아래와 같이 수정함.**
    
    ```jsx
    import { StyleSheet, Text, TextInput, View } from 'react-native';
    import PropTypes from 'prop-types';
    import { BLACK, GRAY, PRIMARY } from '../colors';
    import { useState } from 'react';
    import { MaterialCommunityIcons } from '@expo/vector-icons';
    
    export const keyboardTypes = {
      DEFAULT: 'default',
      EMAIL: 'email-address',
    };
    
    export const ReturnKeyTypes = {
      DONE: 'done',
      NEXT: 'next',
    };
    
    export const IconNames = {
      EMAIL: 'email',
      PASSWORD: 'lock',
    };
    
    const Input = ({ title, placeholder, value, iconName, ...props }) => {
      const [isFocused, setIsFocused] = useState(false);
    
      return (
        <View style={styles.container}>
          <Text
            style={[
              styles.title,
              isFocused && styles.focusedTitle,
              isFocused && styles.hasValueTitle,
            ]}
          >
            {title}{' '}
          </Text>
          <View>
            <TextInput
              {...props}
              style={[
                styles.input,
                isFocused && styles.focusedInput,
                isFocused && styles.hasValueInput,
              ]}
              placeholder={placeholder ?? title}
              placeholderTextColor={GRAY.DEFAULT}
              autoCapitalize="none"
              autoCorrect={false}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <View style={styles.icon}>
              <MaterialCommunityIcons
                name={iconName}
                size={20}
                color={(() => {
                  switch (true) {
                    case isFocused:
                      return PRIMARY.DEFAULT;
                    case !!value:
                      return BLACK;
                    default:
                      return GRAY.DEFAULT;
                  }
                })()}
              />
            </View>
          </View>
        </View>
      );
    };
    
    Input.defaultProps = {
      keyboardType: keyboardTypes.DEFAULT,
      returnKeyType: ReturnKeyTypes.DONE,
    };
    
    Input.PropTypes = {
      title: PropTypes.string.isRequired,
      placeholder: PropTypes.string,
      keyboardTypes: PropTypes.oneOf(Object.values(keyboardTypes)),
      returnKeyType: PropTypes.oneOf(Object.values(ReturnKeyTypes)),
      secureTextEntry: PropTypes.bool,
      value: PropTypes.string,
      iconName: PropTypes.oneOf(Object.values(IconNames)),
    };
    
    const styles = StyleSheet.create({
      hasValueTitle: {
        color: BLACK,
      },
    
      hasValueInput: {
        borderColor: BLACK,
        color: BLACK,
      },
    
      container: {
        width: '100%',
        paddingHorizontal: 20,
        marginVertical: 10,
      },
    
      title: {
        marginBottom: 4,
        color: GRAY.DEFAULT,
      },
    
      focusedTitle: {
        fontWeight: '600',
        color: PRIMARY.DEFAULT,
      },
    
      input: {
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 42,
        borderColor: GRAY.DEFAULT,
        paddingLeft: 30,
      },
    
      icon: {
        position: 'absolute',
        left: 8,
        height: '100%',
        justifyContent: 'center',
      },
    
      focusedInput: {
        borderWidth: 2,
        borderColor: PRIMARY.DEFAULT,
        color: PRIMARY.DEFAULT,
      },
    });
    
    export default Input;
    
    ```
    
- **SignInScreen.js 파일을 아래와 같이 수정함.**
    
    ```jsx
    import { Image, StyleSheet, Text, View } from 'react-native';
    import Input, {
      KeyboardTypes,
      ReturnKeyTypes,
      IconNames,
    } from '../components/Input';
    import { useState } from 'react';
    
    const SignInScreen = () => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
    
      console.log(email, password);
    
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
            title={'비밀번호'}
            returnKeyType={ReturnKeyTypes.DONE}
            secureTextEntry
            value={password}
            onChangeText={(password) => setEmail(password.trim())}
            iconName={IconNames.PASSWORD}
          />
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
    
    ![image](https://github.com/user-attachments/assets/14495419-15ca-413f-9cb6-827f85bf411d)
  
<br>

# **useRefHook 으로 입력 칸 이동하기**

- **현재 이메일을 입력할 때 나타나는 키보드의 완료 버튼에는 next가 나타나고 있는데, 클릭하면 다음으로 넘어가는 것이 아니라 키보드가 사라지기만 함.**
- **이번에는 next 버튼을 눌렀을 때 포커스가 비밀번호를 입력하는 컴포넌트로 이동하게 만들어 봄.**
- https://ko.react.dev/reference/react/useRef
- **SignInScreen.js 파일을 아래와 같이 수정함.**
    
    ```jsx
    import { Image, StyleSheet, Text, View } from 'react-native';
    import Input, {
      KeyboardTypes,
      ReturnKeyTypes,
      IconNames,
    } from '../components/Input';
    import { useState, useRef } from 'react';
    
    const SignInScreen = () => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const passwordRef = useRef(null);
    
      console.log(email, password);
    
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
          />
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
    
- **Input.js 파일을 아래와 같이 수정함.**
    
    ```jsx
    import { StyleSheet, Text, TextInput, View } from 'react-native';
    import PropTypes from 'prop-types';
    import { BLACK, GRAY, PRIMARY } from '../colors';
    import { useState, forwardRef } from 'react';
    import { MaterialCommunityIcons } from '@expo/vector-icons';
    
    export const keyboardTypes = {
      DEFAULT: 'default',
      EMAIL: 'email-address',
    };
    
    export const ReturnKeyTypes = {
      DONE: 'done',
      NEXT: 'next',
    };
    
    export const IconNames = {
      EMAIL: 'email',
      PASSWORD: 'lock',
    };
    
    const Input = ({ title, placeholder, value, iconName, ...props }) => {
      const [isFocused, setIsFocused] = useState(false);
    
      return (
        <View style={styles.container}>
          <Text
            style={[
              styles.title,
              isFocused && styles.focusedTitle,
              isFocused && styles.hasValueTitle,
            ]}
          >
            {title}{' '}
          </Text>
          <View>
            <TextInput
              {...props}
              ref={ref}
              style={[
                styles.input,
                isFocused && styles.focusedInput,
                isFocused && styles.hasValueInput,
              ]}
              placeholder={placeholder ?? title}
              placeholderTextColor={GRAY.DEFAULT}
              autoCapitalize="none"
              autoCorrect={false}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <View style={styles.icon}>
              <MaterialCommunityIcons
                name={iconName}
                size={20}
                color={(() => {
                  switch (true) {
                    case isFocused:
                      return PRIMARY.DEFAULT;
                    case !!value:
                      return BLACK;
                    default:
                      return GRAY.DEFAULT;
                  }
                })()}
              />
            </View>
          </View>
        </View>
      );
    };
    
    Input.defaultProps = {
      keyboardType: keyboardTypes.DEFAULT,
      returnKeyType: ReturnKeyTypes.DONE,
    };
    
    Input.PropTypes = {
      title: PropTypes.string.isRequired,
      placeholder: PropTypes.string,
      keyboardTypes: PropTypes.oneOf(Object.values(keyboardTypes)),
      returnKeyType: PropTypes.oneOf(Object.values(ReturnKeyTypes)),
      secureTextEntry: PropTypes.bool,
      value: PropTypes.string,
      iconName: PropTypes.oneOf(Object.values(IconNames)),
    };
    
    const styles = StyleSheet.create({
      hasValueTitle: {
        color: BLACK,
      },
    
      hasValueInput: {
        borderColor: BLACK,
        color: BLACK,
      },
    
      container: {
        width: '100%',
        paddingHorizontal: 20,
        marginVertical: 10,
      },
    
      title: {
        marginBottom: 4,
        color: GRAY.DEFAULT,
      },
    
      focusedTitle: {
        fontWeight: '600',
        color: PRIMARY.DEFAULT,
      },
    
      input: {
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 42,
        borderColor: GRAY.DEFAULT,
        paddingLeft: 30,
      },
    
      icon: {
        position: 'absolute',
        left: 8,
        height: '100%',
        justifyContent: 'center',
      },
    
      focusedInput: {
        borderWidth: 2,
        borderColor: PRIMARY.DEFAULT,
        color: PRIMARY.DEFAULT,
      },
    });
    
    export default Input;
    
    ```
    
    ![image](https://github.com/user-attachments/assets/e4bd5adc-fc4e-49d2-955c-c9b84549f28b)
