import BaseService from './BaseService.js'
import Service from '../framework/bean/Service';
import DecisionData from '../models/DecisionConfig';


@Service("decisionConfigService")
class DecisionConfigService extends BaseService {
    constructor(db, beanStore) {
        super(db, beanStore);
        this.saveDecisionConfig = this.saveDecisionConfig.bind(this);
        this.getDecisionConfig = this.getDecisionConfig.bind(this);
    }

    saveDecisionConfig(decisionCode, moduleName) {
        const db = this.db;
        this.db.write(()=> db.create(DecisionData.schema.name, DecisionData.toDB(moduleName, decisionCode), true));
    }

    getDecisionConfig(questionnaireName) {
        return this.db.objectForPrimaryKey(DecisionData.schema.name, `${questionnaireName.toLowerCase()}`);
    }
}

export default DecisionConfigService;