


import { useState, useEffect } from "react";
import BackEndUrl from "../config/BackEndUrl";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

const CustomerOrder = () => {
  const [mydata, setMydata] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("none");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const loadData = async () => {
    let api = `${BackEndUrl}/admin/ourorder`;
    try {
      const response = await axios.get(api);
      setMydata(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // ✅ Filter + Sort + Pagination Logic
  const filteredData = mydata
    .filter((item) => {
      const searchLower = search.toLowerCase();
      return (
        item.products.toLowerCase().includes(searchLower) ||
        item.clientname.toLowerCase().includes(searchLower) ||
        item.city.toLowerCase().includes(searchLower) ||
        item.email.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.clientname.localeCompare(b.clientname);
      if (sortBy === "amount") return a.amount - b.amount;
      return 0;
    });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <h1
        style={{
          textAlign: "center",
          color: "#ff512f",
          marginBottom: "25px",
          fontFamily: "Poppins, sans-serif",
          fontWeight: "700",
        }}
      >
        Our Orders
      </h1>

      {/* ✅ Search + Sort Controls */}
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto 20px auto",
          display: "flex",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Search by Product, Name, City or Email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              borderRadius: "8px",
              border: "1px solid #ffb199",
              backgroundColor: "#fff8f3",
            }}
          />
        </InputGroup>

        <Form.Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            maxWidth: "200px",
            borderRadius: "8px",
            border: "1px solid #ffb199",
            backgroundColor: "#fff8f3",
            fontWeight: "500",
          }}
        >
          <option value="none">Sort By</option>
          <option value="name">Customer Name</option>
          <option value="amount">Amount (Low → High)</option>
        </Form.Select>
      </div>

      {/* ✅ Orders Table */}
      <div style={{ maxWidth: "95%", margin: "auto" }}>
        <Table
          striped
          bordered
          hover
          responsive
          style={{
            backgroundColor: "#fff8f3",
            borderRadius: "10px",
            overflow: "hidden",
            boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
          }}
        >
          <thead
            style={{
              background:
                "linear-gradient(90deg, #ff512f, #dd2476)",
              color: "white",
            }}
          >
            <tr>
              <th>#</th>
              <th>Products</th>
              <th>Amount</th>
              <th>Customer Name</th>
              <th>City</th>
              <th>Address</th>
              <th>PinCode</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {displayedData.length > 0 ? (
              displayedData.map((key, index) => (
                <tr key={index}>
                  <td>{startIndex + index + 1}</td>
                  <td>{key.products}</td>
                  <td>₹{key.amount}</td>
                  <td>{key.clientname}</td>
                  <td>{key.city}</td>
                  <td>{key.address}</td>
                  <td>{key.pincode}</td>
                  <td>{key.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", color: "#888" }}>
                  No matching orders found 😕
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* ✅ Pagination Controls */}
      {totalPages > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            marginTop: "20px",
          }}
        >
          <Button
            variant="outline-danger"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </Button>
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i}
              size="sm"
              variant={currentPage === i + 1 ? "danger" : "outline-danger"}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            variant="outline-danger"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </>
  );
};

export default CustomerOrder;
