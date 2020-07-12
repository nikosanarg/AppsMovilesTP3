import React, { Component } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';

class Participante extends Component {
  render() {
    return (
      <View>
        <Text style={styles.nombre}>{this.props.lista}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  nombre: {
    marginStart: 20,
    fontSize: 20,
    width: 200,
    color: '#fcf787',
    fontFamily: 'Centaury',
  },
});

export default Participante;
