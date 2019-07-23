import React, {Component} from 'react';
import {Dimensions, StyleSheet, Text, View,StatusBar,Platform,TouchableOpacity} from 'react-native';
const { width, height } = Dimensions.get('window');
const isIOS = Platform.OS === 'ios';
export const WINDOW_HEIGHT = height;
export const STATUSBAR_HEIGHT = isIOS ? 20 : StatusBar.currentHeight;
export const NAVBAR_HEIGHT = WINDOW_HEIGHT * 0.066;
import Icon from 'react-native-vector-icons/MaterialIcons';
import Constants from '../helper/theamHelper'
import CommanString from '../localize';


class TopNav extends Component {

    constructor(props)
    {
        super(props);
    }
    render() {
        return (
            <View style={styles.topNav}>
                <StatusBar backgroundColor="#ff7a14" barStyle="light-content" />
                {this.props.backAction &&
                    <TouchableOpacity style={{left: 10,justifyContent:"center"}} onPress={()=>{
                        this.props.backAction()}}>
                    <Icon name={"arrow-back"} size={20} style={{fontSize: Constants.fontSize.large,
                        textAlign: 'center',
                        color: "#ffffff",
                        }}/>
                    </TouchableOpacity>}

                        <View style={{alignItems: "center",left: (width-80)/2,justifyContent: "center"}}>
                    <Text style={styles.welcome}>{CommanString.namavali}</Text></View>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    welcome: {
        fontSize: Constants.fontSize.large,
        textAlign: 'center',
        color: "#ffffff",
        fontWeight:'bold'
    },
    topNav: {
        backgroundColor:'#ff7a14',
        alignItems: 'center',
        flexDirection: 'row',
        ...Platform.select({
            ios: {
                paddingTop: STATUSBAR_HEIGHT,
                height: NAVBAR_HEIGHT + STATUSBAR_HEIGHT + 10,
            },
            android: {
                height: NAVBAR_HEIGHT + 10,
            }
        })
    },
    horizontalView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuIcon: {
        fontSize: 28,
        color: "#ffffff",
        marginLeft: 10
    },
});
export default TopNav;
