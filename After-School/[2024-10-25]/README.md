# **FAB 버튼 만들기**

- **UI 위에 떠 있는 버튼을 플로팅 액션 버튼(Floating action button: FAB)이라고 함.**
- **FAB를 사용하면 기존 UI에 버튼을 쉽게 추가할 수 있고 버튼 기능을 눈에 띄게 표현할 수 있음.**
- **하지만 FAB의 특성상 화면의 일부를 가리게 되니 화면의 중요한 부분은 가리지 않도록 주의하면서 사용해야 함.**
- **지금부터 FAB를 사용해서 추가 버튼을 만들고 버튼을 클릭하면 입력 칸에 할 일을 입력할 수 있도록 만들어 볾.**
    
    ```jsx
    // **src/components/InputFAB.js**
    
    import { Pressable, StyleSheet } from 'react-native';
    import { PRIMARY, WHITE } from '../colors';
    import { MaterialCommunityIcons } from '@expo/vector-icons';
    
    const InputFAB = () => {
      return (
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && { backgroundColor: PRIMARY.DARK },
          ]}
        >
          <MaterialCommunityIcons name="plus" size={24} color={WHITE} />
        </Pressable>
      );
    };
    
    const styles = StyleSheet.create({
      button: {
        position: 'absolute',
        bottom: 30,
        right: 10,
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: PRIMARY.DEFAULT,
      },
    });
    
    export default InputABS;
    ```
    
    ```jsx
    // **src/screen/ListScreen.js**
    
    import { StyleSheet, Text, View, Button } from 'react-native';
    import { useSateAreaInsets } from 'react-native-safe-area-context';
    import EmptyList from '../components/EmptyList';
    import List from '../components/List';
    import InputFAB from '../components/InputFAB';
    
    const ListScreen = ({ navigation, route }) => {
      const { bottom } = useSateAreaInsets();
      const todos = [];
    
      return (
        <View style={{ flex: 1, paddingBottom: bottom }}>
          {todos.length ? <List data={todos} /> : <EmptyList />}
          <InputFAB />
        </View>
      );
    };
    
    export default ListScreen;
    ```
    
    ![image](https://github.com/user-attachments/assets/9f0faed6-0951-40fb-952b-8e369a3dccf8)

<br>

# **입력 칸 만들기**

- **이번에는 입력칸과 버튼을 클릭하면 입력 칸이 나타나고 다시 버튼을 클릭하면 입력창이 사라지게 만듦.**
- **InputFAB 컴포넌트를 수정함.**
    
    ```jsx
    import {
      Pressable,
      StyleSheet,
      TextInput,
      View,
      useWindowDimensions,
    } from 'react-native';
    import { PRIMARY, WHITE } from '../colors';
    import { MaterialCommunityIcons } from '@expo/vector-icons';
    import { useRef, useState } from 'react';
    
    const InputFAB = () => {
      const [text, setText] = useState('');
      const [isOpened, setIsOpened] = useState(false);
      const inputRef = useRef();
      const windowWidth = useWindowDimensions().width;
    
      const open = () => {
        inputRef.current.focus();
        setIsOpened(true);
      };
    
      const close = () => {
        inputRef.current.blur();
        setText('');
        setIsOpened(false);
      };
    
      const onPressButton = () => {
        isOpened ? close() : open();
      };
    
      return (
        <>
          <View
            style={[
              styles.position,
              styles.shape,
              { justifyContent: 'center' },
              isOpened && { width: windowWidth - 20 },
            ]}
          >
            <TextInput
              ref={inputRef}
              onBlur={close}
              value={text}
              onChangeText={(text) => setText(text)}
              style={[styles.input]}
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="none"
              keyboardAppearance="light"
              returnKeyType="done"
            />
          </View>
    
          <Pressable
            style={({ pressed }) => [
              styles.button,
              styles.shape,
              styles.button,
              pressed && { backgroundColor: PRIMARY.DARK },
            ]}
            onPress={onPressButton}
          >
            <MaterialCommunityIcons name="plus" size={24} color={WHITE} />
          </Pressable>
        </>
      );
    };
    
    const styles = StyleSheet.create({
      position: {
        position: 'absolute',
        bottom: 30,
        right: 10,
      },
    
      shape: {
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: PRIMARY.DEFAULT,
      },
    
      input: {
        color: WHITE,
        paddingLeft: 20,
        paddingRight: 70,
      },
    
      button: {
        justifyContent: 'center',
        alignItems: 'center',
      },
    });
    
    export default InputFAB;
    ```
    
    ![image](https://github.com/user-attachments/assets/4c1cdb48-e87a-4db9-847a-b3d2f91a4acd)
  
<br>

# **키보드 높이 구하기**

- **이번에는 iOS 에서 TextInput 컴포넌트가 키보드에 가려지는 문제를 해결함.**
- **키보드가 나타날 때 혹은 사라질 때 특정 함수를 실행하고 싶다면 keyboardWillShow와 keyboardWillHide를 첫 번째 파라미터로 전달해준다. 단, keyboardWill~ 은 iOS 에서만 작동하는 함수임.**
- **만약 키보드가 나타난 후에 혹은 사라진 후에 특정 함수를 실행하고 싶다면 keyboardDidshow 와 keyboardDidHide를 첫 번째 파라미터로 전달함.**
- **두 번째 파라미터로 전달하는 함수에는 여러 가지 값을 가진 객체가 파라미터로 전달됩니다. 그 중에 endCoordinates라는 프로퍼티는 키보드 높이와 너비 등을 가진 객체임.**
- **안드로이는 특별한 설정이 없어도 키보드가 입력 칸을 가리지 않으니 iOS에서만 작동하도록 코드를 수정함.**
    
    ```jsx
    // src/components/InputFAB.js
    
    import {
      Pressable,
      StyleSheet,
      TextInput,
      View,
      useWindowDimensions,
      Keyboard,
      Platform,
    } from 'react-native';
    import { PRIMARY, WHITE } from '../colors';
    import { MaterialCommunityIcons } from '@expo/vector-icons';
    import { useEffect, useRef, useState } from 'react';
    
    const BOTTOM = 30;
    
    const InputFAB = () => {
      const [text, setText] = useState('');
      const [isOpened, setIsOpened] = useState(false);
      const inputRef = useRef();
      const windowWidth = useWindowDimensions().width;
      const [KeyboardHeight, setKeyboardHeight] = useState(BOTTOM);
    
      const open = () => {
        inputRef.current.focus();
        setIsOpened(true);
      };
    
      const close = () => {
        inputRef.current.blur();
        setText('');
        setIsOpened(false);
      };
    
      const onPressButton = () => {
        isOpened ? close() : open();
      };
    
      useEffect(() => {
        if (Platform.OS == 'ios') {
          Keyboard.addListener('keyboardWillshow', (e) => {
            console.log('keyboardWillshow');
            setKeyboardHeight(e.endCoordinates.height + BOTTOM);
          });
    
          Keyboard.addListener('keyboardWillhide', (e) => {
            console.log('keyboardWillhide');
            setKeyboardHeight(BOTTOM);
          });
        }
      }, []);
    
      return (
        <>
          <View
            style={[
              styles.position,
              styles.shape,
              {
                justifyContent: 'center',
                bottom: KeyboardHeight,
              },
              isOpened && { width: windowWidth - 20 },
            ]}
          >
            <TextInput
              ref={inputRef}
              onBlur={close}
              value={text}
              onChangeText={(text) => setText(text)}
              style={[styles.input]}
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="none"
              keyboardAppearance="light"
              returnKeyType="done"
            />
          </View>
    
          <Pressable
            style={({ pressed }) => [
              styles.button,
              styles.shape,
              styles.button,
              pressed && { backgroundColor: PRIMARY.DARK },
              { bottom: KeyboardHeight },
            ]}
            onPress={onPressButton}
          >
            <MaterialCommunityIcons name="plus" size={24} color={WHITE} />
          </Pressable>
        </>
      );
    };
    
    const styles = StyleSheet.create({
      position: {
        position: 'absolute',
        bottom: BOTTOM,
        right: 10,
      },
    
      shape: {
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: PRIMARY.DEFAULT,
      },
    
      input: {
        color: WHITE,
        paddingLeft: 20,
        paddingRight: 70,
      },
    
      button: {
        justifyContent: 'center',
        alignItems: 'center',
      },
    });
    
    export default InputFAB;
    
    ```

<br>

# **useEffect 정리 함수**

- **keyboard.addListener 처럼 이벤트를 등록할 때에는 이벤트가 중복으로 등록되지 않도록 주의해야 한다. 이벤트가 중복으로 등록되면 이벤트 발생 시 함수가 여러 번 호출되기 때문에 문제가 발생할 수 있음.**
- **이런 문제를 방지하기 위해서 이벤트를 등록할 때에는 반드시 이벤트를 삭제하는 코드를 추가해야 함.**
- **화면에 머무는 동안에는 이벤트가 작동해야 하니 화면이 언마운트될 때 이벤트를 삭제해야 함.**
- **useEffect에 전달한 함수에서 특정 함수를 반환할 수 있는데 이것을 정리(cleanup) 함수라고 함.**
- **정리 함수는 컴포넌트가 언마운트될 때 호출되는 특징이 있으니 정리 함수를 사용해서 화면이 언마운트될 때 이벤트 삭제 코드가 작동하도록 할 수 있음.**
- **InputFAB 컴포넌트를 수정함.**
    
- **useEffect 의 정리 함수는 언마운트 될 때 호출되지만 deps에 값이 전달되면 useEffect에 전달된 함수가 호출되기 전에, 이전에 호출되었던 함수의 정리 함수가 먼저 호출됨.**
- **여기에서는 언마운트될 때 이벤트를 삭제해야 하느 다음과 같이 InputFAB 컴포넌트를 수정함.**
    
    ```jsx
    import {
      Pressable,
      StyleSheet,
      TextInput,
      View,
      useWindowDimensions,
      Keyboard,
      Platform,
    } from 'react-native';
    import { PRIMARY, WHITE } from '../colors';
    import { MaterialCommunityIcons } from '@expo/vector-icons';
    import { useEffect, useRef, useState } from 'react';
    
    const BOTTOM = 30;
    
    const InputFAB = () => {
      const [text, setText] = useState('');
      const [isOpened, setIsOpened] = useState(false);
      const inputRef = useRef();
      const windowWidth = useWindowDimensions().width;
      const [KeyboardHeight, setKeyboardHeight] = useState(BOTTOM);
    
      const open = () => {
        inputRef.current.focus();
        setIsOpened(true);
      };
    
      const close = () => {
        inputRef.current.blur();
        setText('');
        setIsOpened(false);
      };
    
      const onPressButton = () => {
        isOpened ? close() : open();
      };
    
      useEffect(() => {
        if (Platform.OS == 'ios') {
          const show = Keyboard.addListener('keyboardWillshow', (e) => {
            console.log('keyboardWillshow');
            setKeyboardHeight(e.endCoordinates.height + BOTTOM);
          });
    
          const hide = Keyboard.addListener('keyboardWillhide', (e) => {
            console.log('keyboardWillhide');
            setKeyboardHeight(BOTTOM);
          });
    
          return () => {
            show.remove();
            hide.remove();
          };
        }
      }, []);
    
      return (
        <>
          <View
            style={[
              styles.position,
              styles.shape,
              {
                justifyContent: 'center',
                bottom: KeyboardHeight,
              },
              isOpened && { width: windowWidth - 20 },
            ]}
          >
            <TextInput
              ref={inputRef}
              onBlur={close}
              value={text}
              onChangeText={(text) => setText(text)}
              style={[styles.input]}
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="none"
              keyboardAppearance="light"
              returnKeyType="done"
            />
          </View>
    
          <Pressable
            style={({ pressed }) => [
              styles.button,
              styles.shape,
              styles.button,
              pressed && { backgroundColor: PRIMARY.DARK },
              { bottom: KeyboardHeight },
            ]}
            onPress={onPressButton}
          >
            <MaterialCommunityIcons name="plus" size={24} color={WHITE} />
          </Pressable>
        </>
      );
    };
    
    const styles = StyleSheet.create({
      position: {
        position: 'absolute',
        bottom: BOTTOM,
        right: 10,
      },
    
      shape: {
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: PRIMARY.DEFAULT,
      },
    
      input: {
        color: WHITE,
        paddingLeft: 20,
        paddingRight: 70,
      },
    
      button: {
        justifyContent: 'center',
        alignItems: 'center',
      },
    });
    
    export default InputFAB;
    
    ```
    
    [**Keyboard 이벤트 테스트 영상**](https://2022-beomjun-rn-assets.s3.ap-northeast-2.amazonaws.com/keyboard-event.mp4)
    
<br>

# **그림자 만들기**

- **FAB 버튼이 잘 나타나지만 화면 위에 떠있는 듯한 느낌이 들지 않음.**
- **컴포넌트에 그림자 효과를 주면 더 화면위에 떠있는 듯한 느낌을 가미할 수 있음.**
- **이번에는 FAB 버튼에 그림자를 추가해서 좀 더 공중에 떠 있는 듯한 느낌이 나도록 수정함.**
- **그림자를 설정하는 스타일 속성은 4가지가 있음.**
    - **shadowColor : 그림자의 색을 결정함.**
    - **shadowOffset: 그림자의 크기를 결정함. (iOS 전용)**
    - **shadowOpacity: 그림자의 투명도를 결정함. (iOS 전용)**
    - **shadowRadius: 그림자가 흐려지는 반경을 결정. (iOS 전용)**
- **InputFAB 컴포넌트에 그림자를 추가함.**
    
    ```jsx
    import {
      Pressable,
      StyleSheet,
      TextInput,
      View,
      useWindowDimensions,
      Keyboard,
      Platform,
    } from 'react-native';
    import { BLACK, PRIMARY, WHITE } from '../colors';
    import { MaterialCommunityIcons } from '@expo/vector-icons';
    import { useEffect, useRef, useState } from 'react';
    
    const BOTTOM = 30;
    
    const InputFAB = () => {
      const [text, setText] = useState('');
      const [isOpened, setIsOpened] = useState(false);
      const inputRef = useRef();
      const windowWidth = useWindowDimensions().width;
      const [KeyboardHeight, setKeyboardHeight] = useState(BOTTOM);
    
      const open = () => {
        inputRef.current.focus();
        setIsOpened(true);
      };
    
      const close = () => {
        inputRef.current.blur();
        setText('');
        setIsOpened(false);
      };
    
      const onPressButton = () => {
        isOpened ? close() : open();
      };
    
      useEffect(() => {
        if (Platform.OS == 'ios') {
          const show = Keyboard.addListener('keyboardWillshow', (e) => {
            console.log('keyboardWillshow');
            setKeyboardHeight(e.endCoordinates.height + BOTTOM);
          });
    
          const hide = Keyboard.addListener('keyboardWillhide', (e) => {
            console.log('keyboardWillhide');
            setKeyboardHeight(BOTTOM);
          });
    
          return () => {
            show.remove();
            hide.remove();
          };
        }
      }, []);
    
      return (
        <>
          <View
            style={[
              styles.position,
              styles.shape,
              styles.shadow,
              {
                justifyContent: 'center',
                bottom: KeyboardHeight,
              },
              isOpened && { width: windowWidth - 20 },
            ]}
          >
            <TextInput
              ref={inputRef}
              onBlur={close}
              value={text}
              onChangeText={(text) => setText(text)}
              style={[styles.input]}
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="none"
              keyboardAppearance="light"
              returnKeyType="done"
            />
          </View>
    
          <Pressable
            style={({ pressed }) => [
              styles.button,
              styles.shape,
              styles.button,
              pressed && { backgroundColor: PRIMARY.DARK },
              { bottom: KeyboardHeight },
            ]}
            onPress={onPressButton}
          >
            <MaterialCommunityIcons name="plus" size={24} color={WHITE} />
          </Pressable>
        </>
      );
    };
    
    const styles = StyleSheet.create({
      shadow: {
        shadowColor: BLACK,
        ...Platform.select({
          ios: {
            shadowOffset: { width: 2, height: 4 },
            shadowOpacity: 0.5,
            shadowRadius: 5,
          },
    
          android: { elevation: 5 },
        }),
      },
    
      position: {
        position: 'absolute',
        bottom: BOTTOM,
        right: 10,
      },
    
      shape: {
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: PRIMARY.DEFAULT,
      },
    
      input: {
        color: WHITE,
        paddingLeft: 20,
        paddingRight: 70,
      },
    
      button: {
        justifyContent: 'center',
        alignItems: 'center',
      },
    });
    
    export default InputFAB;
    
    ```
    
    ![image](https://github.com/user-attachments/assets/af50e10d-2f71-4a67-8b4f-c1803dbad2b1)

<br>

# **Animated로 애니메이션 효과 추가하기**

- **애니메이션 효과를 추가해서 TextInput 컴포넌트가 부드럽게 나타났다 사라지도록 만들어 봄.**
- **리액트 네이티브에서 애니메이션 효과를 적용하기 위해서는 Animated 를 사용해야 함.**
- **Animated 컴포넌트는 모든 컴포넌트에서 사용할 수 있는 것은 아니며, Image, ScrollView, Text, View, FlatList, SectionList 컴포넌트에서만 사용이 가능함.**
- **InputFAB 함수를 수정함.**
    
    ```jsx
    import {
      Pressable,
      StyleSheet,
      TextInput,
      View,
      useWindowDimensions,
      Keyboard,
      Platform,
      Animated,
    } from 'react-native';
    import { BLACK, PRIMARY, WHITE } from '../colors';
    import { MaterialCommunityIcons } from '@expo/vector-icons';
    import { useEffect, useRef, useState } from 'react';
    
    const BOTTOM = 30;
    const BOTTOM_WIDTH = 60;
    
    const InputFAB = () => {
      const [text, setText] = useState('');
      const [isOpened, setIsOpened] = useState(false);
      const inputRef = useRef();
      const windowWidth = useWindowDimensions().width;
      const [KeyboardHeight, setKeyboardHeight] = useState(BOTTOM);
      const inputWidth = useRef(new Animated.Value(BOTTOM_WIDTH)).current;
    
      const open = () => {
        setIsOpened(true);
        Animated.timing(inputWidth, {
          toValue: windowWidth - 20,
          useNativeDriver: false,
          duration: 300,
        }).start(() => {
          inputRef.current.focus();
        });
      };
    
      const close = () => {
        if (isOpened) {
          setText('');
          setIsOpened(false);
          Animated.timing(inputWidth, {
            toValue: BUTTON_WIDTH,
            useNativeDriver: false,
            duration: 300,
          }).start(() => {
            inputRef.current.blur();
          });
        }
      };
    
      const onPressButton = () => {
        isOpened ? close() : open();
      };
    
      useEffect(() => {
        if (Platform.OS == 'ios') {
          const show = Keyboard.addListener('keyboardWillshow', (e) => {
            console.log('keyboardWillshow');
            setKeyboardHeight(e.endCoordinates.height + BOTTOM);
          });
    
          const hide = Keyboard.addListener('keyboardWillhide', (e) => {
            console.log('keyboardWillhide');
            setKeyboardHeight(BOTTOM);
          });
    
          return () => {
            show.remove();
            hide.remove();
          };
        }
      }, []);
    
      return (
        <>
          <Animated.View
            style={[
              styles.position,
              styles.shape,
              styles.shadow,
              {
                justifyContent: 'center',
                bottom: KeyboardHeight,
              },
              isOpened && { width: windowWidth - 20 },
            ]}
          >
            <TextInput
              ref={inputRef}
              onBlur={close}
              value={text}
              onChangeText={(text) => setText(text)}
              style={[styles.input]}
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="none"
              keyboardAppearance="light"
              returnKeyType="done"
            />
          </Animated.View>
    
          <Pressable
            style={({ pressed }) => [
              styles.button,
              styles.shape,
              styles.button,
              pressed && { backgroundColor: PRIMARY.DARK },
              { bottom: KeyboardHeight },
            ]}
            onPress={onPressButton}
          >
            <MaterialCommunityIcons name="plus" size={24} color={WHITE} />
          </Pressable>
        </>
      );
    };
    
    const styles = StyleSheet.create({
      shadow: {
        shadowColor: BLACK,
        ...Platform.select({
          ios: {
            shadowOffset: { width: 2, height: 4 },
            shadowOpacity: 0.5,
            shadowRadius: 5,
          },
    
          android: { elevation: 5 },
        }),
      },
    
      position: {
        position: 'absolute',
        bottom: BOTTOM,
        right: 10,
      },
    
      shape: {
        height: BUTTON_WIDTH,
        width: BUTTON_WIDTH,
        borderRadius: BUTTON_WIDTH / 2,
        backgroundColor: PRIMARY.DEFAULT,
      },
    
      input: {
        color: WHITE,
        paddingLeft: 20,
        paddingRight: BUTTON_WIDTH + 10,
      },
    
      button: {
        justifyContent: 'center',
        alignItems: 'center',
      },
    });
    
    export default InputFAB;
    ```
    
    [**애니매이션 테스트 결과**](https://2022-beomjun-rn-assets.s3.ap-northeast-2.amazonaws.com/animated-timing.mp4)
    
<br>

# **spring 함수로 아이콘 회전하게 만들기**

- **이번에는 + 아이콘을 회전시켜서 x 아이콘이 되도록 만듦.**
- **Animated.spring 함수를 사용해서 + 아이콘을 회전시키는 애니메이션을 적용시켜 봄.**
- **애니메이션을 적용할 수 있는 컴포넌트는 Animated 에서 제공하는 컴포넌트 뿐임.**
- **따라서 Pressable 컴포넌트를 지원하지 않기 때문에 Animated.View 컴포넌트로 감싸야 함.**
- **InputFAB 소스를 수정함.**
    
    ```jsx
    import {
      Pressable,
      StyleSheet,
      TextInput,
      View,
      useWindowDimensions,
      Keyboard,
      Platform,
      Animated,
    } from 'react-native';
    import { BLACK, PRIMARY, WHITE } from '../colors';
    import { MaterialCommunityIcons } from '@expo/vector-icons';
    import { useEffect, useRef, useState } from 'react';
    import PropTypes from 'prop-types';
    
    const BOTTOM = 30;
    const BOTTOM_WIDTH = 60;
    
    const InputFAB = ({ onInsert }) => {
      const [text, setText] = useState('');
      const [isOpened, setIsOpened] = useState(false);
      const inputRef = useRef();
      const windowWidth = useWindowDimensions().width;
      const [KeyboardHeight, setKeyboardHeight] = useState(BOTTOM);
      const inputWidth = useRef(new Animated.Value(BOTTOM_WIDTH)).current;
      const buttonRotation = useRef(new Animated.Value(0)).current;
    
      const open = () => {
        setIsOpened(true);
        Animated.timing(inputWidth, {
          toValue: windowWidth - 20,
          useNativeDriver: false,
          duration: 300,
        }).start(() => {
          inputRef.current.focus();
        });
    
        Animated.spring(buttonRotation, {
          toValue: 1,
          useNativeDriver: false,
          bounciness: 20,
        }).start();
      };
    
      const close = () => {
        if (isOpened) {
          setText('');
          setIsOpened(false);
          Animated.timing(inputWidth, {
            toValue: BUTTON_WIDTH,
            useNativeDriver: false,
            duration: 300,
          }).start(() => {
            inputRef.current.blur();
          });
    
          Animated.spring(buttonRotation, {
            toValue: 0,
            useNativeDriver: false,
            bounciness: 20,
          }).start();
        }
      };
    
      const spin = buttonRotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '315deg'],
      });
    
      const onPressButton = () => {
        isOpened ? close() : open();
      };
    
      useEffect(() => {
        if (Platform.OS == 'ios') {
          const show = Keyboard.addListener('keyboardWillshow', (e) => {
            console.log('keyboardWillshow');
            setKeyboardHeight(e.endCoordinates.height + BOTTOM);
          });
    
          const hide = Keyboard.addListener('keyboardWillhide', (e) => {
            console.log('keyboardWillhide');
            setKeyboardHeight(BOTTOM);
          });
    
          return () => {
            show.remove();
            hide.remove();
          };
        }
      }, []);
    
      return (
        <>
          <Animated.View
            style={[
              styles.position,
              styles.shape,
              styles.shadow,
              {
                justifyContent: 'center',
                bottom: KeyboardHeight,
              },
              isOpened && { width: windowWidth - 20 },
            ]}
          >
            <TextInput
              ref={inputRef}
              onBlur={close}
              value={text}
              onChangeText={(text) => setText(text)}
              style={[styles.input]}
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="none"
              keyboardAppearance="light"
              returnKeyType="done"
            />
          </Animated.View>
          <Animated.View
            style={[
              styles.position,
              styles.shape,
              {
                bottom: KeyboardHeight,
                transform: [{ rotate: spin }],
              },
            ]}
          >
            <Pressable
              style={({ pressed }) => [
                styles.button,
                styles.shape,
                styles.button,
                pressed && { backgroundColor: PRIMARY.DARK },
                { bottom: KeyboardHeight },
              ]}
              onPress={onPressButton}
            >
              <MaterialCommunityIcons name="plus" size={24} color={WHITE} />
            </Pressable>
          </Animated.View>
        </>
      );
    };
    
    const styles = StyleSheet.create({
      shadow: {
        shadowColor: BLACK,
        ...Platform.select({
          ios: {
            shadowOffset: { width: 2, height: 4 },
            shadowOpacity: 0.5,
            shadowRadius: 5,
          },
    
          android: { elevation: 5 },
        }),
      },
    
      position: {
        position: 'absolute',
        bottom: BOTTOM,
        right: 10,
      },
    
      shape: {
        height: BUTTON_WIDTH,
        width: BUTTON_WIDTH,
        borderRadius: BUTTON_WIDTH / 2,
        backgroundColor: PRIMARY.DEFAULT,
      },
    
      input: {
        color: WHITE,
        paddingLeft: 20,
        paddingRight: BUTTON_WIDTH + 10,
      },
    
      button: {
        justifyContent: 'center',
        alignItems: 'center',
      },
    });
    
    export default InputFAB;
    
    ```
    
    [**Animated.spring 테스트 영상**](https://2022-beomjun-rn-assets.s3.ap-northeast-2.amazonaws.com/animated-spring.mp4)
    
<br>

# **추가 기능 만들기**

- **먼저 할 일을 관리하는 상태 변수를 만들고 추가 함수를 만들어서 InputFAB 컴포넌트로 전달 함.**
- **ListScreen, InputFAB 컴포넌트를 을 수정해 봄.**
    
    ```jsx
    // src/screen/ListScreen.js
    
    import { StyleSheet, Text, View, Button } from 'react-native';
    import { useSateAreaInsets } from 'react-native-safe-area-context';
    import EmptyList from '../components/EmptyList';
    import List from '../components/List';
    import InputFAB from '../components/InputFAB';
    
    const ListScreen = ({ navigation, route }) => {
      const { bottom } = useSateAreaInsets();
      const [todos, setTodos] = useState([]);
    
      const onInsert = (task) => {
        const id = Date.now().toString();
        setTodos((prev) => [{ id, task, isDone: false }, prev]);
      };
    
      return (
        <View style={{ flex: 1, paddingBottom: bottom }}>
          {todos.length ? <List data={todos} /> : <EmptyList />}
          <InputFAB onInsert={onInsert} />
        </View>
      );
    };
    
    export default ListScreen;
    ```
    
    ```jsx
    // src/components/InputFAB.js
    
    import {
      Pressable,
      StyleSheet,
      TextInput,
      View,
      useWindowDimensions,
      Keyboard,
      Platform,
      Animated,
    } from 'react-native';
    import { BLACK, PRIMARY, WHITE } from '../colors';
    import { MaterialCommunityIcons } from '@expo/vector-icons';
    import { useEffect, useRef, useState } from 'react';
    import PropTypes from 'prop-types';
    
    const BOTTOM = 30;
    const BOTTOM_WIDTH = 60;
    
    const InputFAB = ({ onInsert }) => {
      const [text, setText] = useState('');
      const [isOpened, setIsOpened] = useState(false);
      const inputRef = useRef();
      const windowWidth = useWindowDimensions().width;
      const [KeyboardHeight, setKeyboardHeight] = useState(BOTTOM);
      const inputWidth = useRef(new Animated.Value(BOTTOM_WIDTH)).current;
      const buttonRotation = useRef(new Animated.Value(0)).current;
    
      const open = () => {
        setIsOpened(true);
        Animated.timing(inputWidth, {
          toValue: windowWidth - 20,
          useNativeDriver: false,
          duration: 300,
        }).start(() => {
          inputRef.current.focus();
        });
    
        Animated.spring(buttonRotation, {
          toValue: 1,
          useNativeDriver: false,
          bounciness: 20,
        }).start();
      };
    
      const close = () => {
        if (isOpened) {
          setText('');
          setIsOpened(false);
          Animated.timing(inputWidth, {
            toValue: BUTTON_WIDTH,
            useNativeDriver: false,
            duration: 300,
          }).start(() => {
            inputRef.current.blur();
          });
    
          Animated.spring(buttonRotation, {
            toValue: 0,
            useNativeDriver: false,
            bounciness: 20,
          }).start();
        }
      };
    
      const spin = buttonRotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '315deg'],
      });
    
      const onPressButton = () => {
        isOpened ? close() : open();
      };
    
      const onPressInsert = () => {
        const task = text.trim();
        if (task) {
          onInsert(task);
        }
      };
    
      useEffect(() => {
        if (Platform.OS == 'ios') {
          const show = Keyboard.addListener('keyboardWillshow', (e) => {
            console.log('keyboardWillshow');
            setKeyboardHeight(e.endCoordinates.height + BOTTOM);
          });
    
          const hide = Keyboard.addListener('keyboardWillhide', (e) => {
            console.log('keyboardWillhide');
            setKeyboardHeight(BOTTOM);
          });
    
          return () => {
            show.remove();
            hide.remove();
          };
        }
      }, []);
    
      return (
        <>
          <Animated.View
            style={[
              styles.position,
              styles.shape,
              styles.shadow,
              {
                justifyContent: 'center',
                bottom: KeyboardHeight,
              },
              isOpened && { width: windowWidth - 20 },
            ]}
          >
            <TextInput
              ref={inputRef}
              onBlur={close}
              value={text}
              onChangeText={(text) => setText(text)}
              style={[styles.input]}
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="none"
              keyboardAppearance="light"
              returnKeyType="done"
              onSubmitEditing={onPressInsert}
            />
          </Animated.View>
          <Animated.View
            style={[
              styles.position,
              styles.shape,
              {
                bottom: KeyboardHeight,
                transform: [{ rotate: spin }],
              },
            ]}
          >
            <Pressable
              style={({ pressed }) => [
                styles.button,
                styles.shape,
                styles.button,
                pressed && { backgroundColor: PRIMARY.DARK },
                { bottom: KeyboardHeight },
              ]}
              onPress={onPressButton}
            >
              <MaterialCommunityIcons name="plus" size={24} color={WHITE} />
            </Pressable>
          </Animated.View>
        </>
      );
    };
    
    InputFAB.propTypes = {
      onInsert: PropTypes.func.isRequired,
    };
    
    const styles = StyleSheet.create({
      shadow: {
        shadowColor: BLACK,
        ...Platform.select({
          ios: {
            shadowOffset: { width: 2, height: 4 },
            shadowOpacity: 0.5,
            shadowRadius: 5,
          },
    
          android: { elevation: 5 },
        }),
      },
    
      position: {
        position: 'absolute',
        bottom: BOTTOM,
        right: 10,
      },
    
      shape: {
        height: BUTTON_WIDTH,
        width: BUTTON_WIDTH,
        borderRadius: BUTTON_WIDTH / 2,
        backgroundColor: PRIMARY.DEFAULT,
      },
    
      input: {
        color: WHITE,
        paddingLeft: 20,
        paddingRight: BUTTON_WIDTH + 10,
      },
    
      button: {
        justifyContent: 'center',
        alignItems: 'center',
      },
    });
    
    export default InputFAB;
    
    ```
    
    ![image](https://github.com/user-attachments/assets/e9485c0f-703f-4816-8de2-5f63d876b243)

<br>

# **유니크 id 만들기**

- **이번에는 id에 타임스탬프 대신 고유한 값을 만들어내는 라이브러리를 사용함.**
- **일반적으로 고유한 id를 만드는데 많이 사용하는 라이브러리는 uuid 임. (혹은 nanoid 로 대체할 수 있음)**
- **이번 시간에는 nanoid로 유니크 id 값을 만들어 봄.**
- **리액트 네이티브에는 랜덤 생성기가 내장되어 있지 않아서 react-native-get-random-values 라이브러리를 추가로 설치해야 nanoid를 사용할 수 있음.**
- **아래 명령어를 사용해서 nanoid 라이브러리와 react-native-get-random-values 라이브러리를 설치함.**
- **`npm install nanoid react-native-get-random-values`**

```jsx
// src/App.js

import 'react-native-get-random-values';
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

```jsx
// src/screen/ListScreen.js

import { StyleSheet, Text, View, Button } from 'react-native';
import { useSateAreaInsets } from 'react-native-safe-area-context';
import EmptyList from '../components/EmptyList';
import List from '../components/List';
import InputFAB from '../components/InputFAB';
import { nanoid } from 'nanoid';

const ListScreen = ({ navigation, route }) => {
  const { bottom } = useSateAreaInsets();
  const [todos, setTodos] = useState([]);
  console.log(todos);

  const onInsert = (task) => {
    const id = nanoid();
    setTodos((prev) => [{ id, task, isDone: false }, prev]);
  };

  return (
    <View style={{ flex: 1, paddingBottom: bottom }}>
      {todos.length ? <List data={todos} /> : <EmptyList />}
      <InputFAB onInsert={onInsert} />
    </View>
  );
};

export default ListScreen;
```

![image](https://github.com/user-attachments/assets/721f744a-8af8-47a9-ad09-d2084d920224)

<br>

# **데이터 저장하고 불러오기**

- **추가 기능은 잘 작동하지만, 앱을 새로고침하면 추가한 내용이 모두 사라짐.**
- **이번에는 추가된 내용을 로컬 저장소에 저장해서 새로고침해도 이전 데이터가 유지되도록 만듦.**
- **리액트 네이티브에서 로컬 저장소를 활용하기 위해서 비동기로 작동하는 키-값 형식의 저장소인 AsyncStorage를 사용해야 함.**
- **아래 명령어를 사용해서 AsyncStorage를 설치함.**
- **`npx expo install @react-native-async-storage/async-storage`**
- **설치한 뒤 ListScreen 컴포넌트를 수정함.**
    
    ```jsx
    import { Alert, View } from 'react-native';
    import { useSateAreaInsets } from 'react-native-safe-area-context';
    import EmptyList from '../components/EmptyList';
    import List from '../components/List';
    import InputFAB from '../components/InputFAB';
    import { useEffect, useState } from 'react';
    import { nanoid } from 'nanoid';
    import { useAsyncStorage } from '@react-native-async-storage/async-storage';
    
    const ListScreen = ({ navigation, route }) => {
      const { bottom } = useSateAreaInsets();
      const [todos, setTodos] = useState([]);
      const { getItem, setItem } = useAsyncStorage('todos');
    
      const save = async (data) => {
        try {
          await setItem(JSON.stringify(data));
          setTodos(data);
        } catch (e) {
          Alert.alert('저장하기 실패', '데이터 저장에 실패했습니다.');
        }
      };
    
      const load = async () => {
        try {
          const data = await getItem();
          const todos = JSON.parse(data || '[]');
          setTodos(todos);
        } catch (e) {
          Alert.alert('불러오기 실패', '데이터 불러오기에 실패했습니다.');
        }
      };
    
      useEffect(() => {
        load();
      }, []);
    
      const onInsert = (task) => {
        const id = nanoid();
        const newTodos = [{ id, task, isDone: false }, ...todos];
        save(newTodos);
      };
    
      return (
        <View style={{ flex: 1, paddingBottom: bottom }}>
          {todos.length ? <List data={todos} /> : <EmptyList />}
          <InputFAB onInsert={onInsert} />
        </View>
      );
    };
    
    export default ListScreen;
    
    ```
    
    ![image](https://github.com/user-attachments/assets/353296c0-0b11-4217-9e82-9833aa7a57f0)

<br>

# **삭제 기능 만들기**

- **우리가 앞에서 만든 ListItem 컴포넌트의 오른쪽 휴지통 모양 아이콘을 클릭하면 삭제 함수가 호출되도록 구현하면 됨.**
- **먼저 ListScreen 컴포넌트에 삭제 함수를 만들고 props 로 전달함.**
    
    ```jsx
    // src/screen/ListScreen.js
    
    import { Alert, View } from 'react-native';
    import { useSateAreaInsets } from 'react-native-safe-area-context';
    import EmptyList from '../components/EmptyList';
    import List from '../components/List';
    import InputFAB from '../components/InputFAB';
    import { useEffect, useState } from 'react';
    import { nanoid } from 'nanoid';
    import { useAsyncStorage } from '@react-native-async-storage/async-storage';
    
    const ListScreen = ({ navigation, route }) => {
      const { bottom } = useSateAreaInsets();
      const [todos, setTodos] = useState([]);
      const { getItem, setItem } = useAsyncStorage('todos');
    
      const save = async (data) => {
        try {
          await setItem(JSON.stringify(data));
          setTodos(data);
        } catch (e) {
          Alert.alert('저장하기 실패', '데이터 저장에 실패했습니다.');
        }
      };
    
      const load = async () => {
        try {
          const data = await getItem();
          const todos = JSON.parse(data || '[]');
          setTodos(todos);
        } catch (e) {
          Alert.alert('불러오기 실패', '데이터 불러오기에 실패했습니다.');
        }
      };
    
      useEffect(() => {
        load();
      }, []);
    
      const onInsert = (task) => {
        const id = nanoid();
        const newTodos = [{ id, task, isDone: false }, ...todos];
        save(newTodos);
      };
    
      const onDelete = (id) => {
        const newTodos = todos.filter((item) => item.id !== id);
        save(newTodos);
      };
    
      return (
        <View style={{ flex: 1, paddingBottom: bottom }}>
          {todos.length ? <List data={todos} onDelete={onDelete} /> : <EmptyList />}
          <InputFAB onInsert={onInsert} />
        </View>
      );
    };
    
    export default ListScreen;
    
    ```
    
    ```jsx
    // src/component/List.js
    
    import { FlatList, StyleSheet, View } from 'react-native';
    import { GRAY } from '../colors';
    import PropTypes from 'prop-types';
    import ListItem from './ListItem';
    
    const Separator = () => {
      return <View style={styles.separator}></View>;
    };
    
    const List = ({ data, onDelete }) => {
      return (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ListItem item={item} onDelete={onDelete} />}
          windowSize={2}
          ItemSeparatorComponent={Separator}
          ListHeaderComponent={View}
          ListHeaderComponentStyle={{ height: 10 }}
        />
      );
    };
    
    List.propTypes = {
      data: PropTypes.array.isRequired,
      onDelete: PropTypes.func.isRequired,
    };
    
    const styles = StyleSheet.create({
      separator: {
        height: 1,
        backgroundColor: GRAY.LIGHT,
        marginVertical: 10,
        marginHorizontal: 10,
        width: 300,
      },
    });
    
    export default List;
    ```
    
    ```jsx
    // src/component/ListItem.js
    
    import { memo } from 'react';
    import { Pressable, StyleSheet, Text, View } from 'react-native';
    import PropTypes from 'prop-types';
    import { MaterialCommunityIcons } from '@expo/vector-icons';
    import { DANGER, BLACK, PRIMARY, GRAY } from '../colors';
    
    const ListItem = memo(({ item, onDelete }) => {
      const checkboxProps = {
        name: item.isDone ? 'checkbox-marked' : 'checkbox-blank-outline',
        color: item.isDone ? PRIMARY.DEFAULT : BLACK,
        size: 20,
      };
    
      return (
        <View style={styles.container}>
          <Pressable onPress={() => onToggle(item.id)} hitSlop={10}>
            <MaterialCommunityIcons {...checkboxProps} />
          </Pressable>
    
          <View style={styles.task}>
            <Text style={item.isDone && { color: GRAY.DEFAULT }}>{item.task}</Text>
          </View>
    
          <Pressable onPress={() => onDelete(item.id)} hitSlop={10}>
            <MaterialCommunityIcons
              name="trash-can"
              size={20}
              color={DANGER.DEFAULT}
            />
          </Pressable>
        </View>
      );
    });
    ListItem.displayName = 'ListItem';
    
    ListItem.propTypes = {
      item: PropTypes.object.isRequired,
      onDelete: PropTypes.func.isRequired,
    };
    
    const styles = StyleSheet.create({
      container: {
        marginHorizontal: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        width: 300,
      },
      task: {
        flex: 1,
        marginHorizontal: 10,
      },
    });
    
    export default ListItem;
    ```
    
    ![image](https://github.com/user-attachments/assets/dd0e42d0-b32d-4011-a805-8591664a6ff5)

<br>

# **완료 기능 만들기**

- **마지막으로 완료 기능을 만듦.**
- **완료기능은 ListItem 컴포넌트의 왼쪽 체크박스를 클릭하면 체크 표시가 되도록 만듦.**
- **반대로 표시된 체크박스를 클릭하면 체크가 해제되도록 구현함.**
- **먼저 ListScreen 컴포넌트레 onToggle 함수를 작성함.**
    
    ```jsx
    // src/screen/ListScreen.js
    
    import { Alert, View } from 'react-native';
    import { useSateAreaInsets } from 'react-native-safe-area-context';
    import EmptyList from '../components/EmptyList';
    import List from '../components/List';
    import InputFAB from '../components/InputFAB';
    import { useEffect, useState } from 'react';
    import { nanoid } from 'nanoid';
    import { useAsyncStorage } from '@react-native-async-storage/async-storage';
    
    const ListScreen = ({ navigation, route }) => {
      const { bottom } = useSateAreaInsets();
      const [todos, setTodos] = useState([]);
      const { getItem, setItem } = useAsyncStorage('todos');
    
      const save = async (data) => {
        try {
          await setItem(JSON.stringify(data));
          setTodos(data);
        } catch (e) {
          Alert.alert('저장하기 실패', '데이터 저장에 실패했습니다.');
        }
      };
    
      const load = async () => {
        try {
          const data = await getItem();
          const todos = JSON.parse(data || '[]');
          setTodos(todos);
        } catch (e) {
          Alert.alert('불러오기 실패', '데이터 불러오기에 실패했습니다.');
        }
      };
    
      useEffect(() => {
        load();
      }, []);
    
      const onInsert = (task) => {
        const id = nanoid();
        const newTodos = [{ id, task, isDone: false }, ...todos];
        save(newTodos);
      };
    
      const onDelete = (id) => {
        const newTodos = todos.filter((item) => item.id !== id);
        save(newTodos);
      };
    
      const onToggle = (id) => {
        const newTodos = todos.map((item) =>
          item.id === id ? { ...item, isDone: !item.isDone } : item
        );
    
        save(newTodos);
      };
    
      return (
        <View style={{ flex: 1, paddingBottom: bottom }}>
          {todos.length ? (
            <List
              data={todos}
              onDelete={onDelete}
              onToggle={onToggle}
              />) : (
            <EmptyList />
          )}
          <InputFAB onInsert={onInsert} />
        </View>
      );
    };
    
    export default ListScreen;
    ```
    
    ```jsx
    // src/component/List.js
    
    import { FlatList, StyleSheet, View } from 'react-native';
    import { GRAY } from '../colors';
    import PropTypes from 'prop-types';
    import ListItem from './ListItem';
    
    const Separator = () => {
      return <View style={styles.separator}></View>;
    };
    
    const List = ({ data, onDelete, onToggle }) => {
      return (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ListItem item={item} onDelete={onDelete} onToggle={onToggle} />
          )}
          windowSize={2}
          ItemSeparatorComponent={Separator}
          ListHeaderComponent={View}
          ListHeaderComponentStyle={{ height: 10 }}
        />
      );
    };
    
    List.propTypes = {
      data: PropTypes.array.isRequired,
      onDelete: PropTypes.func.isRequired,
      onToggle: PropTypes.func.isRequired,
    };
    
    const styles = StyleSheet.create({
      separator: {
        height: 1,
        backgroundColor: GRAY.LIGHT,
        marginVertical: 10,
        marginHorizontal: 10,
        width: 300,
      },
    });
    
    export default List;
    ```
    
    ```jsx
    // src/component/ListItem.js
    
    import { memo } from 'react';
    import { Pressable, StyleSheet, Text, View } from 'react-native';
    import PropTypes from 'prop-types';
    import { MaterialCommunityIcons } from '@expo/vector-icons';
    import { DANGER, BLACK, PRIMARY, GRAY } from '../colors';
    
    const ListItem = memo(({ item, onDelete, onToggle }) => {
      const checkboxProps = {
        name: item.isDone ? 'checkbox-marked' : 'checkbox-blank-outline',
        color: item.isDone ? PRIMARY.DEFAULT : BLACK,
        size: 20,
      };
    
      return (
        <View style={styles.container}>
          <Pressable onPress={() => onToggle(item.id)} hitSlop={10}>
            <MaterialCommunityIcons {...checkboxProps} />
          </Pressable>
    
          <View style={styles.task}>
            <Text style={item.isDone && { color: GRAY.DEFAULT }}>{item.task}</Text>
          </View>
    
          <Pressable onPress={() => onDelete(item.id)} hitSlop={10}>
            <MaterialCommunityIcons
              name="trash-can"
              size={20}
              color={DANGER.DEFAULT}
            />
          </Pressable>
        </View>
      );
    });
    ListItem.displayName = 'ListItem';
    
    ListItem.propTypes = {
      item: PropTypes.object.isRequired,
      onDelete: PropTypes.func.isRequired,
      onToggle: PropTypes.func.isRequired,
    };
    
    const styles = StyleSheet.create({
      container: {
        marginHorizontal: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        width: 300,
      },
      task: {
        flex: 1,
        marginHorizontal: 10,
      },
    });
    
    export default ListItem;
    ```
    
    ![image](https://github.com/user-attachments/assets/6751e1aa-2c4c-4b27-82a8-dd6f1b33a5dd)
