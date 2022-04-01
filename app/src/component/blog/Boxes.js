import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Like from '@material-ui/icons/Favorite';
import axios from 'axios';
import ScrollToTop from "../ScrollToTop";
import { ReadBlog, appStateAction, BlogApiAction, deleteBlogAction } from '../redux/action/action';

const Boxes = (props) => {
    const dispatch = useDispatch();
    const img = 'https://images.unsplash.com/photo-1615420733289-d8d75ca63946?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max';

    const noteDelete = useSelector((state) => state.deleteBlog);
    const { success: successDelete } = noteDelete;
    const [view, setView] = useState("none");
    useEffect(() => {
    }, [
        dispatch,
        successDelete,
    ])

    const deleteBlog = (id) => {
        if (window.confirm("Are you sure?")) {
            dispatch(deleteBlogAction(id));
        }
    };
    const openUpdate = (e) => {
        e.preventDefault();
        if (view === "none") {
            setView("block")
        } else if (view === "block") {
            setView('none')
        }
        const id = props.val._id;

        dispatch(appStateAction(view))
        dispatch(BlogApiAction(id))
    }




    return (
        <div>

            <div className="boxes" key={props.val._id}>
                <div>
                    <img src={img} alt=" is loading" style={{ height: "400px" }}></img>
                </div>
                <div>
                    <h2>{props.val.title}</h2>
                    <div className="starting-of-box">
                        <button className="box-buttons"></button>
                        <div className="box-buttons" ><div><Like /></div></div>
                        <div className="box-buttons">0 comment</div>
                    </div>
                    <p className="middle-of-box">{props.val.content}</p>
                    <hr />
                    <div className="bottom-of-box">
                        published on :
                        <div className="year">
                            <span><b>{props.val.date}</b> </span>

                        </div>
                        <div className="show-btn">
                            <button  >show more</button>

                            <button onClick={() => deleteBlog(props.val._id)} >Delete</button>
                            <button onClick={openUpdate}>update</button>
                        </div>
                    </div>
                </div>
            </div>


        </div>

    )
}

export default Boxes
