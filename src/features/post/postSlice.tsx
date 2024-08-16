import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { PostProps } from '../../interfaces/PostProps';

interface PostsState {
  posts: PostProps[];
  loading: boolean;
  error: string | null;
  pageNumber: number;
  hasMore: boolean;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
  pageNumber: 0,
  hasMore: true,
};

export const fetchFollowedPosts = createAsyncThunk<{ content: PostProps[], pageable: any, totalPages: number }, { pageNumber: number; pageSize: number }>(
  'posts/fetchFollowedPosts',
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:8080/api/posts/getFollowedPosts', {
        params,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
        }
      });

      if (!response.data || !response.data.content || !Array.isArray(response.data.content)) {
        throw new Error('Unexpected response structure');
      }

      return response.data; 
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch posts');
    }
  }
);

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    resetPosts: (state) => {
      state.posts = [];
      state.pageNumber = 0;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFollowedPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFollowedPosts.fulfilled, (state, action) => {
        state.loading = false;
        const { content, totalPages } = action.payload;

        if (content.length === 0) {
          state.hasMore = false;
        } else {
          state.posts = state.pageNumber === 0
            ? content
            : [...state.posts, ...content];
          state.pageNumber += 1;
          state.hasMore = state.pageNumber < totalPages;
        }
        state.error = null;
      })
      .addCase(fetchFollowedPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch posts';
      });
  },
});

export const { resetPosts } = postSlice.actions;
export default postSlice.reducer;
