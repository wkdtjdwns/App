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
