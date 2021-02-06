import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header } from './components';
import { 
    Home,
    About,
    Posts,
    SpanishHome,
    SpanishMethod,
    SpanishResources,
    SpanishVideos
} from './views';

export const App = (props) => {
    return (
        <div className="app-container">
            <Header />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/posts" component={Posts} />
                <Route exact path="/spanish" component={SpanishHome} />
                <Route exact path="/spanish/method" component={SpanishMethod} />
                <Route exact path="/spanish/resources" component={SpanishResources} />
                <Route exact path="/spanish/videos" component={SpanishVideos} />
            </Switch>
        </div>
    )
};

export default App;
