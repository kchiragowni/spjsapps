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
            let {categories, category} = this.props;
            return(
                <CategoryPivot categories={categories} category={category}/>
            );
        }
}

function mapStateToProps(state, ownprops) {
    console.log(JSON.stringify(ownprops));
    return {
        categories: state.categories,
        category: 'course'
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