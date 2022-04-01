import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import {
    ReadBlog,
    createBlogAction

} from "../redux/action/action";


const CreateBlog = (props) => {
    const [title, setTitle] = useState();
    const [content, setContent] = useState();

    const dispatch = useDispatch();

    const createBlogState = useSelector((state) => state.CreateBlog);
    const { blog } = createBlogState;

    function createBlog(a) {
        a.preventDefault()
        dispatch(createBlogAction(title, content))
        if (!title || !content) return;
        setTitle('')
        setContent('')
    }
    useEffect(() => { }, [])

    return (
        <div>
            <div style={{ display: props.none }}>
                <div className="create-blog" >
                    <input type="text" name="title" placeholder="Title of the blog" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <textarea name="content" id="" value={content} onChange={(e) => setContent(e.target.value)} ></textarea>
                </div>
                <button onClick={createBlog}>create blog</button>
            </div>


        </div>
    )
}

export default CreateBlog;
