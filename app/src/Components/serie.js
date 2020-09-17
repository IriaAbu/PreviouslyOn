import React, { Component } from 'react'
import axios from 'axios';
import styled from 'styled-components';
import $ from 'jquery';

const SerieBody = styled.div`
    padding-bottom: 100px;
`

const SerieTitle = styled.h1`
    margin-top: 50px;
    margin-bottom: 50px;
    letter-spacing: 1px;
    font-size: 25px;
`

const ImgSerie = styled.img`
    width: 60%;
    margin-left: 10%;
`

const EachSerie = styled.div`
    display: flex;
    justify-content: space-between;
`

const Infos = styled.div`
    margin-right: 10%;
    padding-top: 30px;
    font-size: 17px;
    letter-spacing: 1px;
`
const Resume = styled.p`
    font-size: 17px;
    letter-spacing: 1px;
    margin-top: 50px;
    margin-left: 10%;
    margin-right: 10%;
`
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

const TextNonVus = styled(SerieTitle)`
    display: inline;
`

const TextVus = styled(TextNonVus)`
    display: inline-block;
    color: gray;

    &:hover {
        color: #ba2025;
    }
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

const VoirEpisode = styled.img`
    width: 30px;
    padding-top: 20px;

    &:hover {
        width: 35px;
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

class Serie extends Component {

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
                if (response.data.show.user.archived) {
                    this.setState({
                        detail: [response.data.show],
                        genres: Object.values(response.data.show.genres).join(', '),
                        status: "Archivée",
                        nbr_saisons: response.data.show.seasons,
                    })
                    $('#archive').prop('disabled', true);
                    $('#archive').css('background', 'green');
                    $('#archive').css('cursor', 'not-allowed');
                } else {
                    this.setState({
                        detail: [response.data.show],
                        genres: Object.values(response.data.show.genres).join(', '),
                        status: "Non Archivée",
                    })
                }
            });

        // Episodes non vu de chaque saison pour chaque serie
        axios.get('https://api.betaseries.com/shows/episodes?key=757a93dab831&id=' + this.state.id + '&token=' + this.state.access_token)
            .then(response => {
                this.setState({
                    allEpisodes: response.data.episodes,
                })

                for (let i = 1; i <= this.state.nbr_saisons; i++) {
                    let tmp = this.state.allEpisodes.filter(episode => {
                        if (episode.season === i && episode.user.seen === false) {
                            return episode;
                        }
                    })
                    this.state.saisons.push(tmp);
                }

                this.setState({
                    saisons: this.state.saisons
                })
            });
    }

    // Fonction archiver serie
    handleSubmitArchive = async (id, thetvdb_id) => {
        axios.post('https://api.betaseries.com/shows/archive', {
            id: id,
            thetvdb_id: thetvdb_id,
            token: localStorage.getItem("token"),
            key: '757a93dab831',
        })
            .then((response) => {
                console.log(response.data.show.user.archived, "archivé");
                window.location.reload();
            }, (error) => {
                alert("La série n'est pas archivée, êtes-vous sûr de l'avoir dans votre list ?");
            });
    }

    handleClick = async (id) => {
        window.parent.location = "/detail-episode/" + id;
    }

    handleVu = async (id) => {
        axios.post('https://api.betaseries.com/episodes/watched', {
            id: id,
            token: localStorage.getItem("token"),
            key: '757a93dab831',

        })
            .then((response) => {
                window.location.reload();

            }, (error) => {
                alert("L'episode' n'est pas marqué vu");
            });
    }

    handleVuPrec = async (id) => {
        axios.post('https://api.betaseries.com/episodes/watched', {
            id: id,
            token: localStorage.getItem("token"),
            key: '757a93dab831',
            bulk: true,

        })
            .then((response) => {
                window.location.reload();

            }, (error) => {
                alert("L'episode n'est pas marqué vu ainsi que les precedents");
            });
    }

    render() {
        return (
            <SerieBody>
                {this.state.detail.map(serie => {
                    return (
                        <div>
                            <SerieTitle>{serie.title}</SerieTitle>
                            <EachSerie>
                                <ImgSerie src={serie.images.show}></ImgSerie>
                                <Infos>
                                    <p>{serie.seasons + " Saison(s)"}</p>
                                    <p>{serie.episodes + " Épisodes"}</p>
                                    <p>{serie.length + " min"}</p>
                                    <p>{"Note : " + serie.notes.total}</p>
                                </Infos>
                            </EachSerie>
                            <p>{this.state.genres}</p>
                            <Resume>{"Resumée : " + serie.description}</Resume>
                            <Button id="archive" onClick={event => this.handleSubmitArchive(serie.id, serie.thetvdb_id)}>{this.state.status}</Button>
                            <a href="javascript:history.go(-1)"><ButtonArriere>Revenir en arrière</ButtonArriere></a>
                            <br></br>
                            <TextNonVus>Vos épisodes non vus &#x20;</TextNonVus><a href={"/episode-vu/" + serieId}><TextVus> (Vos épisodes vus )</TextVus></a>
                        </div>
                    )
                })}
                {this.state.saisons.map((saison, key) => {
                    return (
                        <Liste>
                            <TitleSaison>Saison {(parseInt(key, 10) + 1)}</TitleSaison>
                            <p style={{ textAlign: 'right', letterSpacing: '1px', color: 'gray' }}>Marquer comme vu 1 épisode<br></br>ou 1 et les précedents :</p>
                            <AllEpisodes>
                                {
                                    saison.map(episodes => {
                                        return (
                                            <InfoEpisodes>
                                                <NumberEpisode>{episodes.episode}</NumberEpisode>
                                                <TitleEpisode>{episodes.title}</TitleEpisode>
                                                <a href={episodes.resource_url} target="_blank" title="Regarder l'épisode"><VoirEpisode src="/logo.png"></VoirEpisode></a>
                                                <ButtonEpisode onClick={event => this.handleClick(episodes.id)}>Savoir+</ButtonEpisode>
                                                <ButtonEpisode onClick={event => this.handleVu(episodes.id)} >Vu</ButtonEpisode>
                                                <ButtonEpisode onClick={event => this.handleVuPrec(episodes.id)} >Vu et précedents</ButtonEpisode>
                                            </InfoEpisodes>
                                        )
                                    })
                                }
                            </AllEpisodes>
                        </Liste>
                    )
                })}
            </SerieBody>
        )
    }
}


export default Serie;