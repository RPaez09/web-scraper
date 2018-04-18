import React from 'react';

import Paper from 'material-ui/Paper';
import ArticleCard from './articleCard';

const style = {
    width: "80vw",
    margin: 20,
    display: 'inline-block'
  };

const ArticleList = (props) => {
    return (
        <Paper style={style}>
            { props.articles && props.articles.map( article => ( 
                <ArticleCard 
                    key={article.id}
                    article={article}
                    handleSave={props.handleSave}
                    user={props.user} />
            ))
            }
        </Paper>)
};

export default ArticleList;