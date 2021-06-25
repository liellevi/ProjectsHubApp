import * as React from 'react';
import {useState,useEffect} from "react";
import { useIsFocused } from '@react-navigation/native'
import { View, StyleSheet, Text , ActivityIndicator, TouchableOpacity} from 'react-native';
import Input from "../common/Input";
import { login} from "../../services/serverRequests";

const LoginPage = ({navigation}) => {

  const isFocused = useIsFocused();
  const [mail, setMail] =useState<string>('')
  const [password, setPassword] =useState<string>('')
  const [onSubmitPressed, setOnSubmitPressed] =useState<boolean>(false)

  useEffect(()=>{
    setMail('');
    setPassword('')
    setOnSubmitPressed(false)
  },[isFocused])

  const onSubmit = async () => {
    if(validateEmail(mail) &&validatePassword(password)){
      setOnSubmitPressed(true)
      try{
       const personalDetails = await login(mail, password);
        navigation.navigate('UserProfile',{personalDetails})

      }
      catch (e){
        setOnSubmitPressed(false)
      }
    }
  };
  const  validateEmail=(email:string)=>{
    const regexMailRule = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexMailRule.test(email);
  }
  const  validatePassword=(password:string)=>{
    return !(!/^[a-zA-Z0-9]+$/.test(password) || password.length<8);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>LOGIN</Text>
      <Text style={[styles.title,{ fontSize:15}]}>Please enter your e-mail and password:</Text>
                <View >
                  <Text style={[styles.title,{ fontSize:12}]}>{mail && 'e-mail'}</Text>
                  <Input
                    value={mail}
                    placeholder='e-mail'
                    onChangeText={(value)=>setMail(value)}
                    inputStyles={styles.inputStyle}
                    isError={!validateEmail(mail) && mail.length>0 }
                    errorText='Invalid e-mail Address'
                    errorTextStyles={styles.errorStyle}
                  />
                  <Text style={[styles.title,{ fontSize:12}]}>{password ? 'Password': ''}</Text>
                  <Input
                    value={password}
                    placeholder='Password'
                    onChangeText={(value)=>setPassword(value)}
                    inputStyles={styles.inputStyle}
                    secureTextEntry
                    isError={!validatePassword(password) &&  password.length>0}
                    errorText='Invalid Password'
                    errorTextStyles={styles.errorStyle}
                    onSubmitEditing={onSubmit}
                  />
                </View>
      <View style={styles.loginButtonStyle}>
      <TouchableOpacity onPress={onSubmit}>
        {onSubmitPressed ? (<ActivityIndicator size="small" color='white' />) :
          ( <Text style={{ color:'white', fontSize:20, textAlign:'center'}}>Login</Text>)}
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  title:{
    color:'black',
    fontSize:30,
    fontWeight: 'bold',
  },
  image: {
    height: 70,
    width: 70,
    marginBottom: 15
  },
  titleTextStyle: {
    fontFamily: 'OpenSansHebrew-Bold',
    color: 'black',
    fontSize: 18,
    textAlign: 'center'
  },
  contentTextStyle: {
    textAlign: 'center',
    paddingTop: 5,
    fontSize: 15
  },
  inputStyle: {
    borderWidth: 2,
    height: 50,
    color:'black',
    borderColor: 'black',
    borderBottomColor: 'black',
    width: 250,
    paddingHorizontal: 5,
    textAlign: 'left'
  },
  errorStyle: {
    fontSize: 10,
    color: 'red',
    alignSelf: 'flex-start'
  },
  fieldTitle: {
  },
  loginButtonStyle:{
    backgroundColor:'black',
    height:50,
    width:200,
    alignItems :'center',
    justifyContent: 'center'
  }
});
export default LoginPage;
