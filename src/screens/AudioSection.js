import React, { Component } from 'react';
import { 
    TouchableOpacity,
    Text,
    View,
    StyleSheet,
    FlatList,
    Image
} 
from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import TrackPlayer from 'react-native-track-player';
import Slider from '@react-native-community/slider';
import {audioList} from '../data/AudioList';
import ProgressBar from '../components/ProgressBar';

export default class AudioSection extends Component {
    constructor(props){
        super(props);
        this.props;
        this.state = {
            currentSongTitle : '',
            currentSongUrl : '',
            isPlaying : false,
            counter : 0,
            initialPosition : 0,
        }
        
    }

    togglePlaying = () => {
        this.setState({isPlaying : !this.state.isPlaying})
    }

    playAudio() {
        TrackPlayer.setupPlayer().then(async () => {
            await TrackPlayer.add({
                url: this.state.currentSongUrl,
                title: this.state.currentSongTitle,
            });
            TrackPlayer.play(); 
            this.setState({isPlaying : true});
        });
    }

    resumeAudio () {
        TrackPlayer.play();
    }
    pauseAudio(){
        TrackPlayer.pause();
    }

    currentSong = (item, index) => {
        this.setState({currentSongTitle : item.title})
        this.setState({currentSongUrl : item.url})
        this.setState({counter : this.state.counter = index});
    }


    nextSong(){
        if(this.state.counter < (audioList.length -1))
        {
            TrackPlayer.stop();
            this.setState({counter : this.state.counter +=1});
            this.setState({currentSongTitle : audioList[this.state.counter].title}); 
            this.setState({currentSongUrl : audioList[this.state.counter].url});
            this.playAudio();
        }
        else{
            TrackPlayer.stop();
            this.setState({counter : this.state.counter =0});
            console.log(this.state.counter);
            this.setState({currentSongTitle : audioList[this.state.counter].title}); 
            this.setState({currentSongUrl : audioList[this.state.counter].url});
            console.log(audioList[this.state.counter])
            this.playAudio();
        }
        
    }

    previousSong(){
        if(this.state.counter > 0)
        {
            TrackPlayer.stop();
            this.setState({counter : this.state.counter -=1});
            this.setState({currentSongTitle : audioList[this.state.counter].title}); 
            this.setState({currentSongUrl : audioList[this.state.counter].url});
            this.playAudio();
        }
        else{
            TrackPlayer.stop();
            this.setState({counter : this.state.counter =0});
            this.setState({currentSongTitle : audioList[this.state.counter].title}); 
            this.setState({currentSongUrl : audioList[this.state.counter].url});
            this.playAudio();
        }
        
    }

    componentWillUnmount() {
        TrackPlayer.setupPlayer().then(async () => {
            TrackPlayer.updateOptions({
                stopWithApp: true,
            })
        })
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.playList}>
                    <FlatList 
                        style={styles.playList}
                        keyExtractor = {(item, index) => String(index)}
                        data={audioList}
                        renderItem = {({item, index}) =>{
                            return (
                                <TouchableOpacity style={styles.flatList} 
                                onPress={() => { this.currentSong(item, index); this.playAudio(item, index) }}
                                >
                                    <Image source={item.image} style={styles.image}></Image>
                                    <Text style={styles.text}>{item.title}</Text>
                                </TouchableOpacity>
                            )
                        }}
                        onEndReached={() => null}
                        onEndReachedThreshold={4}
                        />
                </View>
                <View style={styles.miniPlayer}>
                    <View style={styles.miniPlayerTop}>
                        <View style={styles.songDetails}>
                            <Text style={styles.miniPlayertext}>{this.state.currentSongTitle}</Text>
                        </View>
                        <View style={styles.songControls}>
                            <Feather 
                                name="volume-1"
                                color="#d0d2d6" 
                                size={26} 
                            />
                            <Slider
                                style={{width: 80, height: 50}}
                                minimumValue={0}
                                maximumValue={1}
                                value ={0.5}
                                onValueChange = {(value) => TrackPlayer.setVolume(value)}
                                minimumTrackTintColor="#FFFFFF"
                                maximumTrackTintColor="#000000"
                            />
                            <Feather 
                                name="volume-2"
                                color="#d0d2d6" 
                                size={26} 
                            />
                            <Text>   </Text>
                            {!this.state.isPlaying 
                                ? 
                                <Feather 
                                    name="play-circle"
                                    color="white" 
                                    size={35} 
                                    onPress={() => {this.togglePlaying() ;this.state.currentSongUrl != '' ? this.resumeAudio() : null}} 
                                />
                                :
                                <Feather 
                                    name="pause-circle" 
                                    color="white" 
                                    size={35} 
                                    onPress={() => {this.togglePlaying(); this.pauseAudio()}}
                                /> 
                            }         
                        </View>
                    </View>
                    <View style={styles.miniPlayerBottom}>
                        <View style={styles.songControlSlider}>
                            <ProgressBar/>
                        </View>
                        <View style={styles.songControlMove}>
                            <Feather 
                                    name="skip-back" 
                                    color="white" 
                                    size={31} 
                                    onPress={() => this.previousSong()}
                                /> 
                            <Feather 
                                    name="skip-forward" 
                                    color="white" 
                                    size={31} 
                                    onPress={() => this.nextSong()}
                                />    
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        backgroundColor : '#d0d2d6'
    },
    playList : {
        flex : 0.8,
    },
    flatList :{
        flex : 1,
        flexDirection : 'row',
        backgroundColor : '#fff',
        margin : 2,
        padding : 15
    },
    miniPlayer : {
        flex : 0.2,
        backgroundColor : '#0a1636',
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 15
    },
    miniPlayerTop :{
        flex : 0.5,
        flexDirection : 'row',
        justifyContent: "space-between",
        alignItems: "center",
    },
    miniPlayerBottom :{
        flex : 0.5,
        flexDirection : 'row',
        justifyContent: "space-between",
        alignItems: 'center',
    },
    songDetails : {
        flex : 0.45,
        flexDirection : 'row',
        backgroundColor : '#082c52',
    },
    songControls : {
        flex : 0.55,
        justifyContent : 'space-between',
        alignItems : 'center',
        flexDirection : 'row',
        marginLeft : 8
    },
    songControlSlider : {
        flex : 0.75,
        justifyContent : 'space-between',
        alignItems : 'center',
        flexDirection : 'row',
    },
    songControlMove : {
        flex : 0.25,
        justifyContent : 'space-between',
        alignItems : 'center',
        flexDirection : 'row',
    },
    miniPlayertext: {
      color: "white",
      fontSize : 18
    },
    text : {
        color : '#0a1636',
        fontSize : 25,
        fontWeight : 'bold'
    },
    image : {
        height:60,
        width:60,
        marginRight : 20
    }
});
