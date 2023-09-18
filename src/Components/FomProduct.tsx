import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Pressable } from 'react-native';


import {ImagePickerResponse, launchCamera, launchImageLibrary} from 'react-native-image-picker';

import axios from 'axios';

import Modal from 'react-native-modal';


const cloudinaryCloudName = 'dujj3kz6x'; // Reemplaza con tu cloud_name de Cloudinary
const cloudinaryUploadPreset = 'ProductosProin'; // Reemplaza con tu upload preset de Cloudinary

const FormProduct = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [tempUri, settempUri] = useState<string>('')
  const [error, setError] = useState('');
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');


  const showSuccessModal = () => {
    setIsSuccessModalVisible(true);
    setSuccessMessage('El formulario se envió exitosamente.');
    // Restablecer los campos del formulario
    setProductName('');
    setProductDescription('');
    setPrice('');
    setStock('');
    settempUri('');
  };  

  const takePhoto = () => {
    launchCamera(
      {
        mediaType: 'photo',
        quality: 0.5,
      },
      (response) => {
        if (response.didCancel) return;
        if (!response.assets || response.assets.length === 0) return;
        
        const selectedImage = response.assets[0];
        if (selectedImage.uri) {
          settempUri(selectedImage.uri);
        }
      }
    );
  };

  const uploadToCloudinary = async (uri:any) => {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: uri,
        type: 'image/jpg', // Reemplaza según el tipo de archivo que estás subiendo
        name: 'image.jpg',
      });
      formData.append('upload_preset', cloudinaryUploadPreset);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.log('Error uploading image to Cloudinary:', error);
      return null;
    }
  };


  const handleSubmit = async () => {
    if (!productName || !productDescription || !price || !stock || !tempUri) {
      setError('Todos los campos son obligatorios');
      return; // Evitar continuar con el envío si falta información
    }
    const imageUrl = await uploadToCloudinary(tempUri);

    if (imageUrl) {
      try {
        const productData = {
          name: productName,
          description: productDescription,
          price: parseFloat(price), // Cambia parseInt a parseFloat para el precio
          stock: parseInt(stock),
          image: imageUrl, // Usa la URL de la imagen de Cloudinary
        };

        const response = await axios.post(
          'http://192.168.100.41:3000/products/add',
          productData
        );
       
        console.log('Producto agregado con éxito:', response.data);
        showSuccessModal();
      } catch (error) {
        console.log('Error al agregar el producto:', error);
      }
    } else {
      console.log('No se pudo cargar la imagen a Cloudinary.');
      console.log(imageUrl)
    }
    setError('');
  };

  return (
    
    <View>
      <Modal isVisible={isSuccessModalVisible}>
  <View style={styles.modalContent}>
    <Text style={styles.successText}>{successMessage}</Text>
    <Button title="OK" onPress={() => setIsSuccessModalVisible(false)} />
  </View>
</Modal>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      
      <Text>Nombre del producto:</Text>
      <TextInput
        value={productName}
        onChangeText={text => setProductName(text)}
      />

      <Text>Descripción del producto:</Text>
      <TextInput
        value={productDescription}
        onChangeText={text => setProductDescription(text)}
      />

      <Text>Precio:</Text>
      <TextInput
        value={price}
        onChangeText={text => setPrice(text)}
        keyboardType="numeric"
      />

      <Text>Stock:</Text>
      <TextInput
        value={stock}
        onChangeText={text => setStock(text)}
        keyboardType="numeric"
      />
        <Pressable style={styles.button}  onPress={takePhoto} >
            <Text style={styles.text}>Tomar Foto</Text>
          </Pressable>



        <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.text}>Enviar</Text>
          </Pressable>


      {
        (tempUri) && (
          <Image
              source={{uri: tempUri}}
              style={{
                marginTop: 20,
                width: '100%',
                height: 300
              }}
          />
        )
      }
    </View>
  );
};

export default FormProduct;

const styles = StyleSheet.create({
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

  errorText: {
    color: 'red',
    marginTop: 10,
  },
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
});