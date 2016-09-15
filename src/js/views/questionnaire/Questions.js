import React, {Component} from 'react';
import {View, ScrollView, ListView, Text, StyleSheet, Picker} from 'react-native';
import Question from './Question';
import {Button as EButton} from 'react-native-elements';


class Questions extends Component {
    constructor(props, context) {
        super(props, context);

    }

    static styles = StyleSheet.create({
        questionList: {
            flex: 1,
        }
    });

    static ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    render() {
        const dataSource = Questions.ds.cloneWithRows(this.props.questions);
        return (
            <View style={{flex: 1}}>
                <ListView
                    style={Questions.styles.questionList}
                    dataSource={dataSource}
                    enableEmptySections={true}
                    renderRow={(rowData)=> <Question updateScore={this.props.updateScore} text={rowData}/>}/>
                <EButton small={true}
                         onPress={this.props.submitStandard}
                         icon={{name: 'assessment'}}
                         title="Submit Assessment"/>
            </View>
        );

    }
}

export default Questions;