import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { PostProps } from '../../interfaces/PostProps';

interface PostsState {
  posts: PostProps[];
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

export const fetchFollowedPosts = createAsyncThunk<PostProps[], { pageNumber: number; pageSize: number }>(
  'posts/fetchFollowedPosts',
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:8080/api/posts/getFollowedPosts', {
        params,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
        }
      });
      if (!response.data || !Array.isArray(response.data.content)) {
        throw new Error('Unexpected response structure');
      }
      console.log(response.data.content)
      return response.data.content;
    } catch (error: any) {
      console.error('Failed to fetch followed posts:', error);
      return rejectWithValue(error.message || 'Failed to fetch posts');
    }
  }
);


const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFollowedPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFollowedPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.error = null;
      })
      .addCase(fetchFollowedPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch posts';
      });
  },
});

export default postSlice.reducer;
