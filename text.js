//   // const fetchBlog = async () => {
//     //     const response = await axios.get('http://localhost:5000/getBlog')
//     //         .catch(err => console.log(err))
//     //     console.log(response.data);
//     //     dispatch(ReadBlog(response.data));
//     // }

//     // useEffect(() => {
//     //     fetchBlog()
//     // }, [])

//     //for post data --create

//     // function createBlog(a) {
//     //     a.preventDefault()
//     //     const newItem = {
//     //         title: data.title,
//     //         content: data.content,
//     //     }

//     //     axios.post('http://localhost:5000/createBlog', newItem)
//     //         .then(res => console.log(res.data))
//     //         .catch(err => console.log(err));

//     //     setData({
//     //         title: "",
//     //         content: "",
//     //     });
//     // }


//     //for update blog-- update
//     // const [updatedItem, setUpdatedItem] = useState({
//     //     title: "",
//     //     content: "",
//     //     id: ""
//     // });

//     // const openUpdate = (id) => {
//     //     setIsPut(true);
//     //     setUpdatedItem(previous => {
//     //         return (
//     //             {
//     //                 ...previous,
//     //                 id: id
//     //             }
//     //         )
//     //     })
//     // }

//     // function updateItem(id) {
//     //     axios.put("http://localhost:5000/update/" + id, updatedItem)
//     //     alert('blog updated')
//     //     setUpdatedItem({
//     //         title: "",
//     //         content: ""
//     //     })
//     // }

//     // function handleUpdate(event) {
//     //     const { name, value } = event.target;
//     //     setUpdatedItem((prevInput) => {
//     //         return {
//     //             ...prevInput,
//     //             [name]: value,
//     //         };
//     //     });
//     //     console.log(updatedItem);
//     // }


// import axios from 'axios'
// import React, { useState ,useEffect} from 'react'
// import { useDispatch, useSelector } from "react-redux"
// import {
//     ReadBlog,
//     createBlogAction

// } from "../redux/action/action";


// const CreateBlog = (props) => {
//       const [title, setTitle] = useState();
//   const [content, setContent] = useState();

//   const dispatch = useDispatch();

// const createBlogState=useSelector((state)=>state.CreateBlog);
// const{blog}=createBlogState;

//     function createBlog(a) {
//             a.preventDefault()
//             dispatch(createBlogAction(title,content))
//             if (!title || !content ) return;   
//          setTitle('')
//          setContent('')
//         }
//  useEffect(() => {}, [])

//     return (
//         <div>
//                 <div style={{ display: props.none }}>
//                     <div className="create-blog" >
//                         <input type="text" name="title" placeholder="Title of the blog" value={title} onChange={(e)=>setTitle(e.target.value)} />
//                         <textarea name="content" id="" value={content} onChange={(e)=>setContent(e.target.value)} ></textarea>
//                     </div>
//                     <button onClick={createBlog}>create blog</button>
//                 </div>


//         </div>
//     )
// }

// export default CreateBlog;

// import React from 'react'
// import axios from 'axios'
// import React, { useState } from 'react'
// import { useDispatch, useSelector } from "react-redux"
// import {
//     ReadBlog,
//     upadteBlogAction
// } from "../redux/action/action";

// const updateBlog = ({match,props}) => {

//      const dispatch = useDispatch();

// const updateBlog=useSelector((state)=>state.updateBlog);
// const{blog}=updateBlog;

//       //for update blog-- update
//       const [title, setTitle] = useState();
//   const [content, setContent] = useState();
//     const [date, setDate] = useState("");


// useEffect(() => {
//     const fetching = async () => {
//       const { data } = await axios.get(`/api/notes/${match.params.id}`);

//       setTitle(data.title);
//       setContent(data.content);
//       setDate(data.updatedAt);
//     };

//     fetching();
//   }, [match.params.id, date]);
//      function updateItem(id) {
//           dispatch(upadteBlogAction(match.params.id, title, content));
//     if (!title || !content ) return;

//       setTitle("");
//     setContent("");  
//     }


