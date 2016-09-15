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
import {Toolbar as MaterialToolbar, COLOR, PRIMARY_COLORS} from 'react-native-material-design';
import ModalView from './ModalView';
import {Button as EButton} from 'react-native-elements';
import Questions from './Questions';
import AssessmentService from "../../service/AssessmentService";
import SubHeader from './SubHeader';


@Path("questionnaireView")
class QuestionnaireView extends Component {
    constructor(props, context) {
        super(props, context);
        this.assessmentService = new AssessmentService();
        this.state = {
            selectedDepartment: undefined,
            selectedAreaOfConcern: undefined,
            selectedStandard: undefined,
            aocScore: 0,
            deptScore: 0,
            standardScore: 0,
            showModal: false,
            scoreColor: 'black',
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.updateScore = this.updateScore.bind(this);
    }

    fieldsDefined() {
        return this.state.selectedDepartment && this.state.selectedAreaOfConcern && this.state.selectedStandard;
    }


    getSubHeader() {
        if (this.fieldsDefined()) {
            return (<SubHeader scoreColor={this.state.scoreColor}
                               areaOfConcernScore={this.state.aocScore}
                               departmentScore={this.state.deptScore}
                               standardScore={this.state.standardScore}
                               department={this.state.selectedDepartment}
                               standard={this.state.selectedStandard}
                               aoc={this.state.selectedAreaOfConcern}/>);
        }
        return <EButton small={true}
                        onPress={this.toggleModal}
                        icon={{name: 'assessment'}}
                        title="Click here to select Department, Area of Concern and Standard"/>;
    }


    updateScore() {
        const scoreFn = this.assessmentService.addScoreFor(this.state.selectedDepartment, this.state.selectedAreaOfConcern, this.state.selectedStandard);
        return (question, score)=> {
            const {deptScore, aocScore, standardScore} = scoreFn(question, score);
            this.setState({scoreColor: COLOR[`${PRIMARY_COLORS[1]}500`].color});
            setTimeout(()=>this.setState({
                scoreColor: 'black',
                aocScore: aocScore,
                deptScore: deptScore,
                standardScore: standardScore,
            }), 1000);
        };
    }

    getQuestions() {
        if (this.fieldsDefined()) {
            return (<Questions
                questions={this.assessmentService.getQuestionsFor(this.state.selectedAreaOfConcern, this.state.selectedStandard)}
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
                    onIconPress={this.toggleModal}/>

                <ModalView selectedDepartment={this.state.selectedDepartment}
                           selectDepartment={(department)=>this.setState({selectedDepartment: department})}
                           selectedAreaOfConcern={this.state.selectedAreaOfConcern}
                           selectAreaOfConcern={(areaOfConcern)=>this.setState({selectedAreaOfConcern: areaOfConcern})}
                           selectedStandard={this.state.selectedStandard}
                           selectStandard={(standard)=>this.setState({selectedStandard: standard})}
                           toggleModal={this.toggleModal}
                           assessmentService={this.assessmentService}
                           showModal={this.state.showModal}/>

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