import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Input } from "../../components/atoms";
import { config } from "../../config";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const history = useHistory();
  const { userId } = useParams();

  useEffect(() => {
    if (userId) {
      axios
        .get(`${config.API_URL_V1}/v1/users/${userId}`)
        .then((result) => {
          console.log("result", result.data);
          result = result.data;
          setName(result.name);
          setFullname(result.fullname);
          setEmail(result.email);
          setImagePreview(config.API_URL_V1 + "/" + result.image);
        })
        .catch((error) => console.log("eerror", error));
    }
  }, [userId]);

  const handleInputImage = (e) => {
    const file = e.target.files[0];
    setImagePreview(URL.createObjectURL(file));
    setImage(file);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", name);
    data.append("fullname", fullname);
    data.append("email", email);
    data.append("password", password);
    data.append("image", image);
    if (userId) {
      axios
        .put(`${config.API_URL_V1}/v1/users/${userId}`, data)
        .then((result) => {
          history.push("/users");
        })
        .catch((error) => console.log("eerror", error));
    } else {
      axios
        .post(`${config.API_URL_V1}/v1/users`, data)
        .then((result) => {
          history.push("/users");
        })
        .catch((error) => console.log("eerror", error));
    }
  };
  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>{userId ? "Update" : "Create"} User</h1>
            </div>
            <div className="col-sm-6">
              <Link to="/users" className="btn btn-primary float-sm-right">
                <i className="fa fa-arrow-left"></i> Back
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <form onSubmit={(e) => handleSubmitForm(e)}>
                  <div className="card-body">
                    <div className="form-group">
                      <Input
                        label="Username"
                        placeholder="Username"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <Input
                        label="Full Name"
                        placeholder="Full Name"
                        type="text"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <Input
                        label="Email"
                        placeholder="Email Address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Password{" "}
                        {userId ? (
                          <small className="text-warning">
                            Isi untuk mengubah password
                          </small>
                        ) : (
                          ""
                        )}
                      </label>
                      <input
                        className="form-control"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>File input</label>
                      {imagePreview && (
                        <a href={imagePreview} target="_blank" rel="noreferrer">
                          <img
                            src={imagePreview}
                            width="200"
                            className="d-block"
                            alt="Preview gambar"
                          />
                        </a>
                      )}

                      <Input
                        type="file"
                        onChange={(e) => handleInputImage(e)}
                      />
                    </div>
                  </div>

                  <div className="card-footer">
                    <button type="submit" className="btn btn-primary">
                      {userId ? "Update" : "Create"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreateUser;
