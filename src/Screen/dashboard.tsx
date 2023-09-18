import {View, Text, StyleSheet, Image, FlatList, Pressable, Button} from 'react-native';
import React, { useEffect, useState } from 'react';

import Modal from 'react-native-modal';

interface Product {
  _id: string; // Asegúrate de tener el campo _id o cambia esto a lo que estés utilizando en tu objeto
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}

const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');


  const fetchProducts = () => {
    try {
      fetch('http://192.168.100.41:3000/products/')
        .then((response) => {
          if (!response.ok) {
            // Si la respuesta no es exitosa, lanza una excepción
            throw new Error('Error al obtener productos');
          }
          return response.json();
        })
        .then((data) => {
          setProducts(data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };
  useEffect(() => {

      fetchProducts();
    });


    const Apartar = () => {
      setIsSuccessModalVisible(true);
      setSuccessMessage('El Producto Fue Apartado Satisfactoriamente');

    }

    const renderItem = ({ item }: { item: Product }) => (
      <View style={styles.card}>
        {/* Verificar si la URL de la imagen es válida */}
        {item.image && item.image !== "" ? (
          <Image source={{ uri: item.image }} style={styles.image} />
        ) : (
          <View style={styles.placeholderImage}>
            <Text>Imagen no disponible</Text>
          </View>
        )}
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>Precio: ${item.price}</Text>
        <Text style={styles.stock}>Stock: {item.stock} unidades</Text>
        <Pressable style={styles.button}  onPress={Apartar} >
            <Text style={styles.text}>Apartar</Text>
          </Pressable>
      </View>
    );
  return (
<View style={styles.container}>
<Modal isVisible={isSuccessModalVisible}>
  <View style={styles.modalContent}>
    <Text style={styles.successText}>{successMessage}</Text>
    <Button title="OK" onPress={() => setIsSuccessModalVisible(false)} />
  </View>
</Modal>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        style={styles.list}

        
      />

    </View>
  );
};

export default Dashboard ;
const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  successText: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    margin: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  FratList : {
    margin:30
  },
  container: {
    flex: 1,
    padding: 16,
  },
  list: {
    flex: 1,
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    backgroundColor: 'white', 
    marginTop: 46,
    zIndex: 0,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  stock: {
    fontSize: 16,
  },
  placeholderImage: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
  },
});
