import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart, useDispatchCart } from "../component/ContexReducer";

export default function Cart() {
  let data = useCart();
  console.log(data);
  let dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div>
        <div className="mt-5 w-100 text-center fs-3">The Cart Is Empty</div>
      </div>
    );
  }

  const HandleCheckOut = async () => {
    let UserEmail = localStorage.getItem("UserEmail");
    let responce = await fetch("http://localhost:5000/api/orderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Order_data: data,
        email: UserEmail,
        order_date: new Date().toDateString(),
      }),
    });
    console.log(responce)
    if (responce.status === 200) {
      dispatch({ type: "DROP" });
    }
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);
  return (
    <div>
      <div className="container m-auto mt-4 table-responsive table-responsive-sm table-responsive-md">
        <table className="table table-hover">
          <thead className="text-success fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button type="button" className="btn p-0">
                    <DeleteIcon
                      onClick={() => {
                        dispatch({ type: "REMOVE", index: index });
                      }}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2">Total Price: {totalPrice}/-</h1>
        </div>
        <div>
          <button className="btn bg-success mt-5" onClick={HandleCheckOut}>
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
}
