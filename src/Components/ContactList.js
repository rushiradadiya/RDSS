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
    View,
    FlatList,
    TouchableOpacity,
    Picker,
    TextInput,
    ScrollView,
    TouchableHighlight,
    Button,
    ImageBackground,
    Image
} from 'react-native';
import TopNav from "../CommanComponents/TopNav"
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconI from 'react-native-vector-icons/Ionicons';
import Orientation from 'react-native-orientation';
import Data from '../Data'
import CommanString from './localization';
import {NavigationActions, StackActions} from "react-navigation";
import Modal from "react-native-modal";
import stringsoflanguages from '../localize';
import Constant from '../helper/theamHelper'
const { width } = Dimensions.get('window');
import BackGroundImage from '../assets/LOGO.png'


let valueData = [];

export default class AllComponent extends Component {
    constructor(props) {
        super(props);
        this.state ={
            isPicker:false,
            isSearch: false,
            searchData:"",
            fav:"",
            localizeString: "",
            selectedSurname :[]
        }
        stringsoflanguages.setContent("gu");
    }
    componentWillMount(){
        Orientation.lockToPortrait();
        this.setState({
            fav:stringsoflanguages.radadiya,
            selectedData:Data.radadiya || [],
            selectedSurname:Data.radadiya || [],
            localizeString : CommanString.radadiya || {}
        });
    }
    renderRow = (item,index) => {
        return (
            <TouchableOpacity key={index} onPress={()=>{
                const {navigate} = this.props.navigation;
                navigate('ContactDetail',{contactDetail: item.item});
            }}
                              style={styles.rowItem}>
                <Text style={{fontSize:Constant.fontSize.large}} numberOfLines={2}>{item.item.name}</Text>
            </TouchableOpacity>
        );
    };
    renderEmpty = () => {
        return( <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Text style={{fontSize:Constant.fontSize.small,color:'#bfbfbf',paddingTop: 30}}>
                {"No Contacts Found"}
            </Text>
        </View>)
    };
    onTextChange (text) {
        this.setState({selectedData:[]});
        switch (text) {
            case "radadiya":
                this.setState({
                    fav:stringsoflanguages.radadiya,
                    isPicker: false,
                    selectedData:Data.radadiya || [],
                    selectedSurname:Data.radadiya || [],
                    localizeString : (CommanString.radadiya)|| {}});

                break;
            case "shingala":
                this.setState({
                    fav:stringsoflanguages.Shingala,
                    isPicker: false,
                    selectedData:Data.shingala || [],
                    selectedSurname:Data.shingala || [],
                    localizeString : (CommanString.Shingala) || {}});

                break;
            case "sojitra":
                this.setState({
                    fav:stringsoflanguages.sojitra,
                    isPicker: false,
                    selectedData:Data.sojitra || [],
                    selectedSurname:Data.sojitra || [],
                    localizeString : (CommanString.sojitra) || {}});

                break;
            case "dhankecha":
                this.setState({
                    fav:stringsoflanguages.Dhankecha,
                    isPicker: false,
                    selectedData:Data.dhankecha || [],
                    selectedSurname:Data.dhankecha || [],
                    localizeString : (CommanString.dhakecha) || {}});
                break;
            default:
                break;
        }
    }
    searchContact(searchData){
        const {selectedSurname} = this.state;
        selectedSurname.map((data,index)=>{

            if(data.name.search(searchData) != -1)
            {
                valueData.push(data)
            }
        });
        return valueData || []
    }
    backRoute=()=>{
        const {fav} = this.state;
        let currentSurname = "radadiya";
        if (fav === stringsoflanguages.radadiya){
            currentSurname = "radadiya";
        }
        else if(fav === stringsoflanguages.Dhankecha){
            currentSurname = "dhankecha";
        }
        else if(fav === stringsoflanguages.Shingala){
            currentSurname = "shingala";
        }
        else if(fav === stringsoflanguages.sojitra){
            currentSurname = "sojitra";
        }
        this.onTextChange (currentSurname);
        this.setState({
            isSearch:false
        })


    }
    save=()=>{
        const {searchData,localizeString,selectedData} = this.state;
        let searchValue = [];
        valueData=[];
        if (searchData==="")
        {
            this.setState({selectedData:Data.radadiya,
                isSearch:false})
        }
        else
        {
            searchValue =  this.searchContact(searchData);
            if(searchValue.length>=0){
                Object.entries(localizeString).map((data,index)=>{
                    if(data[0].toLowerCase().search(searchData)!=-1){

                        searchValue = this.searchContact(data[1])
                    }
                })
            }
            this.setState({

                selectedData : searchValue || []
            })
        }

    }
    render() {

        const { selectedData,isSearch , fav} = this.state;
        let Surname = fav + " (" + selectedData.length + ")";
        return (
            <View style={styles.container}>
                {isSearch ?  <TopNav backAction={this.backRoute}/> : <TopNav/>
                }
                <View style={styles.surnameView}>
                    <View style={styles.textInputView}>
                        <View style={{flex:1,marginRight:8}}>
                            {isSearch ?
                                <TextInput
                                    ref={ref => this._search = ref}
                                    style={styles.searchField}
                                    placeholder={`Search...`}
                                    placeholderTextColor={"gray"}
                                    value={this.state.searchData}
                                    underlineColorAndroid={'transparent'}
                                    returnKeyType={'search'}
                                    multiline={false}
                                    autoCapitalize={'none'}
                                    autoCorrect={false}
                                    clearButtonMode={'while-editing'}
                                    autoFocus={true}
                                    onChangeText={(text)=>this.setState({searchData:text})}
                                    onSubmitEditing={()=>{
                                       this.save()
                                    }}
                                />:
                                <Text style={{fontSize:Constant.fontSize.large,fontWeight:'bold'}} onPress={()=>{
                                    this.setState({
                                        isPicker: !this.state.isPicker
                                    })
                                }}>{Surname}</Text>

                            }
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity
                                style={{marginRight:5}} onPress={()=>{
                                if (this._search){ this._search.focus()}
                                if (this.state.isSearch){
                                    this.save()}
                                this.setState({
                                    isSearch: true
                                })
                            }}>
                                <Icon name={'search'} size={25}/></TouchableOpacity>
                        </View>
                    </View>
                </View>
                {!isSearch && <View style={{flex:1,alignItems:"center"}}>
                    <Image style={{opacity:0.5,height: width/2, width: width/2, position: 'absolute',top:width/3 }} source={BackGroundImage} />
                </View>}
                <ScrollView >
                    <FlatList
                        data={selectedData.sort()}
                        renderItem={this.renderRow}
                        keyExtractor={(item,index)=> index.toString()}
                        removeClippedSubviews={false}
                        enableEmptySections={true}
                        ListEmptyComponent={this.renderEmpty}/>

                </ScrollView>


                    <Modal
                    isVisible={this.state.isPicker}
                    backdropColor="grey"
                    backdropOpacity={0.8}
                    animationIn="zoomInDown"
                    animationOut="zoomOutUp"
                    animationInTiming={600}
                    animationOutTiming={600}
                    backdropTransitionInTiming={600}
                    backdropTransitionOutTiming={600}
                    onBackdropPress={() => this.setState({ isPicker: null })}
                    >
                        <View style={styles.content}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.onTextChange('radadiya')
                                    this.setState({ isPicker: null })}}
                            >
                                <Text style={styles.contentTitle}>{stringsoflanguages.radadiya}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    this.onTextChange('dhankecha')
                                    this.setState({ isPicker: null })}}
                            >
                                <Text style={styles.contentTitle}>{stringsoflanguages.Dhankecha}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    this.onTextChange('shingala')
                                    this.setState({ isPicker: null })}}
                            >
                                <Text style={styles.contentTitle}>{stringsoflanguages.Shingala}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    this.onTextChange('sojitra')
                                    this.setState({ isPicker: null })}}
                            >
                                <Text style={styles.contentTitle}>{stringsoflanguages.sojitra}</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
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
        fontSize: Constant.fontSize.medium,
        color: "black",
        padding:0,
        textAlignVertical: 'center',
        width:"100%",
    },
    pickerItem:{
        backgroundColor:"#ff9a58",bottom:0,height:50
    },
    surnameView:{
        width:"100%",shadowColor: '#dbd9df',
        shadowOffset: {
            width: 3,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 5.0,
        elevation: 5,
    },
    textInputView:{
        justifyContent: "space-between", flexDirection:"row",margin:10,
        padding: 5
    },
    rowItem:{
        borderRadius:5,width:(width-10),margin:5,padding:5  ,backgroundColor: "#e4efef",
        shadowColor: '#dbd9df',
        shadowOffset: {
            width: 3,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 5.0
    },
    content: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    contentTitle: {
        fontSize: 20,
        marginBottom: 12,

    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
    }
});