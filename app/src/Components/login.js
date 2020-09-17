import React, { Component } from 'react'
import axios from 'axios';
import md5 from 'md5';
import styled from 'styled-components';

const Section = styled.section`
    display: flex
    justify-content: center;
`

const Title = styled.h1`
    margin-top: 100px;
    font-size: 25px;
    letter-spacing: 2px;
    text-transform: uppercase;
`

const Email = styled.input`
    border-radius: 40px;
    height: 30px;
    width: 300px;
    background: #ba2025;
    border: none;
    color: lightgray;
    margin-bottom: 10px;
    text-align: center;
    letter-spacing: 1px;

    :: placeholder {
        color: lightgray;
    }
`

const Password = styled(Email)`
    background: lightgray;
    color: black;

    :: placeholder {
        color: black;
    }
`

const Button = styled.button`
    border-radius: 40px;
    height: 30px;
    width: 300px;
    background: lightgray;
    letter-spacing: 1px;
    color: #ba2025;
    font-size: 17px;
    font-weight: bold;
    margin-top: 20px;
    text-transform: uppercase;
    margin-bottom: 100px;

    &:hover {
        cursor: pointer;
        font-size: 19px;
        box-shadow: 5px 5px 5px gray;
    }
`

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            login: "",
            password: "",
        }
    }

    handleSubmitFormLogin = async (event) => {
        console.log(this.state)
        try {
            axios.post('https://api.betaseries.com/members/auth', {

                login: this.state.login,
                password: md5(this.state.password),
                key: '757a93dab831',

            })
                .then((response) => {
                    console.log(response.data);
                    if (response.data.user) {
                        localStorage.setItem('userId', response.data.user.id);
                        localStorage.setItem('login', response.data.user.login);
                        localStorage.setItem('token', response.data.token);
                        window.parent.location = "Profile";

                    }

                }, (error) => {
                    alert('Identifiants incorrects');
                });

        } catch (error) {
            console.log(error)
        }
        event.preventDefault();
    }

    handleChange = async (event) => {
        let value = event.target.value;
        let name = event.target.name;
        this.setState({
            [name]: value,
        });
    }

    render() {
        return (
            <Section >
                <Title>Connexion</Title>
                <Email type="email" id="login" name="login" placeholder="Email" value={this.state.login} onChange={event => this.handleChange(event)} />
                <br></br>
                <Password type="password" id="password" name="password" placeholder="Mot de passe" value={this.state.password} onChange={event => this.handleChange(event)} />
                <br></br>
                <Button onClick={this.handleSubmitFormLogin}>Valider</Button>
            </Section>
        )
    }
}

export default Login;
