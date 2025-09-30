// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import BackEndUrl from "../config/BackEndUrl";
// import axios from "axios";
// import Table from 'react-bootstrap/Table';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';

// import { useSelector, useDispatch } from "react-redux";


// const CheckOut=()=>{
// const navigate = useNavigate();
// const [mydata, setMydata] = useState({});
//  const cartData= useSelector(state=>state.mycart.cart);
//   const loadData=async()=>{
//      let api=`${BackEndUrl}/user/getuser/?userid=${localStorage.getItem("userid")}`;
//      const response = await axios.get(api);
//      setMydata(response.data);
//      console.log(response.data);
//   }


// useEffect(()=>{
//         if (!localStorage.getItem("username"))
//         {
//           navigate("/login");
//         }

//         loadData();
//     }, [])


// let totalAmount=0;
// let productName="";
// let proImage="";
//      const ans= cartData.map((key)=>{
//        totalAmount+=key.price*key.qnty;
//        productName+=key.name+" ";
//        proImage+=key.defaultImage
//      })




// const initPay = (data) => {
//   const options = {
//     key : "rzp_test_tKx5atxA4zrfPz",
//     amount: totalAmount,
//     currency: data.currency,
//     name: productName,
//     description: "Test",
//     image:proImage,
//     order_id: data.id,
//     handler: async (response) => {
//       try {
//         const verifyURL = "https://localhost:8080/api/payment/verify";
//         const {data} = await axios.post(verifyURL,response);
//       } catch(error) {
//         console.log(error);
//       }
//     },
//     theme: {
//       color: "#3399cc",
//     },
//   };
//   const rzp1 = new window.Razorpay(options);
//   rzp1.open();
// };


// const handlePay = async () => {
//   try {
//     const orderURL = "http://localhost:8080/api/payment/orders";
//     const {data} = await axios.post(orderURL,{amount: totalAmount, products:productName, name:mydata.name, city:mydata.city, address:mydata.address, pincode:mydata.pincode, email:mydata.email});
//     console.log(data);
//     initPay(data.data);
//   } catch (error) {
//     console.log(error);
//   }
// };








//     return(
//         <>
//           <h1> CheckOut</h1>
//            <h3 align="center"> Net Paybale Amount : {totalAmount}</h3>
//            <Form style={{width:"300px", margin:"auto"}}>
//       <Form.Group className="mb-3" controlId="formBasicEmail">
//         <Form.Label>Name</Form.Label>
//         <Form.Control type="text" value={mydata.name} readOnly style={{backgroundColor:"lightgrey"}} />
//       </Form.Group>
//       <Form.Group className="mb-3" controlId="formBasicEmail">
//         <Form.Label>Email</Form.Label>
//         <Form.Control type="text" value={mydata.email} readOnly style={{backgroundColor:"lightgrey"}} />
//       </Form.Group>
//       <Form.Group className="mb-3" controlId="formBasicEmail">
//         <Form.Label>Shipping Address</Form.Label>
//         <Form.Control type="text" value={mydata.address} readOnly style={{backgroundColor:"lightgrey"}} />
//       </Form.Group>
//       <Form.Group className="mb-3" controlId="formBasicEmail">
//         <Form.Label>City</Form.Label>
//         <Form.Control type="text" value={mydata.city} readOnly style={{backgroundColor:"lightgrey"}} />
//       </Form.Group>
//       <Form.Group className="mb-3" controlId="formBasicEmail">
//         <Form.Label>Pin Code</Form.Label>
//         <Form.Control type="text" value={mydata.pincode} readOnly style={{backgroundColor:"lightgrey"}} />
//       </Form.Group>
//       <Button variant="primary" type="button" onClick={handlePay}>
//         CheckOut
//       </Button>
//     </Form>
          

//         </>
//     )
// }
// export default CheckOut;





import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackEndUrl from "../config/BackEndUrl";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useSelector } from "react-redux";

const CheckOut = () => {
  const navigate = useNavigate();
  const [mydata, setMydata] = useState({});
  const cartData = useSelector(state => state.mycart.cart);

  const loadData = async () => {
    let api = `${BackEndUrl}/user/getuser/?userid=${localStorage.getItem("userid")}`;
    const response = await axios.get(api);
    setMydata(response.data);
  };

  useEffect(() => {
    if (!localStorage.getItem("username")) {
      navigate("/login");
    }
    loadData();
  }, []);

  let totalAmount = 0;
  let productName = "";
  let proImage = "";
  cartData.forEach((key) => {
    totalAmount += key.price * key.qnty;
    productName += key.name + " ";
    proImage += key.defaultImage;
  });

  const initPay = (data) => {
    const options = {
      key: "rzp_test_tKx5atxA4zrfPz",
      amount: totalAmount,
      currency: data.currency,
      name: productName,
      description: "Test",
      image: proImage,
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyURL = "https://localhost:8080/api/payment/verify";
          await axios.post(verifyURL, response);
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#ff512f",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePay = async () => {
    try {
      const orderURL = "http://localhost:8080/api/payment/orders";
      const { data } = await axios.post(orderURL, {
        amount: totalAmount,
        products: productName,
        name: mydata.name,
        city: mydata.city,
        address: mydata.address,
        pincode: mydata.pincode,
        email: mydata.email
      });
      initPay(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 style={{
        textAlign: "center",
        marginTop: "20px",
        fontFamily: "Poppins, sans-serif",
        color: "#ff512f",
        fontWeight: "700"
      }}>
        Checkout
      </h1>

      <h3 style={{
        textAlign: "center",
        color: "#dd2476",
        fontFamily: "Poppins, sans-serif",
        marginBottom: "30px"
      }}>
        Net Payable Amount: ₹{totalAmount}
      </h3>

      <div style={{
        maxWidth: "400px",
        margin: "auto",
        background: "#fff8f3",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0px 4px 20px rgba(0,0,0,0.1)"
      }}>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: "600" }}>Name</Form.Label>
            <Form.Control type="text" value={mydata.name} readOnly style={{
              backgroundColor: "#f1f1f1",
              borderRadius: "8px"
            }} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: "600" }}>Email</Form.Label>
            <Form.Control type="text" value={mydata.email} readOnly style={{
              backgroundColor: "#f1f1f1",
              borderRadius: "8px"
            }} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: "600" }}>Shipping Address</Form.Label>
            <Form.Control type="text" value={mydata.address} readOnly style={{
              backgroundColor: "#f1f1f1",
              borderRadius: "8px"
            }} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: "600" }}>City</Form.Label>
            <Form.Control type="text" value={mydata.city} readOnly style={{
              backgroundColor: "#f1f1f1",
              borderRadius: "8px"
            }} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: "600" }}>Pin Code</Form.Label>
            <Form.Control type="text" value={mydata.pincode} readOnly style={{
              backgroundColor: "#f1f1f1",
              borderRadius: "8px"
            }} />
          </Form.Group>

          <Button
            type="button"
            onClick={handlePay}
            style={{
              width: "100%",
              background: "linear-gradient(90deg, #ff512f, #dd2476)",
              border: "none",
              padding: "12px",
              fontSize: "1.1rem",
              fontWeight: "600",
              borderRadius: "8px",
              color: "#fff",
              cursor: "pointer",
              transition: "transform 0.3s ease"
            }}
            onMouseOver={(e) => e.target.style.transform = "scale(1.05)"}
            onMouseOut={(e) => e.target.style.transform = "scale(1)"}
          >
            Proceed to Payment
          </Button>
        </Form>
      </div>
    </>
  );
};

export default CheckOut;