//     return (
//         <div>
//             <div style={{ display: props.none }}>
//                     <div className="create-blog" >
//                         <input type="text" name="title" placeholder="Title of the blog" value={title} onChange={(e)=>setTitle(e.target.value)} />
//                         <textarea name="content" id="" value={content} onChange={(e)=>setContent(e.target.value)} ></textarea>
//                     </div>
//                     <button onClick={() => updateItem(updatedItem.id)}>update blog</button>
//                 </div>
//         </div>
//     )
// }

// export default updateBlog

var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var StaffModel = require("../Models/Staff.model");
var generateUniqueId = require("generate-unique-id");
var MessageModel = require("../Models/Message.model");

var AddOrderModel = require("../Models/AddOrderModel.mode");

mongoose.connect("mongodb://localhost/netcom_staff");

// Add Orders
router.post("/add-order", async (req, res) => {
    var dataImGet = req.body;

    var id = await dataImGet["orderID"];

    var dbId = await AddOrderModel.findOne({ orderID: id });

    console.log(dbId);
    try {
        if (dbId === null) {
            // StoreData
            console.log("pre add process");

            var StoreData = await AddOrderModel(dataImGet);
            StoreData.save((err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Data Stored");
                }
            });
        } else {
            // Delete Data
            console.log("pre del process");

            var DeleteData = await AddOrderModel.deleteOne({ orderID: id });

            var storeData = await AddOrderModel(dataImGet);

            storeData.save((err) => {
                if (!err) {
                    console.log("ReStore");
                }
            });
        }
    } catch (error) {
        console.log("errTryCatch");
    }
});

// Show Order
router.get("/show-order", async (req, res) => {
    var list = await AddOrderModel.find({}, { salwarData: 0, blouseData: 0, _id: 0, __v: 0 });
    res.json(list);
});

// Get Order
router.post("/get-order", async (req, res) => {
    var id = req.body.orderID;
    var no = req.body.mobNo
    var foundObject = await AddOrderModel.findOne({ orderID: id, mobNo: no })
    res.json(foundObject)
});


// Remove Order
router.post("/remove-order", async (req, res) => {
    var id = req.body.orderID;
    var no = req.body.mobNo
    var foundObject = await AddOrderModel.deleteOne({ orderID: id, mobNo: no })
    res.json(foundObject)
});

// Add Message
router.post("/add-message", (req, res) => {
    console.log("add-message_Called");
    var data = req.body;

    StaffModel.find({ number: data.number }, (err, foundObject) => {
        if (foundObject.length === 0) {
            res.json({ message: "No Number Found", res: "failed" });
        } else {
            var StoreMessage = new MessageModel(data);
            StoreMessage.save((err) => {
                res.json({ message: "One Message Added Successfully", res: "success" });
            });
        }
    });
});

// Show Message
router.get("/show-message", (req, res) => {
    MessageModel.find((err, listOfObject) => {
        res.json(listOfObject);
    });
});

// Remove message
router.post("/remove-message", async (req, res) => {
    var no = req.body.staffNo;

    try {
        var foundObject = await MessageModel.findOne({ number: no });

        if (foundObject === null) {
            console.log("No_Data_Found");
            res.json({ message: "No_Data_Found" });
        } else {
            var deleteItems = await MessageModel.deleteMany({ number: no });
            res.json({ message: "All Message Deleted" });
        }
    } catch (error) {
        console.log("ErrTry");
    }
    // MessageModel.remove({ number: req.params.number }, (err, datas) => {
    //   res.json(datas);
    // });
});

router.get("/", function (req, res, next) {
    res.send("Netcom - Works");
});

// Add
router.post("/create-staff", async (req, res) => {
    const id = generateUniqueId({
        length: 4,
        useLetters: false,
    });

    var staffId = "staff-" + id;

    var existNo = await StaffModel.exists({ number: req.body.number });

    if (existNo) {
        return res.json({ message: "Already Exists" });
    } else {
        var AddData = new StaffModel({
            staffId: staffId,
            name: req.body.name,
            position: req.body.position,
            age: req.body.age,
            number: req.body.number,
        });
    }
    AddData.save((err, AddData) => {
        if (err) {
            res.json(err);
        } else {
            res.json({ message: "ok", object: AddData, staffId: staffId });
        }
    });
});

