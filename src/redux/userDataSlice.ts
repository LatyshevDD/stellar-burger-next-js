import {createSlice} from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { loginRequest, logoutRequest, getUserWithRefreshRequest, ChangeUserWithRefreshRequest } from "../utils/api"
import { RootState } from "./store"
import { ThunkAction, PayloadAction } from "@reduxjs/toolkit"
import { Action } from "@reduxjs/toolkit"
import { UserDataType, UserType, ThunkApiConfig, LoginRequestData, ChangeUserDataType } from "../types/types"

const initialState: UserDataType = {
    user: null,
    isAuthChecked: false,
    isError: false,
    spinnerActive: false
}

export const getUser = (): ThunkAction<void, RootState, unknown, Action> => {
  return (dispatch) => {
      return getUserWithRefreshRequest()
      .then ((res) => {
        dispatch(setSpinnerActive(true))
        return res
      })
      .then((res) => {
          dispatch(setUser(res.user));
      })
      .catch(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch(setUser(null));
      })
      .finally(() => {
        dispatch(setSpinnerActive(false))
        dispatch(setAuthChecked(true))
      })
  };
};

export const changeUser = createAsyncThunk<UserType, ChangeUserDataType, ThunkApiConfig>(
  "user/change",
  async (data) => {
      const res = await ChangeUserWithRefreshRequest(data)
      return res.user
  }
)


export const login = createAsyncThunk<UserType, LoginRequestData, ThunkApiConfig>(
  "user/login",
  async (data) => {
      const res = await loginRequest(data);
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      return res.user
  }
)

export const checkUserAuth = (): ThunkAction<void, RootState, unknown, Action> => {
  return (dispatch) => {
      if (localStorage.getItem("accessToken")) {
          dispatch(getUser())        
      } else {
          dispatch(setAuthChecked(true));
      }
  };
}


export const logout = createAsyncThunk(
  "user/logout",
  async () => {
      await logoutRequest();
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
  }
)

export const userDataSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isAuthChecked: action.payload
      }
    },
    setUser: (state, action: PayloadAction<UserType | null>) => {
      return {
        ...state,
        user: action.payload
      }
    },
    setSpinnerActive: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        spinnerActive: action.payload
      }
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(login.fulfilled, (state, action) => {
          return {
            ...state,
            user: action.payload,
            isAuthChecked: true,
            spinnerActive: false
          }
        })
        .addCase(login.pending, (state) => {
          return {
            ...state,
            spinnerActive: true
          }
        })
        .addCase(login.rejected, (state) => {
          return {
            ...state,
            isError: true,
            spinnerActive: false
          }
        })
        .addCase(logout.fulfilled, (state) => {
          return {
            ...state,
            isAuthChecked: false,
            user: null,
            spinnerActive: false
          }
        })
        .addCase(logout.pending, (state) => {
          return {
            ...state,
            spinnerActive: true
          }
        })
        .addCase(logout.rejected, (state) => {
          return {
            ...state,
            isError: true,
            spinnerActive: false
          }
        })
        .addCase(changeUser.fulfilled, (state, action) => {
          return {
            ...state,
            user: action.payload,
            spinnerActive: false
          }
        })
        .addCase(changeUser.pending, (state) => {
          return {
            ...state,
            spinnerActive: true
          }
        })
        .addCase(changeUser.rejected, (state) => {
          return {
            ...state,
            isError: true,
            spinnerActive: false
          }
        })
  }
})

export const { setAuthChecked, setUser, setSpinnerActive } = userDataSlice.actions

export default userDataSlice.reducer
