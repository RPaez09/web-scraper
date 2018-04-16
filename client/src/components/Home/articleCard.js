import React from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';

const styles = {
    card: {
        position: 'relative',
        height: '80px'
    },
    cardHeader: {
        textAlign: 'left',
        paddingRight: '15px'
    },
    title: {
        color: 'rgba(0, 0, 0, 0.87)',
        fontSize: '15px',
        textDecoration: 'none'
    },
    subTitle: {
        color: 'rgba(0, 0, 0, 0.54)',
        marginTop: '10px',
        display: 'block',
        fontSize: '14px',
        textDecoration: 'none'
    },
    cardActions: {
        position: 'absolute',
        right: '15px',
        bottom: '0'
    }
}

const subTitle = (link, domain) => {
    return (
    <a 
        href={link} 
        target="_blank"
        style={styles.subTitle}>
        <span>{domain}</span>
    </a>)
};

const ArticleCard = (props) => (
    <Card style={styles.card}>
        <CardHeader
            title={<a href={props.article.link} target="_blank" style={styles.title}>{props.article.title}</a>}
            subtitle={subTitle(props.article.link, props.article.domain)}
            style={styles.cardHeader}
        />
        <CardActions style={styles.cardActions}>
            <FlatButton href={props.article.context} target="_blank" label="Context" />
            <Link to={`/article/${props.article.id}`}><FlatButton label="Comments" /></Link>
        </CardActions>
        <CardText></CardText>
    </Card> 
);

export default ArticleCard;