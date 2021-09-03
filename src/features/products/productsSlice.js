import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Create,
  DeleteProduct,
  GetAll,
  UpdateImage,
  UpdateProductInfo,
} from "./productAPi";

const initialState = {
  addstatus: "",
  products: [],
  filtredproducts: [],
  deletestatus: "",
};

// CREATE product  action
export const createproduct = createAsyncThunk(
  "products/create",
  async (data) => {
    const response = await Create(data);
    return response.data;
  }
);

// get all  products  action
export const getproducts = createAsyncThunk("products/getall", async () => {
  const response = await GetAll();
  return response.data;
});

// delete   product by id action
export const deleteproduct = createAsyncThunk(
  "products/delte/id",
  async (id) => {
    const response = await DeleteProduct(id);
    return response.data;
  }
);

// update image product by id action
export const updateproductimage = createAsyncThunk(
  "products/update/image/id",
  async (data) => {
    const response = await UpdateImage(data);
    return response.data;
  }
);

// update info product by id action
export const updateproductinfo = createAsyncThunk(
  "products/update/info/id",
  async (data) => {
    const response = await UpdateProductInfo(data);
    return response.data;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    filtercategory: (state, action) => {
      if (action.payload.id === "all") {
        state.filtredproducts = state.products;
      } else {
        let arr = [...state.products];

        let data = arr.filter((p) => p.category._id === action.payload.id);

        state.filtredproducts = data;
      }
    },
    filtreprice: (state, action) => {
      if (action.payload.price === "") {
        state.filtredproducts = state.products;
      } else {
        let arr = [...state.products];

        let data = arr.filter((p) => p.price <= Number(action.payload.price));

        state.filtredproducts = data;
      }
    },
    filtrename : (state,action) => {
      if (action.payload.text === "") {
        state.filtredproducts = state.products;
      } else {
        let arr = [...state.products];

        let data = arr.filter((p) => p.name.includes(action.payload.text) );

        state.filtredproducts = data;
      }
    }
  },
  extraReducers: {
    [createproduct.pending]: (state, action) => {
      state.addstatus = "loading";
    },
    [createproduct.fulfilled]: (state, action) => {
      console.log(action.payload);

      if (!action.payload) {
        state.addstatus = "failure";
      } else if (action.payload.data) {
        state.addstatus = "success";
      }
    },
    [createproduct.rejected]: (state, action) => {
      state.addstatus = "failure";
    },

    // get all prodds
    [getproducts.pending]: (state, action) => {},
    [getproducts.fulfilled]: (state, action) => {
      console.log(action.payload);

      state.products = action.payload.data;
      state.filtredproducts = action.payload.data;
    },
    [getproducts.rejected]: (state, action) => {
      /*  state.addstatus = "failure"; */
    },

    // delete product
    [deleteproduct.pending]: (state, action) => {
      state.deletestatus = "loading";
    },
    [deleteproduct.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.deletestatus = "success";
    },
    [deleteproduct.rejected]: (state, action) => {
      /*  state.addstatus = "failure"; */
    },

    // update product image
    [updateproductimage.pending]: (state, action) => {
      state.deletestatus = "loading";
    },
    [updateproductimage.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.deletestatus = "success";
    },
    [updateproductimage.rejected]: (state, action) => {
      /*  state.addstatus = "failure"; */
    },

    // update product infos
    [updateproductinfo.pending]: (state, action) => {
      state.deletestatus = "loading";
    },
    [updateproductinfo.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.deletestatus = "success";
    },
    [updateproductinfo.rejected]: (state, action) => {
      /*  state.addstatus = "failure"; */
    },
  },
});

export const { filtercategory, filtreprice, filtrename } = productsSlice.actions;

//selector
export const selectaddstatus = (state) => state.products.addstatus;
export const selectproducts = (state) => state.products.filtredproducts;
export const selectdeletestatus = (state) => state.products.deletestatus;

export default productsSlice.reducer;
