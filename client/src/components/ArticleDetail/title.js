import React from 'react';

import { Card, CardHeader } from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';

const styles = {
    card: {
        position: 'relative',
        height: '80px'
    },
    cardHeader: {
        textAlign: 'left',
        paddingRight: '15px'
    },
    cardTitle:{
        color: 'rgba(0, 0, 0, 0.87)',
        fontSize: '15px',
        textDecoration: 'none'
    },
    subTitle: {
        color: 'rgba(0, 0, 0, 0.54)',
        display: 'block',
        fontSize: '14px',
        textDecoration: 'none'
    }
};

const subTitle = (link, domain) => {
    return (
    <a 
        href={link} 
        target="_blank"
        style={styles.subTitle}>
        <span>{domain}</span>
    </a>)
};

const title = (props) => {
    if( props.isLoading ){
        return (<CircularProgress size={80} thickness={5} />)
    } else {
        return (
        <Card>
            <CardHeader
                title={<a style={styles.cardTitle} href={props.article.link} target="_blank">{props.article.title}</a>}
                subtitle={subTitle(props.article.link, props.article.domain)}
                style={styles.cardHeader}
            />
        </Card> )
    }
}

export default title;