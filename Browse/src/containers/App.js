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
                 <br/>
                 <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                        <h2 className="ms-font-xl">Browse by Category</h2>
                    </div>
                </div>
                <hr/>
                <CategoryContainer />
            </div>
        </div>
    );
};

export default App;