import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Path, {PathRoot} from '../../framework/routing/Path';


@PathRoot
@Path("facilitiySelect")
class FacilitySelect extends Component {
    static style = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }
    });

    render() {
        return (
            <View style={FacilitySelect.style.container}>
                <Text>Hello World</Text>
            </View>
        )

    }
}

export default FacilitySelect;