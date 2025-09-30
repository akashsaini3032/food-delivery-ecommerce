// import { useSelector, useDispatch } from "react-redux";
// import Table from 'react-bootstrap/Table';
// import { FaPlusCircle } from "react-icons/fa";
// import { FaMinusCircle } from "react-icons/fa";
// import { dataIncrease, dataDecrease,itemRemove } from "./cartSlice";
// import { MdPriceChange } from "react-icons/md";
// import Button from 'react-bootstrap/Button';
// import { useNavigate } from "react-router-dom";

// const CartData=()=>{
//     const cartData= useSelector(state=>state.mycart.cart);
//     const dispatch= useDispatch();
//     const navigate= useNavigate();

//      let totalAmount=0;
//      const ans= cartData.map((key)=>{
//       totalAmount+=key.price*key.qnty;
//         return(
//             <>
//              <tr>
//                 <td> <img src={key.defaultImage} width="100" height="100" /></td>
//                 <td>{key.name}</td>
//                  <td>{key.description}</td>
//                   <td>{key.category}</td>
//                   <td>{key.price}</td>
//                   <td>
//                    <FaPlusCircle onClick={()=>{dispatch(dataIncrease({id:key.id}))}} />
//                     {key.qnty}   
//                     <FaMinusCircle onClick={()=>{dispatch(dataDecrease({id:key.id}))}} />
//                    </td>
//                   <td> {key.qnty * key.price} </td>
//                   <td>
//                     <button onClick={()=>{dispatch(itemRemove({id:key.id}))}}> Remove </button>
//                   </td>
                  
//              </tr>
//             </>
//         )
//      })
//     return(
//         <>
//           <h1> Our Cart Data</h1>
//            <h3 align="center" style={{color:"blue"}}><MdPriceChange /> {totalAmount}
//           <Button variant="warning" onClick={()=>{navigate("/checkout")}} style={{marginLeft:"30px"}}>Check Out</Button>
//           </h3>

//            <Table striped bordered hover>
//       <thead>
//         <tr>
//           <th>#</th>
//           <th>Product Name</th>
//           <th>Description</th>
//            <th>Category</th>
//           <th>Price</th>
//           <th> Quantity</th>
//           <th> Total Price</th>
//            <th></th>
         
//         </tr>
//       </thead>
//       <tbody>
//          {ans}
//          <tr>
//            <th colspan="6">
//             <b>Total Price :</b>
//            </th>
//            <th>{totalAmount}</th>
//            <th> </th>
//          </tr>
//       </tbody>
//       </Table>
//         </>
//     )
// }

// export default CartData;




import { useSelector, useDispatch } from "react-redux";
import Table from 'react-bootstrap/Table';
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { dataIncrease, dataDecrease, itemRemove } from "./cartSlice";
import { MdPriceChange } from "react-icons/md";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

const CartData = () => {
  const cartData = useSelector(state => state.mycart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let totalAmount = 0;
  const ans = cartData.map((key, index) => {
    totalAmount += key.price * key.qnty;
    return (
      <tr key={index} style={{ backgroundColor: "#fff8f0", textAlign: "center" }}>
        <td>
          <img
            src={key.defaultImage}
            alt={key.name}
            width="90"
            height="90"
            style={{ borderRadius: "10px", boxShadow: "0px 2px 8px rgba(0,0,0,0.1)" }}
          />
        </td>
        <td style={{ fontWeight: "600", color: "#ff4b2b" }}>{key.name}</td>
        <td style={{ fontSize: "14px", color: "#555" }}>{key.description}</td>
        <td style={{ color: "#009688", fontWeight: "500" }}>{key.category}</td>
        <td style={{ fontWeight: "600", color: "#ff9800" }}>₹{key.price}</td>
        <td style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px" }}>
          <FaPlusCircle
            onClick={() => { dispatch(dataIncrease({ id: key.id })) }}
            style={{ color: "#4caf50", cursor: "pointer" }}
          />
          <span style={{ fontWeight: "600" }}>{key.qnty}</span>
          <FaMinusCircle
            onClick={() => { dispatch(dataDecrease({ id: key.id })) }}
            style={{ color: "#f44336", cursor: "pointer" }}
          />
        </td>
        <td style={{ fontWeight: "600", color: "#3f51b5" }}>₹{key.qnty * key.price}</td>
        <td>
          <button
            onClick={() => { dispatch(itemRemove({ id: key.id })) }}
            style={{
              backgroundColor: "#f44336",
              color: "#fff",
              padding: "6px 12px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "500"
            }}
          >
            Remove
          </button>
        </td>
      </tr>
    )
  });

  return (
    <div style={{ padding: "20px", backgroundColor: "#fff8f0", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", color: "#ff4b2b", fontWeight: "700", marginBottom: "20px" }}>
        Our Cart
      </h1>

      <h3 style={{ textAlign: "center", color: "#3f51b5", marginBottom: "20px" }}>
        <MdPriceChange /> ₹{totalAmount}
        <Button
          variant="warning"
          onClick={() => { navigate("/checkout") }}
          style={{
            marginLeft: "20px",
            backgroundColor: "#ff9800",
            border: "none",
            fontWeight: "600",
            padding: "8px 16px",
            borderRadius: "6px",
            boxShadow: "0px 2px 6px rgba(0,0,0,0.15)"
          }}
        >
          Check Out
        </Button>
      </h3>

      <div style={{ overflowX: "auto" }}>
        <Table striped bordered hover style={{ backgroundColor: "#fff", borderRadius: "10px" }}>
          <thead style={{ backgroundColor: "#ff4b2b", color: "#fff", textAlign: "center" }}>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {ans}
            <tr style={{ fontWeight: "700", textAlign: "center" }}>
              <td colSpan="6">Total Price :</td>
              <td style={{ color: "#3f51b5" }}>₹{totalAmount}</td>
              <td></td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default CartData;
