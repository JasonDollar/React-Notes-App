import React, { Component } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
import classes from './App.module.css'
import Header from './components/Header/Header'
import NoteForm from './components/NoteForm/NoteForm'
import NotesList from './components/NotesList/NotesList'
import NoteDetail from './components/NoteDetail/NoteDetail'
import { connect } from 'react-redux';


class App extends Component {
  // componentDidMount = () => {
  //   // this.props.setNotes()
  // }
  
  render() {
    return (
      <div className={classes.container}>
        <Header />
        <div className={classes.main}>

        <Route path="/notes" component={NotesList} />
          <Switch>
            <Route path="/" exact render={() => <Redirect to="/notes" />} />
            <Route path="/notes/:id" component={NoteDetail} />
            <Route path="/edit/:id" render={(props) => <NoteForm action="editNote" {...props} />} />
            <Route path="/create" component={NoteForm} />
          </Switch>
        </div>
        
        
      </div>
    );
  }
}



export default App;
