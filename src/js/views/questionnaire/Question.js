import React, {Component} from 'react';
import {View, Text, StyleSheet, Picker} from 'react-native';
import {Divider, COLOR, PRIMARY_COLORS} from 'react-native-material-design';
import _ from 'lodash';
import {Card} from 'react-native-elements';

class Question extends Component {
    constructor(props, context) {
        super(props, context);
    }

    static styles = StyleSheet.create({
        question: {
            flex: 1,
            justifyContent: 'flex-start',

        },
        questionText: {
            width: 200
        },
        divider: {
            width: 500,
            backgroundColor: COLOR[`${PRIMARY_COLORS[0]}500`].color,
            marginBottom: 20
        }
    });


    render() {
        return (
            <Card
                flexDirection="row"
                containerStyle={Question.styles.question}>
                <Text style={Question.styles.questionText}>{this.props.text}</Text>
            </Card>
        )

    }
}

export default Question;