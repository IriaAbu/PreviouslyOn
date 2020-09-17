import React, { Component } from 'react'
import styled from 'styled-components';
import axios from 'axios';

const Title = styled.h1`
    margin-top: 100px;
    font-size: 25px;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding-bottom: 40px;
    margin-bottom: 40px;
    border-bottom: #ba2025 1px solid;
    margin-left: 10%;
    margin-right: 10%;
`

const DivAllSeries = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 50px;
`

const ImgAS = styled.img`
    width: 60%;
    height: auto;
    margin-left: 10%;
`

const DivInfos = styled.div`
    margin-top: 50px;
    margin-right: 10%
`

const SerieTitle = styled.h3`
    letter-spacing: 1px;
    font-size: 25px;
`

const ButtonAjouter = styled.button`
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

const ButtonDetails = styled(ButtonAjouter)`

`

const ButtonCompte = styled(ButtonAjouter)`
    margin-bottom: 50px;
    text-transform: none;
`

class AllSeries extends Component {

    state = {
        series: [],
    }

    componentDidMount() {
        axios.get('https://api.betaseries.com/shows/list?key=757a93dab831')
            .then(response => {
                console.log("result", response.data)
                this.setState({
                    series: response.data.shows,
                })
                console.log(this.state.series, "alllllll")

            });

    }

    // Fonction ajout serie
    handleSubmitAjout = async (id) => {
        axios.post('https://api.betaseries.com/shows/show', {
            id: id,
            token: localStorage.getItem("token"),
            key: '757a93dab831',
        })
            .then((response) => {
                window.parent.location = "Profile";
            }, (error) => {
                alert("La série n'est pas ajoutée");
            });

    }

    render() {
        return (
            <section id="profile">
                <Title>Voici quelques idées pour toi, {localStorage.getItem("login")}</Title>
                <a href="/profile"><ButtonCompte>Revenir à ma liste</ButtonCompte></a>
                {this.state.series.map(serie => {
                    return (
                        <DivAllSeries>
                            <ImgAS src={serie.images.show}></ImgAS>
                            <DivInfos>
                                <SerieTitle>{serie.title}</SerieTitle>
                                <ButtonAjouter onClick={event => this.handleSubmitAjout(serie.id)}>Ajouter</ButtonAjouter>
                                <br></br>
                                <a href={'serie/' + serie.id}><ButtonDetails>Détails</ButtonDetails></a>
                            </DivInfos>
                        </DivAllSeries>
                    )
                })}
            </section>
        )
    }
}

export default AllSeries;
