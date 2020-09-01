import  React  from "react";
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import DashBoard from '../screens/DashBoard';
import AudioSection from '../screens/AudioSection';
import VideoSection from "../screens/VideoSection";

const StackNavigator = createStackNavigator({
    DashBoard : {
      screen : DashBoard,
        navigationOptions :{
          title: 'Dashboard',
          headerStyle: {
            backgroundColor: '#e3e3e3',
            borderBottomColor : '#cc3a1d',
            borderBottomWidth: 4
          },
          headerTintColor: '#606070',
        }
      },
    AudioSection : {
      screen : AudioSection,
      navigationOptions :{
        title: 'PlayList',
        headerStyle: {
          backgroundColor : '#56db89',
          borderBottomColor : '#cc3a1d',
          borderBottomWidth: 4,
          },
        }
      },
    VideoSection : {
      screen : VideoSection,
      navigationOptions :{
        title: 'PlayList',
        headerStyle: {
          backgroundColor: '#56db89',
          borderBottomColor : '#cc3a1d',
          borderBottomWidth: 4
          },
        headerTintColor: '#606070',
        }
      }
    },
    {
      initialRouteName : 'DashBoard'
    }
  );
  

  
  export default createAppContainer(StackNavigator);
  