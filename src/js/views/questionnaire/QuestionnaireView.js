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
import data from '../../../config/data.json';
import ModalView from './ModalView';
import {Button as EButton, List, ListItem} from 'react-native-elements';
import Questions from './Questions';
import _ from 'lodash';
import SubHeader from './SubHeader';


@Path("questionnaireView")
class QuestionnaireView extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedDepartment: undefined,
            selectedAreaOfConcern: undefined,
            selectedStandard: undefined,
            scoreMap: {},
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
                               areaOfConcernScore={this.areaOfConcernScore()}
                               department={this.state.selectedDepartment}
                               standard={this.state.selectedStandard}
                               aoc={this.state.selectedAreaOfConcern}/>);
        }
        return <EButton small={true}
                        onPress={this.toggleModal}
                        icon={{name: 'assessment'}}
                        title="Click here to select Department, Area of Concern and Standard"/>;
    }

    areaOfConcernScore() {
        if (this.state.scoreMap[this.state.selectedDepartment] && this.state.scoreMap[this.state.selectedDepartment][this.state.selectedAreaOfConcern]) {
            const score = this.state.scoreMap[this.state.selectedDepartment][this.state.selectedAreaOfConcern];
            return Math.round(score.current * 100 / score.max);
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
                    onIconPress={this.toggleModal}/>

                <ModalView selectedDepartment={this.state.selectedDepartment}
                           selectDepartment={(department)=>this.setState({selectedDepartment: department})}
                           selectedAreaOfConcern={this.state.selectedAreaOfConcern}
                           selectAreaOfConcern={(areaOfConcern)=>this.setState({selectedAreaOfConcern: areaOfConcern})}
                           selectedStandard={this.state.selectedStandard}
                           selectStandard={(standard)=>this.setState({selectedStandard: standard})}
                           toggleModal={this.toggleModal}
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