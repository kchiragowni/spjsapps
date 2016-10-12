import React, {PropTypes} from 'react';

const formTextInput = (props) => {
  const handleChange = (e) => {
    props.onChange(props.name, e.target.value);
  };

  return (
    <input
      className="ms-SearchBox-field"
      type="text"
      placeholder={props.placeholder}
      value={props.value}
      onChange={handleChange}
      onFocus={props.onFocus}
      onBlur={props.onBlur}/>
  );
};

formTextInput.propTypes = {
  name: PropTypes.string.isRequired,
  //styleName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

export default formTextInput; 