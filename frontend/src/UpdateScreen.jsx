import React, {useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

const UpdateScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    id,
    name: initialName,
    position: initialPosition,
    salary: initialSalary,
  } = route.params;

  const [user, setUser] = useState({
    name: initialName,
    position: initialPosition,
    salary: initialSalary,
  });
  console.log(initialSalary);

  const handleChange = (value, fieldName) => {
    setUser(prev => ({...prev, [fieldName]: value}));
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://192.168.0.125:8000/user/${id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log('User updated successfully');
      navigation.navigate('Home');
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Update User</Text>
      <Text>ID: {id}</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={user.name}
        onChangeText={value => handleChange(value, 'name')}
      />
      <TextInput
        style={styles.input}
        placeholder="Position"
        value={user.position}
        onChangeText={value => handleChange(value, 'position')}
      />
      <TextInput
        style={styles.input}
        placeholder="Salary"
        value={user.salary.toString()}
        onChangeText={value => handleChange(value, 'salary')}
      />

      <Button onPress={handleUpdate} title="Update" color="green" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
});

export default UpdateScreen;
