import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/categoryActions';
import objectAssign from 'object-assign';
import CategoryPivot from '../components/Category/CategoryPivot';

class CategoryContainer extends React.Component {
    constructor(props){
        super(props);
    
        this.state = {
            categories: objectAssign({}, props.categories)
        };       
    }

     render() {
            let {categories} = this.props;
            return(
                <CategoryPivot categories={categories}/>
            );
        }
}

function mapStateToProps(state) {
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
)(CategoryContainer);