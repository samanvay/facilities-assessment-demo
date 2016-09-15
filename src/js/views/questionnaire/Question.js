import React, {Component} from 'react';
import {View, Text, StyleSheet, Picker} from 'react-native';
import {COLOR, PRIMARY_COLORS, Icon} from 'react-native-material-design';
import {Card, ButtonGroup, FormLabel} from 'react-native-elements';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';


class Question extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            compliance: ["0", "1", "2"],
            assessmentMethod: ["OB", "SI", "RR", "PI"],
            selectedAssessmentMethod: undefined,
            selectedCompliance: undefined,
            remarks: undefined
        };
        this.complianceSelected = this.complianceSelected.bind(this);
        this.assessmentMethodSelected = this.assessmentMethodSelected.bind(this);
        this.enterRemarks = this.enterRemarks.bind(this);
    }

    static styles = StyleSheet.create({
        question: {
            flex: 1,
            justifyContent: 'flex-start',
        },
        questionText: {
            width: 200,
            borderRightWidth: 2,
            paddingRight: 5,
            borderRightColor: COLOR[`${PRIMARY_COLORS[2]}500`].color,
            backfaceVisibility: 'visible',
        },
        divider: {
            width: 500,
            backgroundColor: COLOR[`${PRIMARY_COLORS[0]}500`].color,
            marginBottom: 20
        },
        compliance: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        },
        buttonGroup: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            width: 50
        },
        remarks: {
            width: 250,
            marginBottom: 15,
            paddingBottom: 15,
            marginTop: 5,
            paddingTop: 5
        }
    });

    complianceSelected(selectedIndex) {
        this.props.updateScore(this.props.text, parseInt(this.state.compliance[selectedIndex]));
        this.setState({selectedCompliance: selectedIndex});
    }


    assessmentMethodSelected(selectedIndex) {
        this.setState({selectedAssessmentMethod: selectedIndex});
    }

    enterRemarks(remarks) {
        this.setState({remarks: remarks});
    }

    render() {
        return (
            <Card
                flexDirection="row"
                containerStyle={Question.styles.question}>
                <View style={Question.styles.questionText}>
                    <Icon name={"question-answer"}/><Text>{this.props.text}</Text>
                </View>
                <View style={Question.styles.compliance}>
                    <FormLabel>Compliance</FormLabel>
                    <ButtonGroup
                        containerStyle={Question.styles.buttonGroup}
                        onPress={this.complianceSelected}
                        selectedIndex={this.state.selectedCompliance}
                        buttons={this.state.compliance}/>
                    <FormLabel>Method of Assessment</FormLabel>
                    <ButtonGroup
                        containerStyle={Question.styles.buttonGroup}
                        onPress={this.assessmentMethodSelected}
                        selectedIndex={this.state.selectedAssessmentMethod}
                        buttons={this.state.assessmentMethod}/>
                    <FormLabel>Remarks</FormLabel>
                    <AutoGrowingTextInput style={Question.styles.remarks}
                                          multiline={true}
                                          maxHeight={250}
                                          onChangeText={this.enterRemarks}
                                          value={this.state.remarks}/>
                </View>

            </Card>
        )

    }
}

export default Question;