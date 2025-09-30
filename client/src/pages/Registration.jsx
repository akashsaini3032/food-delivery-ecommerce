// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import { useState } from 'react';
// import BackEndUrl from '../config/BackEndUrl';
// import axios from 'axios';
// const Registration=()=>{
//     const [input, setInput] = useState({});

//     const handleInput=(e)=>{
//         let name=e.target.name;
//         let value=e.target.value;
//         setInput(values=>({...values, [name]:value}));
//        console.log(input);         
//     }


//    const handleSubmit=async(e)=>{
//       e.preventDefault();
//        let api=`${BackEndUrl}/user/registration`;
//        const response = await axios.post(api, input);
//       console.log(response.data);
//       alert("You are Succesfully Registered!!");
//    }

//     return(
//         <>
          
//             <Form style={{width:"300px", margin:"auto"}}>
//              <h1> User Register </h1>
//       <Form.Group className="mb-3" controlId="formBasicEmail">
//         <Form.Label>Enter Name</Form.Label>
//         <Form.Control type="text" name="name" onChange={handleInput} />
//       </Form.Group>
//        <Form.Group className="mb-3" controlId="formBasicEmail">
//         <Form.Label>Enter City</Form.Label>
//         <Form.Control type="text" name="city" onChange={handleInput}  />
//       </Form.Group>
//        <Form.Group className="mb-3" controlId="formBasicEmail">
//         <Form.Label>Enter Address</Form.Label>
//         <Form.Control type="text" name="address" onChange={handleInput}  />
//       </Form.Group>
//        <Form.Group className="mb-3" controlId="formBasicEmail">
//         <Form.Label>Enter Pin code</Form.Label>
//         <Form.Control type="number" name='pincode' onChange={handleInput}  />
//       </Form.Group>
//        <Form.Group className="mb-3" controlId="formBasicEmail">
//         <Form.Label>Enter Email</Form.Label>
//         <Form.Control type="email" name='email' onChange={handleInput}  />
//       </Form.Group>
//        <Form.Group className="mb-3" controlId="formBasicEmail">
//         <Form.Label>Enter Password</Form.Label>
//         <Form.Control type="password" name="password" onChange={handleInput}  />
//       </Form.Group>
//       <Button variant="primary" type="submit" onClick={handleSubmit}>
//         Submit!
//       </Button>
//     </Form>      
//         </>
//     )
// }

// export default Registration;



import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import BackEndUrl from '../config/BackEndUrl';
import axios from 'axios';

const Registration = () => {
  const [input, setInput] = useState({});

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInput((values) => ({ ...values, [name]: value }));
    console.log(input);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let api = `${BackEndUrl}/user/registration`;
    const response = await axios.post(api, input);
    console.log(response.data);
    alert("You are Successfully Registered!!");
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
          maxWidth: "450px"
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
          User Registration
        </h1>
        <Form>
          {[
            { label: "Enter Name", type: "text", name: "name" },
            { label: "Enter City", type: "text", name: "city" },
            { label: "Enter Address", type: "text", name: "address" },
            { label: "Enter Pin Code", type: "number", name: "pincode" },
            { label: "Enter Email", type: "email", name: "email" },
            { label: "Enter Password", type: "password", name: "password" }
          ].map((field, index) => (
            <Form.Group className="mb-3" key={index}>
              <Form.Label style={{ fontWeight: "bold", color: "#333" }}>
                {field.label}
              </Form.Label>
              <Form.Control
                type={field.type}
                name={field.name}
                onChange={handleInput}
                style={{
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  padding: "10px"
                }}
              />
            </Form.Group>
          ))}

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
            Submit!
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Registration;
