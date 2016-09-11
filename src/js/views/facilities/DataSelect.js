import React, {Component} from 'react';
import {View, Text, StyleSheet, Picker} from 'react-native';
import {COLOR, PRIMARY_COLORS} from 'react-native-material-design';


class DataSelect extends Component {
    static style = StyleSheet.create({
        optionPicker: {
            width: 300,
            marginBottom: 20
        },
        message: {
            width: 300,
            margin: 10,
            fontSize: 20
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
            </View>
        );
    }
}

export default DataSelect;