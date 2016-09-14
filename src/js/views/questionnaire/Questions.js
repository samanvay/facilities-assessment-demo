import React, {Component} from 'react';
import {View, ScrollView, ListView, Text, StyleSheet, Picker} from 'react-native';
import data from '../../../config/data.json';
import Question from './Question';
import _ from 'lodash';


class Questions extends Component {
    constructor(props, context) {
        super(props, context);
    }

    static styles = StyleSheet.create({});

    render() {
        const selectedAreaOfConcern = _.find(data["Area Of Concern"], {'name': this.props.areaOfConcern});
        const selectedStandard = _.find(selectedAreaOfConcern['standards'], {"name": this.props.standard});
        var questions = [];
        if (selectedStandard) {
            questions = selectedStandard["questions"]
                .map((question, idx)=>(<Question key={idx} text={question.question}/>));
        }
        return (
            <View>
                {questions}
            </View>
        );

    }
}

export default Questions;