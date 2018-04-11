import React from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const ArticleCard = (props) => (
    <Card>
        <CardHeader
        title={props.title}
        subtitle={props.subtitle}
        />
        <CardActions>
            <FlatButton label="Context" />
            <FlatButton label="Comments" />
        </CardActions>
        <CardText></CardText>
    </Card> 
);

export default ArticleCard;