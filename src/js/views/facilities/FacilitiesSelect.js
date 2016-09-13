import React, {Component} from 'react';
import {View, Text, StyleSheet, Picker} from 'react-native';
import Path, {PathRoot} from '../../framework/routing/Path';
import facilitiesData from '../../../config/facilities.json';
import DataSelect from './DataSelect';
import {Button} from 'react-native-material-design';
import TypedTransition from '../../framework/routing/TypedTransition';
import QuestionnaireView from '../questionnaire/QuestionnaireView';
import {Toolbar as MaterialToolbar} from 'react-native-material-design';

@PathRoot
@Path("facilitiySelect")
class FacilitySelect extends Component {
    constructor(props, context) {
        super(props, context);
        var states = Object.keys(facilitiesData);
        states.sort();
        this.state = {
            states: states,
            selectedState: undefined,
            districts: undefined,
            selectedDistrict: undefined,
            facilityTypes: undefined,
            selectedFacilityType: undefined,
            facilities: undefined,
            selectedFacility: undefined
        };
    }

    static style = StyleSheet.create({
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


    static contextTypes = {
        navigator: React.PropTypes.func.isRequired,
    };

    render() {
        return (
            <View style={FacilitySelect.style.container}>
                <MaterialToolbar
                    title={"Facilities Assessment"}/>
                <View style={{marginTop: 56}}>
                    <DataSelect message={"Select a State"}
                                options={this.state.states}
                                selectedOption={this.state.selectedState}
                                onSelect={(state)=> {
                                    var districts = Object.keys(facilitiesData[state]);
                                    districts = districts.sort();
                                    this.setState({
                                        selectedState: state,
                                        districts: districts,
                                    });
                                }}/>
                    <DataSelect message={"Select a District"}
                                options={this.state.districts}
                                selectedOption={this.state.selectedDistrict}
                                onSelect={(district)=> {
                                    var facilityTypes = Object.keys(facilitiesData[this.state.selectedState][district]);
                                    facilityTypes.sort();
                                    const facilities = facilitiesData[this.state.selectedState][district][this.state.selectedFacilityType || facilityTypes[0]];
                                    this.setState({
                                        selectedDistrict: district,
                                        facilityTypes: facilityTypes,
                                        facilities: facilities
                                    });
                                }}/>

                    <DataSelect message={`Select a Facility Type`}
                                options={this.state.facilityTypes}
                                selectedOption={this.state.selectedFacilityType}
                                onSelect={(facilityType)=> {
                                    var availableFacilities = facilitiesData[this.state.selectedState]
                                        [this.state.selectedDistrict][facilityType];
                                    availableFacilities.sort();
                                    this.setState({
                                        selectedFacilityType: facilityType,
                                        facilities: availableFacilities,
                                    });
                                }}/>

                    <DataSelect message={"Select a Facility"}
                                options={this.state.facilities}
                                selectedOption={this.state.selectedFacility}
                                onSelect={(facility)=> {
                                    this.setState({selectedFacility: facility});
                                }}/>

                    <Button style={FacilitySelect.style.proceedButton} text="Proceed" raised={true} theme={"dark"}
                            onPress={()=> TypedTransition.from(this).to(QuestionnaireView)}/>
                </View>
            </View>
        )

    }
}

export default FacilitySelect;