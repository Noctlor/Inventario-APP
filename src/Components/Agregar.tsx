import {View, Text, TouchableOpacity, Button, StyleSheet, SafeAreaView, Dimensions} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App'; // O la ruta de tu archivo

type FormProductNavigationProp = StackNavigationProp<
  RootStackParamList,
  'FormProduct'  // Puedes poner cualquier ruta aquí, ya que no importa en este contexto.
>;
interface AgregarProps {
    fetchProducts: () => void; // Prop para llamar a la función fetchProducts
  }
const Agregar = ({ fetchProducts }: AgregarProps) => {
    
    const navigation = useNavigation<FormProductNavigationProp>();

    const handleProductoAgregado = () => {
        // Llama a fetchProducts después de agregar un producto
        fetchProducts();
      };
  return (
    <TouchableOpacity
    style={styles.buttonLogin}
    onPress={() => navigation.navigate("FormProduct")}
  >
    <Text style={styles.buttonText}>
      Agregar
    </Text>
  </TouchableOpacity>


  );
};

const styles = StyleSheet.create({
    buttonLogin: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: 'black',
      margin: 10,
        position: 'absolute', // Posiciona absolutamente el botón en la pantalla
        top: 10, // Mover el botón un poco hacia abajo desde la parte superior de la pantalla
        right: 10, // Mover el botón un poco hacia la izquierda desde el borde derecho de la pantalla
        zIndex: 2,
    },
    
      buttonText: {
        fontWeight: 'bold',
        fontSize: 18,
        textTransform: 'uppercase',
        color: '#fafafa',
      },
  });
  
export default Agregar ;