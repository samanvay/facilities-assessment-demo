/* @flow */
import {AppRegistry, StyleSheet, View, Text} from 'react-native';
import React, {Component} from 'react';
import App from './src/js/App';
import {PRIMARY_COLORS, COLOR, Button, Card} from 'react-native-material-design';


class FacilitiesAssessment extends Component {

    static styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'stretch',
            backgroundColor: '#FFFFFF'
        }
    });

    render() {
        return (
            <View style={FacilitiesAssessment.styles.container}>
                <App/>
            </View>
        );
    }
}
console.ignoredYellowBox = ['Warning: You are manually calling'];
AppRegistry.registerComponent('FacilitiesAssessment', () => FacilitiesAssessment);
