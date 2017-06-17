import React, { Component } from 'react';
import Auth0Lock from 'auth0-lock';
import {Grid, Row, Col} from 'react-bootstrap';
import Header from './components/Header';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {

  constructor(){
    super();
    this.state = {
      idToken: '',
      profile: {}
    }
  }

  static defaultProps = {
    clientId: 'yoxtJNWc1xhIjx39K2wQVL13tiiHwZls',
    domain: 'kunleadeyinka.auth0.com'
  }

  componentWillMount(){
    this.lock = new Auth0Lock(this.props.clientId, this.props.domain);

    //on authentication
    this.lock.on('authenticated', (authResult) => {
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if(error){
          console.log(error);
          return;
        }
        this.setData(authResult.idToken, profile);
      });
    });

    this.getData();
  }

  //sets the token and profile data
  setData(idToken, profile){
    localStorage.setItem('idToken', idToken);
    localStorage.setItem('profile', JSON.stringify(profile));
    this.setState({
      idToken: localStorage.getItem('idToken'),
      profile: JSON.parse(localStorage.getItem('profile'))
    });
  }


  //checks for token and gets the profile data
  getData(){
    if(localStorage.getItem('idToken') != null){
      this.setState({
        idToken: localStorage.getItem('idToken'),
        profile: JSON.parse(localStorage.getItem('profile'))
      }, () => {
        console.log(this.state);
      });
    }
  }

  showLock(){
    this.lock.show();
  }

  logout(){
    this.setState({
      idToken: '',
      profile: ''
    }, () => {
      localStorage.removeItem('idToken');
      localStorage.removeItem('profile');
    });
  }

  render() {

    let page;
    if(this.state.idToken){
      page = <Dashboard  lock={this.lock} idToken={this.state.idToken} profile={this.state.profile}/>
    }else{
      page = <Home />
    }

    return (
      <div className="App">
        <Header onLoginClick={this.showLock.bind(this)} onLogoutClick={this.logout.bind(this)}
                lock={this.lock} idToken={this.state.idToken} profile={this.state.profile}/>
        <Grid>
            <Row>
                <Col xs={12} md={12}>
                    {page}
                </Col>
            </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
