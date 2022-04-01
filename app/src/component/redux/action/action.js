import { ActionTypes } from "../constants";
import axios from "axios";

export const ReadBlog = () => async (dispatch) => {
  const { data } = await axios.get('http://localhost:5000/getBlog');
  // .then(res => res.json(data))
  // .catch(err=>console.log(err));
  console.log(data);
  dispatch({
    type: ActionTypes.READ_BLOG,
    payload: data,
  })

}

export const createBlogAction = (title, content) => async (dispatch) => {

  const { data } = await axios.post(
    'http://localhost:5000/createBlog',
    { title, content }
  );
  dispatch({
    type: ActionTypes.CREATE_BLOG,
    payload: data,
  });
};

export const upadteBlogAction = (id, title, content) => async (dispatch) => {
  console.log(id);
  console.log(title);
  console.log(content);
  const { data } = await axios.put(`http://localhost:5000/update/${id}`,
    { id, title, content }
  );
  console.log(data);
  dispatch({
    type: ActionTypes.UPDATE_BLOG,
    payload: data,
  });
};

export const deleteBlogAction = (id) => async (dispatch) => {

  const { data } = await axios.delete(`http://localhost:5000/delete/${id}`);
  dispatch({
    type: ActionTypes.DELETE_BLOG,
    payload: data,
  })
    .then(d => console.log("deleted"))
    .then(alert("blog deleted"))
    .catch(err => console.log(err))
};

export const appStateAction = (state) => {
  return {
    type: ActionTypes.VIEW_UPDATE,
    payload: state
  }
}
export const BlogApiAction = (state) => {
  return {
    type: ActionTypes.UPDATE_BLOG_ID,
    payload: state
  }
}