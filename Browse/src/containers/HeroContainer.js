import React from 'react';
//import { connect } from 'react-redux';
//import { bindActionCreators } from 'redux';
//import * as actions from '../actions/categoryActions';
//import objectAssign from 'object-assign';
import BasicSearch from '../components/Search/BasicSearch';
import AdvancedSearch from '../components/Search/AdvancedSearch';

class HeroContainer extends React.Component {
    constructor(props, context){
        super(props, context);
    }

     render() {
            return(
                <div className="ms-Grid-row searchbox">
                    <div className="ms-Grid-col ms-u-sm8 ms-u-lg87">
                        <BasicSearch/>
                    </div>
                     <div className="ms-Grid-col ms-u-sm4 ms-u-l4">
                        <AdvancedSearch/>
                    </div>
                </div>
            );
        }
}

/*function mapStateToProps(state) {
    return {
        categories: state.categories
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

CategoryContainer.propTypes = {
    categories: PropTypes.array.isRequired
};

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(CategoryContainer);*/

export default HeroContainer;