import React, { Component } from 'react';
import './App.css';
import { parse as parseQuery } from "query-string";
import jwtDecode from "jwt-decode";
import { Button } from "@cdk-uip/react-button";
import { Card } from "@cdk-uip/react-card"
import { LayoutGrid, LayoutGridCell } from "@cdk-uip/react-layout-grid";
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
                <Card style={{'textAlign': 'center', 'backgroundColor': '#d8e9f1'}}>
                    <LayoutGrid nested >
                        <LayoutGridCell style={{padding: '10px'}}span={2}>
                            <div style={{'paddingBottom': '10px'}}hidden= {!this.state.authenticated}>Welcome to Fortellis: {this.state.username}</div>
                            <Button hidden= {this.state.authenticated} onClick={this.login} >LOGIN</Button>
                            <Button  hidden= {!this.state.authenticated} onClick={this.logout} >LOGOUT</Button>
                        </LayoutGridCell>
                    </LayoutGrid>
                </Card>
            </div>
        );
    }
}
export default Welcome;