import React, {Component} from 'react';
import {SafeAreaView,StyleSheet,ScrollView,View,Text,StatusBar,} from 'react-native';
import {Root} from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListFeed from './components/ListFeed';
import Details from './components/Details';


const Stack = createStackNavigator();

export default class App extends Component{
  render(){
    return (
      <Root>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{ flex: 1 }}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="ListFeed" component={ListFeed}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Details" component={Details}
              opcions={{ headerShown: false }}
            />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </Root>
    );
  }
}

