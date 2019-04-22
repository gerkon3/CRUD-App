import React, {Component} from 'react';
import '../style/Header.css';

class Header extends Component{
    render(){
        if (this.props.headerWatch){
            return <>{this.props.headerWatchFunc}</>
        } else{
            return <>{this.props.headerDefaultFunc}</>
        }
    }
}

export default Header;