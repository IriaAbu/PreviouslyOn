import React, { Component } from 'react'
import axios from 'axios';
import styled from 'styled-components';
import $ from 'jquery';


const EpisodeTitle = styled.h1`
    margin-top: 50px;
    margin-bottom: 50px;
    letter-spacing: 1px;
    font-size: 25px;
`

const ImgEpisode = styled.img`
    width: 500px;
    margin-left: 10%;
    display: inline-block
`

const EachEpisode = styled.div`
    display: flex;
    justify-content: left;
`

const Infos = styled.div`
    display: inline-block;
    margin-left: 10%;
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

const RevenirSerie = styled.button`
    margin-top: 20px;
    margin-bottom: 100px;
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

const TitreCommentaire = styled.h3`
    letter-spacing: 1px;
`

const Textarea = styled.textarea`
    width: 50%;
    margin-left: 25%;
    display: block;
    min-height: 200px;
    background: lightgray;
    padding: 10px;
    border-radius: 20px;
    border: #ba2025 2px solid;
`

const Button = styled(RevenirSerie)`
    border-radius: 40px;
    height: 30px;
    width: 20%;
    background: lightgray;
    color: #ba2025;
    margin-top: 20px;
    margin-bottom: 100px;

    &:hover {
        box-shadow: 5px 5px 5px gray;
        padding: 0;
    }
`

const TitreComments = styled.h1`
    color: #ba2025;
`

const EncoreUneDiv = styled.div`
    border-top: 1px gray solid;
    border-radius: 10px;
    padding-top: 20px;
    margin-left: 10%;
    margin-right: 10%;
    padding-bottom: 200px;
`

const EachSerie = styled.div`
    display: flex;
    justify-content: left;
    margin-left: 10%;
    margin-right: 10%;
    font-size: 20px;
    letter-spacing: 1px;
    border-bottom: 1px #80808071 solid;
`

const InfosComments = styled.div`
    width: 30%;
`

const Commentaire = styled.p`
    width: 50%;
    justify-content: right;
`

let splitURL = window.location.href.split('/');
let episodeId = splitURL[4];

class Detail_episode extends Component {

    state = {
        id: episodeId,
        detail: [],
        comment: "",
        token: localStorage.getItem("token"),
        comments: [],
    };

    componentDidMount() {
        axios.get('https://api.betaseries.com/episodes/display?key=757a93dab831&id=' + this.state.id)
            .then(response => {
                console.log(response.data.episode, "detail episode");
                this.setState({
                    detail: [response.data.episode],
                })
            });
        axios.get('https://api.betaseries.com/comments/comments?key=757a93dab831&id=' + this.state.id + '&type=episode&order=desc&nbpp=4')
            .then(response => {
                this.setState({
                    comments: response.data.comments,
                })
                console.log(this.state.comments, "iciiiiiiiiiiii");
            });
    }

    handleSubmitFormComment = async (event) => {
        try {
            axios.post('https://api.betaseries.com/comments/comment', {
                token: this.state.token,
                text: this.state.comment,
                key: '757a93dab831',
                id: this.state.id,
                type: "episode",
            })
                .then((response) => {
                    console.log(response.data);
                    window.location.reload();
                }, (error) => {
                    alert('Commentaire non envoyé');
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
            <div>
                {this.state.detail.map(episode => {
                    return (
                        <div>
                            <EpisodeTitle>{episode.title}</EpisodeTitle>
                            <EachEpisode>
                                <ImgEpisode src={"https://api.betaseries.com/pictures/episodes?key=757a93dab831&id=" + episodeId}></ImgEpisode>
                                <Infos>
                                    <p>{episode.date}</p>
                                    <p>{"Note : " + episode.note.total}</p>
                                </Infos>
                            </EachEpisode>
                            <Resume>{episode.description}</Resume>
                            <a href="javascript:history.go(-1)"><RevenirSerie>Revenir à la série</RevenirSerie></a>
                            <br></br>
                            <TitreCommentaire>Ajoutez un commentaire pour cet épisode :</TitreCommentaire>
                            <Textarea id="comment" name="comment" placeholder="Commentaire" value={this.state.comment} onChange={event => this.handleChange(event)} ></Textarea>
                            <Button onClick={this.handleSubmitFormComment}>Valider</Button>
                        </div>
                    )
                })}
                <TitreComments>Les commentaires</TitreComments>
                <EncoreUneDiv>
                    {this.state.comments.map(com => {
                        return (
                            <EachSerie>
                                <InfosComments>
                                    <p>Écrit par :{" " + com.login}</p>
                                    <p>Le{" " + com.date}</p>
                                </InfosComments>
                                <Commentaire>{"commentaire : " + com.text}</Commentaire>
                            </EachSerie>
                        )
                    })}
                </EncoreUneDiv>
            </div>
        )
    }
}

export default Detail_episode;