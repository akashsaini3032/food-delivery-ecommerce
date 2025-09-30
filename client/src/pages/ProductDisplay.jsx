// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import BackEndUrl from "../config/BackEndUrl";
// import axios from "axios";

// import "../css/Productdisplay.css";
// const ProductDisplay = () => {
//     const { id } = useParams();
//     const [mydata, setMydata] = useState({});
//     const [imglist, setimgList] = useState([]);
//     const [DefaultImage, SetDefaultImage] = useState("");

//     console.log(imglist);

//     const loadData = async () => {
//         let api = `${BackEndUrl}/product/productdisplay/?id=${id}`;
       
//         try {
//             const response = await axios.get(api);
//             console.log(response.data);
//             setMydata(response.data);
//             setimgList(response.data.images);
//             SetDefaultImage(response.data.defaultImage);
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     useEffect(() => {
//         loadData();
//     }, [])



//     const ans = imglist.map((key) => {
//         return (
//             <>
//                 <img src={key} width="50" height="50" style={{border:"5px solid lightblue", margin:"5px"}}
//                 onMouseOver={()=>{SetDefaultImage(key)}} />
//                 <br/>
//             </>
//         )
//     })

//     return (
//         <>
//             <h1> Product Display</h1>

//             <div id="prodisplay">
//                 <div style={{display:"flex"}}>
//                     <div>
//                         {ans}

//                     </div>
//                     <div>
//                         <img src={DefaultImage} width="300" height="300" />
//                     </div>
//                 </div>
//                 <div>
//                     <h1> Product Name: {mydata.name}</h1>
//                     <h2> Price : {mydata.price}</h2>

//                 </div>
//             </div>

//         </>
//     )
// }
// export default ProductDisplay;


import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import BackEndUrl from "../config/BackEndUrl";
import axios from "axios";

import "../css/Productdisplay.css";

const ProductDisplay = () => {
    const { id } = useParams();
    const [mydata, setMydata] = useState({});
    const [imglist, setimgList] = useState([]);
    const [DefaultImage, SetDefaultImage] = useState("");
    const navigate = useNavigate();

    const loadData = async () => {
        let api = `${BackEndUrl}/product/productdisplay/?id=${id}`;
        try {
            const response = await axios.get(api);
            setMydata(response.data);
            setimgList(response.data.images);
            SetDefaultImage(response.data.defaultImage);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const ans = imglist.map((key, index) => {
        return (
            <div key={index}>
                <img
                    src={key}
                    width="50"
                    height="50"
                    style={{ border: "5px solid lightblue", margin: "5px", cursor: "pointer" }}
                    onMouseOver={() => { SetDefaultImage(key) }}
                    alt="Thumbnail"
                />
            </div>
        );
    });

    return (
        <>
            <h1>Product Display</h1>

            <div id="prodisplay" style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                <div style={{ display: "flex", gap: "15px" }}>
                    <div>{ans}</div>
                    <div>
                        <img
                            src={DefaultImage}
                            width="300"
                            height="300"
                            style={{ borderRadius: "8px", objectFit: "cover" }}
                            alt="Main Product"
                        />
                    </div>
                </div>
                <div>
                    <h1>Product Name: {mydata.name}</h1>
                    <h2>Price : ₹{mydata.price}</h2>

                    {/* Add to Cart Button */}
                    <button
                        style={{
                            background: "linear-gradient(90deg, #ff512f, #dd2476)",
                            color: "#fff",
                            padding: "12px 20px",
                            border: "none",
                            borderRadius: "8px",
                            fontSize: "1rem",
                            fontWeight: "600",
                            cursor: "pointer",
                            marginTop: "15px",
                            transition: "transform 0.3s ease",
                        }}
                        onClick={() => navigate("/cartdata")}
                        onMouseOver={(e) => e.target.style.transform = "scale(1.05)"}
                        onMouseOut={(e) => e.target.style.transform = "scale(1)"}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </>
    );
};

export default ProductDisplay;
