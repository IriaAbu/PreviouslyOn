import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components'
import Login from './Components/login';
import Profile from './Components/Profile';
import AllSeries from './Components/allSeries';
import Serie from './Components/serie';
import Logout from './Components/logout';
import Detail_episode from './Components/detail-episode';
import Episode_vu from './Components/episode-vu'

const Page = styled.body`
  background: #292931;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  color: lightgray;
  text-align: center;
  font-family: source-code-pro;
`
const Nav = styled.nav`
  height: 600px;
  background: url('/series.jpg');
`

const ButtonLogout = styled.button`
  float: right;
  margin-right: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  background: #ba2025;
  color: lightgray;
  font-weight: bold;
  padding: 5px 10px;
  font-size: 17px;
  letter-spacing: 1px;
  border-radius: 20px;
  text-transform: uppercase;

  &:hover {
      cursor: pointer;
      padding: 10px 15px;
  }
`

const DivTitle = styled.div`
  display: flex;
  justify-content: center;
  color: #ba2025;
  text-shadow: 0 0 10px black;
`

const Logo = styled.img`
  background: #000000b6;
  height: 200px;
  margin-top: 180px;
  padding: 10px;
  border-radius: 50px;
`

const Title = styled.h1`
  margin-top: 180px;
  font-size: 40px;
  letter-spacing: 2px;
  background: #000000b6;
  padding: 90px;
  border-radius: 50px;
`

function App() {
  return (
    <Page>
      <Nav>
        <DivTitle>
          <Logo src="/logo.png"></Logo>
          <Title>PreviouslyOn</Title>
        </DivTitle>
      </Nav>
      <a href="/logout"><ButtonLogout>Déconnexion</ButtonLogout></a>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/allSeries" component={AllSeries} />
          <Route exact path="/serie/:id" component={Serie} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/detail-episode/:id" component={Detail_episode} />
          <Route exact path="/episode-vu/:id" component={Episode_vu} />
        </Switch>
      </Router>
    </Page>
  );
}

export default App;
