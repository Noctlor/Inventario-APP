import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import React, { useEffect, useState } from 'react';
import Agregar from '../Components/Agregar';

interface Product {
  _id: string; // Asegúrate de tener el campo _id o cambia esto a lo que estés utilizando en tu objeto
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}

const Adminpanel = () => {
  const [products, setProducts] = useState<Product[]>([]);

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


  // Función para renderizar cada elemento de la lista
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
    </View>
  );
  return (
    <View style={styles.container}>
       <Agregar fetchProducts={fetchProducts} />
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        style={styles.list}
      />
    </View>
  );
};
const styles = StyleSheet.create({
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

export default Adminpanel ;