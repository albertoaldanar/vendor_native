import React, {Component} from "react";
import {View, Text, TouchableOpacity, Dimensions} from "react-native";
import { Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars';
import FontAwesome, {Icons} from "react-native-fontawesome";

LocaleConfig.locales['es'] = {
  monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
  monthNamesShort: ['Ene.','Feb.','Mar','Abril','Mar','Jun','Juil.','Ago','Sept.','Oct.','Nov.','Déc.'],
  dayNames: ['Domingo','Lunes','Martes','Mirecoles','Jueves','Viernes','Sabado'],
  dayNamesShort: ['Dom.','Lun.','Mar.','Mie.','Jue.','Vie.','Sab.']
};

 LocaleConfig.defaultLocale = 'es';

const HEIGHT = Dimensions.get("window").height;

class VendorCalendar extends Component{

  constructor(props){
    super(props);
    this.state = {tasks: []}
  }

  componentWillMount(){
    fetch("http://localhost:3000/api/v_tasks")
      .then(res => res.json())
      .then(response => {
        this.setState({tasks: response.tasks})
      })
    .catch(e => alert(e))
  }

  showTasks(day, item){
    return(
      <View style = {styles.dayContainer}>
        <Text style = {styles.number}>{day.day}</Text>
        <Text>LUN</Text>
      </View>
    );
  }

  showItem(item){
    return(
      <TouchableOpacity style = {styles.taskContainer}>

        <View>
          <Text style = {styles.desc}>{item.text}</Text>
          <Text style = {{fontWeight:"bold", color:"#778899"}}>{item.start} - {item.end}</Text>
        </View>

        <View style = {styles.initial}>
          <FontAwesome style= {{color: "gray", fontSize: 20}}>{Icons.chevronRight}</FontAwesome>
        </View>

        <Text style = {styles.taskType}> Seguimiento</Text>
      </TouchableOpacity>
    );
  }

  render(){

    const {tasks} = this.state;

    return(
      <View style = {{flex: 1, position: "relative"}}>

        <Agenda
          items={tasks}
          // callback that gets called when items for a certain month should be loaded (month became visible)
          loadItemsForMonth={(month) => {console.log('trigger items loading')}}
          // callback that fires when the calendar is opened or closed
          onCalendarToggled={(calendarOpened) => {console.log(calendarOpened)}}
          // callback that gets called on day press
          onDayPress={(day)=>{console.log(day)}}
          // callback that gets called when day changes while scrolling agenda list
          onDayChange={(day)=>{console.log('day changed')}}
          // initially selected day
          selected={'2017-06-01'}
          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          minDate={'2017-06-01'}
          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
          maxDate={'2018-12-30'}
          // Max amount of months allowed to scroll to the past. Default = 50
          pastScrollRange={50}
          // Max amount of months allowed to scroll to the future. Default = 50
          futureScrollRange={50}
          // specify how each item should be rendered in agenda
          renderItem={(item, firstItemInDay) => {return (this.showItem(item));}}
          // specify how each date should be rendered. day can be undefined if the item is not first in that day.
          renderDay={(day, item) => {return (this.showTasks(day));}}
          // specify how empty date content with no items should be rendered
          renderEmptyDate={() => {return (<View/>);}}
          // specify how agenda knob should look like
          renderKnob={() => {return (<View />);}}
          // specify what should be rendered instead of ActivityIndicator
          renderEmptyData = {() => {return (<View />);}}
          // specify your item comparison function for increased performance
          rowHasChanged={(r1, r2) => {return r1.text !== r2.text}}
          // Hide knob button. Default = false
          hideKnob={false}
          // By default, agenda dates are marked if they have at least one item, but you can override this if needed
          // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
          onRefresh={() => console.log('refreshing...')}
          // Set this true while waiting for new data from a refresh
          refreshing={false}
          // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
          refreshControl={null}
          // agenda theme
          theme={{
             agendaDayTextColor: 'yellow',
             agendaDayNumColor: 'green',
             agendaTodayColor: 'red',
             agendaKnobColor: 'blue'
          }}
          // agenda container style
          style={{}}
        />

          <TouchableOpacity style = {styles.addButton}>
              <FontAwesome style = {{color: "#ffff", alignSelf: "center", fontSize: 20}}> {Icons.plus}</FontAwesome>
          </TouchableOpacity>

      </View>
    );
  }
}

const styles = {
  number: {
    fontSize: 20,
    padding: 10,
    fontWeight: "300",
  },
  addButton: {
    backgroundColor :"#778899",
    borderRadius: 50,
    position: "absolute",
    padding: 20,
    bottom: 15,
    right: 10,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.9,
  },
  desc: {
    fontSize: 20,
    fontWeight: "300",
    paddingBottom:8,
  },
  taskContainer: {
    backgroundColor: "#ffff",
    padding: 20,
    borderRadius: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: "#f5f5f5",
    marginBottom: 10,
    marginTop: 10
  },
  dayContainer: {
    padding: 15,
    borderRadius: 50,
  },
  initial: {
    padding: 10,
    position: "absolute",
    borderRadius: 50,
    right: 5,
    top: 10
  },
  taskType: {
    marginTop: 13,
    backgroundColor: "#48D1CC",
    padding: 15,
    color: "#ffff",
    fontSize: 15,
    fontWeight: "500",
    shadowColor: '#000',
    shadowOffset: { width: 0.5, height: 2 },
    shadowOpacity: 0.4,
  }
}

export default VendorCalendar;
