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
import Slider from '@react-native-community/slider';
import Video from 'react-native-video';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import {videoList} from '../data/VideoList';

export default class VideoSection extends Component {
    constructor(props){
        super(props);
        this.props;
        this.state = {
            currentTime: 0,
            duration: 0,
            isFullScreen: false,
            isLoading: true,
            paused: false,
            playerState: PLAYER_STATES.PLAYING,
            screenType: 'cover',
            currentVideo : videoList[0].url ,
        }
    }

    onSeek = seek => {
        this.videoPlayer.seek(seek);
    };

    onPaused = playerState => {
        this.setState({
            paused: !this.state.paused,
            playerState,
        });
    };

    onReplay = () => {
        this.setState({ playerState: PLAYER_STATES.PLAYING });
        this.videoPlayer.seek(0);
    };

    onProgress = data => {
        const { isLoading, playerState } = this.state;
        if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
            this.setState({ currentTime: data.currentTime });
        }
    };
    
    onLoad = data => this.setState({ duration: data.duration, isLoading: false });
    onLoadStart = data => this.setState({ isLoading: true });
    onEnd = () => this.setState({ playerState: PLAYER_STATES.ENDED });
    onError = () => alert('can not play video ', error);
    
    exitFullScreen = () => {
        alert('Exit full screen');
    };
    
    enterFullScreen = () => {};
    
    onFullScreen = () => {
        if (this.state.screenType == 'content')
            this.setState({ screenType: 'cover' });
        else 
            this.setState({ screenType: 'content' });
    };
    renderToolbar = () => (
        <View>
            <Text> toolbar </Text>
        </View>
    );
    onSeeking = currentTime => this.setState({ currentTime });

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.playerView}>
                    <Video
                        onEnd={this.onEnd}
                        onLoad={this.onLoad}
                        onLoadStart={this.onLoadStart}
                        onProgress={this.onProgress}
                        paused={this.state.paused}
                        ref={videoPlayer => (this.videoPlayer = videoPlayer)}
                        resizeMode={this.state.screenType}
                        onFullScreen={this.state.isFullScreen}
                        source={this.state.currentVideo}
                        style={styles.miniVideoPlayer}
                        volume={10}
                        />
                    <MediaControls
                        duration={this.state.duration}
                        isLoading={this.state.isLoading}
                        mainColor="#333"
                        onFullScreen={this.onFullScreen}
                        onPaused={this.onPaused}
                        onReplay={this.onReplay}
                        onSeek={this.onSeek}
                        onSeeking={this.onSeeking}
                        playerState={this.state.playerState}
                        progress={this.state.currentTime}
                        toolbar={this.renderToolbar()}
                        />
                </View>
                <View style={styles.playList}>
                    <FlatList 
                        style={styles.playList}
                        keyExtractor = {(item, index) => String(index)}
                        data={videoList}
                        renderItem = {({item, index}) =>{
                            return (
                                <TouchableOpacity style={styles.flatList} 
                                onPress ={() => this.setState({currentVideo : item.url})}
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
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        backgroundColor : '#d0d2d6'
    }, 
    playerView : {
        flex : 0.41,
        backgroundColor : '#0a1636',
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 15
    },
    miniVideoPlayer :{
        height : 230,
        width : 400,
        justifyContent : 'center',
        margin : 10
    },
    playList : {
        flex : 0.59,
    },
    flatList :{
        flex : 1,
        flexDirection : 'row',
        backgroundColor : '#fff',
        margin : 2,
        padding : 15
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
