import * as React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {UserDetails} from "../../types";
import {SCREEN_WIDTH} from '../../constants/constants'

interface Props {
  details?:UserDetails
}
const UserDetailsCard = ({details}:Props) => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row', alignItems:'center', justifyContent: 'space-evenly'}}>
      <Image source={{uri:details.avatar}} style={{height:80, width:80, borderRadius: 50}}/>
      <Text style={styles.titleText}>{details.name}</Text>
      </View>
      <View>
      <Text style={styles.textStyle}>Team: {details.Team}</Text>
      <Text style={styles.textStyle}>Joined At: {details.joinedAt}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom:30,
    height:200,
    width:SCREEN_WIDTH*0.5,
    borderColor:'black',
    borderWidth:1,
    paddingHorizontal:5,
    justifyContent: 'space-evenly',
  },
  titleText:{
    fontSize:25,
      color:'black',
      fontWeight: 'bold',
    width: 50
  },
  textStyle:{
    fontSize:15,
    color:'black'
  }
})
export default  UserDetailsCard ;
