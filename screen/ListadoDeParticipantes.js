import React, { Component } from 'react';
import {
  Button,
  View,
  Text,
  Switch,
  StyleSheet,
  Vibration,
  ScrollView,
} from 'react-native';
import Participante from '../components/Participante';
import { connect } from 'react-redux';

class Participantes extends Component {
  presente(numeroEvent, nombre, valor, decision) {
    if (decision == true) {
      this.props.cambiarPresente(numeroEvent, nombre);
      Vibration.vibrate();
    } else {
      this.props.cambiarAusente(numeroEvent, nombre);
      Vibration.vibrate();
    }
  }

  render() {
    const dato = this.props.muestra;
    let numeroEvent = this.props.route.params?.numero;

    return (
      <ScrollView style={styles.image}>
        {dato.length ? (
          dato.map((i) => (
            <View style={styles.buttonContainer}>
              <Participante lista={i.nombre}></Participante>
              <Switch
                trackColor={{ true: 'green', false: 'red' }}
                thumbColor={i.presente ? ' #38A3C7' : ' #38A3C7'}
                onValueChange={(value) =>
                  this.presente(numeroEvent, i.nombre, value, i.presente)
                }
                value={i.presente}
              />
            </View>
          ))
        ) : (
          <Text></Text>
        )}
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    evento: state.evento,
    muestra: state.muestra,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    cambiarPresente: (numeroEvent, nombre) =>
      dispatch({ type: 'CAMBIARP', numeroEvent: numeroEvent, nombre: nombre }),
    cambiarAusente: (numeroEvent, nombre) =>
      dispatch({ type: 'CAMBIARA', numeroEvent: numeroEvent, nombre: nombre }),
  };
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    borderRadius: 0,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    backgroundColor: '#322',
    paddingBottom: 20,
    padding: 20,
    paddingLeft: 20,
    height: '100%',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Participantes);
