import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IGetUrl, IPostUrl, IUrlInfo } from "../../types/url.interface";
import toast from "react-hot-toast";
import axiosInstance from "../../config/axios.config";

export const getAllUrls = createAsyncThunk(
  "get/urls",
  async (
    { page, pageSize }: { page: number; pageSize: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(`url/get/${page}/${pageSize}`);
      return response.data;
    } catch (error) {
      rejectWithValue((error as Error).message);
    }
  }
);

export const createShortUrl = createAsyncThunk(
  "create/url",
  async (body: IPostUrl, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("url/shorten", body);
      toast.success("Успешно добавлен.");
      return response.data;
    } catch (error) {
      toast.error("Ошибка при добавлении.");
      rejectWithValue((error as Error).message);
    }
  }
);

export const getShortUrlInfo = createAsyncThunk(
  "get/analytics",
  async (shortUrl: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`url/info/${shortUrl}`);
      return response.data;
    } catch (error) {
      toast.error(`Ошибка при получении информации по alias: ${shortUrl}.`);
      rejectWithValue((error as Error).message);
    }
  }
);

export const deleteShortUrl = createAsyncThunk(
  "delete/url",
  async (shortUrl: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`url/delete/${shortUrl}`);
      toast.success("Успешно удален.");
      return response.data;
    } catch (error) {
      toast.error(`Ошибка при удалении по alias: ${shortUrl}.`);
      rejectWithValue((error as Error).message);
    }
  }
);

interface IInitialState {
  loading: boolean;
  allData: IGetUrl | undefined;
  infoData: IUrlInfo | undefined;
  fetchCheck: boolean;
}

const initialState: IInitialState = {
  loading: false,
  allData: undefined,
  infoData: undefined,
  fetchCheck: true,
};

export const UrlSlice = createSlice({
  name: "url",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllUrls.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllUrls.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.allData = payload;
    });
    builder.addCase(getAllUrls.rejected, (state) => {
      state.loading = false;
    });
    //--------------------
    builder.addCase(getShortUrlInfo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getShortUrlInfo.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.infoData = payload;
    });
    builder.addCase(getShortUrlInfo.rejected, (state) => {
      state.loading = false;
    });
    //--------------------
    builder.addCase(createShortUrl.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createShortUrl.fulfilled, (state) => {
      state.loading = false;
      state.fetchCheck = !state.fetchCheck;
    });
    builder.addCase(createShortUrl.rejected, (state) => {
      state.loading = false;
    });
    //--------------------
    builder.addCase(deleteShortUrl.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteShortUrl.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.fetchCheck = !state.fetchCheck;
    });
    builder.addCase(deleteShortUrl.rejected, (state) => {
      state.loading = false;
    });
    //--------------------
  },
});
