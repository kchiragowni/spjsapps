/* eslint-disable import/default */
/*eslint-disable no-unused-vars*/
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import HeroContainer from './HeroContainer';
import CategoryContainer from './CategoryContainer';

const App = () => {
    return(
        <div>  
            <div className="ms-Grid"> 
                <HeroContainer />
                <h2>Browse by category</h2> 
                <CategoryContainer />
            </div>
        </div>
    );
};

export default App;
