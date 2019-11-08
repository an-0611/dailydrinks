import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Button from '../common/Button';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ableModify: false,
      tempStorage: {},
      deleteStatus: props.list.deleteStatus,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.isResetCheck && state.deleteStatus) {
      // console.log(props.isResetCheck, state.deleteStatus)
      return {
        deleteStatus: false,
      }
    }
    return null;
  }

  componentDidMount() {
    this.mounted = true;
  }

  changeStatus = () => { // 修改取消用同一個
    if (!this.mounted) return;
    const { ableModify } = this.state;
    const { modifyLists, list, showAddDeleteBtn } = this.props;
    const { id, name, price, remarks, status, deleteStatus } = list;
    modifyLists({
      id,
      name,
      price,
      remarks,
      status: !status,
      deleteStatus,
    });
    this.setState(() => ({
      ableModify: !ableModify,
      tempStorage: {},
    }))
    !ableModify ? showAddDeleteBtn(false) : showAddDeleteBtn(true)
  }

  changeDeleteStatus = () => {
    if (!this.mounted) return;
    const { deleteStatus } = this.state;
    const { list, updateDeleteIndex } = this.props;
    const { id } = list;
    this.setState(() => ({
      deleteStatus: !deleteStatus,
    }), () => {
      updateDeleteIndex(id);
    })
  }

  updateTempStorage = (event, type) => {
    if (!this.mounted) return;
    const { tempStorage } = this.state;
    tempStorage[type] = event.target.value;
    this.setState(() => ({
      tempStorage,
    }))
  }

  updateList = () => {
    if (!this.mounted) return;
    const { tempStorage } = this.state;
    const { modifyLists, list, showAddDeleteBtn } = this.props;
    const { id, name, price, remarks, deleteStatus } = list;
    modifyLists({
      id,
      name: tempStorage['name'] ? tempStorage['name'] : name,
      price: tempStorage['price'] ? tempStorage['price'] : price,
      remarks: tempStorage['remarks'] ? tempStorage['remarks'] : remarks,
      status: false,
      deleteStatus,
    });
    this.setState(() => ({
      ableModify: false,
      tempStorage: {},
    }))
    showAddDeleteBtn(true)
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const { ableModify, deleteStatus } = this.state;
    const { list, ableAdd, ableDelete } = this.props;
    return (
      <Fragment>
        <div className="listContainer">
          {
            ableDelete && <input type="checkbox" className="deleteInput" value="" onClick={ () => { this.changeDeleteStatus() }} onChange={ () => { }} checked={ deleteStatus } />
          }
          <div className="item drinkId">{ list.id }</div>
          <div className="item drinkName">
            {
              !ableModify ? list.name :
              <input
                type="text"
                placeholder="請輸入名稱"
                className="input-text"
                defaultValue={ list.name }
                onChange={ (event) => { this.updateTempStorage(event, 'name') }}
              />
            }
          </div>
          
          <div className="item drinkPrice">
            {
              !ableModify ? `${list.price} 元` :
              <input
                type="text"
                placeholder="請輸入價錢"
                className="input-text"
                defaultValue={ list.price }
                onChange={ (event) => { this.updateTempStorage(event, 'price') }}
              />
            }
          </div>

          <div className="item">
            {
              !ableModify ? list.remarks :
              <textarea
                type="text"
                placeholder="請輸入價錢"
                className="input-text"
                defaultValue={ list.remarks }
                onChange={ (event) => { this.updateTempStorage(event, 'remarks') }}
              />
            }
          </div>
          <div className="item drinkStatus">
            {
              list.status &&
              <Fragment>
                <Button
                  className="button red inline-block align-right"
                  text="保存"
                  callBack={() => { this.updateList() }}
                />
                <Button
                  className="button red inline-block align-right"
                  text="取消"
                  callBack={() => { this.changeStatus() }}
                />
              </Fragment>
            }
            { !list.status && !ableDelete && !ableAdd &&
              <Button
                className="button red inline-block align-right"
                text="修改"
                callBack={() => { this.changeStatus() }}
              />
            }
          </div>
        </div>
      </Fragment>
    );
  }
}

List.defaultProps = {
  lists: [],
  showAddDeleteBtn: () => {},
};

List.propTypes = {
  lists: PropTypes.array.isRequired,
  showAddDeleteBtn: PropTypes.func,
};

export default List;