import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import {
    upadteBlogAction,
    ReadBlog,
    BlogApiAction
} from "../redux/action/action";

const updateBlog = () => {

    const dispatch = useDispatch();
    const updateBlog = useSelector((state) => state.UpdateBlog);
    const { success: successUpdate } = updateBlog;
    useEffect(() => {
    }, [
        dispatch,
        successUpdate
    ])
    const viewUpdate = useSelector((state) => state.viewUpdate);
    const view = viewUpdate.setState;
    // console.log(view);
    const BlogID = useSelector((state) => state.BlogID);
    // console.log(BlogID)
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");


    function updateItem(id) {
        const _id = id;
        dispatch(upadteBlogAction(_id, title, content));
        console.log(_id);
        console.log(content);
        console.log(title);
        if (!title || !content) return;
        setTitle("");
        setContent("");
    }


    return (
        <div>
            <div style={{ display: view }}>
                <div className="create-blog" >
                    <input type="text" name="title" placeholder="Title of the blog" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <textarea name="content" id="" value={content} onChange={(e) => setContent(e.target.value)} ></textarea>
                </div>
                <button onClick={() => updateItem(BlogID)}>update blog</button>
            </div>
        </div>
    )
}

export default updateBlog;
