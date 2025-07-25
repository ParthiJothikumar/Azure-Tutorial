import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        user: '',
        token: '',
        error: '',
        tokenError: '',
        logoutError: '',
        isAuthenticated: false
    },
    reducers: {
        fetchUserSucess(state, action) {
            state.user = action.payload
            state.isAuthenticated = true
            state.error = ''
        },
        fetchUserFailed(state, action) {
            state.user = ''
            state.error = action.payload
            state.isAuthenticated = false
        },
        fetchTokenSucess(state, action) {
            state.token = action.payload
            state.tokenError = ''
        },
        fetchTokenFailed(state, action) {
            state.token = ''
            state.tokenError = action.payload
        },
        fetchLogoutSucess(state, action) {
            state.isAuthenticated = false
            state.user = ''
            state.logoutError = ''
            state.token = ''
        },
        fetchLogoutFailed(state, action) {
            state.logoutError = action.payload
        },
    }
})

export const { fetchUserSucess, fetchLogoutSucess, fetchLogoutFailed, fetchUserFailed, fetchTokenSucess, fetchTokenFailed } = loginSlice.actions

export default loginSlice.reducer