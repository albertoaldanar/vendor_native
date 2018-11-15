
import React, {Component} from "react";
import { addNavigationHelpers, StackNavigator, createBottomTabNavigator, NavigationActions, TabBarBottom  } from 'react-navigation';
import VendorCalendar from "../components/calendar";
import Filter from "../components/filter";
import Profile from "../components/profile";
import FontAwesome, { Icons } from 'react-native-fontawesome';

export const MainScreen = createBottomTabNavigator({

  Calendar: {
    screen: VendorCalendar,
    navigationOptions: {
      title: "Hello",
      tabBarLabel: "BUSCAR",
      tabBarIcon: ({focused, tintColor}) => <FontAwesome style = {{color: tintColor, fontSize: 25}}>{Icons.calendar}</FontAwesome>
    },
  },
  Filter: {
    screen: Filter,
    navigationOptions: {
      tabBarLabel: "TICKETS",
      tabBarIcon: ({focused, tintColor}) => <FontAwesome style = {{color: tintColor, fontSize: 25}}>{Icons.filter}</FontAwesome>
    }
  },
    Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: "TICKETS",
      tabBarIcon: ({focused, tintColor}) => <FontAwesome style = {{color: tintColor, fontSize: 25}}>{Icons.user}</FontAwesome>
    }
  }
},
    {
      tabBarOptions: {
          showLabel: false,
          activeTintColor: "#48D1CC",
          inactiveTintColor: '#DCDCDC',
          showIcon : true,
          style: {
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              height: 55,
              borderTopColor: 'transparent',
              paddingRight: 10,
              paddingLeft: 10,
          },
      }
    }
);

const AppNavigator = StackNavigator({

  MainScreen: {
    screen: MainScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#778899",
      },
      title: "Registro de venta",
      headerTintColor: "#48D1CC" ,
      headerHeight: 2
    }
  },
});

class Nav extends Component{
  render(){
    return(
      <AppNavigator/>
    );
  }
}

export default Nav;
