import * as React from 'react';
import {useEffect, useState} from "react";
import { View, StyleSheet, TouchableOpacity , ScrollView, Text} from 'react-native';
import {getUserProjectsData} from "../../services/serverRequests";
import ProjectCard from "../common/ProjectCard";
import UserDetailsCard from "../common/UserDetailsCard";
import _ from 'lodash';
import SortButton from "../common/SortButton";


const UserProfile = ({navigation, route}) => {
  const { personalDetails } = route.params;
  const [projectsData, setProjectsData]= useState<[]>([])

  useEffect(()=>{
  getUserData();
  },[])

  const sortBy=(item:string, orderByMin:boolean)=>{
    const sortedArray = _.sortBy(projectsData, [ item], ['asc']);
    setProjectsData(orderByMin ? sortedArray:  sortedArray.reverse())
  }
  const getUserData = async () => {
    try{
      const projects:any = await getUserProjectsData()
      setProjectsData(projects);
    }
    catch (e){
      setProjectsData([])
    }
  }
const renderProjectContent=()=>{
    if (projectsData?.length>1){
      return projectsData.map((item, index) => {
        return (
          <ProjectCard details={item}/>
        );
      });
    }
    return <Text style={styles.noProjectMarkTitle}>There are no projects to display.</Text>
}

const renderLogoutButton =()=>{
    return (
      <TouchableOpacity onPress={()=>navigation.navigate('LoginPage')}>
      <View style={styles.logOutButtonStyle}>
            <Text style={{ color:'white', fontSize:20, textAlign:'center'}}>Logout</Text>
      </View>
      </TouchableOpacity>
    )
}
  const renderSortButtons =()=>{
    return (
      <View style={{alignItems:'center'}}>
      <Text style={styles.titleStyle}>Sort Projects By:</Text>
      <View style={{flexDirection:'row'}}>
        <View>
        <SortButton text='Max Score'  action={()=>sortBy('score', false)} />
        <SortButton text='Min Score'  action={()=>sortBy('score', true)} />
        </View>
        <View>
        <SortButton text='Max Bugs'  action={()=>sortBy('bugsCount', false)} />
          <SortButton text='Min Bugs'  action={()=>sortBy('bugsCount', true)} />
      </View>
      </View>
      </View>
    )
  }
  return (
    <ScrollView  contentContainerStyle={styles.container}>
      <UserDetailsCard details={personalDetails}/>
      {renderSortButtons()}
      {renderProjectContent()}
      {renderLogoutButton()}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingVertical:100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleStyle:{
    fontSize:16,
    color:'black',
    marginBottom:10,
    fontWeight: 'bold',
    textAlign: 'right'
  },
  noProjectMarkTitle:{
    color:'black',
    fontSize:15,
    textAlign:'center'
  },
  logOutButtonStyle:{
    backgroundColor:'black',
    height:50,
    width:100,
    alignItems :'center',
    justifyContent: 'center'
  },
  sortButton:{
    marginBottom:16,
    backgroundColor:'black',
    height:50,
    width:100,
    alignItems :'center',
    justifyContent: 'center'
  }
});

export default UserProfile;
