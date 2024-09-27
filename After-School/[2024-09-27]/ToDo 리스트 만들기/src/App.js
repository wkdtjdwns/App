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
