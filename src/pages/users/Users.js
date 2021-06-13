import axios from "axios";
import React, { useEffect, useState } from "react";
import { config } from "../../config";
import { Input } from "../../components/atoms";
import Badge from "../../components/atoms/Badge";
import { Link, useHistory } from "react-router-dom";

const Users = () => {
  const [name, setName] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");

  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [perPage, setPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [showingDataFrom, setShowingDataFrom] = useState(1);
  const [showingDataTo, setShowingDataTo] = useState(1);
  const [params, setParams] = useState({
    page: currentPage,
    per_page: perPage,
    name: "",
    fullname: "",
    email: "",
  });
  const history = useHistory();
  useEffect(() => {
    getDatas(currentPage, perPage);
    setShowingDataFrom((currentPage - 1) * perPage + 1);
    setShowingDataTo(currentPage * perPage);
  }, [totalPage, currentPage, perPage, fullname]);

  const handleSetParams = (name, value) => {
    setParams({ ...params, [name]: value });
    console.log("params", params);
  };

  const getDatas = (currentPage, perPage) => {
    axios
      .get(
        `${config.API_URL_V1}/v1/users?page=${currentPage}&per_page=${perPage}`
      )
      .then((result) => {
        console.error("result ", result);
        setData(result.data.data);
        setTotalData(result.data.total_data);
        setPerPage(result.data.per_page);
        setCurrentPage(result.data.current_page);
        setTotalPage(Math.ceil(totalData / perPage));
      })
      .catch((error) => console.error("Error Fetch data users ", error));
  };

  const handleChangeEntries = (val) => {
    setPerPage(val);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage <= 1 ? 1 : currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage === totalPage ? totalPage : currentPage + 1);
  };

  const handleDelete = (userId) => {
    axios
      .delete(`${config.API_URL_V1}/v1/users/${userId}`)
      .then((result) => {
        console.log("delete result", result);
      })
      .catch((error) => console.log("error delete", error));
  };
  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Data Users</h1>
            </div>
            <div className="col-sm-6">
              <Link
                to="/users/create"
                className="btn btn-primary float-sm-right"
              >
                <i className="fa fa-plus"></i> Add Data
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div class="card card-outline card-primary m-0 rounded-0">
                <div class="card-header">
                  <div class="card-tools">
                    <button
                      type="button"
                      class="btn btn-outline-success btn-xs"
                      data-card-widget="collapse"
                    >
                      Advanced Search
                    </button>
                  </div>
                </div>
                <div class="card-body" style={{ display: "none" }}>
                  <div className="row">
                    <div className="col-sm-4 col-xs-12">
                      <div className="form-group">
                        <Input
                          label="Name"
                          type="text"
                          value={params.name}
                          onChange={(e) =>
                            handleSetParams("name", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="col-sm-4 col-xs-12">
                      <div className="form-group">
                        <Input
                          label="Fullname"
                          type="text"
                          value={fullname}
                          onChange={(e) => setFullname(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-4 col-xs-12">
                      <div className="form-group">
                        <Input
                          label="Email"
                          type="text"
                          value={params.email}
                          onChange={(e) =>
                            handleSetParams("email", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="col-sm-4 col-xs-12">
                      <div className="form-group">
                        <label>Active</label>
                        <br />
                        <label className="font-weight-normal mr-3">
                          <input type="radio" name="is_active" /> Active
                        </label>
                        <label className="font-weight-normal">
                          <input type="radio" name="is_active" /> Non Active
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <button className="btn btn-outline-success btn-sm float-right">
                        <i className="fa fa-search"></i> Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card rounded-0">
                <div className="card-body">
                  <div className="mb-2">
                    <span>Show </span>
                    <select
                      onChange={(e) => handleChangeEntries(e.target.value)}
                    >
                      <option value="1">1</option>
                      <option value="3">3</option>
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                    <span> entries</span>
                  </div>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Active</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.length > 0 ? (
                        data.map((user, index) => {
                          index = showingDataFrom + index;
                          return (
                            <tr key={user.id}>
                              <td>{index}</td>
                              <td>{user.name}</td>
                              <td>{user.fullname}</td>
                              <td>{user.email}</td>
                              <td>
                                {user.is_active === 1 ? (
                                  <Badge text="Active" bg="bg-success" />
                                ) : (
                                  <Badge text="Non Active" bg="bg-danger" />
                                )}
                              </td>
                              <td>
                                <button
                                  onClick={() =>
                                    history.push(`/users/create/${user.id}`)
                                  }
                                  className="btn btn-warning btn-xs"
                                >
                                  <i className="fa fa-edit"></i>
                                </button>
                                <button
                                  onClick={() => handleDelete(user.id)}
                                  className="btn btn-danger btn-xs"
                                >
                                  <i className="fa fa-trash"></i>
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <th colspan="5">
                            <div className="alert alert-info">
                              Data not found
                            </div>
                          </th>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="card-footer clearfix">
                  <div className="float-left">
                    <p>
                      Showing {showingDataFrom} to {showingDataTo} of{" "}
                      {totalData} entries
                    </p>
                  </div>
                  <div className="float-right">
                    <span>
                      {currentPage} / {totalPage}
                    </span>
                    <ul className="pagination pagination-sm m-0">
                      <li className="page-item">
                        <button
                          onClick={() => handlePreviousPage()}
                          className="page-link"
                        >
                          &laquo;
                        </button>
                      </li>
                      {/* <li className="page-item">
                        <a className="page-link" href="#ok">
                          1
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#ok">
                          2
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#ok">
                          3
                        </a>
                      </li> */}
                      <li className="page-item">
                        <button
                          onClick={() => handleNextPage()}
                          className="page-link"
                        >
                          &raquo;
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Users;
