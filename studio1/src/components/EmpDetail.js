/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function EmpDetail() {
  const { empid } = useParams(); //prendo il parametro "id" che mi è stato passato

  const [empdata, empdatachange] = useState({});

  useEffect(() => {
    fetch("http://localhost:8000/employee/" + empid)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        empdatachange(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div>
      <div className="card" style={{ textAlign: "left" }}>
        <div className="card-title">
          <h2>Employee Detail</h2>
        </div>
        <div className="card-body"></div>
      {/* nella riga sottostante faccio un check per evitare errori nel caso empdata sia vuoto */}
      {/* poi visualizzo i dati/dettagli */}
      {empdata && (
        <div>
          <h2>
            The employee name is: <b>{empdata.name}</b> ({empdata.id})
          </h2>
          <h3>Contact Details</h3>
          <h5>Email is : {empdata.email}</h5>
          <h5>Email is : {empdata.phone}</h5>
          <Link className="btn btn-danger" to={"/"}> {/* bottone per tornare indietro */}
            Back to listing
          </Link>
        </div>
      )}
    </div>
    </div>
  );
}
