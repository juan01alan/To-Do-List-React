
import React, { useRef } from 'react';
import { View,Text, TouchableOpacity, Pressable } from 'react-native';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import { FlatList } from 'react-native';
import { ScrollView } from 'react-native';
import { useMediaQuery } from "@uidotdev/usehooks";
import { useAudioPlayer } from 'expo-audio';

const audioSource2 = require('./assets/interface-button-154180.mp3');
const audioSource1 = require('./assets/mouse-click-153941.mp3');


interface ListaCompras{
  id:number;
  name:string;
  complete:boolean
};

export default function App() {

  const player1 = useAudioPlayer(audioSource1);
  const player2 = useAudioPlayer(audioSource2);

  const PlaySound = (on:number)=>{
    try {
      
    if (on == 1) {
      player1.play();
    } else{
      player2.play();
    }
    } catch (error) {
      console.log(error);
    }
  };
  const isTabletOrMobileDevice = useMediaQuery( "only screen and (max-width: 700px)"  
);

  const [Lista, setLista] = useState<ListaCompras[]>([]);
  const [Item, setItem] = useState("");
  const TextInD = useRef(null);

  const SaveItem = ()=>{

    if (Item.trim()) {
      setLista([...Lista, {id:Lista.length+1, name:Item, complete: false}]);
      PlaySound(1);
      setItem("");
      TextInD.current.clear();
    }
  };

  const ToggleComplete =(id:number)=>{
    const UpdateLista = Lista.map((item)=>{
      if (id=== item.id) {
        //Atualizando a lista de forma dinamica
        if (item.complete) {
          
        setLista(Lista.map(item => (item.id === id ? {...item, complete: false} : item)))
        PlaySound(1);
        } else{
        setLista(Lista.map(item => (item.id === id ? {...item, complete: true} : item)))
        setTimeout(()=>{
          deleteItem(item.id);
        },1000)
        PlaySound(2);}
        //setLista(Lista => Lista.filter(item => item.id !== id));
      }
    });
  };

  const deleteItem =(id:number) =>{
    
    const UpdateLista = Lista.map((item)=>{
    if (id=== item.id) {
      setLista(Lista => Lista.filter(item => item.id !== id));
      PlaySound(2);
    }
  })
  }
  
  return (
    <View style={isTabletOrMobileDevice? styles.mainContentMbl: styles.mainContent }>

<View style={styles.container}>
      <Text style={styles.title}>ToDo List</Text>

      <TextInput ref={TextInD} style={styles.input} placeholderTextColor="9CA3AF" placeholder='Adicione um novo item'
      onChangeText={setItem}
      ></TextInput>

      <TouchableOpacity style={styles.button} onPress={SaveItem}>
        <Text style={styles.textbutton}>Adicionar Item</Text>
      </TouchableOpacity>

<ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={styles.cardContainer}>
{
  Lista.map((item)=>(
    
<View key={item.id} style={item.complete? styles.cardComplet : styles.card}>
        <View  style={styles.infocard}>
        <Pressable onPress={()=>{
          ToggleComplete(item.id)
        }}>
{
  !item.complete? 
<MaterialCommunityIcons style={{cursor:'pointer'}} name="checkbox-blank-outline" size={20} color="#D1D5DB" /> : 
<MaterialCommunityIcons style={{cursor:'pointer'}} name="checkbox-marked-outline" size={20} color="black" />
}
        </Pressable>
        <Text style={styles.textItem}>{item.name}</Text>
        </View>
        <Pressable onPress={()=>{deleteItem(item.id)}}>
        <AntDesign name='delete' size={24} color={item.complete ? 'black' : 'black'}/></Pressable>

      </View>
  ))
}
</ScrollView>

    </View>
    </View>

  );
}

const styles = StyleSheet.create({
  mainContent:{
    flex:1,
    width:640,
    height:'100%',
    justifyContent:'center',
    alignContent:'center',
    marginLeft: 'auto',
    marginRight:'auto',
    alignSelf:'center'
  },mainContentMbl:{
    width:'100%',
    flex:1,
    
    height:'100%',
    justifyContent:'center',
    alignContent:'center',
    marginLeft: 'auto',
    marginRight:'auto',
    alignSelf:'center'
  },
  container: {
    flex:1,
    width:'100%',
    height:'100%',
    alignContent: 'center',
    alignItems:'center',
    paddingHorizontal:30,
    paddingTop:60,
    paddingBottom:10,
    backgroundColor:'#F4F5FB',
  }
  ,
  title:{
    fontSize: 24,
    marginBottom:4,
    color:'#111827',
    fontWeight:'bold'
  },
  input:{
    marginTop:8,
    paddingVertical:20,
    borderWidth:1,
    width:'100%',
    paddingHorizontal:20,
    height:58,
    marginBottom:50,
    borderColor:'D1D5DB',
    borderRadius:12
  },
  button:{
    width:'100%',
    height:44,
    borderWidth:0,
    backgroundColor: '#CA3884',
    borderRadius:12,
    alignItems:'center',
    justifyContent:'center',
    marginBottom:20
  },
  textbutton:{
    color:'#FFF',
    fontSize:16,
    fontWeight:'bold',
  },
  textItem:{
    color:'#374151',
    fontSize:16,
    fontWeight:'semibold',
  },
  card:{
    backgroundColor:'#FFFF',
    height:57,
    width:'100%',
    elevation:15,
    marginBottom:10,
    borderRadius:12,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:20
  },
  infocard:{
    flexDirection:'row',
    gap:10,
    alignItems:'center'
    },
    cardContainer:{
      width:'100%',
      height:'auto'
    },
    cardComplet:{
      height:57,
      width:'100%',
      elevation:15,
      opacity:'60%',
      borderRadius:12,
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      marginTop:10,
      marginBottom:10,
      paddingHorizontal:20,
      backgroundColor: '#a9ffbe'
    }
});