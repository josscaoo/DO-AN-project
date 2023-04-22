import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authSlice } from "../redux/auth/authSlice";
import axios from "axios";
// import axios from "axios";

const ReviewForm = () => {
  const { email, password, name, phone, address } = useSelector(
    (state) => state.auth
  );
  const id = useSelector((state) => state.auth.id);

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email,
    password,
    name,
    phone,
    address,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(authSlice.actions.updateUserInfo(formData));
    const userId = id; // Lấy ID của người dùng từ state hoặc props
    const url = `http://localhost:3001/users/${userId}`; // Tạo địa chỉ URL

    try {
      const response = await axios.put(url, formData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(response.data); // Log response từ JSON server (nếu muốn)
    } catch (error) {
      console.log(error); // Log lỗi (nếu có)
    }
  };
  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ReviewForm;
