import { ActionTypes } from "../constants";


export const blogReducer = (state = {blogList:[]}, { type, payload }) => {
  switch (type) {
      case ActionTypes.READ_BLOG:
        //   return state;
      return {  blogList: payload };
    default:
      return state;
  }
};

export const createBlogReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.CREATE_BLOG:
      return { success:true };
   
    default:
      return state;
  }
};

export const deleteBlogReducer = (state = {}, { type, payload }) => {
  switch (type) {
  
    case ActionTypes.DELETE_BLOG:
      return {success:true};
    default:
      return state;
  }
};

  export const updateBlogReducer = (state = {}, { type, payload }) => {
    switch (type) {
      case ActionTypes.UPDATE_BLOG:
        return {success:true};
      default:
        return state;
    }
  };
  
const setState="";
export const AppStateReducer=(state=setState,{ type, payload })=>{
  switch (type) {
    case ActionTypes.VIEW_UPDATE:
      return {setState:payload };
    
    
    default:
      return state;
  }
}
const setID="";
export const BlogIDReducer=(state=setID,{ type, payload })=>{
  switch (type) {
    case ActionTypes.UPDATE_BLOG_ID:
      return {setID:payload };
    default:
      return state;
  }
}