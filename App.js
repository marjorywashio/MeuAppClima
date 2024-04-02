import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import React from 'react';
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo, Feather, EvilIcons } from '@expo/vector-icons';
import { getClima } from './api/ApiKey';


export default function App() {

  const [dadosClima, setDadosClima] = useState(null);
  const [horaAtual, setHoraAtual] = useState('');  
  const [cidade, setCidade] = useState("");

  function convertKC(kelvin){
    return parseInt(kelvin - 273)
  }

  useEffect(() => {
    // Função para buscar dados do clima
    const buscarDadosClima = async () => {
      try {
        const dados = await getClima(cidade); 
        setDadosClima(dados);
      } catch (error) {
        console.error('Erro ao buscar dados do clima:', error);
      }
    };

    // Função para atualizar a hora atual
    const atualizarHoraAtual = () => {
      const date = new Date();
      const horas = date.getHours();
      const minutos = date.getMinutes();
      const horaFormatada = `${horas}:${minutos < 10 ? '0' + minutos : minutos}`;
      setHoraAtual(horaFormatada);
    };

    buscarDadosClima();

    // Atualizar a hora atual a cada minuto
    const intervalId = setInterval(atualizarHoraAtual, 60);

    return () => clearInterval(intervalId);
    
  }, [cidade]);



  const styles = StyleSheet.create({
    container:{
      width: '100%',
      height: '100%',
      alignItems: 'center',
    },
    titulo:{
      padding: 10,
      marginTop: 35,
      fontSize: 25,
      color: 'white',
    },
    input:{
      borderColor: 'white',
      flexDirection: 'row',
      borderRadius: 5,
      fontSize: 17,
      color: 'white',
    },
    cidade:{
      borderColor: 'white',
      height: 50,
      borderWidth: 0.5,
      width: 300,
      padding: 10,
      marginTop: 20,
      flexDirection: 'row',
      gap: 8,
      borderRadius: 5
    },
    temperatura:{
      margin: 30,
      alignItems: 'center',
      padding: 20,
      gap: 20,
      height: 360,
      justifyContent: 'space-around',
    },
    temperaturaNumero:{
      color: 'white',
      fontSize: 55,
    },
    temperaturaTexto:{
      color: 'white',
      fontSize: 25,
    },
    temperaturaHora:{
      color: 'white',
      fontSize: 20,
    },
    info:{
      borderColor: 'white',
      height: 160,
      borderWidth: 0.3,
      width: 300,
      padding: 10,
      marginTop: 5,
      flexDirection: 'column',
      gap: 8,
      borderRadius: 5,
      justifyContent: 'space-around',
    },
    texto:{
      color: 'white',
    },
    refresh:{
      marginTop: 25,
    }

  })

  return (
    <LinearGradient colors={['#1818AC', '#0C0D5F', '#1A1333']} style={styles.container}>

      <Text style={styles.titulo}>
        MeuApp CliMa
      </Text>

      <View style={styles.cidade}>
        <Entypo name="location" size={24} color="white" />
        <TextInput 
          style={styles.input} 
          placeholder="Digite a cidade aqui..." 
          placeholderTextColor="white"
          value = {cidade}
          onChangeText={(value) => setCidade(value)}/>
      </View>

      <View style={styles.temperatura}>
        <Feather style={styles.icone} name="sun" size={80} color="white" />
        {dadosClima && (
          <>
            <Text style={styles.temperaturaNumero}>{convertKC(dadosClima.main.temp)} ºC</Text>
            <Text style={styles.temperaturaTexto}>{dadosClima.name}</Text>
            <Text style={styles.temperaturaHora}>{horaAtual}</Text>
          </>
          )
        }
      </View>

      <View style={styles.info}>
        {dadosClima && (
          <>
            <Text style={styles.texto}>Sensação térmica:  {convertKC(dadosClima.main.feels_like)} °C</Text>
            <Text style={styles.texto}>Temperatura mínima:  {convertKC(dadosClima.main.temp_min)} °C</Text>
            <Text style={styles.texto}>Temperatura máxima:  {convertKC(dadosClima.main.temp_max)}  °C</Text>
            <Text style={styles.texto}>Umidade relativa do ar:  {dadosClima.main.humidity} %</Text>
            <Text style={styles.texto}>Velocidade do vento:  {dadosClima.wind.speed} Km/h </Text>
          </>
        )}
      </View>

    </LinearGradient>
  );
}


