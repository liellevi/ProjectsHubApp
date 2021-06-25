import * as React from 'react';
import { View, Text , StyleSheet} from 'react-native';
import {ProjectData} from "../../types";
import {SCREEN_WIDTH} from '../../constants/constants'

interface Props {
  details?:ProjectData,
}
const ProjectCard = ({details}:Props) => {
  return (
    <View style={[styles.container,{backgroundColor: details.score<70 ? '#FF655C' : details.score>90 ? '#C0F0C0' :'#D4D4D4' }]}>
      <Text style={[styles.textStyle, {fontWeight: 'bold'}]}>{details.name}</Text>
      <Text style={styles.textStyle}>Score: {details.score}</Text>
      <Text style={styles.textStyle}>Duration: {details.durationInDays}</Text>
      <Text style={styles.textStyle}>Bugs Count: {details.bugsCount}</Text>
      <Text style={styles.textStyle}>{details.madeDadeline ? 'V' : 'X'}</Text>
      <Text style={[styles.textStyle,{fontSize:10}]}>ID: {details.id}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom:15,
    height:120,
    width:SCREEN_WIDTH*0.6,
    borderColor:'black',
    borderWidth:1,
    borderRadius:15,
      paddingHorizontal:5,
    justifyContent: 'space-evenly',
  },
  textStyle:{
    fontSize:13,
    color:'black',
    textAlign:'left'
  }
})
export default  ProjectCard ;
