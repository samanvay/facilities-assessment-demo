import data from '../../config/data.json';
import _ from 'lodash';

class AssessmentService {
    constructor() {
        this.departments = data["departments"];
        this.departments.sort();
        this.areasOfConcern = data["Area Of Concern"];
        this.areasOfConcern.sort();
        this.scoreMap = {};
        this.departments.forEach((department)=> {
            this.scoreMap[department] = {"max": 0, "current": 0};
            this.getAreasOfConcerns().forEach((aoc)=> {
                this.scoreMap[department][aoc] = {"max": 0, "current": 0};
                this.getStandardsFor(aoc).forEach((standard)=> {
                    const questions = this.getQuestionsFor(aoc, standard);
                    this.scoreMap[department][aoc][standard] = {"max": questions.length * 2, "current": 0};
                    this.scoreMap[department][aoc].max = this.scoreMap[department][aoc].max + this.scoreMap[department][aoc][standard].max;
                    this.scoreMap[department].max = this.scoreMap[department].max + this.scoreMap[department][aoc].max + this.scoreMap[department][aoc][standard].max;
                    questions.forEach((q)=> {
                        this.scoreMap[department][aoc][standard][q] = 0;
                    })
                })
            })
        });
    }

    getDepartments() {
        return this.departments;
    }

    getAreasOfConcerns() {
        return this.areasOfConcern.map((aoc)=>aoc["name"]);
    }

    getStandardsFor(areaOfConcernName) {
        const areaOfConcern = _.find(this.areasOfConcern, {"name": areaOfConcernName});
        return areaOfConcern["standards"].map((standard)=> standard["name"]);
    }

    getQuestionsFor(areaOfConcernName, standardName) {
        const aoc = _.find(this.areasOfConcern, {"name": areaOfConcernName});
        const standard = _.find(aoc["standards"], {"name": standardName});
        return standard ? standard["questions"].map((q)=> q["question"]) : [];
    }

    addScoreFor(deptName, aocName, standardName) {
        return (question, score)=> {
            this.scoreMap[deptName][aocName][standardName][question] = score;
            var standardScore = 0;
            _.entries(this.scoreMap[deptName][aocName][standardName]).filter((entry)=>entry[0] != 'max' && entry[0] != 'current').forEach((a)=> {
                standardScore += a[1];
            });
            this.scoreMap[deptName][aocName][standardName].current = standardScore;
            var aocScore = 0;
            _.entries(this.scoreMap[deptName][aocName]).filter((entry)=>entry[0] != 'max' && entry[0] != 'current').forEach((a)=> {
                aocScore += a[1].current;
            });
            this.scoreMap[deptName][aocName].current = aocScore;
            var deptScore = 0;
            _.entries(this.scoreMap[deptName]).filter((entry)=>entry[0] != 'max' && entry[0] != 'current').forEach((a)=> {
                deptScore += a[1].current;
            });
            this.scoreMap[deptName].current = deptScore;
            return {deptScore: deptScore, aocScore: aocScore, standardScore: standardScore};
        };
    }

    _getScore(entity) {
        return Math.round(entity.current * 100 / entity.max);

    }

    getDepartmentScore(deptName) {
        if (!this.scoreMap[deptName]) {
            return 0;
        }
        return this._getScore(this.scoreMap[deptName]);
    }

    getAreaOfConcernScore(deptName, aoc) {
        if (this.scoreMap[deptName] && this.scoreMap[deptName][aoc]) {
            return this._getScore(this.scoreMap[deptName][aoc]);
        }
        return 0;
    }

    getStandardScore(deptName, aoc, standard) {
        return this._getScore(this.scoreMap[deptName][aoc][standard]);
    }
}

export default AssessmentService;