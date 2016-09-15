import data from '../../config/data.json';
import _ from 'lodash';

class AssessmentService {
    constructor() {
        this.departments = data["departments"];
        this.departments.sort();
        this.areasOfConcern = data["Area Of Concern"];
        this.areasOfConcern.sort();
        this.mappingCache = {};
    }

    getDepartments() {
        return this.departments;
    }

    getAreasOfConcerns() {
        return this.areasOfConcern.map((aoc)=>aoc["name"]);
    }

    getStandardsFor(areaOfConcernName) {
        const areaOfConcern = _.find(this.areasOfConcern, {"name": areaOfConcernName});
        this.mappingCache[areaOfConcernName] = areaOfConcern["standards"];
        return areaOfConcern["standards"].map((standard)=> standard["name"]);
    }

    getQuestionsFor(areaOfConcernName, standardName) {
        return _.find(this.mappingCache[areaOfConcernName], (e)=>e == standardName)["questions"];
    }

}

export default AssessmentService;