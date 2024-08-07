import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const ServicesPage = createAsyncThunk(
    'service/ServicesPage',
    async() => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/tags/categories/', {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`,
                }
            });
            const data = response.data;
            console.log(data)
            return data;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    }
);
export const CategoryPage = createAsyncThunk(
    'category/CategoryPage',

    async({ name, type }, thunkAPI) => {
        const formData = new FormData();

        formData.append("name", name);
        formData.append("type", type);


        try {
            const response = await axios.post("http://127.0.0.1:8000/tags/categories/",
                formData, {
                    headers: {
                        Authorization: `JWT ${localStorage.getItem('token')}`,
                    }

                });
            const data = response.data;

            if (response.status === 201) {
                console.log(response.data);
                return data;
            } else {
                throw new Error('Failed to make tour');
            }
        } catch (err) {
            if (err.response && err.response.status === 400) {
                console.error(
                    `Status: ${err.response.status}, Status Text: ${err.response.statusText}`
                );
                console.error(err.response.data);
            } else {
                const errorMessage =
                    err.response && err.response.data ?
                    err.response.data.message :
                    err.message;
                console.error(errorMessage);
            }
            return thunkAPI.rejectWithValue("error");


        }
    }

);
export const AddTagsPage = createAsyncThunk(
    'tags/AddTagsPage',

    async({ name, contenttype, category }, thunkAPI) => {
        const formData = new FormData();

        formData.append("name", name);
        formData.append("contenttype", contenttype);
        formData.append("category", category);



        try {
            const response = await axios.post("http://127.0.0.1:8000/tags/",
                formData, {
                    headers: {
                        Authorization: `JWT ${localStorage.getItem('token')}`,
                    }

                });
            const data = response.data;

            if (response.status === 201) {
                console.log(response.data);
                return data;
            } else {
                throw new Error('Failed to make tour');
            }
        } catch (err) {
            if (err.response && err.response.status === 400) {
                console.error(
                    `Status: ${err.response.status}, Status Text: ${err.response.statusText}`
                );
                console.error(err.response.data);
            } else {
                const errorMessage =
                    err.response && err.response.data ?
                    err.response.data.message :
                    err.message;
                console.error(errorMessage);
            }
            return thunkAPI.rejectWithValue("error");


        }
    }

);
export const TagsPage = createAsyncThunk(
    'tag/TagsPage',
    async() => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/tags/', {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`,
                }
            });
            const data = response.data;
            console.log(data)
            return data;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    }
);
export const DeleteCategory = createAsyncThunk(
    'Deletecat/DeleteCategory',
    async(id) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/tags/categories/${id}/`, {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`,
                }
            });
            const data = response.data;
            console.log(data)
            return data;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    }
);
export const DeleteTag = createAsyncThunk(
    'Deletetag/DeleteTag',
    async(id) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/tags/${id}/`, {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`,
                }
            });
            const data = response.data;
            console.log(data)
            return data;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    }
);
const ServicesSlice = createSlice({
    name: "services",
    initialState: {
        servicesData: [],
        tagsData: [],
        category: [],
        tags: [],
        addTags: [],
        Deletecat: [],
        loading: false,
        error: null,
        token: null,

    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(ServicesPage.pending, (state, action) => {
                console.log(action);
                state.loading = true;
            })
            .addCase(ServicesPage.fulfilled, (state, action) => {
                state.loading = false;
                state.servicesData = action.payload;
            })
            .addCase(ServicesPage.rejected, (state) => {
                state.loading = false;
                state.error = "Error fetching data";
            })
            .addCase(TagsPage.pending, (state, action) => {
                console.log(action);
                state.loading = true;
            })
            .addCase(TagsPage.fulfilled, (state, action) => {
                state.loading = false;
                state.tagsData = action.payload;
            })
            .addCase(TagsPage.rejected, (state) => {
                state.loading = false;
                state.error = "Error fetching data";
            })
            .addCase(CategoryPage.pending, (state, action) => {
                console.log(action)
                state.loading = true;
            })
            .addCase(CategoryPage.fulfilled, (state, action) => {
                state.loading = false;
                state.token = localStorage.getItem('token');

                state.category.push(action.payload);
            })
            .addCase(CategoryPage.rejected, (state) => {
                state.loading = false;
                state.error = "Error fetching data";
            })
            .addCase(AddTagsPage.pending, (state, action) => {
                console.log(action)
                state.loading = true;
            })
            .addCase(AddTagsPage.fulfilled, (state, action) => {
                state.loading = false;
                state.token = localStorage.getItem('token');

                state.tags.push(action.payload);
            })
            .addCase(AddTagsPage.rejected, (state) => {
                state.loading = false;
                state.error = "Error fetching data";
            })
            .addCase(DeleteCategory.pending, (state, action) => {
                console.log(action)
                state.loading = true;
            })
            .addCase(DeleteCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.token = localStorage.getItem('token');

                state.Deletecat.push(action.payload);
            })
            .addCase(DeleteCategory.rejected, (state) => {
                state.loading = false;
                state.error = "Error fetching data";
            })

    },
});


export default ServicesSlice.reducer;