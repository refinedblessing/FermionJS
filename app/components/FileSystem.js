import React, { Component } from 'react';
import {SortableTreeWithoutDndContext} from './src/index'; //'react-sortable-tree';
import SortableTree from './src/index';
import { connect } from "react-redux";
import styles from './photon.css';
import coreStyles from './Core.css';

const path = require('path')
const dirTree = require('directory-tree');

class FileTree extends Component {

  constructor(props) {
    super(props);
    this.state = {
      treeData: this.getInitial()
    }
    this.getInitial = this.getInitial.bind(this);
    this.getUpdate = this.getUpdate.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  // for flow
  props: {
    workspace: {},
    setActiveComponent: ()=> void,
  };

  getUpdate(){
    this.setState({
      treeData: this.getInitial()
    });
  }

  componentDidUpdate() {
    console.log('update');
    const newData = this.getInitial();
    const oldData = this.state.treeData;
    if(newData[0].children.length !== oldData[0].children.length){
      this.getUpdate();
    }
  }

  getInitial(){
    const treeStructure = this.props.workspace.components.workspace;
    const treeComponents = this.props.workspace.components;
    console.log('treeComponents: ', treeComponents);
    const treeData = [getTreeData(treeStructure)];
    console.log('getTD: ', treeData);
    function getTreeData(workspaceTree){
        return {
          title: 'app',
          children: getChildrenData(workspaceTree.children),
          expanded: true,
        }
    }

    function getChildrenData(childrenArray){
      const childrenArrayFinal = [];
      for (let i=0; i<childrenArray.length; i++){
        const currComponent = treeComponents[childrenArray[i]]
        const currComponentChildren = currComponent.children;
        if (currComponentChildren.length !== 0){
          childrenArrayFinal.push({
            title: currComponent.name,
            children: getChildrenData(currComponentChildren),
            expanded: true,
          });
        }
        else {
          childrenArrayFinal.push({
            title: currComponent.name,
            expanded: true,
          });
        }
      }
      return childrenArrayFinal;
    }
    return treeData;
  }
    //changes activeComponent
  handleClick (e,component) {
    this.props.setActiveComponent(component);
  }
  render() {
    const getData = this.props.workspace;
    return (
      <div style={{ height: '100%' }}>
        <SortableTreeWithoutDndContext
          treeDataRedux={getData}
          treeData={this.state.treeData}
          canDrag={false}
          onChange={(treeDataRedux)=>{ this.setState({ treeData: treeDataRedux }) }}
          handleClick={this.handleClick}
        />
        {/* <button className = {`${styles.btn} ${styles['btn-primary']} ${styles['pull-right']} ${coreStyles.btn}`} onClick={this.getUpdate}>Update</button> */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    workspace: state.workspace
  }
}


export default connect(mapStateToProps)(FileTree);
