/*eslint-disable no-unused-vars*/
import React, { PropTypes } from 'react';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import { List, ListGrid } from 'office-ui-fabric-react/lib/List';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

import { DocumentCard,
  DocumentCardActivity,
  DocumentCardPreview,
  DocumentCardTitle,
  IDocumentCardPreviewProps,
  DocumentCardType
} from 'office-ui-fabric-react/lib/DocumentCard';
//const ROWS_PER_PAGE = 3;
//const MAX_ROW_HEIGHT = 150;

class BespokePivot extends React.Component {
    constructor(props) {
        super(props);
        
        this._onFilterChanged = this._onFilterChanged.bind(this);

        this.state = {
            filterText: '',
            categories: props.categories
        };
    }

    _onFilterChanged(text) {
        let { categories } = this.props;

        this.setState({
            filterText: text,
            categories: text ? categories.filter(category => category.number.toLowerCase().indexOf(text.toLowerCase()) >= 0) : categories
        });
    }

    render() {        
        let { categories: originalItems } = this.props;
        let { categories } = this.state.categories.length ==0 ? this.props : this.state;
        let resultCountText = categories.length === originalItems.length ? '' : ` (${ categories.length } of ${ originalItems.length } shown)`;

        let previewProps = {
            previewImages: [
                {
                name: 'Revenue stream proposal fiscal year 2016 version02.pptx',
                url: 'http://bing.com',
                previewImageSrc: '/Modules/DevOffice.Fabric/dist/document-preview.png',
                iconSrc: '/Modules/DevOffice.Fabric/dist/icon-ppt.png',
                width: 144,
                height: 106
                }
            ],
        };


        return (
            <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                <br/>
                {categories.map(category => 
                    <div className="ms-Grid-col ms-u-sm4 ms-u-md4 ms-u-lg4">
                        <DocumentCard                            
                            type={DocumentCardType.compact} 
                            onClickHref='#'
                            accentColor='#ce4b1f'
                            style={{marginBottom:'10px'}}>
                            <div className='ms-DocumentCard-details'>
                                <DocumentCardTitle
                                title= {category.number}
                                shouldTruncate={true}/>
                                <DocumentCardActivity
                                activity='Created a few minutes ago'
                                people={
                                    [
                                    { name: 'Kat Larrson', profileImageSrc: '/Modules/DevOffice.Fabric/images/persona-female.png' }
                                    ]
                                }
                                />
                            </div>
                            </DocumentCard>
                    </div>    
                )}
            </div>
        );
    }    
}

BespokePivot.propTypes = {
    categories: PropTypes.array.isRequired
};

export default BespokePivot;