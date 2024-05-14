import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await fetch('http://192.168.0.125:8000/user');
        const newData = await data.json();
        setUsers(newData);
        console.log(newData);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  const handleInsert = () => {
    navigation.navigate('Add');
  };

  const handleEdit = async (id, name, position, salary) => {
    navigation.navigate('Update', {
      id: id,
      name: name,
      position: position,
      salary: salary,
    });
  };

  const handleDelete = async id => {
    try {
      const response = await fetch(`http://192.168.0.125:8000/user/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // You can add more headers if needed
        },
      });
      if (response.ok) {
        const newData = users.filter(u => u.id !== id);
        setUsers(newData);
      }

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log('User deleted successfully:', id);
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  return (
    <ScrollView>
      <TouchableOpacity onPress={() => handleInsert()}>
        <View>
          <Text style={{color: 'blue', textAlign: 'center', fontSize: 20}}>
            insert new data
          </Text>
        </View>
      </TouchableOpacity>
      {users &&
        users.map(u => {
          return (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
              key={u.id}>
              <Text>{u.name}</Text>
              <Text>{u.position}</Text>
              <Text>{u.salary}</Text>
              <Button
                title="edit"
                color="green"
                onPress={() => handleEdit(u.id, u.name, u.position, u.salary)}
              />
              <Button
                title="delete"
                color="red"
                onPress={() => handleDelete(u.id)}
              />
            </View>
          );
        })}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
