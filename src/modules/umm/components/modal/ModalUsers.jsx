import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  FormInput,
  ModalBody,
  ModalHeader,
  Row,
} from "shards-react";
import { Modal } from "react-bootstrap";
import { BASE_URL, TOKEN } from "../../../../hooks/useFetch";
import Table from "../../../../components/commons/table/Table";
import { LinearProgress } from "@mui/material";
import { base64Enconder } from "../../../../utils/services/base64Enconder";
import axios from "axios";

const DialogUsers = ({ openUsers, setOpenUsers, setExternal, logedUser, formInputs, setFormInputs }) => {
  const [currentPage, ] = useState(0);
  const [users, setUsers] = useState([]);
  const [loader, setLoader] = useState(true);

  var config = {
    method: "get",
    url: `${BASE_URL}/api/users/externals`,
    headers: {
      SERVERURL: 'https://sis.misau.gov.mz/staging',
      ENTRYPOINT: base64Enconder(logedUser.username, logedUser.password),
      Accept: "application/json",
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "X-Requested-With",
      "Access-Control-Max-Age": "60",
    },
  };


  useEffect(() => {
    axios(config)
      .then((response) => {
        setUsers(response.data.users)
        setLoader(false)
      })
      .catch((error) => {
        setLoader(false)
      });
  }, [currentPage])

  const loadExternalUserData = (user) => {
    var formData = formInputs
    formData.username = user.userCredentials.username
    formData.name = user.displayName
    formData.userId = user.id
    formData.position = user.jobTitle
    formData.email = user.email
    formData.phone = user.phoneNumber
    setFormInputs(formData)
  }


  const actions = (user) => {
    return (
      <>
        <Button
          className="px-4 text-capitalize text-primary"
          theme="light"
          onClick={() => {
            setOpenUsers();
            setExternal(true);
            loadExternalUserData(user)
          }}
        >
          Select
        </Button>
      </>
    );
  };


  const tableColums = () => {
    return ["Username", "Name", "Actions"];
  };

  const tableData = () => {
    const tableUsers = []
    if (users)
      for (const user of users) {
        tableUsers.push([user.userCredentials.username, user.displayName, actions(user)])
      }
    return tableUsers
  };

  return (
    <Modal
      backdrop="static" keyboard={false}
      className="geral__dialog"
      show={openUsers}
      onHide={() => setOpenUsers()}
      centered
    >
      <ModalHeader className="d-flex justify-content-center">
        External User List
      </ModalHeader>
      <ModalBody className="p-0 mt-3">
        <Row className="px-4 mb-2">
          <Col className="col-lg-6 mt-2">
            <h6 className="m-0 mb-1">Filter by name</h6>
            <FormInput id="#name" placeholder="Name" />
          </Col>
        </Row>
        {loader && <LinearProgress />}
        <div className="mt-4 external-user_table">
          <Table
            isFetching={loader}
            tableData={tableData}
            tableColumns={tableColums}
          />
        </div>
        {/* {loader === false && (
          <TablePaginationDemo
            totalPages={[]}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
          />
        )} */}
      </ModalBody>
    </Modal>
  );
};

export { DialogUsers };
