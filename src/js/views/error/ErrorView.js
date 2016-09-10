import Path from '../../framework/routing/Path';
import {View, Text} from 'react-native';
import React, {Component} from 'react';

@Path('/errorView')
class ErrorView extends Component {
    static contextTypes = {
        navigator: React.PropTypes.func.isRequired
    };

    static propTypes = {
        params: React.PropTypes.object.isRequired
    };

    render() {
        return (<View>
            {this.renderErrors()}
        </View>);
    }

    renderErrors() {
        return this.props.params.errors.map((error) => {
            return <Text>{error}</Text>
        });
    }
}

export default ErrorView;