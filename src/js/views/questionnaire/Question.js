import React, {Component} from 'react';
import {View, Text, StyleSheet, Picker} from 'react-native';
import {Divider, COLOR, PRIMARY_COLORS} from 'react-native-material-design';
import _ from 'lodash';

class Question extends Component {
    constructor(props, context) {
        super(props, context);
    }

    static styles = StyleSheet.create({
        question: {
            flex: 1,
            justifyContent: 'flex-start'
        },
        divider: {
            width: 500,
            backgroundColor: COLOR[`${PRIMARY_COLORS[0]}500`].color,
            marginBottom: 20
        }
    });


    render() {
        return (
            <View>
                <Text>{this.props.text}</Text>
                <Divider style={Question.styles.divider} theme={"dark"}/>
            </View>
        )

    }
}

export default Question;