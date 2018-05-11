import React from 'react';

import Paper from 'material-ui/Paper';
import ArticleCard from './articleCard';

const ArticleList = (props) => {
    return (
        <Paper className="article-list">
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