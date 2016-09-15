import React, {Component} from 'react';
import {
    View,
    Text,
    Modal,
    ScrollView,
    StyleSheet,
    Picker,
    DrawerLayoutAndroid,
    Image,
    TouchableHighlight
} from 'react-native';
import Path from '../../framework/routing/Path';
import {Toolbar as MaterialToolbar, Subheader, Button, Icon, COLOR, PRIMARY_COLORS} from 'react-native-material-design';
import data from '../../../config/data.json';
import DataSelect from './../facilities/DataSelect';
import {Card, Button as EButton, List, ListItem} from 'react-native-elements';
import Questions from './Questions';
import _ from 'lodash';


@Path("questionnaireView")
class QuestionnaireView extends Component {
    constructor(props, context) {
        super(props, context);
        var departments = data["departments"];
        departments.sort();
        this.state = {
            departments: departments,
            selectedDepartment: undefined,
            areasOfConcern: undefined,
            selectedAreaOfConcern: undefined,
            standards: undefined,
            selectedStandard: undefined,
            scoreMap: {},
            showModal: false,
            scoreColor: 'black',
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.updateScore = this.updateScore.bind(this);
    }

    static styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        proceedButton: {
            width: 300,
            backgroundColor: 'black'
        }
    });

    fieldsDefined() {
        return this.state.selectedDepartment && this.state.selectedAreaOfConcern && this.state.selectedStandard;
    }


    getSubHeader() {
        if (this.fieldsDefined()) {
            const areaOfConcernScore = Math.round(this.areaOfConcernScore());
            const itemList = [
                {icon: "domain", text: this.state.selectedDepartment, style: {}},
                {
                    icon: "poll",
                    text: `${this.state.selectedAreaOfConcern} and Score: ${areaOfConcernScore}`,
                    style: {color: this.state.scoreColor}
                },
                {icon: "assignment", text: this.state.selectedStandard, style: {}},
            ];
            return (
                <List>
                    {
                        itemList.map((item, idx)=><ListItem key={idx}
                                                            title={item.text}
                                                            titleStyle={item.style}
                                                            icon={{name: item.icon}}/>)
                    }
                </List>
            );
        }
        else {
            return <EButton small={true}
                            onPress={this.toggleModal}
                            icon={{name: 'assessment'}}
                            title="Click here to select Department, Area of Concern and Standard"/>;
        }
    }

    areaOfConcernScore() {
        if (this.state.scoreMap[this.state.selectedDepartment] && this.state.scoreMap[this.state.selectedDepartment][this.state.selectedAreaOfConcern]) {
            const score = this.state.scoreMap[this.state.selectedDepartment][this.state.selectedAreaOfConcern];
            return score.current * 100 / score.max;
        }

        return 0;
    }

    updateScore() {
        var scoreMapParent = this.state.scoreMap;
        scoreMapParent[this.state.selectedDepartment] = Object.assign({}, scoreMapParent[this.state.selectedDepartment]);
        const maxScore = _.find(data["Area Of Concern"], {'name': this.state.selectedAreaOfConcern})["standards"].map((standard)=>standard["questions"].length).reduce((a, b)=>((a + b))) * 2;
        scoreMapParent[this.state.selectedDepartment][this.state.selectedAreaOfConcern] = Object.assign({
            "max": maxScore,
            "current": 0
        }, scoreMapParent[this.state.selectedDepartment][this.state.selectedAreaOfConcern]);
        return (score)=> {
            this.setState({scoreMap: scoreMapParent});
            var scoreMap = this.state.scoreMap;
            scoreMap[this.state.selectedDepartment][this.state.selectedAreaOfConcern].current = scoreMap[this.state.selectedDepartment][this.state.selectedAreaOfConcern].current + score;
            this.setState({scoreMap: scoreMap, scoreColor: COLOR[`${PRIMARY_COLORS[1]}500`].color});
            setTimeout(()=>this.setState({scoreColor: 'black'}), 500);
        };
    }

    getQuestions() {
        if (this.fieldsDefined()) {
            return (<Questions department={this.state.selectedDepartment}
                               areaOfConcern={this.state.selectedAreaOfConcern}
                               standard={this.state.selectedStandard}
                               updateScore={this.updateScore()}
                               submitStandard={this.toggleModal}/>);
        }
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    render() {
        return (
            <View keyboardShouldPersistTaps={true} style={{flex: 1}}>
                <MaterialToolbar
                    title={"Facilities Assessment"}
                    icon="assessment"
                    onIconPress={this.toggleModal}
                />
                <Modal animationType={"fade"}
                       transparent={false}
                       onRequestClose={()=> {
                       }}
                       visible={this.state.showModal}>
                    <View style={QuestionnaireView.styles.container}>
                        <MaterialToolbar
                            title={"Facilities Assessment"}
                            icon="assessment"
                            onIconPress={this.toggleModal}
                        />
                        <View style={{marginTop: 56}}>
                            <DataSelect message={"Select a Department"}
                                        options={this.state.departments}
                                        selectedOption={this.state.selectedDepartment}
                                        onSelect={(department)=> {
                                            var areasOfConcern = data["Area Of Concern"].map((obj)=>obj["name"]);
                                            areasOfConcern = areasOfConcern.sort();
                                            this.setState({
                                                selectedDepartment: department,
                                                areasOfConcern: areasOfConcern,
                                            });
                                        }}/>
                            <DataSelect message={"Select an Area of Concern"}
                                        options={this.state.areasOfConcern}
                                        selectedOption={this.state.selectedAreaOfConcern}
                                        onSelect={(areaOfConcern)=> {
                                            var standards = _.find(data["Area Of Concern"], {'name': areaOfConcern})['standards'];
                                            standards = standards.map((obj)=> obj["name"]);
                                            standards.sort();
                                            this.setState({
                                                selectedAreaOfConcern: areaOfConcern,
                                                standards: standards,
                                            });
                                        }}/>

                            <DataSelect message={`Select a Standard`}
                                        options={this.state.standards}
                                        selectedOption={this.state.selectedStandard}
                                        onSelect={(standard)=> {
                                            const selectedAreaOfConcern = _.find(data["Area Of Concern"], {'name': this.state.selectedAreaOfConcern});
                                            var selectedStandard = _.find(selectedAreaOfConcern['standards'], {"name": standard})["name"];
                                            this.setState({
                                                selectedStandard: selectedStandard,
                                            });
                                        }}/>

                            <Button style={QuestionnaireView.styles.proceedButton} text="Done" raised={true}
                                    theme={"dark"}
                                    onPress={this.toggleModal}/>
                        </View>
                    </View>
                </Modal>
                <View style={{flex: 1, marginTop: 56}}>
                    <TouchableHighlight onPress={this.toggleModal}>
                        <View>
                            {this.getSubHeader()}
                        </View>
                    </TouchableHighlight>
                    {this.getQuestions()}
                </View>
            </View>
        )

    }
}

export default QuestionnaireView;