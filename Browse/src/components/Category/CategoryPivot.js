/* eslint-disable no-undef */
import React, { PropTypes } from 'react';
//import { Label } from 'office-ui-fabric-react/lib/Label';
import { Pivot, PivotItem, PivotLinkSize, PivotLinkFormat } from 'office-ui-fabric-react/lib/Pivot';
import CategoriesPivot from './CategoriesPivot';

//import ClassNames from 'classnames';

class CategoryPivot extends React.Component {
    constructor(props){
        super(props);

        this._groupSelected = this._groupSelected.bind(this);
        this.state = {
            categories: props.categories,
            query: props.query,
            groupSelected: GetUrlKeyValue("category", false, location.href)
        };
    }

    _groupSelected(item) {
        this.setState({
            groupSelected:item.props.itemKey
        });
        window.location = '?category=' + item.props.itemKey;
    }

    render(){

        let { categories } = this.state.categories.length > 0 ? this.state : this.props;
        let { query } = this.props; 
        let groupName = this.state.groupSelected !== '' ? this.state.groupSelected : 'topic';
            

        let _besokeCategories = [], //categories.filter(category => category.Group.toLowerCase() === 'bespoke');
        _courseCategories = [], 
        _topicsCategories = [];  

        //let categoryValue = GetUrlKeyValue("category", false, location.href);
        categories.forEach((category) => {
            switch(category.Group.toLowerCase()){
                case 'bespoke':
                    _besokeCategories.push(category);
                    break;
                case 'course':
                    _courseCategories.push(category);
                    break;
                case 'topic':
                    _topicsCategories.push(category);
                    break;
                default:
                    break;
            }
        });

        /*let groupStyle = ClassNames({
            categoryValue : true
        });*/

        return (
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">  
                    <div className={groupName}>
                        Browse by category:      
                        <Pivot 
                            linkFormat={PivotLinkFormat.links}  
                            linkSize={PivotLinkSize.large}
                            initialSelectedKey={groupName}
                            onLinkClick={(item) => {this._groupSelected(item);}}>
                            <PivotItem 
                                linkText="Topics" 
                                ariaLabel='Topics category'
                                itemCount={_topicsCategories.length}
                                itemKey="topic">
                                <CategoriesPivot categories={_topicsCategories} group={'topic'} query={query}/>
                            </PivotItem>
                            <PivotItem 
                                linkText="Bespoke" 
                                ariaLabel='Bespoke category'
                                itemCount={_besokeCategories.length}
                                itemKey="bespoke">
                                <CategoriesPivot categories={_besokeCategories} group={'bespoke'} query={query}/>
                            </PivotItem>
                            <PivotItem 
                                linkText="Course" 
                                ariaLabel='Course category'
                                itemCount={_courseCategories.length}
                                itemKey="course">
                                <CategoriesPivot categories={_courseCategories} group={'course'} query={query}/>
                            </PivotItem>                            
                        </Pivot>
                    </div> 
                </div>
            </div>
        );
    }   
}

CategoryPivot.propTypes = {
    categories: PropTypes.array.isRequired,
    query: PropTypes.string.isRequired,
};

export default CategoryPivot;
