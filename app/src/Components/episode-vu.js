import React, { Component } from 'react'
import axios from 'axios';
import styled from 'styled-components';

const Button = styled.button`
    background: #ba2025;
    color: lightgray;
    font-weight: bold;
    padding: 5px 10px;
    font-size: 17px;
    letter-spacing: 1px;
    border-radius: 20px;
    margin-bottom: 100px;
    margin-top: 50px;

    &:hover {
        cursor: pointer;
        padding: 10px 15px;
    }
`

const ButtonArriere = styled(Button)`
    margin-left: 10%;
`

const Liste = styled.div`
    text-align: left;
    margin-left: 10%;
    margin-right: 10%;
    margin-bottom: 50px;
`
const TitleSaison = styled.h1`
    color: #ba2025;
`

const AllEpisodes = styled.div`
    border-top: 1px gray solid;
    border-radius: 10px;
    padding-top: 20px;
`

const InfoEpisodes = styled.div`
    display: flex;
    justify-content: space-between;
`

const NumberEpisode = styled.p`
    margin-left: 10%;

    @media (max-width: 1500px) {
        margin-left: 5%;
    }
`

const TitleEpisode = styled.h3`
    font-size: 20px;
    letter-spacing: 2px;
    width: 60%;

    @media (max-width: 1500px) {
        width: 40%;
        text-align: center;
    }
`

const ButtonEpisode = styled.button`
    background: transparent;
    border: none;
    color: lightgray;
    letter-spacing: 1px;
    font-size: 15px;
    border-left: 1px #80808071 solid;
    padding-left: 20px;

    &:hover {
        cursor: pointer;
        color: #ba2025;
    }
`

let splitURL = window.location.href.split('/');
let serieId = splitURL[4];
class Episode_vu extends Component {

    state = {
        id: serieId,
        detail: [],
        genres: [],
        access_token: localStorage.getItem("token"),
        status: "",
        allEpisodes: [],
        nbr_saisons: "",
        saisons: [],
    };

    componentDidMount() {

        axios.get('https://api.betaseries.com/shows/display?key=757a93dab831&id=' + this.state.id + '&access_token=' + this.state.access_token)
            .then(response => {
                this.setState({
                    nbr_saisons: response.data.show.seasons
                })
            });

        // Episodes non vu de chaque saison pour chaque serie
        axios.get('https://api.betaseries.com/shows/episodes?key=757a93dab831&id=' + this.state.id + '&token=' + this.state.access_token)
            .then(response => {
                this.setState({
                    allEpisodes: response.data.episodes,
                })

                for (let i = 1; i <= this.state.nbr_saisons; i++) {
                    let tmp = this.state.allEpisodes.filter(episode => {
                        if (episode.season === i && episode.user.seen === true) {
                            return episode;
                        }
                    }
                    )
                    this.state.saisons.push(tmp);
                }
                this.setState({
                    saisons: this.state.saisons
                })
                console.log(this.state.saisons, "saisons");
            });
    }

    handleNonVu = async (id) => {

        axios.delete('https://api.betaseries.com/episodes/watched?key=757a93dab831&id=' + id + '&token=' + this.state.access_token)
            .then((response) => {
                window.location.reload();
            }, (error) => {
                alert("L'episode' n'est pas demarqué vu");
            });
    }

    render() {
        return (
            <Liste>
                <a href={"/serie/" + serieId}><ButtonArriere>Revenir en arrière</ButtonArriere></a>
                {this.state.saisons.map((saison, key) => {
                    return (
                        <div>
                            <TitleSaison>Saison {(parseInt(key, 10) + 1)}</TitleSaison>
                            <p style={{ textAlign: 'right', letterSpacing: '1px', color: 'gray' }}>Marquer comme non-vu :</p>
                            <AllEpisodes>
                                {
                                    saison.map(episodes => {
                                        return (
                                            <InfoEpisodes>
                                                <NumberEpisode>{episodes.episode}</NumberEpisode>
                                                <TitleEpisode>{episodes.title}</TitleEpisode>
                                                <ButtonEpisode onClick={event => this.handleNonVu(episodes.id)}>Non Vu</ButtonEpisode>
                                            </InfoEpisodes>
                                        )
                                    })
                                }
                            </AllEpisodes>
                        </div>
                    )
                })}
            </Liste>
        )
    }
}

export default Episode_vu;