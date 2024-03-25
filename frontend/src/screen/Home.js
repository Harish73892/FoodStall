import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import Card from "../component/Card";

export default function Home() {
  const [search,setsearch]=useState(""); 
  const [food_items, setfood_items] = useState([]);
  const [food_category, setfood_category] = useState([]);

  const LoadData = async () => {
    let responce = await fetch("http://localhost:5000/api/foodData", {
      method: "post",
      headers: {
        Content_Type: "application/json",
      },
    });
    responce = await responce.json();
    // console.log(responce[0],responce[1])
    setfood_items(responce[0]);
    setfood_category(responce[1]);
  };

  useEffect(() => {
    LoadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div
          id="carouselExampleCaptions"
          className="carousel slide"
          data-bs-ride="carousel"
          style={{ objectFit: "contain mb-10" }}
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setsearch(e.target.value)}
                />
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src={require("./image/food2.jpg")}
                className="d-block w-100"
                alt="..."
                style={{
                  filter: "brightness(60%)",
                  objectFit: "fill",
                  height: "700px",
                }}
              />
              <div className="carousel-caption d-none d-md-block">
                <p>
                  Some representative placeholder content for the first slide.
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src={require("./image/food1.jpg")}
                className="d-block w-100"
                alt="..."
                style={{
                  filter: "brightness(60%)",
                  objectFit: "fill",
                  height: "700px",
                }}
              />
              <div className="carousel-caption d-none d-md-block">
                <p>
                  Some representative placeholder content for the second slide.
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src={require("./image/food.jpg")}
                className="d-block w-100"
                alt="..."
                style={{
                  filter: "brightness(60%)",
                  objectFit: "fill",
                  height: "600px",
                }}
              />
              <div className="carousel-caption d-none d-md-block">
                <p>
                  Some representative placeholder content for the third slide.
                </p>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {food_category != []
          ? food_category.map((data) => {
              return (
                <div className="row mb-10">
                  <div key={data._id} className="fs-3 m-3">
                    {data.CategoryName}
                  </div>
                  <hr />

                  {food_items != []
                    ? food_items
                        .filter(
                          (item) =>
                            data.CategoryName === item.CategoryName &&
                            item.name
                              .toLowerCase()
                              .includes(search.toLocaleLowerCase())
                        )
                        .map((filteritems) => {
                          return (
                            <div
                              key={filteritems._id}
                              className="col-12 col-md-6 col-lg-3"
                            >
                              <Card
                                fooditem={filteritems}
                                options={filteritems.options[0]}
                                
                              ></Card>
                            </div>
                          );
                        })
                    : "No such data found"}
                </div>
              );
            })
          : ""}
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
