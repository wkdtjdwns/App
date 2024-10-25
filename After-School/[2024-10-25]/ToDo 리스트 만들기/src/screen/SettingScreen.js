import { StyleSheet, View } from 'react-native';

const SettingScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30 }}>Setting Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});

export default SettingScreen;
