import React, { Component } from 'react';
import './App.css';
import { parse as parseQuery, stringify as stringifyQuery } from "query-string";
import jwtDecode from "jwt-decode";

class Welcome extends Component {
  
    constructor(props) {
        super(props);
        this.state = { username: "" };
    }
  
    componentDidMount() {
        if (window.location.hash) {
        // we are loading up with a hash, determine if this is a login callback
            const {
            id_token
            } = parseQuery(window.location.hash);
            var decodedToken = jwtDecode(id_token);
            this.setState({username:decodedToken.name})
        }
    }
    render() {
        return (
            <div>Welcome {this.state.username}</div>
        );
    }
}
export default Welcome;