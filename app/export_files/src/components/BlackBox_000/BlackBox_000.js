
import React, { Component } from 'react';

const divStyle = {"position":"absolute","height":"100px","width":"100px","display":"inline-block","backgroundColor":"black","overflow":"auto","left":58,"top":175}
class BlackBox extends Component {
  constructor(props){
    super(props);
  
  
  }
  
  render(){
    const { onClick } = this.props;
    return (
      <div style={divStyle}  onClick={()=>{console.log("test")}} >
        

      </div>
    );
  }
}
export default BlackBox;
