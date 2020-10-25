import React, { Component } from 'react';
import { StyleSheet, Linking } from 'react-native';
import { Container,View, Text, Spinner, CardItem, Icon, Thumbnail } from 'native-base';
import {getDirections, MapView} from 'react-native-google-maps-directions';
import GetLocation from 'react-native-get-location';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data:[],
        loading: true,
        phone: null,
        site: null,
        params: null,
        regionLoaded: false,
        didmount:false,
        myLatitude: 0,
        myLongitude: 0,
        params: null,
    };
    
  }



  componentDidMount = () => {
    
    const {params} = this.props.route.params; 
    console.log('Hi');
    console.log(params);
    this.setState({data: params, loading:false})
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
  }


  
  render() {
    const region ={
        latitude: this.props.route.params.Latitude,
        longitude: this.props.route.params.Longitude,
    } 
    return (
        <Container>
            

            {this.state.data != [] && this.state.data.length > 3 ?
                <Spinner color='blue' />
                :
                (
                    <View>
                        <CardItem style={styleDetails.cards}>
                            {/* <MapViewDirections
                        origin={{
                            longitude: this.state.myLatitude,
                            latitude: this.state.myLatitude,}}
                        destination={region}
                        apikey={AIzaSyAQvSO9BuP85FUMHe-QNIHnTV7nP-O5mU8}
                        />
                         */}
                        </CardItem>
                        <CardItem style={styleDetails.cards}>
                            {/* <MapViewDirections
                        origin={{
                            longitude: this.state.myLatitude,
                            latitude: this.state.myLatitude,}}
                        destination={region}
                        apikey={AIzaSyAQvSO9BuP85FUMHe-QNIHnTV7nP-O5mU8}
                        />
                         */}

                            <View style={styleDetails.bigColumn}>
                                <Text style={styleDetails.name}>{String(this.state.data.PlaceName)}</Text>
                                <Rating
                                    type='star'
                                    count={5}
                                    // onStartRating={item.Rating}
                                    onFinishRating={this.state.data.Rating}
                                    startingValue={this.state.data.Rating}
                                    readonly={true}
                                    imageSize={60}
                                    isDisabled={true}
                                    fractions={10}
                                    imageSize={20}
                                    style={{ width: '30%', alignSelf: 'flex-start', paddingLeft: '4%', paddingBottom: 10, paddingTop: 6 }}
                                    // showRating
                                    onFinishRating={this.ratingCompleted}
                                />
                                <Text style={styleDetails.title}>{String(this.state.data.AddressLine1)}</Text>
                                <Text style={styleDetails.title}>{String(this.state.data.AddressLine2)}</Text>
                            </View>
                            <View style={styleDetails.petFriendlyColum}>
                                <Text style={styleDetails.text}>{(this.state.data.Distance*0.000621371).toFixed(1)} mi</Text>
                                <Thumbnail style={styleDetails.logo} source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQJtnvq6HQilkJSkLKBEfDS6sWQPjm3n-GjYg&usqp=CAU' }}></Thumbnail>
                            </View>
                        </CardItem>

                        <CardItem style={styleDetails.cards}>
                            <View style={styleDetails.smallColumn}>
                                <Icon name="arrow-forward-sharp" style={styleDetails.RightLogos}></Icon>
                            </View>
                            <View style={styleDetails.bigColumn}>
                                <Text style={styleDetails.title}>Directions</Text>
                                <Text style={styleDetails.text}>
                                    {((this.state.data.Distance / 1000) / 0.0166666666666667).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} h drive
                                </Text>
                            </View>
                            <View style={styleDetails.smallColumn}>
                                <TouchableHighlight 
                                    // onPress={() => this.redirectToMap() }
                                    >
                                    <Text style={styleDetails.next}>{'>'}</Text>
                                </TouchableHighlight>
                            </View>
                        </CardItem>


                        <CardItem style={styleDetails.cards}>
                            <View style={styleDetails.smallColumn}>
                                <Icon name="arrow-undo-circle-outline" style={styleDetails.RightLogos}></Icon>
                            </View>
                            <View style={styleDetails.bigColumn}>
                                <Text style={styleDetails.title}>Call</Text>
                                <Text onPress={() => { Linking.openURL('tel:' + this.state.data.PhoneNumber); }}
                                    style={styleDetails.textParams}>
                                    {String(this.state.data.PhoneNumber)}
                                </Text>
                            </View>
                            <View style={styleDetails.smallColumn}>
                                <TouchableHighlight 
                                    onPress={() => { Linking.openURL('tel:' + this.state.data.PhoneNumber) }}>
                                    <Text style={styleDetails.next}>{'>'}</Text>
                                </TouchableHighlight>
                            </View>
                        </CardItem>


                        <CardItem style={styleDetails.cards}
                            onPress={() => { Linking.openURL(this.state.data.Site); }}>
                            <View style={styleDetails.smallColumn}>
                                <Thumbnail square style={styleDetails.chainLogo} source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTs7RG8EpqwUZl6RDzLvPfRF3lc7l8PL-cH3w&usqp=CAU' }}></Thumbnail>
                            </View>
                            <View style={styleDetails.bigColumn}>
                                <Text style={styleDetails.title}>Visit Website</Text>
                                <Text style={styleDetails.textParams}
                                    onPress={() => { Linking.openURL(this.state.data.Site); }}>
                                    {String(this.state.data.Site)}
                                </Text>
                            </View>
                            <View style={styleDetails.smallColumn}>
                                <Text style={styleDetails.next}>{'>'}</Text>
                            </View>
                        </CardItem>
                    </View>
                )
            }

        </Container>
    );
  }
}
const styleDetails = StyleSheet.create({
    title: {
        fontSize: 17,
        color: '#000000',
    },
    text: {
        fontSize: 14,
        color: '#98A0A6',
    },
    cards:{
        borderColor: "#98A0A6", 
        borderWidth: 0.2,  
        // alignContent: 'flex-start',
        alignItems: 'flex-start'
      },
    textParams:{
        fontSize: 14,
        color: '#98A0A6',
        // fontFamily: 'Roboto',   
    },
    name:{
        fontSize: 24,
        color: '#485063',
    },
    bigColumn:{
        flexDirection: 'column',
        width:'80%'
    },
    smallColumn:{
        flexDirection: 'column',
        width:'10%'
    },
    petFriendlyColum:{
        flexDirection: 'column',
        width:'20%'
    },
    logo: {
        width:50,
        height:50,
        top:0,
        alignSelf: 'center',
      },
      logo2: {
        width:30,
        height:30,
        top:0,
        alignSelf: 'flex-end',
      },
      next:{
        fontSize: 30,
        color: '#98A0A6',
        fontFamily: "Times",
        alignSelf:'flex-end'
      },
      RightLogos:{
        fontSize: 30,
        color: '#98A0A6',
        // fontFamily: "Times",
        // alignSelf:'flex-end'
      },
      chainLogo:{
        width:25,
        height:25,
        // alignSelf: 'center',

      }
    
      
});