// Remove
router.post("/remove", async (req, res) => {
    var id = req.body.staffId;
    var foundObj;

    try {
        foundObj = await StaffModel.findOne({ staffId: id });

        if (foundObj === null) {
            res.json({ res: "No_Data_Found" });
        }

        var msgNo = await MessageModel.findOne({ number: foundObj["number"] });

        if (msgNo === null) {
            console.log("No Messgae Found");

            await StaffModel.findOneAndRemove({ staffId: id });

            res.json({ res: "deleted" });
        } else {
            console.log("Messgae Found");
            res.json({ res: "Can't delete this user post some message." });
        }
    } catch (error) {
        console.log(error);
    }
});

// FindOne
router.post("/find", async (req, res) => {
    // console.log(req.body);
    var id = req.body.staffId;

    var foundObj = await StaffModel.findOne({ staffId: id });

    try {
        if (foundObj === null) {
            res.json({ foundObject: "No_Data_Found" });
        } else {
            res.json({ foundObject: foundObj });
        }
    } catch (error) {
        console.log("tryErr");
    }

    //  try {
    //
    // StaffModel.find({ staffId: id }, function (err, docs) {
    //   if (err) {
    //     res.json({ foundObject: "NoData" });
    //   } else {
    //     res.json({ foundObject: docs[0] });
    //     // console.log(docs[0]);
    //   }
    // });
    //  } catch (error) {
    //   res.json({ foundObject: "NoData" });
    //  }
});

// Update
router.post("/update", async (req, res) => {
    // console.log(req.body);

    var id = req.body.staffId;

    var newObj = req.body.data; //  whole object

    var key = "no_check"; //  1-> allow , 0 -> denied

    var foundNo = await StaffModel.findOne({ number: newObj["number"] });
    console.log(foundNo);
    try {
        if (foundNo === null || foundNo.number === newObj.number) {
            var updated = await StaffModel.findOneAndUpdate({ staffId: id }, newObj)

            console.log("Moditication Allowed");
        } else {
            console.log("Already Exist ");
        }
    } catch (error) {
        console.log("TRYErr");
    }

    // var foundObj = await StaffModel.findOne({ staffId: id });

    // var no = foundObj["number"];

    // console.log(no)

    //  var count = await StaffModel.countDocuments({number:no})

    //  console.log(count)

    // StaffModel.find((err, listOfData) => {
    //   listOfData.map((object) => {
    //     if (object.staffId === id && object.number === newObj.number) {
    //       key = "same_id_and_no";
    //     } else if (object.staffId === id && object.number != newObj.number) {
    //       key = "same_id_diff_no";

    //       for (var i = 0; i < listOfData.length; i++) {
    //         var singleObj = listOfData[i];
    //         if (singleObj.number === newObj.number) {
    //           console.log("No");
    //           key = "same_id_someOne_no";
    //         }
    //       }
    //     }
    //   });

    //   res.json({ key: key });

    //   // console.log("KEY : " + key);

    //   if (key === "same_id_and_no" || key === "same_id_diff_no") {
    //     StaffModel.findOneAndUpdate({ staffId: id }, newObj, (err, data) => {
    //       if (err) {
    //         console.log(err);
    //       } else {
    //         res.json({ message: "Updated" });
    //       }
    //     });
    //   } else {
    //     console.log("Number Already Exist");
    //   }
    // });
});

// Find : List All Data
router.get("/staff-list", (req, res) => {
    StaffModel.find((err, datas) => {
        if (err) {
            res.json(err);
        } else {
            res.json(datas);
        }
    });
});

// Already Exists
router.get("/check/:staffId", (req, res) => {
    StaffModel.countDocuments({ staffId: req.params.staffId }, (err, count) => {
        if (count > 0) {
            res.json({ message: "already exist" });
        } else {
            res.json({ message: "New Id" });
        }
    });
});

module.exports = router;