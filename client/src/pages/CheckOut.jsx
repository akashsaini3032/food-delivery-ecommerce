









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
      description: "Food Order Payment",
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
        fontWeight: "700",
        letterSpacing: "1px",
      }}>
        Checkout
      </h1>

      <h3 style={{
        textAlign: "center",
        color: "#dd2476",
        fontFamily: "Poppins, sans-serif",
        marginBottom: "30px",
      }}>
        Net Payable Amount: ₹{totalAmount}
      </h3>

      <div style={{
        maxWidth: "450px",
        margin: "auto",
        background: "#fff8f3",
        padding: "30px",
        borderRadius: "16px",
        boxShadow: "0px 6px 25px rgba(0,0,0,0.1)",
        border: "1px solid #ffe0d2",
      }}>
        <Form>
          {[
            { label: "Name", value: mydata.name },
            { label: "Email", value: mydata.email },
            { label: "Shipping Address", value: mydata.address },
            { label: "City", value: mydata.city },
            { label: "Pin Code", value: mydata.pincode }
          ].map((field, index) => (
            <Form.Group className="mb-3" key={index}>
              <Form.Label style={{
                fontWeight: "600",
                color: "#ff512f",
                fontFamily: "Poppins, sans-serif"
              }}>
                {field.label}
              </Form.Label>
              <Form.Control
                type="text"
                value={field.value || ""}
                readOnly
                style={{
                  backgroundColor: "#fff",
                  color: "#333",
                  borderRadius: "10px",
                  border: "1.5px solid #ffb199",
                  padding: "10px",
                  boxShadow: "inset 0 2px 5px rgba(0,0,0,0.05)",
                  transition: "all 0.3s ease",
                }}
                onFocus={(e) => (e.target.style.border = "1.5px solid #ff512f")}
                onBlur={(e) => (e.target.style.border = "1.5px solid #ffb199")}
              />
            </Form.Group>
          ))}

          <Button
            type="button"
            onClick={handlePay}
            style={{
              width: "100%",
              background: "linear-gradient(90deg, #ff512f, #dd2476)",
              border: "none",
              padding: "14px",
              fontSize: "1.1rem",
              fontWeight: "600",
              borderRadius: "10px",
              color: "#fff",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0px 4px 12px rgba(255, 81, 47, 0.4)"
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0px 6px 16px rgba(255, 81, 47, 0.5)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0px 4px 12px rgba(255, 81, 47, 0.4)";
            }}
          >
            Proceed to Payment
          </Button>
        </Form>
      </div>
    </>
  );
};

export default CheckOut;

