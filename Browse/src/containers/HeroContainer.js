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
        let {suggestions, categories} = this.props;
        return(
            <div className="ms-Grid-row searchbox">
                <div className="ms-Grid-col ms-u-sm8 ms-u-lg87">
                    <BasicSearch
                        suggestions={suggestions}
                        getSuggestions={this.props.actions.loadQuerySuggestions}
                        queryUpate={this.props.actions.updateQuery}/>
                </div>
                    <div className="ms-Grid-col ms-u-sm4 ms-u-l4">
                    <AdvancedSearch
                        categories={categories}
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        suggestions: state.querySuggestions,
        query: state.query,
        categories: state.categories
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

HeroContainer.propTypes = {
    suggestions: PropTypes.array.isRequired,
    query: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired,
    categories: PropTypes.array.isRequired
};

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(HeroContainer);

//export default HeroContainer;
