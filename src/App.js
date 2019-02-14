import React, { Component } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
import {ThemeProvider} from 'styled-components'
// import { connect } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core'
import {faPlus, faSave, faEdit, faTrashAlt, faArrowLeft, faSearch} from '@fortawesome/free-solid-svg-icons'
// import classNames from 'classnames'
import {firebase} from './firebase'
import classes from './App.module.scss'
// import Header from './components/Header/Header'
import AddNote from './components/AddNote/AddNote'
import EditNote from './components/EditNote/EditNote'
import NotesList from './components/NotesList/NotesList'
import NoteDetail from './components/NoteDetail/NoteDetail'
import NotesPlaceholder from './components/NotesPlaceholder/NotesPlaceholder'
import Header from './components/Header/Header'
import Login from './components/Login/Login'
import {theme} from './components/styles/theme'

library.add(faPlus, faSave, faEdit, faTrashAlt, faArrowLeft, faSearch)


class App extends Component {
  state = {
    showNoteDetail : false,
    themeColor: 'light',
  }
  // componentDidMount = () => {
  //   // this.props.setNotes()
  // }
  toggleNoteDetail = () => {
    this.setState(prevState => ({showNoteDetail: !prevState.showNoteDetail}))
  }

  // createUser = (email, password) => {
  //   firebase.auth().createUsercreateUserWithEmailAndPassword(email, password)
  //   console.log(firebase)
  // }
  
  render() {
    const appTheme = theme[this.state.themeColor]
    return (
      <ThemeProvider theme={appTheme}>
      <>
        <Header />
        <div className={`${classes.main} container`}>

        <Route 
        path="/notes" 
        render={props => <NotesList {...props}  toggleNoteDetail={this.toggleNoteDetail}/>} 
        />
          <Switch>
            <Route path="/" exact render={() => <Redirect to="/notes" />} />
            <Route path="/notes" exact component={NotesPlaceholder} />
            <Route path="/notes/:id" render={props => (
              <NoteDetail {...props} 
              toggleNoteDetail={this.toggleNoteDetail} 
              showNoteDetail={this.state.showNoteDetail}
            />) } />
            <Route path="/edit/:id" component={EditNote} />
            <Route path="/create" component={AddNote} />
            <Route path="/login" render={props => <Login createUser={this.createUser} {...props} />} />
          </Switch>
        </div>
        
        
        </>
      </ThemeProvider>
    );
  }
}



export default App;
