import React, { Component } from 'react'
import axios from 'axios';
import styled from 'styled-components';

const Section = styled.section`
    padding-bottom: 100px;
`

const Title = styled.h1`
    margin-top: 100px;
    margin-bottom: 100px;
    font-size: 25px;
    letter-spacing: 2px;
    text-transform: uppercase;
`

const Text = styled.p`
    color: lightgray;
    font-size: 20px;
    padding-bottom: 40px;
    margin-bottom: 40px;
    border-bottom: #ba2025 1px solid;
    margin-left: 10%;
    margin-right: 10%;
    letter-spacing: 1px;
`

const Serie = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 50px;
    
    &:hover {
        border: 1px solid gray;
        margin: 40px;
        padding: 40px;
        box-shadow: 5px 10px 10px gray;
    }
`

const Img = styled.img`
    margin-left: 10%;

    @media (max-width: 2000px) {
        height: 400px;
    }

    @media (max-width: 1500px) {
        height: 300px;
    }

    @media (max-width: 1100px) {
        height: 200px;
    }
`
const SerieTitle = styled.p`
    margin-top: 90px;
    width: 30%;
    margin-right: 10%;
    letter-spacing: 1px;
    
    @media (max-width: 2000px) {
        font-size: 40px;
    }

    @media (max-width: 1500px) {
        font-size: 30px;
    }

    @media (max-width: 1100px) {
        font-size: 20px;
    }
`

const Button = styled.button`
    background: #ba2025;
    color: lightgray;
    font-weight: bold;
    padding: 5px 10px;
    font-size: 17px;
    letter-spacing: 1px;
    border-radius: 20px;

    &:hover {
        cursor: pointer;
        padding: 10px 15px;
    }
`

class Profile extends Component {

    state = {
        id: localStorage.getItem("userId"),
        series: [],
    }

    componentDidMount() {
        axios.get('https://api.betaseries.com/shows/member?key=757a93dab831&id=' + this.state.id)
            .then(response => {
                console.log("result", response.data)
                this.setState({
                    series: response.data.shows,
                })
            })
    }

    render() {
        return (
            <Section id="profile">
                <Title>Welcome {localStorage.getItem("login")}</Title>
                <Text>Ce que tu regardes en ce moment :</Text>
                <div>
                    {this.state.series.map(serie => {
                        return (
                            <a href={'serie/' + serie.id} style={{ color: 'lightgray', textDecoration: 'none' }}><Serie>
                                <Img src={serie.images.show}></Img>
                                <SerieTitle>{serie.title}</SerieTitle>
                            </Serie></a>
                        )
                    })}
                </div>
                <div className="my-events">
                </div>
                <a href="/allSeries"><Button>Ajouter d'autres séries</Button></a>
            </Section>
        )
    }
}

export default Profile;
