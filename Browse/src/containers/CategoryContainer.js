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
            categories: objectAssign({}, props.categories),
            query: props.query
        };       
    }

     render() {
            let {categories, query} = this.props;
            return(
                <CategoryPivot 
                    categories={categories}
                    query= {query} />
            );
        }
}

function mapStateToProps(state) {
    return {
        categories: state.categories,
        query: state.query,
        category: 'course'
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

CategoryContainer.propTypes = {
    categories: PropTypes.array.isRequired,
    query: PropTypes.string.isRequired,
};

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(CategoryContainer);