import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TextInput,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    Button,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  
  import axios from 'axios';
  
  
  import { useNavigation } from '@react-navigation/native';
  import { StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
  import { RootStackParamList } from '../../App';
  

  import Modal from 'react-native-modal';

  
  const Login = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [rePass, setRePass] = useState('');
    const [isRegister, setIsRegister] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [userInfo, setUserInfo] = useState(null); 
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [isWarningModalVisible, setIsWarningModalVisible] = useState(false);
    const [warningMessage, setWarningMessage] = useState('');
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Login'>>();
  
    const showSuccessModal = () => {
      setIsSuccessModalVisible(true);
      setSuccessMessage('Se Registro el Usuario Satisfactoriamente');
      setEmail('');
      setPass('');
      setRePass('');
      };  
      const showWarningModal = (message: string) => {
        setIsWarningModalVisible(true);
        setWarningMessage(message);
        setEmail('');
        setPass('');
        setRePass('');
      };
    const handleLogin = async () => {
      try {
        const response = await axios.post('http://192.168.100.41:3000/users/login', {
          email: email,
          password: pass,
        });
        const user = response.data.role;
  
        console.log(user)
        if (user) {
  
          if (user === 'admin') {
  
            navigation.navigate('Adminpanel');
             // Redirige al Dashboard para usuarios
          } else if (user === 'user') {
  
            navigation.navigate('Dashboard');
             // Redirige al Adminpanel para administradores
          }
          
          setIsLogin(true);
        }
    
      } catch (error:any) {
        if (error.response && error.response.status === 401) {
          // El código de estado 409 indica que el correo electrónico ya existe
          showWarningModal('El correo o la Contraseña Son Incorrectas!.');
        } else {
          console.log('Error de registro:', error);
        }
      }
    };
    
    const handleRegister = async () => {
      try {
        const response = await axios.post('http://192.168.100.41:3000/users/register', {
          email: email,
          password: pass,
          role: 'user',
        });
  
        const user = response.data.user;
     

        showSuccessModal();
      } catch (error:any) {
        if (error.response && error.response.status === 409) {
          // El código de estado 409 indica que el correo electrónico ya existe
          showWarningModal('El correo electrónico ya está registrado. Intente otro.');
        } else {
          console.log('Error de registro:', error);
        }
      }
    };
    return (
      <ImageBackground
        source={require('../assets/images/bg-3.png')}
        resizeMode="cover"
        style={styles.container}
      >
  
          <ScrollView style={{flex: 1}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 28,
                color: '#212121',
                marginVertical: 20,
              }}
            >
              {isRegister ? 'Sign in' : 'Login'}
            </Text>
  
            <View style={styles.loginFormContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="email"
                  value={email}
                  onChangeText={val => setEmail(val)}
                  maxLength={100}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                />
              </View>
              <Modal isVisible={isSuccessModalVisible}>
  <View style={styles.modalContent}>
    <Text style={styles.successText}>{successMessage}</Text>
    <Button title="OK" onPress={() => setIsSuccessModalVisible(false)} />
  </View>
</Modal>
<Modal isVisible={isWarningModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.warningText}>{warningMessage}</Text>
          <Button title="OK" onPress={() => setIsWarningModalVisible(false)} />
        </View>
      </Modal>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  autoCapitalize="none"
                  autoComplete="off"
                  maxLength={100}
                  value={pass}
                  onChangeText={val => setPass(val)}
                  secureTextEntry
                />
              </View>
  
              {isRegister && (
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Confirm</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="confirm password"
                    autoCapitalize="none"
                    autoComplete="off"
                    maxLength={100}
                    value={rePass}
                    onChangeText={val => setRePass(val)}
                    secureTextEntry
                  />
                </View>
              )}
            </View>
  
            <View style={{height: 20}} />
  
            <TouchableOpacity
              style={styles.buttonLogin}
              onPress={isRegister ? handleRegister : handleLogin}
            >
              <Text style={styles.buttonText}>
                {isRegister ? 'Sign in' : 'Login'}
              </Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              onPress={() => setIsRegister(!isRegister)}
              style={styles.buttonRegister}
            >
              <Text>{isRegister ? 'Login' : 'Register'}</Text>
            </TouchableOpacity>
          </ScrollView>
        
      </ImageBackground>
    );
  };
  
  export default Login;
  
  const styles = StyleSheet.create({
      container: {
        padding: 20,
        flex: 1,
      },
      warningText: {
        fontSize: 18,
        marginBottom: 20,
      },
      loginFormContainer: {
        width: Dimensions.get('window').width - 40,
      },
    
      inputContainer: {
        marginTop: 8,
        marginBottom: 16,
      },
    
      inputLabel: {
        fontWeight: '500',
        color: '#000000',
        fontSize: 16,
      },
    
      input: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginTop: 8,
        padding: 10,
        borderRadius: 100,
        minHeight: 40,
        color: "black",
        
      },
    
      buttonLogin: {
        height: 40,
        backgroundColor: 'coral',
        width: Dimensions.get('window').width - 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
      },
    
      buttonText: {
        fontWeight: 'bold',
        fontSize: 18,
        textTransform: 'uppercase',
        color: '#fafafa',
      },
    
      buttonRegister: {
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
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