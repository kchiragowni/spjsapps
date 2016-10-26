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

import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { Button, ButtonType } from 'office-ui-fabric-react/lib/Button';

import classNames from 'classnames';

//const ROWS_PER_PAGE = 3;
//const MAX_ROW_HEIGHT = 150;

class CategoriesPivot extends React.Component {
    constructor(props) {
        super(props);
        
        this._onFilterChanged = this._onFilterChanged.bind(this);

        this.state = {
            filterText: '',
            categories: props.categories,
            group: props.group,
            showDialog: false
        };
    }

    _onFilterChanged(text) {
        let { categories } = this.props;

        this.setState({
            filterText: text,
            categories: text ? categories.filter(category => category.number.toLowerCase().indexOf(text.toLowerCase()) >= 0) : categories
        });
    }

    _showDialog() {
        this.setState( {showDialog: true } );
    }

    _closeDialog() {
        this.setState( {showDialog: false } );
    }

    render() {        
        //let { categories: originalItems } = this.props;
        let { categories } = this.state.categories.length ==0 ? this.props : this.state;
        //let resultCountText = categories.length === originalItems.length ? '' : ` (${ categories.length } of ${ originalItems.length } shown)`;
        let masonaryClass = classNames({
            'masonry bordered' :  true,
            'bespoke': this.props.group === 'bespoke',
            'course': this.props.group === 'course',
            'topic': this.props.group === 'topic'
        });
        return (
            <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12 wrapper">
                <br/>
                <div className={masonaryClass}>                    
                {categories.map(category => 
                    <div key={category.ID} className="item">
                        <div className="category-content" onClick={this._showDialog.bind(this)}>
                            <h3 className="ms-fontSize-mPlus ms-fontWeight-semibold">{category.Title}</h3>
                            <div className="ms-fontSize-mPlus">{category.Description}</div>
                            <div className="ms-fontSize-mPlus ms-u-textAlignRight">
                                {category.ResourcesCount}
                            </div>
                        </div> 
                    </div>
                )}
                </div>
                <Dialog
                    isOpen={this.state.showDialog}
                    type={DialogType.close}
                    isDarkOverlay={true}
                    onDismiss={this._closeDialog.bind(this)}
                    title="All emails together"
                    subText="Your Inbox has changed. No longer does it include favorites, it is a singular destination for your emails."
                    isBlocking={true}
                    closeButtonAriaLabel="Close"
                    >
                        <div>Dialog content...</div>
                    
                </Dialog>
            </div>
        );
    }    
}

CategoriesPivot.propTypes = {
    categories: PropTypes.array.isRequired,
    group: PropTypes.string.isRequired
};

export default CategoriesPivot;
