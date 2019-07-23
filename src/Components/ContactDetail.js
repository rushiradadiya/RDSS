/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    View, Image
} from 'react-native';
import TopNav from "../CommanComponents/TopNav"
import Orientation from 'react-native-orientation';
import Communications from 'react-native-communications';
const { width } = Dimensions.get('window');
import { StackActions, NavigationActions } from 'react-navigation';
import Constants from '../helper/theamHelper'
import CommanString from '../localize';
import BackGroundImage from "../assets/LOGO.png";


export default class AllComponent extends Component {
    constructor(props) {
        super(props);
        this.state ={
            name:"",
            contactNo1:"",
            contactNo2:""
        }
    }
    componentWillMount(){
        Orientation.lockToPortrait();

        const {navigation} = this.props;
        const  productDetail  = navigation.getParam('contactDetail', 'NO-ID');
        this.setState({
            name:productDetail.name,
            contactNo1:productDetail.contact_no1,
            contactNo2:productDetail.contact_no2
        })
    }
    callPhoneNumber = (phone_number) => {

        Communications.phonecall(phone_number.replace(/[-]/g, '').replace(/[+]/g, '').replace(/ /g, ''),
            true);
    };
    backRoute=()=>{
        this.props.navigation.dispatch(StackActions.pop());

    }
    render() {

        const { name, contactNo1, contactNo2 } = this.state;
        return (
            <View style={styles.container}>
                <View>
                    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                        <Image style={{opacity:0.5,height: width/2, width: width/2, position: 'absolute',top:width/2 }} source={BackGroundImage} />
                    </View>
                <TopNav backAction={this.backRoute}/>
                <View style={{padding:10,justifyContent: "center",alignItems: "center",borderBottomColor: "#dbd9df",borderBottomWidth:1}}>
                    <Text style={{fontSize:Constants.fontSize.medium}}>{name}</Text>
                </View>

                <View
                    style={{
                        width:(width-20),
                        shadowColor: '#dbd9df',
                        shadowOffset: {
                            width: 3,
                            height: 3
                        },
                        shadowRadius: 5,
                        shadowOpacity: 5.0}}
                >{contactNo1&&<Text style={{fontSize:Constants.fontSize.small,margin:10}} numberOfLines={2} onPress={()=>{
                    this.callPhoneNumber(contactNo1)
                }}>{CommanString.mobileNo} : {contactNo1}</Text>}
                    {contactNo2 &&  <Text style={{fontSize:Constants.fontSize.small,margin:10}} numberOfLines={2} onPress={()=>{
                        this.callPhoneNumber(contactNo2)
                    }}>{CommanString.mobileNo}  : {contactNo2}</Text>}

                </View>
                </View>


            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },

    welcome: {
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    menuIcon: {
        fontSize: 28,
        color: "#000",
        marginLeft: 10
    },
    searchField: {
        fontSize: Constants.fontSize.medium,
        color: "black",
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        marginLeft: 5,
        borderRadius: 3,
        borderBottomColor:"black",
        textAlignVertical: 'center',
        width:"100%",borderColor: "gray",
    },
});
