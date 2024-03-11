import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const InputField = ({ value, onChangeText, placeholder, secureTextEntry }) => {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#ddd',
    padding: 12,
    fontSize: 18,
    borderRadius: 12,
  },
});

export default InputField;
