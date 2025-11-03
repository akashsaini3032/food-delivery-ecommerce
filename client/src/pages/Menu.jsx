import { useState, useEffect } from "react";
import BackEndUrl from "../config/BackEndUrl";
import axios from "axios";
import { addtoCart } from "../cartSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const Menu = () => {
  const [mydata, setMydata] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loadData = async () => {
    const api = `${BackEndUrl}/product/homedisplay`;
    try {
      const response = await axios.get(api);
      setMydata(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // ✅ Apply Search, Sort, Category Filter (Frontend)
  const filteredData = mydata
    .filter((item) => {
      const searchLower = search.toLowerCase();
      const matchCategory =
        categoryFilter === "all" || item.category.toLowerCase() === categoryFilter;
      return (
        matchCategory &&
        (item.name.toLowerCase().includes(searchLower) ||
          item.description.toLowerCase().includes(searchLower))
      );
    })
    .sort((a, b) => {
      if (sort === "priceLowHigh") return a.price - b.price;
      if (sort === "priceHighLow") return b.price - a.price;
      if (sort === "nameAZ") return a.name.localeCompare(b.name);
      if (sort === "nameZA") return b.name.localeCompare(a.name);
      return 0;
    });

  return (
    <div className="fancy-section">
      <h1 className="fancy-title">🍽️ Our Signature Dishes</h1>

      {/* 🔍 Search + Sort + Category Controls */}
      <div className="fancy-controls">
        <input
          type="text"
          placeholder="Search by name or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="fancy-search"
        />

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value.toLowerCase())}
          className="fancy-select"
        >
          <option value="all">All Categories</option>
          <option value="veg">Veg</option>
          <option value="nonveg">NonVeg</option>
          <option value="vegan">Vegan</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="fancy-select"
        >
          <option value="">Sort By</option>
          <option value="priceLowHigh">Price: Low to High</option>
          <option value="priceHighLow">Price: High to Low</option>
          <option value="nameAZ">Name: A → Z</option>
          <option value="nameZA">Name: Z → A</option>
        </select>
      </div>

      <div className="fancy-grid">
        {filteredData.map((item) => (
          <div className="fancy-card" key={item._id}>
            <div className="fancy-img-wrapper">
              <img
                src={item.defaultImage}
                alt={item.name}
                className="fancy-img"
                onClick={() => navigate(`/productdisplay/${item._id}`)}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className="fancy-content">
              <h3 className="fancy-name">{item.name}</h3>
              <p className="fancy-desc">{item.description}</p>
              <span className="fancy-cat">{item.category}</span>
              <div className="fancy-footer">
                <span className="fancy-price">₹ {item.price}</span>
                <button
                  className="fancy-btn"
                  onClick={() =>
                    dispatch(
                      addtoCart({
                        id: item._id,
                        name: item.name,
                        description: item.description,
                        price: item.price,
                        category: item.category,
                        images: item.images,
                        defaultImage: item.defaultImage,
                        qnty: 1,
                      })
                    )
                  }
                >
                  Add to Cart 🛒
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredData.length === 0 && (
          <p style={{ textAlign: "center", color: "#ff512f", fontWeight: "600" }}>
            No matching products found 😕
          </p>
        )}
      </div>
    </div>
  );
};

export default Menu;
