import React, { PropTypes } from 'react';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Pivot, PivotItem, PivotLinkSize, PivotLinkFormat } from 'office-ui-fabric-react/lib/Pivot';
import BespokePivot from './BespokePivot';

const CategoryPivot = ({categories}) => {
    return (
        <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">        
                <Pivot linkFormat={ PivotLinkFormat.links}  linkSize={ PivotLinkSize.large }>
                    <PivotItem linkText='Bespoke' ariaLabel="Bespoke category">
                        <BespokePivot categories={categories}/>
                    </PivotItem>
                    <PivotItem linkText='Course' ariaLabel="Course category">
                        <Label>Pivot #2</Label>
                    </PivotItem>
                    <PivotItem linkText='Topics' ariaLabel="Topics category">
                        <Label>Pivot #3</Label>
                    </PivotItem>
                </Pivot>
            </div>
        </div>
    );
};

CategoryPivot.propTypes = {
    categories: PropTypes.array.isRequired
};

export default CategoryPivot;