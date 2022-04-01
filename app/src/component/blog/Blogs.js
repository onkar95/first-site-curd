import React, { useEffect, useState } from 'react';
import Boxes from './Boxes';
import CreateBlog from './CreateBlog';
import UpdateBlog from './updateBlog';
import Navbar from '../navbar/Navbar';
import Footer from '../contact-footer/Footer';
import { useDispatch, useSelector } from "react-redux"
import { ReadBlog, BlogApiAction } from "../redux/action/action";

function Blog() {
    const dispatch = useDispatch();
    const blogList = useSelector((state) => state.allBlogs)
    console.log(blogList);

    const createBlogState = useSelector((state) => state.CreateBlog);
    const { success: successCreate } = createBlogState;

    useEffect(() => {
        dispatch(ReadBlog());
        dispatch(BlogApiAction());
    }, [
        dispatch,
        successCreate
    ])

    //show the input for blog
    const [none, block] = useState("none");
    const edit = () => {
        if (none === "none") {
            block("block")
        } else if (none === "block") {
            block("none")
        }

    }


    return (
        <div>

            <Navbar />

            <div id="blog">
                <div className="blog">
                    <div className="blog-h1">
                        <h1>welcome to my blog</h1>
                        <div>
                            <button onClick={edit}  >Create blog</button>
                            <CreateBlog none={none} />
                            <div className="editor">
                                <UpdateBlog />
                            </div>

                        </div>
                    </div>

                    <div className="blog-box-container">

                        {blogList && blogList.blogList && blogList.blogList.map((val) => (
                            <div>
                                <Boxes val={val} />
                            </div>

                        ))}
                        <div>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    )
}


export default Blog;
