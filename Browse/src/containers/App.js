/* eslint-disable import/default */
/*eslint-disable no-unused-vars*/
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import HeroContainer from './HeroContainer';
import CategoryContainer from './CategoryContainer';
//import { loadTheme } from 'office-ui-fabric-react';
/*loadTheme({
  'themePrimary': 'red'
});*/

const App = () => {
    return(
        <div>  
            <div className="ms-Grid"> 
                <HeroContainer />
                <CategoryContainer />
            </div>
        </div>
    );
};

export default App;
