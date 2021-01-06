import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import PostCreator from './pages/PostCreator'
import BlogPost from './pages/BlogPost'

function App() {
  return (
    <div className="App">
      <Router >
        <Switch>
          <Route exact path='/'>

          </Route>
          <Route exact path='/login'>

          </Route>
          {/* <Route exact path='/dashboard/:user'>

          </Route> */}
          <Route exact path='/dashboard/create'>
            <PostCreator />
          </Route>
          <Route exact path='/post/:id'>
            <BlogPost />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
