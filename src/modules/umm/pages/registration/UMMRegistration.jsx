import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody, Form } from "shards-react";
import PageTitle from "../../../../components/commons/PageTitle";
import { Button, CircularProgress } from "@mui/material";
import { Dialog } from "../../components/modal/ModalLogin";
import { DialogUsers } from "../../components/modal/ModalUsers";
import { useFetch } from "../../../../hooks/useFetch";
import { GenericForm } from "../../components/form/GenericForm";
import userTypeOptions from "../../utils/data/variables.json";
import serverOptions from "../../utils/data/variablesServer.json";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { postUser } from "../../utils/userPost";
import { loadDetails } from "../../utils/loadUserDetail";
import { capitalize } from "../../../../utils/commons/toCapitalize";
import { userUpdate } from "../../utils/userUpdate";
import { ModuleSelectableCard } from "../../components/card/moduleSelectableCard";
import EditIcon from '@mui/icons-material/Edit';
import EditOffIcon from '@mui/icons-material/EditOff';

const rolesData = [{name: 'Covid-19', id: '1'}, {name: 'SIRCEV', id: '3'}, {name: 'CMAM', id: '2'}];

const UMMRegistration = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const userType = params.get('userType')
  const userId = params.get('userId')

  const userDetails = useFetch(`api/users/${userId}?include=focalPoint`)

  const [openModal, setOpenModal] = useState(false);
  const [externalForm, setExternalForm] = useState(false);
  const [formInputs, setFormInputs] = useState({});
  const [logedUser, setLogedUser] = useState();
  const history = useHistory();
  const { action } = useParams();
  const [fieldIsDisable, setFeldIsDisabled] = useState(true);
  const [selectedRoles, setSelectedRoles] = useState([]);

  const onRolesChange = (e) => {
    let _selectedCategories = [...selectedRoles];

    if (e.checked) {
        _selectedCategories.push(e.value);
    }
    else {
        for (let i = 0; i < _selectedCategories.length; i++) {
            const selectedCategory = _selectedCategories[i];

            if (selectedCategory.id === e.value.id) {
                _selectedCategories.splice(i, 1);
                break;
            }
        }
    }
    setSelectedRoles(_selectedCategories);
}

  const getFomInputs = ({ target: { id, value } }) => {
    setFormInputs({ ...formInputs, [id]: value });
  };

  var variables = useFetch(`api/users/registration/variables?userType=${formInputs[userTypeOptions.id] || (userType && capitalize(userType))}`);

  const showExternalForm = (open) => {
    setExternalForm(open);
  };

  useEffect(() => {
    setFormInputs({ userType: formInputs[userTypeOptions.id] });
    setExternalForm(false)
    setSelectedRoles([])
  }, [formInputs[userTypeOptions.id]]);

  useEffect(() => {
    if (userDetails.data) {
      loadDetails(userDetails.data)
      setFormInputs(loadDetails(userDetails.data))
    }
  }, [userDetails.data])

  const toggleModal = (event, close) => {
    setOpenModal(event && event.target.value !== '' && close !== false);
  };

  const [openModalUsers, setOpenModalUsers] = useState(false);

  const toggleModalUsers = () => {
    setOpenModalUsers(!openModalUsers);
  };

  return (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle title={`User ${action} form`} className="text-sm-left" />
      </Row>
      <Row className={"mb-4"}>
        <Col>
          <Card small className="mb-4 p-3">
            <CardBody className="">
              <Form onSubmit={(event) => action === 'registration' ? postUser(formInputs, history, event,selectedRoles) : userUpdate(formInputs, history, event)}>
                {action === 'registration' && <Row>
                  <GenericForm
                    required
                    value={formInputs[userTypeOptions.id]}
                    onChange={(event) => getFomInputs(event)}
                    inputType={userTypeOptions.valueType}
                    id={userTypeOptions.id}
                    title={userTypeOptions.displayName}
                    {...userTypeOptions}
                  />
                  {formInputs[userTypeOptions.id] === "External" && (
                    <GenericForm required value={formInputs[serverOptions.id]}
                      onChange={(event) => {
                        getFomInputs(event);
                        toggleModal(event);
                      }}
                      disabled={formInputs[serverOptions.id] !== undefined && formInputs[serverOptions.id] !== ''}
                      inputType={serverOptions.valueType}
                      id={serverOptions.id}
                      title={serverOptions.displayName}
                      {...serverOptions}
                    />
                  )}
                </Row>}
                {((formInputs[userTypeOptions.id] === 'Internal' && variables.isFetching) || (action === 'detail' && (variables.isFetching || userDetails.isFetching))) &&
                  <div className="w-100 d-flex justify-content-center">
                    <CircularProgress size={20} />
                  </div>}
                {((formInputs[userTypeOptions.id] === "Internal" ||
                  (formInputs[userTypeOptions.id] === "External" && formInputs[serverOptions.id] !== undefined && formInputs[serverOptions.id] !== '' &&
                    externalForm)) || (action !== 'registration' && userDetails.data)) &&
                  variables.data && (
                    <>
                      {variables.data.sections.map((section, index) => (
                        <div className="border rounded w-100 mb-2">
                          <h6 className="w-100 p-2 step-card">
                            {section.displayName}
                          </h6>
                          <Row className="p-2">
                            {section.variables.map((variable, index) => (
                              <GenericForm
                                required
                                value={formInputs[variable.id]}
                                disabled={formInputs[userTypeOptions.id] === "External" || ((action === 'detail' && userType === 'EXTERNAL') && true) || ((action === 'detail' && userType === 'INTERNAL') && fieldIsDisable)}
                                onChange={(event) => getFomInputs(event)}
                                inputType={variable.valueType === 'PHONE_NUMBER' ? 'number' : variable.valueType}
                                id={index}
                                title={variable.displayName}
                                {...variable}
                              />
                            ))}
                          </Row>
                        </div>
                      ))}
                      <div className="border rounded w-100 mb-2">
                        <h6 className="w-100 p-2 step-card">
                          Module Selection
                        </h6>
                        <Row className="p-2">
                          {
                            rolesData.map(module => (
                            <ModuleSelectableCard required={selectedRoles.length===0} disabled={action==='detail' && fieldIsDisable} inputId={module.id}  value={module} checked={selectedRoles.some((item) => item.id === module.id)} onChange={onRolesChange} title={module.name}/>
                            ))
                          }
                        </Row>
                      </div>
                      <Row>
                        <Col className="col-lg-12 mt-3 mb-3 d-flex justify-content-end">
                          <Button onClick={() => history.push('/umm/umm-linelist')} color="error" variant="contained" size="small" className="mr-2 text-capitalize">
                            Cancel
                          </Button>

                          {action==='detail' && <Button onClick={() => setFeldIsDisabled(!fieldIsDisable)} variant="contained" size="small" className="mr-2 text-capitalize"
                            startIcon={fieldIsDisable ? <EditIcon /> : <EditOffIcon />}>
                            Edit
                          </Button>}

                          <Button type="submit" variant="contained" size="small" className="text-capitalize"
                            startIcon={<i className="material-icons me-2">save</i>}>
                            Save
                          </Button>

                        </Col>
                      </Row>
                    </>
                  )}
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
      {openModal && (
        <Dialog
          open={openModal}
          setOpen={toggleModal}
          setOpenUsers={() => toggleModalUsers()}
          setLogedUser={setLogedUser}
          selectedServer={formInputs[serverOptions.id]}
          setFormInputs={setFormInputs}
          formInputs={formInputs}
        />
      )}
      {openModalUsers && (
        <DialogUsers
          logedUser={logedUser}
          openUsers={openModalUsers}
          setOpenUsers={() => toggleModalUsers()}
          setExternal={showExternalForm}
          formInputs={formInputs}
          setFormInputs={setFormInputs}
        />
      )}
    </Container>
  );
};

export default UMMRegistration;
