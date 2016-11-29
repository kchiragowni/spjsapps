import React, { PropTypes } from 'react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { Button, ButtonType } from 'office-ui-fabric-react/lib/Button';
//import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { TagPicker } from 'office-ui-fabric-react/lib/Pickers';
import { FocusTrapZone } from 'office-ui-fabric-react/lib/FocusTrapZone';
import { Label } from 'office-ui-fabric-react/lib/Label';

class AdvancedSearch extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      categories: Object.assign({}, props.categories),
      showDialog: false,
      searchText: '',
      bespokeKey: '',
      courseKey:'',
      levelKey:'',
      typeKey:'',
      isBespokeVisible: false,
      isCourseVisible: false,
      isTopicVisible: false,
      isLevelVisible: false,
      isResourceTypeVisible: false,
      thisSite: 'https%3A%2F%2Fcambridgeassessment%2Esharepoint%2Ecom%2Fsites%2Fcan'
    };
    this._showDialog = this._showDialog.bind(this);
    this._getErrorMessage = this._getErrorMessage.bind(this);
  }

  componentWillReceiveProps(nextPrpos) {
        this.setState({
            categories: nextPrpos.categories
        });
    }

  _onChangedKeyword(text){
    this.setState({
        searchText: text
    });  
  }

  _getErrorMessage(value){
      return value.length == 0 ? 'The length of the input value should be greater than 3' : ''; 
  }
  _onchangedBespoke(object){
      this.setState({
          bespokeKey: object.key
      });
  }

  _onChangedCourse(object){
      this.setState({
          courseKey: object.key
      });
  }

  _onChangedResourseLevel(object){
      this.setState({
          levelKey: object.key
      });
  }

  _showDialog() {
    this.setState( {showDialog: true } );
  }

  _closeDialog() {
    this.setState( {showDialog: false } );
  }

  _onChoiceChanged() {
    console.log( 'Choice option change' );
  }

  _performSearch(){
      window.location.href = `/sites/can/_layouts/15/osssearchresults.aspx?u=${this.state.thisSite}&k=${this.state.searchText}%20owstaxIdCourse:'GTSet|#${this.state.courseKey}&refinementfilters='filetype:equals("pdf")'`;
  }

   _onFilterChanged(filterText, tagList) {
    let _resourceTypeTags = [
            'Word',
            'PDF',
            'Excel',
            'Powerpoint'
            ].map(item => ({ key: item, name: item }));
    return filterText ? _resourceTypeTags.filter(tag => tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0).filter(item => !this._listContainsTag(item, tagList)) : [];
  }

  _onTopicFilterChanged(filterText, tagList) {
    let { categories } = this.state;
    let _topicsTags = categories.filter(category => category.Group.toLowerCase() === 'topic').map(category => ({ key: category.MetaID, name: category.Title }));
    return filterText ? _topicsTags.filter(tag => tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0).filter(item => !this._listContainsTag(item, tagList)) : [];
  }

  _onResourceLevelFilterChanged(filterText, tagList) {
    let { categories } = this.state;
    let _resourceLevelTags = categories.filter(category => category.Group.toLowerCase() === 'resource level').map(category => ({ key: category.MetaID, name: category.Title }));
    
    return filterText ? _resourceLevelTags.filter(tag => tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0).filter(item => !this._listContainsTag(item, tagList)) : [];
  }

  _listContainsTag(tag, tagList) {
    if (!tagList || !tagList.length || tagList.length === 0) {
      return false;
    }
    return tagList.filter(compareTag => compareTag.key === tag.key).length > 0;
  }

  render() {
    const linkDivStyle = {
            marginTop: '5px',
            marginLeft: '-20px'
    };

    let {isBespokeVisible: bespokeVisible, isCourseVisible: courseVisible, 
            isLevelVisible: levelVisible, isResourceTypeVisible: resourceTypeVisible, 
            isTopicVisible: topicVisible} = this.state;
    
    return (
        <div>
            <form autoComplete="off" autoCorrect="off">
                <div className="ms-Grid-col ms-u-sm8 ms-u-md8 ms-u-lg8">
                    <Button 
                        description="Opens the Advanced Search Dialog" 
                        buttonType= {ButtonType.normal}
                        onClick={(ev) => {
                            ev.preventDefault();
                            // clear basic search                              
                            this._showDialog();}}
                        onLayerMounted={( )=> {return true;}}
                        >
                        Advanced Search
                    </Button>
                    <Dialog
                        isOpen={this.state.showDialog}
                        type={DialogType.normal}
                        onDismiss={this._closeDialog.bind(this)}
                        title="Advanced Search"
                        subText="Find resources that have.."
                        isBlocking={true}
                        isDarkOverlay={true}
                        containerClassName="ms-dialogMainOverride"
                    >
                    <TextField
                        placeholder="Search with keywords" 
                        ariaLabel="Please enter text here" 
                        required={true}
                        onChanged={this._onChangedKeyword.bind(this)} 
                    />
                    <Toggle
                        checked={bespokeVisible}
                        label="Select Bespoke"
                        disabled={courseVisible}
                        onChanged={isBespokeVisible => this.setState({ isBespokeVisible })}
                        onText="No"
                        offText="Yes" />
                    {(() => {
                        let { isBespokeVisible } = this.state;
                        if (isBespokeVisible) {
                            let { categories } = this.state;
                            let _bespokeOptions = categories.filter(category => category.Group.toLowerCase() === 'bespoke').map(category => ({ key: category.MetaID, text: category.Title }));
                            return (
                                <Dropdown
                                    options={_bespokeOptions}
                                    onChanged={this._onchangedBespoke.bind(this)}
                                />
                            );
                        }
                    })()}
                    <Toggle
                        checked={courseVisible}
                        label="Select Course"
                        disabled={bespokeVisible}
                        onChanged={isCourseVisible => this.setState({ isCourseVisible })}
                        onText="No"
                        offText="Yes" />
                     {(() => {
                        let { isCourseVisible } = this.state;
                        if (isCourseVisible) {
                             let { categories } = this.state;
                            let _courseOptions = categories.filter(category => category.Group.toLowerCase() === 'course').map(category => ({ key: category.MetaID, text: category.Title }));
                            return (
                                <Dropdown
                                    label="Course:"
                                    options={ _courseOptions }
                                    onChanged={this._onChangedCourse.bind(this)}
                                />
                            )
                        }
                     })()}
                     <Label>Select Topics</Label>
                    <FocusTrapZone isClickableOutsideFocusTrap={true} forceFocusInsideTrap={false}>
                        <TagPicker 
                            onResolveSuggestions={this._onTopicFilterChanged.bind(this)}
                            getTextFromItem= {(item) => { return item.name;}}
                            pickerSuggestionsProps={
                                {
                                    suggestionsHeaderText: 'Suggested Topics',
                                    noResultsFoundText: 'No Topics Tag Found',
                                    loadingText: 'Loading topics..'
                                }
                            }
                        />
                    </FocusTrapZone>
                    <Label>Select Resource level</Label>
                    <FocusTrapZone isClickableOutsideFocusTrap={true} forceFocusInsideTrap={false}>
                        <TagPicker
                            onResolveSuggestions={this._onResourceLevelFilterChanged.bind(this)}
                            getTextFromItem= {(item) => { return item.name; }}
                            pickerSuggestionsProps={
                                {
                                    suggestionsHeaderText: 'Suggested Tags',
                                    noResultsFoundText: 'No File type Tags Found',
                                    loadingText: 'Loading levels..'
                                }
                            }
                        />
                    </FocusTrapZone>
                    <Toggle
                        checked={resourceTypeVisible}
                        label="Select Resource type"
                        onChanged={isResourceTypeVisible => this.setState({ isResourceTypeVisible })}
                        onText="Visible"
                        offText="Hidden" />
                     {(() => {
                        let { isResourceTypeVisible } = this.state;
                        if (isResourceTypeVisible) {
                            return (      
                                <FocusTrapZone isClickableOutsideFocusTrap={true} forceFocusInsideTrap={false}>
                                    <TagPicker
                                        onResolveSuggestions={this._onFilterChanged.bind(this)}
                                        getTextFromItem= {(item) => { return item.name; }}
                                        pickerSuggestionsProps={
                                            {
                                                suggestionsHeaderText: 'Suggested Tags',
                                                noResultsFoundText: 'No File type Tags Found'
                                            }
                                        }
                                    />
                                </FocusTrapZone>
                            );
                        }
                     }
                     )()}
                    <DialogFooter>
                        <Button buttonType={ButtonType.primary} onClick={this._performSearch.bind(this)}>Search</Button>
                        <Button onClick={this._closeDialog.bind(this)}>Cancel</Button>
                    </DialogFooter>
                    </Dialog>
                </div>
                <div className="ms-Grid-col ms-u-sm4 ms-u-md4 ms-u-lg4 ms-u-textAlignLeft" style={linkDivStyle}>
                    <Link
                        href="/sites/can/SitePages/Search-Tips.aspx">
                        <i className="ms-Icon ms-Icon--Help ms-font-xs" aria-hidden="true"></i> search tips 
                    </Link>
                </div>
            </form>
        </div>
    );
  }
}

AdvancedSearch.propTypes = {
    categories: PropTypes.array.isRequired
};

export default AdvancedSearch;
