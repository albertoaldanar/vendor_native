import React, {Component} from "react";
import {View, Text, TextInput, Picker, TouchableOpacity} from "react-native";
import FontAwesome, {Icons} from "react-native-fontawesome";

class Filter extends Component{

  constructor(props){
    super(props);
    this.state = {
      client: "",
      productType: "",
      price: 0,
      model: "",
      brand: "",
      amount: 0,
      efficiency: ""
    }
  };

  onChangeInput = (state) => (event,value) => {
    this.setState({
      [state]:event
    });
  }

  postSale(){
    const {client, productType, price, model, brand, amount, efficiency} = this.state;

    fetch("http://localhost:3000/api/sell", {
      method: "POST",
      headers: {
          "Accept": "application/json",
          "Content-type": "application/json"
      },
      body: JSON.stringify({
        "price": price,
        "product_type": productType,
        "user_id": 13,
        "week": 3,
        "client": client,
        "finished": false,
        "brand": brand,
        "efficiency": efficiency,
        "model": model
      })
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => alert("Tu venta se ha registrado"));
  }

  render(){
    const {client, productType, price, model, brand, amount, efficiency}= this.state;
    console.log(model, brand, amount, efficiency );

    return(
      <View style = {styles.container}>
        <View>
          <TextInput
            placeholder = "Nombre de cliente"
            onChangeText ={this.onChangeInput('client')}
            value = {client}
            style = {styles.input}
          />
        </View>

        <View>
          <Picker
            itemStyle ={styles.pickerStyle}
            selectedValue={this.state.productType}
            onValueChange={(itemValue, itemIndex) => this.setState({productType: itemValue})}
          >
            <Picker.Item label="Minisplit" value="Minisplit" />
            <Picker.Item label="VRF" value="VRF" />
            <Picker.Item label="Ventana" value="Ventana" />
            <Picker.Item label="Chiller" value="Chiller" />
            <Picker.Item label="Paquete" value="Paquete" />
          </Picker>
        </View>


        <View>
          <TextInput
            placeholder = "Precio"
            keyboardType = "numeric"
            onChangeText ={this.onChangeInput('price')}
            value = {price}
            style = {styles.input}
          />
        </View>

        <View>
          <TextInput
            placeholder = "Marca"
            onChangeText ={this.onChangeInput('brand')}
            value = {brand}
            style = {styles.input}
          />
        </View>

        <View>
          <TextInput
            placeholder = "Cantidad"
            onChangeText ={this.onChangeInput('amount')}
            value = {amount}
            style = {styles.input}
          />
        </View>

         <View>
          <TextInput
            placeholder = "Modelo"
            onChangeText ={this.onChangeInput('model')}
            value = {model}
            style = {styles.input}
          />
        </View>

        <View>
          <TextInput
            placeholder = "Eficiencia"
            onChangeText ={this.onChangeInput('efficiency')}
            value = {efficiency}
            style = {styles.input}
          />
        </View>

        <TouchableOpacity
          style = {styles.button}
          onPress = {this.postSale.bind(this)}
        >
          <Text style = {{color: "white", textAlign: "center", fontSize: 20}}>Registrar venta</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

  const styles = {
    container: {
      flexDirection: "column",
      justifyContet: "space-between"
    },
    input: {
      backgroundColor: "#ffff",
      padding: 10,
      textAlign: "center",
      fontWeight: "300",
      fontSize: 20,
      marginBottom: 3
    },
    title: {
      fontWeight: "300",
      fontSize: 20,
      color: "red",
      textAlign: "center",
      marginTop: 15
    },
    pickerStyle: {
      backgroundColor: "#ffff",
      color: "black",
      marginBottom: 5
    },
    button: {
      backgroundColor: "#708090",
      padding: 10,
    }
  }

export default Filter;
