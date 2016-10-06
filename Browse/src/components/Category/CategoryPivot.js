/eslint-disable no-undef*/
import React, { PropTypes } from 'react';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Pivot, PivotItem, PivotLinkSize, PivotLinkFormat } from 'office-ui-fabric-react/lib/Pivot';
import CategoriesPivot from './CategoriesPivot';

const CategoryPivot = ({categories, category}) => {
    
    let _besokeCategories = [], //categories.filter(category => category.Group.toLowerCase() === 'bespoke');
        _courseCategories = [], 
        _topicsCategories = [];  

    let categoryValue = GetUrlKeyValue("category", false, location.href);
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

    return (
        <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">  
                <div className="">Browse by category:</div>       
                <Pivot 
                    linkFormat={PivotLinkFormat.links}  
                    linkSize={PivotLinkSize.large}
                    initialSelectedKey={categoryValue}>
                    <PivotItem 
                        linkText="Bespoke" 
                        ariaLabel="Bespoke category"
                        itemCount={_besokeCategories.length}
                        itemKey={'bespoke'}>
                        <CategoriesPivot categories={_besokeCategories} group={'bespoke'}/>
                    </PivotItem>
                    <PivotItem 
                        linkText="Course" 
                        ariaLabel="Course category"
                        itemCount={_courseCategories.length}
                        itemKey={'course'}>
                        <CategoriesPivot categories={_courseCategories} group={'course'}/>
                    </PivotItem>
                    <PivotItem 
                        linkText="Topics" 
                        ariaLabel="Topics category"
                        itemCount={_topicsCategories.length}
                        itemKey={'topic'}>
                        <CategoriesPivot categories={_topicsCategories} group={'topic'}/>
                    </PivotItem>
                </Pivot>
            </div>
        </div>
    );
};

CategoryPivot.propTypes = {
    categories: PropTypes.array.isRequired,
    category: PropTypes.string
};

export default CategoryPivot;