/* @flow */
import {AppRegistry, StyleSheet, View, Text} from 'react-native';
import React, {Component} from 'react';
import {Toolbar as MaterialToolbar} from 'react-native-material-design';
import App from './src/js/App';


class FacilitiesAssessment extends Component {

    static styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'stretch',
            backgroundColor: '#FFFFFF'
        },
        toolbar: {
            justifyContent: 'center',
            alignItems: 'center',
        }
    });

    render() {
        return (
            <View style={FacilitiesAssessment.styles.container}>
                <MaterialToolbar
                    title={"Facilities Assessment"}
                    style={FacilitiesAssessment.styles.toolbar}
                />
                <App/>
            </View>
        );
    }
}
console.ignoredYellowBox = ['Warning: You are manually calling'];
AppRegistry.registerComponent('FacilitiesAssessment', () => FacilitiesAssessment);
