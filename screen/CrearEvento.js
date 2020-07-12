import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { connect } from 'react-redux';
import Evento from '../components/Evento';

class CrearEvento extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entrada: '',
    };
  }

  agregar() {
    const nombre = this.state.entrada;
    if (nombre == '') {
      this.setState({ entrada: '' });
    } else {
      this.props.agregarParticipante(nombre);
      this.setState({ entrada: '' });
    }
  }

  guardar(entrada) {
    if (this.props.persona.length == 0) {
      Alert.alert('Faltan los jugadores');
    } else {
      const dato = this.props.evento;
      this.props.guardarParticipantes();
      this.props.navigation.navigate('Partidas iniciadas');
    }
  }

  cancelar() {
    this.props.cancelarParticipantes();
    this.props.navigation.navigate('Partidas iniciadas');
  }

  render() {
    let dato = this.props.persona;

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View style={styles.image}>
          <Text style={styles.nombre}>Agregar Jugador</Text>

          <TextInput
            autoFocus={true}
            style={styles.input}
            onChangeText={(text) => this.setState({ entrada: text })}
            value={this.state.entrada}
            autoCorrect={false}></TextInput>

          <Button title="Agregar" onPress={() => this.agregar()} />

          <ScrollView style={{ height: 180, textAlign: 'center' }}>
            {dato.length ? (
              dato.map((i) => <Text style={styles.nombre}>{i.nombre}</Text>)
            ) : (
              <Text style={styles.nombre}>No hay Participantes</Text>
            )}
          </ScrollView>

          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <Button title="Guardar" onPress={() => this.guardar()} />
            <Button title="Cancelar" onPress={() => this.cancelar()} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

//esta funcion conecta los estados iniciales con mi componente
function mapStateToProps(state) {
  return {
    evento: state.evento,
    persona: state.persona,
    indice: state.indice,
  };
}

//se encarga de mandar las acciones
function mapDispatchToProps(dispatch) {
  return {
    agregarParticipante: (nombre) =>
      dispatch({ type: 'AGREGAR', nombre: nombre }),
    guardarParticipantes: () => dispatch({ type: 'GUARDAR' }),
    cancelarParticipantes: () => dispatch({ type: 'CANCEL' }),
  };
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#322',
    paddingBottom: 20,
    padding: 20,
    height: '100%',
  },
  input: {
    borderBottomColor: 'pink',
    marginTop: 10,
    marginBottom: 12,
  },
  nombre: {
    marginStart: 20,
    fontSize: 20,
    paddingTop: 8,
    paddingBottom: 6,
    width: 200,
    color: '#fcf787',
    fontFamily: 'Centaury',
    paddingStart: 24,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CrearEvento);
