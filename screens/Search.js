import React,{useState,useEffect} from 'react';
import { ScrollView,Text, FlatList,StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import axios from 'axios';
import Flatproduct from '../components/Flastlistproduct'


export default function Search(props) {
const[listSearch,setListSearch]=useState()
const [count,setCount]=useState()
async function getSearchProduct(name){
  const result = await axios(
    'http://192.168.137.1:3000/product/mobile/search/nameproduct?name='+name,
  )

  setListSearch(result.data)
  let count=0;
  result.data.forEach(_ => {
    count++
  });
 console.log(count)
 setCount(count)
}
useEffect(()=>{
  var name=props.navigation.getParam('name', 'NO-NAME');
  if(name!=''){
    getSearchProduct(name)
  }else{
    getSearchProduct('    ')
  }
 

},[])


  return (
    <ScrollView style={styles.container}>
     <Text style={{ fontWeight:'bold',fontSize:15,marginLeft:3,marginTop:6}}>Kết quả tìm kiếm có {count} sản phẩm</Text>
<FlatList 
       contentContainerStyle={{
        alignSelf: 'center', 
        marginTop:10
      
    }}
    numColumns={2}
    showsVerticalScrollIndicator={false}
    showsHorizontalScrollIndicator={false}
  data={listSearch}
  renderItem={({item}) =>
  <Flatproduct pr={props} description={item.description} price={item.price} name={item.name} url={item.urlimage}/>

}
  keyExtractor={item => item._id}
/>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
