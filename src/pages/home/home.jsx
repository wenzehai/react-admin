import React, {Component} from 'react';
// import { Checkbox} from 'antd';
import * as T from 'TMap';

/*
* 首页路由
*
*
* */
/*const CheckboxGroup = Checkbox.Group;
const plainOptions = ['Apple', 'Pear', 'Orange'];
const defaultCheckedList = ['Apple', 'Orange'];*/

  const zoom = 12;
export default class Home extends Component {

  onLoad = () => {
      this.map = new T.Map('mapDiv', {
        projection: 'EPSG:4326'
      });
      this.map.centerAndZoom(new T.LngLat(116.40769, 39.89945), zoom);
  };

  componentDidMount() {
    this.onLoad()
  }

  render() {
    return (
      <div>
        <div id="mapDiv" style={{width: '600px', height: '500px'}}>
        </div>
      </div>
    );
  }
}