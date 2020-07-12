import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  ScrollView,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import Evento from '../components/Evento';

const image = { uri: './assets/papiro-background.jpg' };

class ListadoDeEventos extends Component {
  verificarEvento(numeroDeEvento) {
    this.props.navigation.navigate('Participantes', { numero: numeroDeEvento });
    this.props.mostrar(numeroDeEvento);
  }

  cantPresente(participantes) {
    let result = participantes.filter(
      (participantes) => participantes.presente == true
    );
    return result.length;
  }

  render() {
    const dato = this.props.evento;
    const n = 0;
    return (
      <ImageBackground source={image} style={styles.image}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={{ height: 350, paddingTop: 10 }}>
            <ScrollView
              style={{
                width: 300,
                height: 10,
              }}>
              {dato.length ? (
                dato.map((i) => (
                  <Evento
                    style={styles.textoBoton}
                    title={
                      'Partida ' +
                      i.numeroDeEvento +
                      ' (' +
                      i.participantes.filter(
                        (participantes) => participantes.presente == true
                      ).length +
                      '/' +
                      i.participantes.length +
                      ' Jugadores)'
                    }
                    onPress={() =>
                      this.verificarEvento(i.numeroDeEvento)
                    }></Evento>
                ))
              ) : (
                <Text>No hay eventos.</Text>
              )}
            </ScrollView>
          </View>

          <Button
            title="Agregar una nueva partida"
            onPress={() => this.props.navigation.navigate('Nueva partida')}
          />
        </View>
      </ImageBackground>
    );
  }
}

function mapStateToProps(state) {
  return {
    evento: state.evento,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    mostrar: (numeroDeEvento) =>
      dispatch({ type: 'MOSTRAR', numeroDeEvento: numeroDeEvento }),
  };
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    backgroundColor: '#322',
    paddingBottom: 20,
    padding: 20,
    paddingLeft: 20,
    height: '70%',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ListadoDeEventos);
