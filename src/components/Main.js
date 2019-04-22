import React, {Component} from 'react';
import '../style/Main.css';

class Main extends Component{
    render(){
        if (this.props.watch){
            return <>{this.props.watchFunc}</>
        } else{
            return <>{this.props.defaultFunc}</>
        }
    }
}

export default Main;