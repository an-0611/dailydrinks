import React, { Component } from 'react';

import List from '../components/List';
import ListsHeader from '../components/ListsHeader';
import ListsFooter from '../components/ListsFooter';

import { originQuickSort, ascQuickSort, descQuickSort } from '../commonFunc/Sort';

class MainSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [
        {
          "id": 0,
          "name": "訂單1",
          "price": 25,
          "remarks": "紅茶1杯 綠茶1杯",
          "status": false, // false 不可修改 、 true可修改
          "deleteStatus": false, // false 不可刪除 、 true可刪除
        },
        {
          "id": 1,
          "name": "訂單2",
          "price": 50,
          "remarks": "紅茶2杯 綠茶2杯",
          "status": false,
          "deleteStatus": false,
        },
        {
          "id": 2,
          "name": "訂單3",
          "price": 75,
          "remarks": "紅茶3杯 綠茶3杯",
          "status": false,
          "deleteStatus": false,
        },
        {
          "id": 3,
          "name": "訂單4",
          "price": 100,
          "remarks": "紅茶4杯 綠茶4杯",
          "status": false,
          "deleteStatus": false,
        },
        {
          "id": 4,
          "name": "訂單5",
          "price": 125,
          "remarks": "紅茶5杯 綠茶5杯",
          "status": false,
          "deleteStatus": false,
        }
      ],
      sortType: 'origin',
      newList: { // 新list暫存
        name: '',
        price: 0,
        remarks: '',
      },
      ableAdd: false,
      ableDelete: false,
      willDeleteListIndexArr: [],
      isResetCheck: false,
      isShowAddDeleteBtn: true,
    };
  }

  componentDidMount() {
    this.mounted = true;
  }

  changeSortType = (newSortType) => {
    if (!this.mounted) return;
    const { sortType } = this.state;
    if (newSortType === sortType) return;
    this.setState(() => ({
      sortType: newSortType,
    }));
  }

  newListInputToggle = () => {
    if (!this.mounted) return;
    const { ableAdd } = this.state;
    this.setState(() => ({
      ableAdd: !ableAdd,
      newList: {},
    }))
  }

  deleteListToggle = () => {
    if (!this.mounted) return;
    const { ableDelete } = this.state;
    this.setState(() => ({
      ableDelete: !ableDelete,
      willDeleteListIndexArr: [],
    }));
    if (ableDelete) this.resetChecked();
  }

  resetChecked = () => {
    this.setState(() => ({
      isResetCheck: true,
    }), () => {
      this.setState(() => ({
        isResetCheck: false,
      }))
    })
  }

  updateNewListStorage = (event, type) => {
    if (!this.mounted) return;
    const { newList } = this.state;
    newList[type] = event.target.value;
    this.setState(() => ({
      newList,
    }))
  }

  updateDeleteIndex = (id) => {
    if (!this.mounted) return;
    if (this.state.willDeleteListIndexArr.indexOf(id) === -1) {
      this.setState(() => ({
        willDeleteListIndexArr: [...this.state.willDeleteListIndexArr, id],
      }))
    } else {
      const repeatIndex = this.state.willDeleteListIndexArr.findIndex((item) => {
        return item === id;
      })
      if (repeatIndex >= 0) {
        this.state.willDeleteListIndexArr.splice(repeatIndex, 1);
        this.setState(() => ({
          willDeleteListIndexArr: [...this.state.willDeleteListIndexArr]
        }))
      }
    }
  }

  addList = () => {
    if (!this.mounted) return;
    const { lists, newList } = this.state;
    const lastId = lists.length !== 0 ? lists[lists.length - 1].id : 0;
    this.setState(() => ({
      lists: [...lists, {
        id: lastId + 1,
        name: newList.name,
        price: newList.price,
        remarks: newList.remarks,
        status: false,
        deleteStatus: false,
      }],
      // reduction status
      ableAdd: false,
      newList: {},
    }))

    setTimeout(() => {
      this.listBody.scrollTo({
        top: this.listBody.scrollHeight,
        behavior: 'smooth'
      })
    }, 0);
  }

  deleteList = () => {
    if (!this.mounted) return;
    const { lists, willDeleteListIndexArr } = this.state;
    let temp = lists.slice(0);
    if (willDeleteListIndexArr.length > 0) {
      willDeleteListIndexArr.forEach((item) => {
        const sameIndex = temp.findIndex((list) => {
          return list.id === item;
        })
        if (sameIndex >= 0) temp.splice(sameIndex, 1);
      })
      
      this.setState(() => ({
        lists: [...temp],
        ableDelete: false,
        willDeleteListIndexArr: [],
      }))
    }
  }

  modifyLists = (data) => {
    if (!this.mounted) return;
    const { lists } = this.state;
    const { id } = data;
    let temp = lists.slice(); // unuse redux sideEffect
    const sameIndex = lists.findIndex((list) => { return list.id === id });
    if (sameIndex >= 0) {
      temp[sameIndex] = data;
    } else {
      // addList　也可在這邊新增List
    }
    this.setState({ lists: temp })
  }

  showAddDeleteBtn = (isListModifing) => {
    if (!this.mounted) return;
    this.setState(() => ({
      isShowAddDeleteBtn: isListModifing,
    }))
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const { lists, sortType, ableAdd, newList, ableDelete, willDeleteListIndexArr, isResetCheck, isShowAddDeleteBtn } = this.state;
    let sortedLists = [];
    switch (sortType) {
      case 'asc':
        sortedLists = ascQuickSort(lists);
      　break;
      case 'desc':
        sortedLists = descQuickSort(lists);
      　break;
      default:
        sortedLists = originQuickSort(lists);
    }

    return (
      <div className="mainSection">
        <ListsHeader
          ableDelete={ableDelete}
          ableAdd={ableAdd}
          newListInputToggle={this.newListInputToggle}
          addList={this.addList}
          deleteListToggle={this.deleteListToggle}
          deleteList={this.deleteList}
          sortedLists={sortedLists}
          updateNewListStorage={this.updateNewListStorage}
          newList={newList}
          willDeleteListIndexArr={willDeleteListIndexArr}
          isShowAddDeleteBtn={isShowAddDeleteBtn}
        />

        <div className="listsBox">
          <div className="listsHeader">
          <div className="item">編號</div>
            <div className="item">名稱</div>
            <div className="item">總價錢</div>
            <div className="item">備註</div>
            <div className="item">狀態</div>
          </div>

          <div className="listsBody" ref={(section) => { this.listBody = section;} }>
            { sortedLists.length === 0 && <div>目前沒有任何訂單</div>}
            { sortedLists.length > 0 &&
              sortedLists.map((list) => (
                <List
                  key={list.id} // can't duplicate // state will duplicate
                  lists={lists}
                  list={list}
                  modifyLists={this.modifyLists}
                  ableAdd={ableAdd}
                  ableDelete={ableDelete}
                  updateDeleteIndex={this.updateDeleteIndex}
                  isResetCheck={isResetCheck}
                  showAddDeleteBtn={this.showAddDeleteBtn}
                />
              ))
            }
          </div>
          <ListsFooter sortType={sortType} changeSortType={this.changeSortType} />

        </div>

      </div>
    );
  }
}

export default MainSection;