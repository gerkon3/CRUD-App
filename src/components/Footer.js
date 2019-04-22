import React, {Component} from 'react';
import '../style/Footer.css';

class Footer extends Component{
    render(){
        return <>{this.props.footerFunc}</>
    }
}

export default Footer;