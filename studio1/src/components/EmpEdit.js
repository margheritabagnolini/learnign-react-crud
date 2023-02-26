/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EmpEdit() {
  const { empid } = useParams(); //prendo il parametro "id" che mi è stato passato

  //const [empdata, empdatachange] = useState({});

  //creo una variabile per utilizzare/visualizzare l'id e capire se cambia(...change)
  const [id, idchange] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/employee/" + empid)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        //empdatachange(resp);
        idchange(resp.id);
        namechange(resp.name);
        emailchange(resp.email);
        phonechange(resp.phone);
        activechange(resp.activechange);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  //creo delle variabili per utilizzare/visualizzare i dati e capire se cambiano(...change)
  const [name, namechange] = useState("");
  const [email, emailchange] = useState("");
  const [phone, phonechange] = useState("");
  const [active, activechange] = useState(true);
  const [validation, valchange] = useState(false);

  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    // console.log({id,name,email,phone,active})
    const empdata = { id, name, email, phone, active };

    //fetch put per modificare un employee
    fetch("http://localhost:8000/employee/"+empid, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(empdata),
    })
      .then((res) => {
        alert("Saved successfully");
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handlesubmit}> {/* form che onSubmit esegue la funzione handlesubmit */}
            <div className="card" style={{ textAlign: "left" }}>
              <div className="card-title">
                <h2>Employee Edit</h2>
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>ID</label>
                        <input
                          value={id}
                          disabled="disabled"
                          className="form-control"
                        ></input>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Name</label>
                        <input
                          required
                          value={name}
                          onMouseDown={(e) => valchange(true)}
                          onChange={(e) => namechange(e.target.value)}
                          className="form-control"
                        ></input>
                        {name.length === 0 && validation && (
                          <span className="text-danger">Enter the name</span>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          value={email}
                          onChange={(e) => emailchange(e.target.value)}
                          className="form-control"
                        ></input>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Phone</label>
                        <input
                          value={phone}
                          onChange={(e) => phonechange(e.target.value)}
                          className="form-control"
                        ></input>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-check">
                          <input
                            checked={active}
                            onChange={(e) => activechange(e.target.checked)}
                            type="checkbox"
                            className="form-check-input"
                          ></input>
                          <label className="form-check-label">Is Active</label>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <button className="btn btn-success" type="submit"> {/* bottone per fare submit e salvare i dati */}
                          Save
                        </button>
                        <Link to="/" className="btn btn-danger"> {/* bottone per tornare indietro */}
                          Back
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
