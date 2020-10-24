import React, { Component } from 'react';
import { StyleSheet, Linking } from 'react-native';
import { Container,View, Text, Spinner, CardItem, Icon } from 'native-base';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'

export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data:[],
        loading: true,
        phone: null,
        site: null,
        params: null,
    };
  }
  
  componentDidMount = async () =>{

    const params = this.props.route.params; ()=> console.log(this.state.params);
    this.setState({loading:true})
  }

  render() {
    return (
        <Container>
            <View>
                <CardItem style={styleDetails.cards}>
                    {/* <MapView
                    provider={{PROVIDER_GOOGLE}}
                    region={{
                        latitude: this.props.route.params.Latitude,
                        longitude: this.props.route.params.Longitude,
                    }}
                    showsUserLocation
                    /> */}

                </CardItem>
         
                <CardItem style={styleDetails.cards}>
                    <Text style={styleDetails.title}>Directions</Text>
                    <Text style={styleDetails.text}>{this.props.route.params.AddressLine1}</Text>
                    <Text style={styleDetails.text}>{this.props.route.params.AddressLine2}</Text>
                    <Icon iconLeft></Icon>
                </CardItem>
                <CardItem style={styleDetails.cards}>
                    <Text>Call</Text>
                    <Text onPress={() => { Linking.openURL('tel:' + this.props.route.params.PhoneNumber); }}>
                        {this.props.route.params.PhoneNumber}
                    </Text>
                    <Icon iconLeft
                        onPress={() => { Linking.openURL('tel:' + this.props.route.params.PhoneNumber) }}>
                    </Icon>
                </CardItem>
                <CardItem style={styleDetails.cards}>
                    <Text>Visit Website</Text>
                    <Text style={styleDetails.text}
                        onPress={() => { Linking.openURL(this.props.route.params.Site); }}>
                        {this.props.route.params.Site}
                    </Text>
                </CardItem>

            </View>
        </Container>
    );
  }
}
const styleDetails = StyleSheet.create({
    title: {
        fontSize: 17,
        color: '#98A0A6',
    },
    BodyHeader: {
        width: "60%",
    },
    HeaderEnds: {
        paddingRight: "20%",
    },
    iconHeader: {
        color: "#3282E3"
    },
    text: {
        fontSize: 20,
        color: '#98A0A6',
    },
    cards:{
        borderColor: "#98A0A6", borderWidth: 0.2, alignContent:'center'
      },
});