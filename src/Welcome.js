import React, { Component } from 'react';
import './App.css';
import { parse as parseQuery } from "query-string";
import jwtDecode from "jwt-decode";
class Welcome extends Component {
  
    login = () => {
        this.props.history.push({
            pathname: '/Login'
        })
    }

    logout = () => {
        this.props.history.push({
            pathname: '/'
        })
        this.setState({username:"", authenticated:false})
    }

    constructor(props) {
        super(props);
        this.state = { username: "", authenticated: false };
    }
    
    componentDidMount() {
        if (window.location.hash) {
            const {
                id_token
            } = parseQuery(window.location.hash);
            var decodedToken = jwtDecode(id_token);
            this.setState({username:decodedToken.name, authenticated:true})
        }
    }
    render() {
        return (
            
            <div style={{padding: '50px'}}>
                <div style={{'textAlign': 'center', 'backgroundColor': '#d8e9f1'}}>
                    
                            <div style={{'paddingBottom': '10px'}}hidden= {!this.state.authenticated}>Welcome to Fortellis: {this.state.username}</div>
                            <button hidden= {this.state.authenticated} onClick={this.login} >LOGIN</button>
                            <button  hidden= {!this.state.authenticated} onClick={this.logout} >LOGOUT</button>
                    
                </div>
            </div>
        );
    }
}
export default Welcome;