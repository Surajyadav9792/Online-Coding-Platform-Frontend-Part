import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient from './utils/axiosClient'
export const registerUser = createAsyncThunk(
  //Action:{type,payload} ye dono hote hai 
  //ye action ka type hai 
  'auth/register',
  //async(arg,thunkAPI) this is the real form of async 
  //ye arg kuch nahi jo body se req ati hai wahi hai aur yaha par jo req.body se data ayega o userdata me rahega
  async (userData, {rejectWithValue}) => {
    try {
    const response =  await axiosClient.post('/user/register',userData);
    return response.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Something went wrong'
      );
    }
  }
);
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('/user/login', credentials);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Something went wrong'
      );
    }
  }
);

export const checkAuth = createAsyncThunk(
  'auth/check',
  async (_, { rejectWithValue }) => {
    // AbortController with 10s timeout — prevents infinite spinner on cold start
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    try {
      const { data } = await axiosClient.get('/user/check', {
        signal: controller.signal
      });
      return data.user;
    } catch (error) {
      if (error.response?.status === 401) {
        return rejectWithValue(null); // Special case for no session
      }
      // Timeout or network error — treat as not logged in
      if (error.code === 'ECONNABORTED' || error.name === 'CanceledError') {
        return rejectWithValue(null);
      }
      return rejectWithValue(error);
    } finally {
      clearTimeout(timeoutId);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axiosClient.post('/user/logout');
      return null;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Something went wrong'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: typeof window !== 'undefined' && localStorage.getItem('wasLoggedIn') === 'true',
    error: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Register User Cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = !!action.payload;
        state.user = action.payload;//data ko hum log action ke payload se se le lete hai kyu ki isi me sab chij ata hai
        if (action.payload && typeof window !== 'undefined') {
          localStorage.setItem('wasLoggedIn', 'true');
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
        state.isAuthenticated = false;
        state.user = null;
      })
  
      // Login User Cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = !!action.payload;
        state.user = action.payload;
        if (action.payload && typeof window !== 'undefined') {
          localStorage.setItem('wasLoggedIn', 'true');
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
        state.isAuthenticated = false;
        state.user = null;
      })
  
      // Check Auth Cases
      .addCase(checkAuth.pending, (state) => {
        state.loading = typeof window !== 'undefined' && localStorage.getItem('wasLoggedIn') === 'true';
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = !!action.payload;
        state.user = action.payload;
        if (action.payload) {
          if (typeof window !== 'undefined') localStorage.setItem('wasLoggedIn', 'true');
        } else {
          if (typeof window !== 'undefined') localStorage.removeItem('wasLoggedIn');
        }
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
        state.isAuthenticated = false;
        state.user = null;
        if (typeof window !== 'undefined') {
          localStorage.removeItem('wasLoggedIn');
        }
      })
  
      // Logout User Cases
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
        if (typeof window !== 'undefined') {
          localStorage.removeItem('wasLoggedIn');
        }
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
        state.isAuthenticated = false;
        state.user = null;
      });
  }
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;