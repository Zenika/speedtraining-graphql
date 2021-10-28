import './App.css';
import { House } from './section/House';
import { Books } from './section/Books';
import { Character } from './section/Character';
import { Book } from './section/Book';
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <main>
        <h1>
          <Link to="/">A Speed Training of Ice and Fire</Link>
        </h1>
        <Switch>
          <Route path="/characters/:id">
            <Character />
          </Route>
          <Route path="/houses/:id">
            <House />
          </Route>
          <Route path="/books/:id">
            <Book />
          </Route>
          <Route path="/">
            <Books />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
