import React, { Component } from 'react';
import { 
    TouchableOpacity,
    Text,
    View,
    StyleSheet,
} 
from "react-native";
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';

export default class DashBoard extends Component {
    constructor(props){
        super(props);
        this.props;
    }

    render(){

        return(
            <View style={styles.container}>
                <TouchableOpacity 
                style={styles.buttonVideo}
                onPress={() => this.props.navigation.navigate('VideoSection')}>
                    <MaterialCommunityIcons name="play" color="#fff" size={100} />
                    <Text style={styles.text}>VIDEO</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style={styles.buttonAudio}
                onPress ={() => this.props.navigation.navigate('AudioSection')}>
                    <MaterialCommunityIcons name="music-note" color="#fff" size={100} />
                    <Text style={styles.text}>AUDIO</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container :{
        flex : 1,
        padding : 20,
    },
    buttonVideo :{
        flex : 0.5,
        backgroundColor : '#02c931',
        justifyContent : 'center',
        alignItems : 'center',
        margin : 25,
        borderRadius : 30
    },
    buttonAudio :{
        flex : 0.5,
        backgroundColor : '#0a1636',
        justifyContent : 'center',
        alignItems : 'center',
        margin : 20,
        borderRadius : 30
    }, 
    text : {
        color : '#fff',
        fontSize : 35,
        fontWeight : 'bold',
        paddingTop : 20
    }
});
