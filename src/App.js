import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './components/Header.jsx';
import Content from './components/Content.jsx';
import Path from './components/Path.jsx';
import Graph from './components/sample.jsx';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <Router>
        <Switch>
          <Route exact path="/" component={Content}></Route>
          <Route path="/path" component={Path}></Route>
          <Route path="/graph" component={Graph}></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
