import React, { Component, Fragment } from 'react';
import {Route, Switch } from 'react-router-dom'
import {ThemeProvider} from 'styled-components'
import { library } from '@fortawesome/fontawesome-svg-core'
import {faPlus, faSave, faEdit, faTrashAlt, faArrowLeft, faArrowRight, faSearch} from '@fortawesome/free-solid-svg-icons'

import classes from './App.module.scss'

import Welcome from './components/Welcome/Welcome'
import AddNote from './components/AddNote/AddNote'
import EditNote from './components/EditNote/EditNote'
import NotesList from './components/NotesList/NotesList'
import NoteDetail from './components/NoteDetail/NoteDetail'
import NotesPlaceholder from './components/NotesPlaceholder/NotesPlaceholder'
import Header from './components/Header/Header'
import SignIn from './components/SignIn/SignIn'
import SignUp from './components/SignUp/SignUp'
import {theme} from './components/styles/theme'

library.add(faPlus, faSave, faEdit, faTrashAlt, faArrowLeft, faArrowRight, faSearch)


class App extends Component {
  state = {
    showNoteDetail : false,
    themeColor: 'light',
  }

  toggleNoteDetail = () => {
    this.setState(prevState => ({showNoteDetail: !prevState.showNoteDetail}))
  }
  
  render() {
    const appTheme = theme[this.state.themeColor]
    return (
      <ThemeProvider theme={appTheme}>
        <Fragment>
          <Header />

          <div className={`${classes.main} container`}>
            <Route 
            path="/notes" 
            component={NotesList} 
            />
            
            <Switch>
              <Route path="/" exact component={Welcome} />
              <Route path="/notes" exact component={NotesPlaceholder} />
              <Route path="/notes/view/:id" component={NoteDetail} />
              <Route path="/notes/edit/:id" component={EditNote} />
              <Route path="/notes/create" component={AddNote} />
              <Route path="/signup" component={SignUp} />
              <Route path="/signin" component={SignIn} />
            </Switch>
          </div>
        </Fragment>
      </ThemeProvider>
    );
  }
}



export default App;
