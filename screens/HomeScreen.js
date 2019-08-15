
import React,{useEffect,useState} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,Alert,
  View,FlatList, RefreshControl

} from 'react-native';
import { Dimensions } from 'react-native'
import { Searchbar } from 'react-native-paper';
import Slideshow from 'react-native-image-slider-show';
import axios from 'axios';
import Flatproduct from '../components/Flastlistproduct'
import   FlatListHorizontal from '../components/FlatlistHorizontal'
import  Search from '../screens/Search'
import  slider from '../constants/slider'


import Spinner from 'react-native-loading-spinner-overlay';

export default function HomeScreen(props) {
  
  const [search,setSearch]=useState()
  const[indexSlide,setIndexSlide]=useState(0)
  const [product,setProduct]=useState()
  const [category,setCategory]=useState()
  const [ refreshing,setFreshing]=useState(false)
  const [loads,setLoads]=useState(false)
  const [load,setLoad]=useState(true)
  const [categoryLaptop,setCategoryLaptop]=useState()
  const [categoryTablet,setCategoryTablet]=useState()
 

  _onRefresh = () => {
    setFreshing(true)
    getCategory('điện thoại')
    getCategoryLaptop('máy tính')
    getCategoryTablet('máy tính bảng')
    getProducts().then(() => {
    setFreshing(false)
    }).catch((err)=>{
      console.log(err)
    });
  }

  async function  getProducts() {
    const result = await axios(
      'http://192.168.137.1:3000/product/mobile',
    );
    setProduct(result.data);
  }

  async function  getCategory(category) {
    const result = await axios(
      'http://192.168.137.1:3000/product/mobile/search?category='+category,
    )
    setCategory(result.data);
    
   
  }
  async function  getCategoryLaptop(category) {
    const result = await axios(
      'http://192.168.137.1:3000/product/mobile/search?category='+category,
    )
    setCategoryLaptop(result.data);
 
   
  }
  async function  getCategoryTablet(category) {
    const result = await axios(
      'http://192.168.137.1:3000/product/mobile/search?category='+category,
    )
    setCategoryTablet(result.data);
 
   
  }

  useEffect( ()=>{
    let a = setInterval(function(){
      setIndexSlide(indexSlide+1)
      if(indexSlide==2){
        setIndexSlide(0)
      }
    
    },3000)
    return ()=>{clearInterval(a)}

 },[indexSlide])

 useEffect(()=>{
  getProducts().then(()=>{
  setLoads(true)
    })
  getCategory('điện thoại')
  getCategoryLaptop('máy tính')
  getCategoryTablet('máy tính bảng')

 },[])

 setTimeout(() => {
setLoad(false);
}, 2500);

function show(){
  Alert.alert('Chức năng đang được xây dựng')
}
  return (
 <View style={styles.container}>
         <View style={{marginTop:25,alignItems:'center'}}>
      <Searchbar
      style={{width:'90%',}}
        placeholder="Search"
        onChangeText={query => { 
        }}

   onEndEditing={(text)=>{

props.navigation.navigate('Searchproduct',{name:text.nativeEvent.text})


   }}
   
      /> 
      </View>
    <ScrollView refreshControl={ <RefreshControl
      refreshing={refreshing}
      onRefresh={_onRefresh}
    />} style={styles.container}>

<Spinner visible={load}
color='#fff'

overlayColor='#fff'
></Spinner>

      <View style={{marginTop:10}}>
	  <Text style={{ fontWeight:'bold',fontSize:25, marginLeft:170, color:'#65C6FA'}}>Welcome to Trần Gia Hải</Text>
      <Slideshow  
      dataSource={ slider}
     position={indexSlide} 
  //  onPositionChanged={position => setIndexSlide({ position })}
    indicatorSize={10}
    arrowSize={0}
    height={250}
    
    />
      </View>
   
      <View  style={{marginTop:5}}>


      


   
      


      <ScrollView style={{backgroundColor:'#ECB3FA',marginTop:2}}>
      <Text style={{ fontWeight:'bold',fontSize:20,marginLeft:3}}>Sản phẩm</Text>
        <FlatList
          contentContainerStyle={{
          alignSelf:'flex-start',
          backgroundColor:'#ECB3FA'
          
        }}
          data={product}
          horizontal
          renderItem={({item}) => < FlatListHorizontal pr={props} description={item.description} load={loads} name={item.name} price={item.price} url={item.urlimage}/>
        }
          keyExtractor={item => item._id}
        />
<View style={{height:0.4,backgroundColor:'#ccc'}}/>
<View style={{alignItems:'center'}}>
<Text  onPress={()=>show()} style={styles.textviewall}>Xem Tất Cả ></Text>
</View>
      </ScrollView>   

      <ScrollView style={{backgroundColor:'#ECB3FA',marginTop:2}}>
      <Text style={{ fontWeight:'bold',fontSize:20,marginLeft:3}}>Sản phẩm</Text>
        <FlatList
          contentContainerStyle={{
          alignSelf:'flex-start',
          backgroundColor:'#ECB3FA'
          
        }}
          data={product}
          horizontal
          renderItem={({item}) => < FlatListHorizontal pr={props} description={item.description} load={loads} name={item.name} price={item.price} url={item.urlimage}/>
        }
          keyExtractor={item => item._id}
        />
<View style={{height:0.4,backgroundColor:'#ccc'}}/>
<View style={{alignItems:'center'}}>
<Text  onPress={()=>show()} style={styles.textviewall}>Xem Tất Cả ></Text>
</View>
      </ScrollView>   

      <ScrollView style={{backgroundColor:'#ECB3FA',marginTop:2}}>
      <Text style={{ fontWeight:'bold',fontSize:20,marginLeft:3}}>Sản phẩm</Text>
        <FlatList
          contentContainerStyle={{
          alignSelf:'flex-start',
          backgroundColor:'#ECB3FA'
          
        }}
          data={product}
          horizontal
          renderItem={({item}) => < FlatListHorizontal pr={props} description={item.description} load={loads} name={item.name} price={item.price} url={item.urlimage}/>
        }
          keyExtractor={item => item._id}
        />
<View style={{height:0.4,backgroundColor:'#ccc'}}/>
<View style={{alignItems:'center'}}>
<Text  onPress={()=>show()} style={styles.textviewall}>Xem Tất Cả ></Text>
</View>
      </ScrollView>   


      








</View>

    </ScrollView>
    </View>
  );
}

HomeScreen.navigationOptions= {
header:null
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    flexDirection:'column'
  },
  textviewall:{
    color:'blue',
    width:100,margin:10
  }, loadingBackgroundStyle: {
    backgroundColor: 'blue',
  },
  
});
