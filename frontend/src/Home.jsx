import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';



const Home = () => {
 

  const handleInsert = () => {
    alert('hmm');
  };
  return (
    <View>
      <View>
        <Text style={{textAlign: 'center', fontSize: 30}}>Home</Text>

        <Button
          title="insert new data"
          onPress={() => {
            handleInsert;
          }}
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
