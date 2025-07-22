import { createSlice } from "@reduxjs/toolkit"

const blogSlice = createSlice({
    name: 'blog',
    initialState: {
        post: [],
        loading: false,
        error: null,
        blogUpdateData: null
    },
    reducers: {
        fetchBlogStart(state) {
            state.loading = true
        },
        fetchBlogSucess(state, action) {
            state.loading = false
            state.post = action.payload
            state.error = null
        },
        fetchBlogFailed(state, action) {
            state.loading = false
            state.error = action.payload
        },
        fetchBlogUpdateData(state,action) {
            state.blogUpdateData = action.payload
        }
    }
})

export const {fetchBlogFailed,fetchBlogStart,fetchBlogSucess, fetchBlogUpdateData} = blogSlice.actions

export default blogSlice.reducer