import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/queryActions';
//import objectAssign from 'object-assign';
import BasicSearch from '../components/Search/BasicSearch';
import AdvancedSearch from '../components/Search/AdvancedSearch';

class HeroContainer extends React.Component {
    constructor(props, context){
        super(props, context);
    }

    render() {
        let {suggestions} = this.props;
        return(
            <div className="ms-Grid-row searchbox">
                <div className="ms-Grid-col ms-u-sm8 ms-u-lg87">
                    <BasicSearch
                        suggestions={suggestions}
                        getSuggestions={this.props.actions.loadQuerySuggestions}/>
                </div>
                    <div className="ms-Grid-col ms-u-sm4 ms-u-l4">
                    <AdvancedSearch/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        suggestions: state.querySuggestions
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

HeroContainer.propTypes = {
    suggestions: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(HeroContainer);

//export default HeroContainer;
