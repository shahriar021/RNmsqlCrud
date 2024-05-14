import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';

const AddScreen = () => {
  const navigation = useNavigation();
  const [user, setUsers] = useState({
    name: '',
    position: '',
    salary: '',
  });
  const handleChange = (text, fieldName) => {
    setUsers(prevState => ({
      ...prevState,
      [fieldName]: text,
    }));
  };

  const handleInset = async () => {
    try {
      const response = await fetch(`http://192.168.0.125:8000/user`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          // You can add more headers if needed
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log('User added successfully:');
      navigation.navigate('Home');
    } catch (err) {
      console.error('Error added user:', err);
    }
  };

  return (
    <View>
      <Text>AddScreen</Text>

      <TextInput
        placeholder="name"
        onChangeText={text => handleChange(text, 'name')}
      />
      <TextInput
        placeholder="position"
        onChangeText={text => handleChange(text, 'position')}
      />
      <TextInput
        placeholder="salary"
        onChangeText={text => handleChange(text, 'salary')}
      />

      <Button onPress={handleInset} title="add" color="green" />
    </View>
  );
};

export default AddScreen;

const styles = StyleSheet.create({});
