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
import {Toolbar as MaterialToolbar, Button} from 'react-native-material-design';
import DataSelect from './../facilities/DataSelect';


class ModalView extends Component {
    constructor(props, context) {
        super(props, context);
        this.assessmentService = props.assessmentService;
        this.state = {departments: this.assessmentService.getDepartments()};
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

    render() {
        return (
            <Modal animationType={"fade"}
                   transparent={false}
                   onRequestClose={()=> {
                   }}
                   visible={this.props.showModal}>
                <View style={ModalView.styles.container}>
                    <MaterialToolbar
                        title={"Facilities Assessment"}
                        icon="assessment"
                        onIconPress={this.props.toggleModal}
                    />
                    <View style={{marginTop: 56}}>
                        <DataSelect message={"Select a Department"}
                                    options={this.state.departments}
                                    selectedOption={this.props.selectedDepartment}
                                    onSelect={(department)=> {
                                        this.props.selectDepartment(department);
                                        const areasOfConcerns = this.assessmentService.getAreasOfConcerns();
                                        this.setState({
                                            areasOfConcern: areasOfConcerns,
                                        });
                                    }}/>
                        <DataSelect message={"Select an Area of Concern"}
                                    options={this.state.areasOfConcern}
                                    selectedOption={this.props.selectedAreaOfConcern}
                                    onSelect={(areaOfConcern)=> {
                                        this.props.selectAreaOfConcern(areaOfConcern);
                                        const standards = this.assessmentService.getStandardsFor(areaOfConcern);
                                        this.setState({
                                            standards: standards
                                        });
                                    }}/>

                        <DataSelect message={`Select a Standard`}
                                    options={this.state.standards}
                                    selectedOption={this.props.selectedStandard}
                                    onSelect={this.props.selectStandard}/>

                        <Button style={ModalView.styles.proceedButton} text="Done" raised={true}
                                theme={"dark"}
                                onPress={this.props.toggleModal}/>
                    </View>
                </View>
            </Modal>);
    }
}

export default ModalView;