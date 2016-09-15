import facilitiesData from '../../config/facilities.json';

class FacilitiesService {
    constructor() {
        this.data = facilitiesData;
        this.states = Object.keys(facilitiesData);
        this.states.sort();
    }

    getStates() {
        return this.states;
    }

    getDistrictsFor(state) {
        var districts = Object.keys(this.data[state]);
        districts.sort();
        return districts;
    }

    getFacilityTypes() {
        return ["Community Health Center", "District Hospital", "Primary Health Center"];
    }

    getFacilitiesFor(state, district) {
        var facilities = this.data[state][district]["Community Health Center"];
        facilities.sort();
        return facilities;
    }
}

export default FacilitiesService;