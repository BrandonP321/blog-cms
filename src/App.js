import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import PostCreator from './pages/PostCreator'
import BlogPost from './pages/BlogPost'
import Login from './pages/Login'

function App() {
  return (
    <div className="App">
      <Router >
        <Switch>
          <Route exact path='/'>

          </Route>
          <Route exact path='/login'>
            <Login isMakingNewAccount={false} />
          </Route>
          <Route exact path='/signup'>
            <Login isMakingNewAccount={true} />
          </Route>
          {/* <Route exact path='/dashboard/:user'>

          </Route> */}
          <Route exact path='/user/:userId/post/create'>
            <PostCreator isNewPost={true} />
          </Route>
          <Route exact path='/user/:userId/post/update/:postId'>
            <PostCreator isNewPost={false} />
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
