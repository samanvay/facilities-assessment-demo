import React, {Component} from 'react';
import {View, ScrollView, ListView, Text, StyleSheet, Picker} from 'react-native';
import data from '../../../config/data.json';
import Question from './Question';
import {Button as EButton} from 'react-native-elements';
import _ from 'lodash';


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
        const selectedAreaOfConcern = _.find(data["Area Of Concern"], {'name': this.props.areaOfConcern});
        const selectedStandard = _.find(selectedAreaOfConcern['standards'], {"name": this.props.standard});
        var questions = [];
        if (selectedStandard) {
            questions = selectedStandard["questions"];
            // questions = selectedStandard["questions"]
            //     .map((question, idx)=>(<Question key={idx} text={question.question}/>));
        }
        const dataSource = Questions.ds.cloneWithRows(questions);
        return (
            <View style={{flex: 1}}>
                <ListView
                    style={Questions.styles.questionList}
                    dataSource={dataSource}
                    enableEmptySections={true}
                    renderRow={(rowData)=> <Question text={rowData.question}/>}/>
                <EButton small={true}
                         onPress={this.submitStandard}
                         icon={{name: 'assessment'}}
                         title="Submit Assessment"/>
            </View>
        );

    }
}

export default Questions;