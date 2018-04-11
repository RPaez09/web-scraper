import React from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const styles = {
    card: {
        position: 'relative',
        height: '100px'
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
        title={props.title}
        subtitle={props.link}
        style={styles.cardHeader}
        />
        <CardActions style={styles.cardActions}>
            <FlatButton label="Context" />
            <FlatButton label="Comments" />
        </CardActions>
        <CardText></CardText>
    </Card> 
);

export default ArticleCard;