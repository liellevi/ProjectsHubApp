import * as React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
  text: string,
  action(value: string, value2:boolean): void
}

const SortButton= ({text, action}:Props)=>{
return (
  <TouchableOpacity
    style={styles.buttonStyle}
    onPress={action}
  >
    <Text style={styles.textStyle}>{text}</Text>
  </TouchableOpacity>
)
}

const styles = StyleSheet.create({
  textStyle:{
    color:'white',
    fontSize:15,
    textAlign:'center'
  },
  buttonStyle:{
      marginBottom:16,
    marginHorizontal:7,
      backgroundColor:'black',
      height:50,
      width:100,
      alignItems :'center',
      justifyContent: 'center'
  }
})

export default SortButton;
