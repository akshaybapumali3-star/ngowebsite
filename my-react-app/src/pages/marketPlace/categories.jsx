import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./categories.css";

function CategoryPage() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([
    {
      name: "Handmade Bags",
      image: "/images/handmadebag1.webp",
    },
    {
      name: " Festival seasonal products",
      image: "/images/organichoney1.webp",
    },
    {
      name: "Gifting Hampers",
      image: "/images/jewellary3.jpeg",
    },
    {
      name: "Home Decor",
      image: "/images/homedecor1.jpg",
    },
    {
      name:"clothing",
      image:"/images/clothing1.jpg"
    },
    {
      name: "Malanand Made Bags",
      image: "/image/bag1.avif",
    }
  ]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories');
        if (!res.ok) throw new Error('Failed to load categories');
        const data = await res.json();
        if (Array.isArray(data) && data.length) {
          setCategories(data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="marketpage">


      {/* PAGE TITLE */}
      <div className="page-title">
        <h2>Product Categories</h2>
        <p>Browse all available product categories in the marketplace</p>
      </div>

      {/* CATEGORY CARDS */}
      <div className="categories-container">
        {categories.map((cat, index) => (
          <div
            className="category-card"
            key={index}
            onClick={() => navigate(`/category-products?cat=${cat.name}`)}
          >
            <img src={cat.image} alt={cat.name} />
            <p>{cat.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function logout() {
  alert("Logged Out Successfully");
}

export default CategoryPage;
