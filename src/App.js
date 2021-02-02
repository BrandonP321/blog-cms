import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import PostCreator from './pages/PostCreator'
import BlogPost from './pages/BlogPost'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Header from './components/Header'

function App() {
  return (
    <div className="App">
      <div className='content-header-shift'>
        <Router >
          <Header />
          <Switch>
            <Route exact path='/'>
              <div className='bg bg-dark'></div>
              <Home />
            </Route>
            <Route exact path='/login'>
              <Login isMakingNewAccount={false} />
            </Route>
            <Route exact path='/signup'>
              <Login isMakingNewAccount={true} />
            </Route>
            <Route exact path='/dashboard/user/:userId'>
              <div className='bg bg-dark'></div>
              <Dashboard />
            </Route>
            <Route exact path='/user/:userId/post/update/:postId'>
              <PostCreator />
            </Route>
            <Route exact path='/post/:id'>
              <BlogPost />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
