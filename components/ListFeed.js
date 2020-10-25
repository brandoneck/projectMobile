import React, { Component } from 'react';
import { StyleSheet, FlatList, Image, alert, Linking, TouchableHighlight } from 'react-native';
import GetLocation from 'react-native-get-location';
import { getDistance, getPreciseDistance } from 'geolib';
import { Container,View, Body, Right, Button, Icon, Title, Header, Text, Thumbnail, Item, Input, Label, ListItem,Toast,Card,CardItem, List, Fab, Spinner, Left } from 'native-base';
import { Rating, AirbnbRating } from 'react-native-ratings';


export default class ListFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data: [],
        loading: true,
        location: null,
        myLatitude: null,
        myLongitude: null,
        preData: [],
    };
  }

  componentDidMount()
  {
      this.GetLocation();
  }

  GetLocation() {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        // console.log('LOCATIOOOOOOOOON')
        // console.log(location);
        this.setState({myLatitude: location.latitude, myLongitude: location.longitude});
      })
      .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
      });
      this.getInfo();
  }

  getInfo = async () =>{
    this.setState({loading: true});
    var URL ="http://www.mocky.io/v2/5bf3ce193100008900619966";
    fetch(URL,
      {
          method:'GET',
          headers:{
            // 'Authorization': 'Bearer ' + token,
            //'Accept':hs,
            //'api-version':ve       
            // 'Content-Type':hs
          },       
      })
      .then((response) => response.json())
      .then((response) => {

        // console.log(response);
        // console.log('getting location...');
        var preData = response;
        this.setState({ preData: preData, loading: false } , ()=> this.getDist());
        

      })
      .catch((error) => {
        if (data != []) {
          this.setState({ loading: false });
          Toast.show({
            text: 'Something is wrong, please try again.',
            position: 'bottom',
            type: 'danger',
            duration: 5000
          });
        }
      });
  }

  getDist =  () => {

    var preData = this.state.preData;
    for (let i = 0; i < preData.length; i++) {
      for (let j = 0; j < preData.length-1; j++) {

        //Calculando Distancia 1
        var dist1 = getDistance(
          {latitude: this.state.myLatitude, longitude: this.state.myLongitude},
          {latitude: preData[j].Longitude, longitude: preData[j].Latitude},
        );
        preData[j].Distance=  dist1;
        // console.log(dist1+', metters');

        //Calculando Distancia 2
        var dist2 = getDistance(
          {latitude: this.state.myLatitude, longitude: this.state.myLongitude},
          {latitude: preData[j+1].Longitude, longitude: preData[j+1].Latitude},
        );
        preData[j+1].Distance=  dist2
        // console.log(dist2+', metters');        

        //Comparando valores
        if (dist1 > dist2) {
          let aux = preData[j];
          preData[j] = preData[j + 1];
          preData[j + 1] = aux;
          // console.log('intercambiated');
        }
      }
    }
    this.setState({ data: preData, loading: false }
      // ,()=> console.log(this.state.data)
      );
  }

    render() {
        return (

            <Container>
                <View>
                    {/* <Text>List</Text> */}
                    {/* <Text onPress={() => this.getInfo()}> ListFeed </Text> */}
                    <Thumbnail style={styleFeed.banner} source={{ uri: 'https://uploads-ssl.webflow.com/5ea8776659423e1a1c9a7203/5f0dffba2dbadd9a6d367933_ArkusnexusLOGOx_Slogan.png' }} />
                </View>
                {this.state.loading ?
                    <Spinner color='blue' />
                    :
                    null
                }

            <FlatList data={this.state.data} renderItem={({ item, index }) => (
              <TouchableHighlight
                onPress={() => this.props.navigation.navigate('Details', { params: item })}
              >
                <View>
                  <CardItem style={styleFeed.cards}>
                    <View style={styleFeed.column1}>
                      <Thumbnail square large source={{ uri: item.Thumbnail }} />
                    </View>
                    <View style={styleFeed.column2}>
                      <View>
                        {/* <Text>{this.state.data[item]}</Text> */}
                        <Text style={styleFeed.title}>{item.PlaceName}</Text>
                        <Rating
                          type='star'
                          count={5}
                          // onStartRating={item.Rating}
                          onFinishRating={item.Rating}
                          startingValue={item.Rating}
                          readonly={true}
                          imageSize={60}
                          isDisabled={true}
                          fractions={10}
                          imageSize={20}
                          style={{ width: '30%', alignSelf: 'flex-start', paddingLeft: '29%', paddingBottom: 10, paddingTop: 2 }}
                          // showRating
                          onFinishRating={this.ratingCompleted}
                        />
                        {/* <Text>{item.Rating}</Text> */}
                        <Text style={styleFeed.text}>{item.AddressLine1}</Text>
                        <Text style={styleFeed.text}>{item.AddressLine2}</Text>
                      </View>
                    </View>
                    <View style={styleFeed.column3}>
                      <View>
                        <Text style={styleFeed.title}>{(item.Distance*0.000621371).toFixed(1)} mi</Text>
                        {item.IsPetFriendly == true ?
                          <View >
                            <Thumbnail style={styleFeed.logo} source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQJtnvq6HQilkJSkLKBEfDS6sWQPjm3n-GjYg&usqp=CAU' }}></Thumbnail>
                            {/* <Image source={require('./img/ic.svg')} style={styleFeed.logo}></Image> */}
                            <Text style={styleFeed.title}>Pet Friendly</Text>
                          </View>
                          :
                          null
                        }
                      </View>
                    </View>
                  </CardItem>
                </View>
              </TouchableHighlight>
                )}
                    key={item => item.PlaceId}
                    keyExtractor={item => item.PlaceId.toString()}
                />
            </Container>
        );
    }
}
const styleFeed = StyleSheet.create({
    cardMargin:{
      paddingLeft:1,paddingRight:1
    },
    emptyList:{
      alignItems:"center", paddingTop:7
    }, 
    emptyText:{
      color:"red"
    }	,
    cards:{
      borderColor: "#98A0A6", borderWidth: 0.2
    },
    column1:{
      width: '20%'
    },
    column2:{
      width: '50%', paddingLeft: 25
    },
    column3:{
      width: '30%', alignItems: 'flex-end'
    },
    banner: {
      width: 200, height: 30, marginTop:20, marginBottom: 20, alignSelf: 'center'
    },
    title:{
      fontSize: 17,
      color: '#98A0A6',
    },
    text:{
        fontSize: 14,
        color: '#98A0A6',
    },
    distance:{
      fontSize: 16,
      color: '#98A0A6',
      alignSelf: 'flex-end',
      paddingBottom: 3,
    },
    logo: {
      width:50,
      height:50,
      top:0,
      alignSelf: 'center',
    },
  });
