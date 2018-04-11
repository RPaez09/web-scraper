import React from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const styles = {
    card: {
        position: 'relative',
        height: '80px'
    },
    cardHeader: {
        textAlign: 'left',
        paddingRight: '15px'
    },
    cardActions: {
        position: 'absolute',
        right: '15px',
        bottom: '0'
    }
}

const ArticleCard = (props) => (
    <Card style={styles.card}>
        <CardHeader
        title={props.article.title}
        subtitle={props.article.link}
        style={styles.cardHeader}
        />
        <CardActions style={styles.cardActions}>
            <FlatButton href={props.article.context} target="_blank" label="Context" />
            <FlatButton label="Comments" />
        </CardActions>
        <CardText></CardText>
    </Card> 
);

export default ArticleCard;