import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = async (mail:string, pass:string) => new Promise(async (resolve, reject) => {
  try {
    const res = await axios({method: 'post', url: 'https://private-052d6-testapi4528.apiary-mock.com/authenticate', data: {mail, pass}});
    await AsyncStorage.setItem('userToken',res.data[0].token);
   resolve(res?.data[0]?.personalDetails);
  }
  catch (e){
    reject(e)
  }
});

export const getUserProjectsData = async () => new Promise(async (resolve, reject) => {
  try {

     const token = await AsyncStorage.getItem('userToken');
    const res = await axios.get('https://private-052d6-testapi4528.apiary-mock.com/info', {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
   resolve(res.data);
  }
  catch (e){
    reject(e)
  }
});
