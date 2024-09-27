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
