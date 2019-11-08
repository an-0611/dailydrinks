import React from 'react';
import PropTypes from 'prop-types';

import Button from '../common/Button';

function ListsFooter(props) {
  const { sortType, changeSortType } = props;
  return (
    <div className="listsFooter">
        <Button
          className={`sortBtn button red inline-block align-right ${sortType === 'origin' ? 'selected' : '' }`}
          text="按訂單成立時間"
          callBack={() => { changeSortType('origin') }}
        />
        <Button
          className={`sortBtn button red inline-block align-right ${sortType === 'asc' ? 'selected' : '' }`}
          text="價格低到高"
          callBack={() => { changeSortType('asc') }}
        />
        <Button
          className={`sortBtn button red inline-block align-right ${sortType === 'desc' ? 'selected' : '' }`}
          text="價格高到低"
          callBack={() => { changeSortType('desc') }}
        />
      </div>
  );
}

ListsFooter.defaultProps = {
  changeSortType: () => {},
};

ListsFooter.propTypes = {
  sortType: PropTypes.string,
  changeSortType: PropTypes.func,
};

export default ListsFooter;