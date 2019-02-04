import React, { Component } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
// import { connect } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core'
import {faPlus, faSave, faEdit, faTrashAlt, faArrowLeft, faSearch} from '@fortawesome/free-solid-svg-icons'
// import classNames from 'classnames'

import classes from './App.module.scss'
// import Header from './components/Header/Header'
import NoteForm from './components/NoteForm/NoteForm'
import NotesList from './components/NotesList/NotesList'
import NoteDetail from './components/NoteDetail/NoteDetail'

library.add(faPlus, faSave, faEdit, faTrashAlt, faArrowLeft, faSearch)


class App extends Component {
  state = {
    showNoteDetail : false,
  }
  // componentDidMount = () => {
  //   // this.props.setNotes()
  // }
  toggleNoteDetail = () => {
    this.setState(prevState => ({showNoteDetail: !prevState.showNoteDetail}))
  }
  
  render() {
    return (
      <div className={classes.App}>
        
        <div className={`${classes.main} container`}>

        <Route 
        path="/notes" 
        render={props => <NotesList {...props}  toggleNoteDetail={this.toggleNoteDetail}/>} 
        />
          <Switch>
            <Route path="/" exact render={() => <Redirect to="/notes" />} />
            <Route path="/notes/:id" render={props => (
              <NoteDetail {...props} 
              toggleNoteDetail={this.toggleNoteDetail} 
              showNoteDetail={this.state.showNoteDetail}
            />) } />
            <Route path="/edit/:id" render={(props) => <NoteForm action="editNote" {...props} />} />
            <Route path="/create" component={NoteForm} />
          </Switch>
        </div>
        
        
      </div>
    );
  }
}



export default App;
