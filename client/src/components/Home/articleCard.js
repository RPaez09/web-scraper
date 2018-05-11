import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';

const styles = {
    cardActions: {
        position: 'absolute'
    }
}

const subTitle = (link, domain) => {
    return (
    <a 
        href={link} 
        target="_blank"
        className="article-subtitle">
        <span>{domain}</span>
    </a>)
};

export default class ArticleCard extends Component {

    handleSave = () => {
        this.props.handleSave( this.props.article._id );
    }

    render(){
        return (
            <Card className="article-card">
                <CardHeader
                    title={<a href={this.props.article.link} target="_blank" className="article-title">{this.props.article.title}</a>}
                    subtitle={subTitle(this.props.article.link, this.props.article.domain)}
                    className="article-header"
                />
                <CardActions style={styles.cardActions} className="article-actions">
                    <FlatButton href={this.props.article.context} target="_blank" label="Context" />
                    <Link to={`/article/${this.props.article.id}`}><FlatButton label="Comments" /></Link>
                    { ! this.props.user.favorites.includes(this.props.article._id) ? <FlatButton label="Save" onClick={this.handleSave}/> : <FlatButton label="Save" disabled={true} />}
                </CardActions>
                <CardText></CardText>
            </Card> 
        )
    }
};