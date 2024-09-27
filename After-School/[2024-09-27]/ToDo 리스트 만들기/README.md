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
