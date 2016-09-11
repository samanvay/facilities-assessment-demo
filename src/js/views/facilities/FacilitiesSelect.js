import React, {Component} from 'react';
import {View, Text, StyleSheet, Picker} from 'react-native';
import Path, {PathRoot} from '../../framework/routing/Path';
import facilitiesData from '../../../config/facilities.json';
import DataSelect from './DataSelect';
import {Button} from 'react-native-material-design';
import TypedTransition from '../../framework/routing/TypedTransition';


@PathRoot
@Path("facilitiySelect")
class FacilitySelect extends Component {
    constructor(props, context) {
        super(props, context);
        var states = Object.keys(facilitiesData);
        states.sort();
        this.state = {
            states: this._transform(states),
            selectedState: undefined,
            districts: undefined,
            selectedDistrict: undefined,
            facilityTypes: undefined,
            selectedFacilityType: undefined,
            facilities: undefined,
            selectedFacility: undefined
        };
    }

    _transform(optionList) {
        return optionList.map((option)=> {
            return {value: option, label: option};
        })
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

    render() {
        return (
            <View style={FacilitySelect.style.container}>
                <DataSelect message={"Select a State"}
                            options={this.state.states}
                            selectedOption={this.state.selectedState}
                            onSelect={(state)=> {
                                var districts = Object.keys(facilitiesData[state]);
                                districts = districts.sort();
                                districts = this._transform(districts);
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
                                facilityTypes = this._transform(facilityTypes);
                                facilityTypes = facilityTypes.map((option)=> {
                                    return {label: `${option.label} - ${district}`, value: option.value};
                                });
                                this.setState({
                                    selectedDistrict: district,
                                    facilityTypes: facilityTypes
                                });
                            }}/>

                <DataSelect message={`Select a Facility Type`}
                            options={this.state.facilityTypes}
                            selectedOption={this.state.selectedFacilityType}
                            onSelect={(facilityType)=> {
                                var availableFacilities = facilitiesData[this.state.selectedState]
                                    [this.state.selectedDistrict][facilityType];
                                availableFacilities.sort();
                                availableFacilities = this._transform(availableFacilities);
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
                        onPress={()=> TypedTransition.from(this).to()}/>
            </View>
        )

    }
}

export default FacilitySelect;