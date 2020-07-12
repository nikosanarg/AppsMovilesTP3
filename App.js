import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListadoDeEventos from './screen/ListadoDeEventos';
import CrearEvento from './screen/CrearEvento';
import ListadoDeParticipantes from './screen/ListadoDeParticipantes';

const image = { uri: './assets/papiro_background.jpg' };

const initialState = {
  input: '',
  evento: [
    {
      numeroDeEvento: 1,
      participantes: [
        { nombre: 'Ørjan Larsen', presente: true },
        { nombre: 'Darko Dautovic', presente: false },
        { nombre: 'Roberto Jiménez', presente: false },
        { nombre: 'Kai Kallinger', presente: false },
      ],
      
    },
  ],

  persona: [],
  index: 1,
  muestra: [],
};

const reducer = (state = initialState, action) => {
  const { persona, evento } = state;
  let newPersona;
  let data = {};
  let newEvento;
  let dataEvento = {};
  let paramuestra;
  let indicem;
  let nuevosEventos;

  switch (action.type) {
    case 'AGREGAR':
      data = {
        nombre: action.nombre,
        presente: true,
      };
      newPersona = [...persona, data];
      return {
        ...state,
        persona: newPersona,
      };

    case 'GUARDAR':
      dataEvento = {
        participantes: persona,
        numeroDeEvento: state.index + 1,
      };
      newEvento = [...evento, dataEvento];
      return {
        ...state,
        evento: newEvento,
        persona: [],
        index: state.index + 1,
      };

    case 'CANCELAR':
      return {
        ...state,
        persona: [],
      };

    case 'MOSTRAR':
      indicem = action.numeroDeEvento - 1;
      paramuestra = evento[indicem].participantes;
      return {
        ...state,
        muestra: paramuestra,
      };

    case 'CAMBIARP':
      nuevosEventos = [...evento];

      for (var i = 0; i < nuevosEventos.length; i++) {
        if (i == action.numeroEvent - 1) {
          for (var n = 0; n < nuevosEventos[i].participantes.length; n++) {
            if (nuevosEventos[i].participantes[n].nombre == action.nombre) {
              nuevosEventos[i].participantes[n].presente = false;
            }
          }
        }
      }
      return {
        ...state,
        evento: nuevosEventos,
      };

    case 'CAMBIARA':
      nuevosEventos = [...evento];

      for (var r = 0; r < nuevosEventos.length; r++) {
        if (r == action.numeroEvent - 1) {
          for (var m = 0; m < nuevosEventos[r].participantes.length; m++) {
            if (nuevosEventos[r].participantes[m].nombre == action.nombre) {
              nuevosEventos[r].participantes[m].presente = true;
            }
          }
        }
      }
      return {
        ...state,
        evento: nuevosEventos,
      };
  }
  return state;
};

const store = createStore(reducer);
const Stack = createStackNavigator();
const colorHeader = '#fcf787';

function AppStack() {
  return (
      <Stack.Navigator>
        <Stack.Screen
          name="Partidas iniciadas"
          component={ListadoDeEventos}
          options={{
            headerTitleAlign: 'center',
            headerTintColor: '#444',
            headerStyle: { backgroundColor: colorHeader },
          }}
        />
        <Stack.Screen
          name="Nueva partida"
          component={CrearEvento}
          options={{
            headerTitleAlign: 'center',
            headerBackTitle: 'Volver',
            headerTintColor: '#444',
            headerStyle: { backgroundColor: colorHeader },
          }}
        />
        <Stack.Screen
          name="Participantes"
          component={ListadoDeParticipantes}
          options={{
            headerTitleAlign: 'center',
            headerBackTitle: 'Volver',
            headerTintColor: '#444',
            headerStyle: { backgroundColor: colorHeader },
          }}
        />
      </Stack.Navigator>
  );
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <AppStack />
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
