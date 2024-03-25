import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./ContexReducer";

export default function Card(proms) {
  let dispatch = useDispatchCart();
  let data = useCart();
  const priceRef = useRef();

  let options = proms.options;
  let priceOption = Object.keys(options);
  const [qty, setqty] = useState(1);
  const [size, setsize] = useState("");

  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === proms.fooditem._id) {
        food = item;

        break;
      }
    }

    if (food != []) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: proms.fooditem._id,
          price: finalPrice,
          qty: qty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: proms.fooditem._id,
          name: proms.fooditem.name,
          img: proms.fooditem.img,
          price: finalPrice,
          qty: qty,
          size: size,
        });
        return
      }
    }

    await dispatch({
      type: "ADD",
      id: proms.fooditem._id,
      name: proms.fooditem.name,
      img: proms.fooditem.img,
      price: finalPrice,
      qty: qty,
      size: size,
    });
    return
    // console.log(data)
  };

  useEffect(() => {
    setsize(priceRef.current.value);
  }, []);

  let finalPrice = qty * parseInt(options[size]);

  return (
    <div>
      <div className="card m-3" style={{ width: "15rem", maxHeight: "360px" }}>
        <img
          src={proms.fooditem.img}
          className="card-img-top"
          alt="..."
          style={{
            height: "160px",
            objectFit: "fill",
          }}
        />
        <div className="card-body">
          <h5 className="card-title">{proms.fooditem.name}</h5>
          <div className="container w-100">
            <select
              className=" m-2 h-100 bg-success  "
              onChange={(e) => setqty(e.target.value)}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              className="m-2  h-100 bg-success  "
              ref={priceRef}
              onChange={(e) => setsize(e.target.value)}
            >
              {priceOption.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
            <div className=" h-100 d-inline fs-5">₹{finalPrice}/-</div>
          </div>
          <hr></hr>
          <button
            className="bg-success btn justify-center ms-2"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
