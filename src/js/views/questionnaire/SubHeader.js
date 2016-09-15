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
            {icon: "domain", text: this.props.department, style: {}},
            {
                icon: "poll",
                text: `${this.props.aoc} and Score: ${this.props.areaOfConcernScore}`,
                style: {color: this.props.scoreColor}
            },
            {icon: "assignment", text: this.props.standard, style: {}},
        ].map((item, idx)=> <ListItem key={idx}
                                      title={item.text}
                                      titleStyle={item.style}
                                      icon={{name: item.icon}}/>);
        return (
            <List>
                {itemList}
            </List>
        );
    }
}

export default SubHeader;