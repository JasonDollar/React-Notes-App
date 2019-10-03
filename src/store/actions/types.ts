import {AddNotetoStore, RemoveNoteInStore, EditNoteInStore, SetNotesToStore, CleanNotes} from './notes'
import { AuthSuccess, SignOutSuccess, StartLogin, GetUserUid, SetUser, GetUserDataError, AuthFailure, ResetSuccess, ResetFailure } from './auth'

export enum ActionTypes {
  ADD_NOTE,
REMOVE_NOTE,
EDIT_NOTE,
SET_NOTES,
CLEAN_NOTES,

LOGIN,
RESET_PASSWORD,
RESET_SUCCESS,
RESET_FAILURE,
SIGNOUT_SUCCESS,
AUTH_START,
AUTH_SUCCESS,
AUTH_FAILURE,

GET_USER_UID,
SET_USER_DATA,
SET_USER_DATA_FAILURE,
}

export type NotesActions = AddNotetoStore| RemoveNoteInStore | EditNoteInStore | SetNotesToStore | CleanNotes

export type AuthActions = AuthSuccess | SignOutSuccess | StartLogin | GetUserUid | SetUser | GetUserDataError | AuthFailure | ResetSuccess | ResetFailure