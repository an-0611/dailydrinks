import React from 'react';
import PropTypes from 'prop-types';

function Header(props) {
  const { title } = props;
  return (
    <div className="header">
      <h2>{title ? title : 'DailyDrink(預設)'}</h2>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;





