/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function EmpListing() {
  const [empdata, empdatachange] = useState(null);
  const navigate = useNavigate();

  //3 funzioni principali
  const LoadDetail = (id) => { //FUNZIONE CHE FA VISUALIZZARE I DETTAGLI DI UN EMPLOYEE SPECIFICO
    navigate("/employee/detail/" + id);
  };
  const LoadEdit = (id) => { //FUNZIONE CHE FA VISUALIZZARE IL FORM DI MODIFICA DI UN EMPLOYEE SPECIFICO
    navigate("/employee/edit/" + id);
  };
  const RemoveFunction = (id) => { //FUNZIONE CHE ELIMINA UN EMPLOYEE SPECIFICO
    if (window.confirm("Do you want to remove this employee?")) {
      fetch("http://localhost:8000/employee/" + id, {
        method: "DELETE",
      })
        .then((res) => {
          alert("Removed successfully");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  useEffect(() => {
    fetch("http://localhost:8000/employee")
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
    <div className="container">
      <div className="card">
        <div className="card-title">
          <h2>Employee listing</h2>
          <div className="card-body">
            <div className="divbtn">
              <Link to="employee/create" className="btn btn-success"> {/* bottone per creare un nuovo employee */}
                Add New (+)
              </Link>
            </div>
            <table className="table table-bordered"> {/* tabella di visualizzazione */}
              <thead className="bg-dark text-white">
                <tr> {/* riga con le intestazioni delle colonne */}
                  <td>ID</td>
                  <td>Name</td>
                  <td>Email</td>
                  <td>Phone</td>
                  <td>Actions</td>
                </tr>
              </thead>
              <tbody> {/* righe con dati */}
              {/* nella riga sottostante faccio un check per evitare errori nel caso empdata sia vuoto */}
                {empdata && 
                  empdata.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>
                        {/* sotto metto tre bottoni: ognuno richiama la rispettiva funzione */}
                        <a
                          onClick={() => {
                            LoadEdit(item.id);
                          }}
                          className="btn btn-success"
                        >
                          Edit
                        </a>
                        <a
                          onClick={() => {
                            RemoveFunction(item.id);
                          }}
                          className="btn btn-danger"
                        >
                          Remove
                        </a>
                        <a
                          onClick={() => {
                            LoadDetail(item.id);
                          }}
                          className="btn btn-primary"
                        >
                          Details
                        </a>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
