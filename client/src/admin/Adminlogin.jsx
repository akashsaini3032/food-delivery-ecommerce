// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import { useState } from 'react';
// import BackEndUrl from '../config/BackEndUrl';
// import axios from "axios";
// import { useNavigate } from 'react-router-dom';
// const AdminLogin=()=>{
//     const [adminid, setAdminid] = useState("");
//     const [password, setPassword] = useState("");
//     const navigate = useNavigate();

//    const handleSubmit=async(e)=>{
//            e.preventDefault();
//            console.log(adminid, password);
//            try {
//                let api=`${BackEndUrl}/admin/adminlogin`;
//              const response = await axios.post(api, {adminid, password});
//               localStorage.setItem("adminid", response.data.adminid);
//              navigate("/admindashboard");
//              console.log(response);
//            } catch (error) {
//             alert(error.response.data.msg)
              
//            }
//    }

//     return(
//         <>
//         <h1 align="center"> Admin Login</h1>
//          <Form style={{width:"300px", margin:"auto"}}>
//       <Form.Group className="mb-3" controlId="formBasicEmail">
//         <Form.Label>Enter Id</Form.Label>
//         <Form.Control type="text"  value={adminid} onChange={(e)=>{setAdminid(e.target.value)}} />
//       </Form.Group>
//       <Form.Group className="mb-3" controlId="formBasicPassword">
//         <Form.Label>Password</Form.Label>
//         <Form.Control type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
//       </Form.Group>
//       <Button variant="primary" type="submit" onClick={handleSubmit}>
//         Submit
//       </Button>
//     </Form>
//         </>
//     )
// }

// export default AdminLogin;



import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import BackEndUrl from '../config/BackEndUrl';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Adminlogin = () => {
  const [adminid, setAdminid] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(adminid, password);
    try {
      let api = `${BackEndUrl}/admin/adminlogin`;
      const response = await axios.post(api, { adminid, password });
      localStorage.setItem("adminid", response.data.adminid);
      navigate("/admindashboard");
      console.log(response);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #ff7e5f, #feb47b)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px 30px",
          borderRadius: "15px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
          width: "100%",
          maxWidth: "400px"
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#ff7e5f",
            fontFamily: "'Poppins', sans-serif",
            marginBottom: "20px"
          }}
        >
          Admin Login
        </h1>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{ fontWeight: "bold", color: "#333" }}>
              Enter ID
            </Form.Label>
            <Form.Control
              type="text"
              value={adminid}
              onChange={(e) => setAdminid(e.target.value)}
              style={{
                borderRadius: "8px",
                border: "1px solid #ddd",
                padding: "10px"
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label style={{ fontWeight: "bold", color: "#333" }}>
              Password
            </Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                borderRadius: "8px",
                border: "1px solid #ddd",
                padding: "10px"
              }}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            onClick={handleSubmit}
            style={{
              width: "100%",
              background: "linear-gradient(135deg, #ff7e5f, #feb47b)",
              border: "none",
              padding: "10px",
              fontWeight: "bold",
              borderRadius: "8px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
            }}
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Adminlogin;
