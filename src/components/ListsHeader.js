import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Button from '../common/Button';

function ListsHeader(props) {
  const {
    ableDelete,
    ableAdd,
    newListInputToggle,
    addList,
    deleteListToggle,
    deleteList,
    sortedLists,
    updateNewListStorage,
    newList,
    willDeleteListIndexArr,
    isShowAddDeleteBtn,
  } = props;
  return (
    <Fragment>
      {
        isShowAddDeleteBtn &&
        <Fragment>
          {
            !ableDelete &&
            <Button
              className={`button inline-block align-right ${ ableAdd ? 'red' : 'green'}`}
              text={ableAdd ? '取消新增' : '新增'}
              callBack={() => { newListInputToggle() }}
            />
          }
          {
            ableAdd &&
            <Button
              className="button green inline-block align-right"
              text='確定新增'
              callBack={() => { addList() }}
            />
          }
          {
            !ableAdd && sortedLists.length !== 0 &&
            <Button
              className="button red inline-block align-right"
              text={ ableDelete ? '取消動作' : '批次刪除'}
              callBack={() => { deleteListToggle() }}
            />
          }
          {
            ableDelete && willDeleteListIndexArr.length !== 0 &&
            <Button
              className="button green inline-block align-right"
              text='確定刪除'
              callBack={() => { deleteList() }}
            />
          }
        </Fragment>  
      }

      {
        ableAdd &&
        <div className="newListSection">
          <input
            type="text"
            placeholder="請輸入名稱"
            className="input-text"
            defaultValue={ newList.name }
            onChange={ (event) => { updateNewListStorage(event, 'name') }}
          />
          <input
            type="text"
            placeholder="請輸入價錢"
            className="input-text"
            defaultValue={ newList.price }
            onChange={ (event) => { updateNewListStorage(event, 'price') }}
          />
          <textarea
            type="text"
            placeholder="請輸入備註"
            className="input-text"
            defaultValue={ newList.remarks }
            onChange={ (event) => { updateNewListStorage(event, 'remarks') }}
          />
        </div>
      }
    </Fragment>
  );
}

ListsHeader.defaultProps = {
  ableAdd: false,
  ableDelete: false,
  newListInputToggle: () => {},
  addList: () => {},
  deleteListToggle: () => {},
  deleteList: () => {},
  sortedLists: [],
  updateNewListStorage: () => {},
  newList: {},
  willDeleteListIndexArr: [],
  isShowAddDeleteBtn: true,
};

ListsHeader.propTypes = {
  ableAdd: PropTypes.bool,
  ableDelete: PropTypes.bool,
  newListInputToggle: PropTypes.func,
  addList: PropTypes.func,
  deleteListToggle: PropTypes.func,
  deleteList: PropTypes.func,
  sortedLists: PropTypes.array,
  updateNewListStorage: PropTypes.func,
  newList: PropTypes.object,
  willDeleteListIndexArr: PropTypes.array,
  isShowAddDeleteBtn: PropTypes.bool,
};

export default ListsHeader;