import React, {Component} from 'react';
import {View, Text, StyleSheet, Picker} from 'react-native';
import {COLOR, PRIMARY_COLORS} from 'react-native-material-design';
import {Divider} from 'react-native-material-design';


class DataSelect extends Component {
    static style = StyleSheet.create({
        optionPicker: {
            width: 300,
        },
        message: {
            width: 300,
            marginLeft: 9,
            fontSize: 20,
            fontWeight: '900'
        },
        divider: {
            width: 350,
            backgroundColor: COLOR[`${PRIMARY_COLORS[0]}500`].color,
            marginBottom: 20
        }
    });

    render() {
        if (this.props.options == undefined) return (<View/>);
        const options = this.props.options.map((option)=> (
            <Picker.Item key={`${Math.random()}`} label={option.label} value={option.value}/>));
        return (
            <View>
                <Text ellipsizeMode="middle" style={DataSelect.style.message}>{this.props.message}</Text>
                <Picker
                    prompt={this.props.message}
                    style={DataSelect.style.optionPicker}
                    selectedValue={this.props.selectedOption}
                    onValueChange={this.props.onSelect}>
                    {options}
                </Picker>
                <Divider style={DataSelect.style.divider} theme={"dark"}/>
            </View>
        );
    }
}

export default DataSelect;