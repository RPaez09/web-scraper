import React from 'react';

import Paper from 'material-ui/Paper';
import ArticleCard from '../articleCard';

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
                    title={article.title} 
                    link={article.link} />
            ))
            }
        </Paper>)
};

export default ArticleList;