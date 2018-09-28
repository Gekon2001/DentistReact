import React, { Component } from 'react';
import Loader from 'react-loader';

import ModalError from './ModalError'
//import '../sass/app.sass';

const fetchOptions = {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'applization/json',
        'Authorization': '2fb7050340ca459cb37339b9086f53f20e077682',
        'Host': '504080.com'
    }
}
const loaderOptions = {
    lines: 20,
    length: 20,
    width: 10,
    radius: 30,
    scale: 0.35,
    corners: 1,
    color: '#F40',
    opacity: 0.25,
    rotate: 0,
    direction: 1,
    speed: 1,
    trail: 60,
    fps: 20,
    zIndex: 2e9,
    //top: '50%',
    //left: '50%',
    shadow: false,
    hwaccel: false,
    position: 'relative' //absolute fixed
}
const url = "http://504080.com/api/v1/services/categories"

class Services extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            data: [],
            dataErr: false
        };
    }

    listOfServices = () => (
        this.state.data && this.state.data.map(item => (
            <li key={item.id} className="service-item">
                <img className="service-item__img" src={item.icon} alt={item.title}/>
                <div className="service-item__name">{item.title}</div>
            </li>
        ))    
    )

    componentDidMount(){
        fetch(url, fetchOptions).then(function(response) {
            return response.json();
        }).then( response => {

            if (response.success) {
                this.setState({
                    loaded: true,
                    data: response.data,
                    dataErr: false
                });
            } else {
                console.log(response.data)
                this.setState({
                    loaded: true,
                    data: response.data,
                    dataErr: response.error                    
                })
            }})
        .catch( error => {console.error(error)})  
    }
  render() {
  	return (
        <div className="service">
            <div className="service__header clearfix">
                <h1>Service Directory</h1>
                <a href="#" className="btn">
                    Add New Service
                </a>
            </div>  
            <div className={this.state.dataErr ? "service__list disconnect" : "service__list"}>
                <Loader 
                    loaded={this.state.loaded} 
                    options={loaderOptions} 
                    className="spinner">
                    <ul>
                        {this.listOfServices()}    
                    </ul>
                    {this.state.dataErr && <ModalError error={this.state.dataErr}/>}
                </Loader>
            </div>
        </div>
    )
  }
}

export default Services;