import axios from "axios";
import React, { useState } from "react";
import { Button, Form, ModalBody, ModalHeader } from "shards-react";
import { BASE_URL } from "../../../../hooks/useFetch";
import { base64Enconder } from "../../../../utils/services/base64Enconder";
import {
  loginError,
  ToastNotification,
} from "../../../../components/commons/notification/ToastNotification";
import { IconButton } from "@mui/material";
import Cookies from "js-cookie";
import { Modal } from "react-bootstrap";



const Dialog = ({ open, setOpen, setOpenUsers, setLogedUser, setFormInputs, formInputs }) => {
  const cookiesUser = JSON.parse(Cookies.get('user'))

  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const [passType, setPassType] = useState("password");
  const [loading, setloading] = useState(false);

  const resetSelectedServer = () => {
    const formData = formInputs;
    formData.server = '';
    setFormInputs(formData)
  }

  const formData = [
    {
      placeholder: "Username",
      type: "text",
      name: "username",
      errorHelper: "Username is required",
      id: "username_id",
    },
    {
      placeholder: "Password",
      type: passType,
      name: "password",
      errorHelper: "Password is required",
      id: "password_id",
    },
  ];

  const onUserChange = ({ target: { name, value } }) => {
    setUser({
      ...user,
      [name]: value,
    });
  };

  const changePassType = () => {
    if (passType === "password") setPassType("text");
    else setPassType("password");
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setloading(true);

    var config = {
      method: "get",
      url: `${BASE_URL}/api/monitoring/auth/user`,
      headers: {
        SERVERURL: cookiesUser.selectedServer.url,
        ENTRYPOINT: base64Enconder(user.username, user.password),
      },
    };

    axios(config)
      .then((response) => {
        setLogedUser(user);
        setloading(false);
        setOpen(false);
        setOpenUsers();
      })
      .catch((error) => {
        setError(error.response.statusText);
        setloading(false);
        loginError("Error to login, check your credentials!");
      });
  };

  return (
    <Modal className="geral__dialog" show={open} onHide={() => setOpen()} backdrop="static" keyboard={false} centered size="sm">
      <ModalHeader titleClass="w-100">
        <div className="w-100 row m-0">
          <span>Login</span>
          <IconButton size="small" className="ml-auto" onClick={() => { setOpen(false); resetSelectedServer(); }}>
            <i class="material-icons">close</i>
          </IconButton>
        </div>
      </ModalHeader>

      <ModalBody>
        <Form
          onSubmit={onSubmit}
          className="login100-form validate-form flex-sb flex-w"
        >
          <div className="text-center col-lg-12">
            <p className="mb-3">
              Introduza os seus dados de acesso para continuar!
            </p>
          </div>

          {formData.map((data, index) => (
            <div
              className="wrap-input100 validate-input d-flex m-b-16"
              data-validate={data.errorHelper}
              type={data.type}
            >
              <input
                className="input100"
                name={data.name}
                key={index}
                required
                value={user[data.name]}
                onChange={(e) => onUserChange(e)}
                placeholder={data.placeholder}
                type={data.type}
              />
              <span className="focus-input100" />
              {data.placeholder === "Password" && (
                <div className="password-toggle pr-2 h-100 d-flex justify-content-center align-items-center">
                  <i onClick={() => changePassType()} class="material-icons">
                    {passType === "password" ? "visibility" : "visibility_off"}
                  </i>
                </div>
              )}
            </div>
          ))}
          <div className="container-login100-form-btn m-t-17">
            <Button type="submit" className="login100-form-btn" disabled={loading}  >
              {loading ?
                <>
                  <span role="status" aria-hidden="true"></span>
                  Loading ...
                </>
                :
                <>
                  <span role="status" aria-hidden="true"></span>
                  Log in
                </>
              }
            </Button>
            {error ? <ToastNotification /> : null}
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export { Dialog };
