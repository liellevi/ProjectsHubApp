import * as React from 'react';
import { View, Text, TextInput } from 'react-native';

interface Props {
  value: string,
  isError: boolean,
  inputStyles: any,
  errorTextStyles: any,
  errorText: string,
  secureTextEntry?:boolean,
  placeholder?:string,
  onChangeText?(value: string): void,
  onSubmitEditing?():void
}

const Input = ({placeholder, value, isError, inputStyles, errorText, errorTextStyles, onChangeText, secureTextEntry, onSubmitEditing }:Props) => {
  return (
    <View>
      <TextInput
        value={value}
        placeholder={placeholder}
        style={inputStyles}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
      />
      <Text style={errorTextStyles} numberOfLines={1}>
        {isError ? errorText : '   '}
      </Text>
    </View>
  );
};

export default  Input ;
