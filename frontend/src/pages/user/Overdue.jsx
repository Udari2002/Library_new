import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

export default function Overdue() {
  const { user } = useAuth();
  const [overdueBooks, setOverdueBooks] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/overdue/${user._id}`)
      .then((res) => setOverdueBooks(res.data))
      .catch((err) => console.error(err));
  }, [user]);

  return (
    <div className
