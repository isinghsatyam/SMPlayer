import React, {useState} from 'react';
import Slider from '@react-native-community/slider';
import TrackPlayer, {useTrackPlayerProgress} from 'react-native-track-player';

const ProgressBar = () => {
  const [isSeeking, setIsSeeking] = useState(false);
  const [seek, setSeek] = useState(0);

  const progress = useTrackPlayerProgress();
  const {duration, position} = progress;

  return (
    <Slider
      style={{width: '80%', height: 40, justifyContent: 'center'}}
      minimumValue={0}
      maximumValue={duration}
      minimumTrackTintColor="#cc3a1d"
      maximumTrackTintColor="#d0d2d6"
      thumbTintColor = '#dbd818'
      value={isSeeking ? seek : position}
      onValueChange={(value) => {
        TrackPlayer.pause();
        setIsSeeking(true);
        setSeek(value);
      }}
      onSlidingComplete={(value) => {
        TrackPlayer.seekTo(value);
        TrackPlayer.play();
      }}
    />
  );
};

export default ProgressBar;