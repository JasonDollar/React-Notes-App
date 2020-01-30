import {AddNotetoStoreAction, RemoveNoteInStoreAction, EditNoteInStoreAction, SetNotesToStoreAction, CleanNotesAction} from './notes'
import { AuthSuccessAction, SignOutSuccessAction, StartLoginAction, GetUserUidAction, SetUserAction, GetUserDataErrorAction, AuthFailureAction, ResetSuccessAction, ResetFailureAction } from './auth'

export enum ActionTypes {
ADD_NOTE = "ADD_NOTE",
REMOVE_NOTE = "REMOVE_NOTE",
EDIT_NOTE = "EDIT_NOTE",
SET_NOTES = "SET_NOTES",
CLEAN_NOTES = "CLEAN_NOTES",
LOGIN = "LOGIN",
RESET_PASSWORD = "RESET_PASSWORD",
RESET_SUCCESS = "RESET_SUCCESS",
RESET_FAILURE = "RESET_FAILURE",
SIGNOUT_SUCCESS = "SIGNOUT_SUCCESS",
AUTH_START = "AUTH_START",
AUTH_SUCCESS = "AUTH_SUCCESS",
AUTH_FAILURE = "AUTH_FAILURE",
GET_USER_UID = "GET_USER_UID",
SET_USER_DATA = "SET_USER_DATA",
SET_USER_DATA_FAILURE = "SET_USER_DATA_FAILURE",
}

export type NotesActions = AddNotetoStoreAction| RemoveNoteInStoreAction | EditNoteInStoreAction | SetNotesToStoreAction | CleanNotesAction

export type AuthActions = AuthSuccessAction | SignOutSuccessAction | StartLoginAction | GetUserUidAction | SetUserAction | GetUserDataErrorAction | AuthFailureAction | ResetSuccessAction | ResetFailureAction