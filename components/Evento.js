import React, { Component } from 'react';
import { View, Button, StyleSheet } from 'react-native';

class Evento extends Component {
  render() {
    return (
      <View style={styles.opcionEvento}>
        <Button
          style={styles.textoBoton}
          title={this.props.title}
          color={this.props.color}
          onPress={this.props.onPress}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  opcionEvento: {
    paddingTop: 20,
  },
  textoBoton: {
    fontFamily: 'Centuary',
  },
});

export default Evento;
