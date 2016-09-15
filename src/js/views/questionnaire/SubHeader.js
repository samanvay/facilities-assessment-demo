import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import {List, ListItem} from 'react-native-elements';

class SubHeader extends Component {
    render() {
        const itemList = [
            {icon: "domain", text: `${this.props.department} and Score: ${this.props.departmentScore}`},
            {icon: "poll", text: `${this.props.aoc} and Score: ${this.props.areaOfConcernScore}`},
            {icon: "assignment", text: `${this.props.standard} and Score: ${this.props.standardScore}`},
        ].map((item, idx)=> <ListItem key={idx}
                                      title={item.text}
                                      titleStyle={{color: this.props.scoreColor}}
                                      icon={{name: item.icon}}/>);
        return (
            <List>
                {itemList}
            </List>
        );
    }
}

export default SubHeader;