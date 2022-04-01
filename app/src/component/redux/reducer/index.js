import { combineReducers } from "redux";
import {
  blogReducer,
  createBlogReducer,
  AppStateReducer,
  deleteBlogReducer,
  updateBlogReducer,
  BlogIDReducer,
} from "./BlogReducers";

const reducers = combineReducers({
  allBlogs: blogReducer,
  CreateBlog: createBlogReducer,
  DeleteBlog: deleteBlogReducer,
  UpdateBlog: updateBlogReducer,
  viewUpdate: AppStateReducer,
  BlogID: BlogIDReducer
});
export default reducers;