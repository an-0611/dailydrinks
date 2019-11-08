import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
  return (
    <div className={props.className} onClick={props.callBack}>
      {props.text}
    </div>
  );
}

Button.defaultProps = {
  className: 'green',
  callBack: () => {},
};

Button.propTypes = {
  className: PropTypes.string,
  callBack: PropTypes.func,
};

export default Button;
