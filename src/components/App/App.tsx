import React, { useEffect } from "react";
import "./App.css";
import { currencyAsync } from "../../app/slices/currencySlice";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "../../app/hooks";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(currencyAsync({ to: "AMD", from: "EUR", amount: 5 }));
  }, []);
  return <div className="App">barev</div>;
}

export default App;
