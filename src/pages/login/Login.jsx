import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Container, Form, Row } from 'shards-react'
import { BASE_URL, useFetch } from '../../hooks/useFetch'
import { base64Enconder } from '../../utils/services/base64Enconder'
import { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'
import { AuthContext } from '../../context/AuthProvider'
import mozambique from '../../assets/images/mozambique.png'
import { ToastNotification, loginError } from '../../components/commons/notification/ToastNotification';
import '../../assets/styles/login.css';
import { PrintsContext } from '../../context/PrintsContext'
import SplitButton from '../../components/commons/loginButton/LoginButton'
import { ErrorPage } from '../error'
import FloatingButton from '../../components/commons/floattingbutton/floatingButton'
import PlaceIcon from '@mui/icons-material/Place';
import ukwaba from "../../assets/images/ukwaba-logo.png"
import dhis2 from "../../assets/images/dhis2-logo.png"
import { useTranslation } from 'react-i18next'

const Login = () => {
    const { t } = useTranslation()
    const { setAuth, auth } = useContext(AuthContext);
    const { module } = useContext(PrintsContext)
    const [user, setUser] = useState({});
    const [err, setError] = useState(null);
    const history = useHistory();
    const [selectedServer, setSelectedServer] = useState(null);
    const [passType, setPassType] = useState('password');
    const [loading, setloading] = useState(false)

    const { data, isFetching, error } = useFetch('api/servers')

    console.log(data)

    const formData = [
        {
            placeholder:t("username"),
            type: 'text',
            name: 'username',
            errorHelper: 'Username is required',
            id: 'username_id'
        }, {
            placeholder:  t("password"),
            type: passType,
            name: 'password',
            errorHelper: 'Password is required',
            id: 'password_id'
        }
    ]


    if (auth && module) {
        history.push(`/${module.route}/home`)
    } else if (auth) {
        history.push('/home')
    }

    const onUserChange = ({ target: { name, value } }) => {
        setUser({
            ...user,
            [name]: value
        })
    }

    const changePassType = () => {
        if (passType === 'password')
            setPassType('text')
        else setPassType('password')
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        setloading(true)

        var config = {
            method: 'get',
            url: `${BASE_URL}/api/monitoring/auth/user`,
            headers: {
                'SERVERURL': selectedServer.url,
                'ENTRYPOINT': base64Enconder(user.username, user.password)
            }
        };

        axios(config)
            .then(response => {
                const token = response.data.access_token;
                const roles = []

                for (const role of response.data.userDetails.roles) {
                    roles.push(role.name)
                }

                console.log(response)

                setAuth({ user, token, roles })
                const username = user.username;
                const userId = response.data.userDetails.userId; 
                //Guardando dados do usuario no cookie com duracao de 7 dias
                Cookies.set('user', JSON.stringify({ username, roles,selectedServer,userId }), { expires: 7 })
                setUser({});
                history.push(`/home`)
                setloading(false)

            })
            .catch(error => {
                setError(error.response.statusText)
                setloading(false)
                loginError("Dados de acesso incorrectos!");
            });
    }

    if (error)
        return <ErrorPage />

    return (
        <Row className='w-100 d-flex justify-content-center align-items-center m-0 p-0' style={{ height: '100vh' }}>
            <Container fluid className="main-content-container px-4 pb-4 col-md-6 col-lg-5 col-xl-3">
                <FloatingButton
                    title={t("mfl_access")}
                    icon={<span className='text-capitalize fw-bold'><PlaceIcon/>{t("mfl_access")}</span>}
                    action={() => history.push(`/mfl/mfl-home`)}
                    variant="extended"
                />
                <div className="limiter p-3 rounded">
                    <div className="container-login100">
                       


                            <Form onSubmit={onSubmit} className="login100-form validate-form flex-sb flex-w">
                                <div className="text-center col-lg-12">
                                    <img className="mb-1" src={mozambique} alt="SIVE" height="120" />
                                    <p className="mb-3">Ministério da Saúde</p>
                                    <p className="h6 mb-3 font-weight-bold ">Plataforma de Interoperabilidade</p>
                                    <p className="mb-3" >Introduza os seus dados de acesso para continuar!</p>
                                </div>

                                {
                                    formData.map((data, index) => (
                                        <div className="wrap-input100 validate-input d-flex m-b-16" data-validate={data.errorHelper} type={data.type}>
                                            <input className="input100" name={data.name} key={index} required onChange={(e) => onUserChange(e)} placeholder={data.placeholder} type={data.type} />
                                            <span className="focus-input100" />
                                            {data.placeholder === 'Password' && <div className='password-toggle pr-2 h-100 d-flex justify-content-center align-items-center'><i onClick={() => changePassType()} class="material-icons">{passType === 'password' ? 'visibility' : 'visibility_off'}</i></div>}
                                        </div>
                                    ))
                                }
                                <div className="container-login100-form-btn m-t-17">
                                    <SplitButton serverLoader={isFetching} isLoading={loading} setSelectedServer={setSelectedServer} servers={(data && data.servers) || []} className='w-100' />

                                    {(err) ?
                                        <ToastNotification />
                                        :
                                        null
                                    }
                                </div>

                                <div className="text-center col-lg-12 mt-2">
                                        <p >{t("copyright_desenvolvido_por")}</p>
                                        <p className='mt-3'>Powered by</p>
                                    </div>
                                    <div className="text-center col-lg-12 mt-2">
                                    <img className="mb-3" src={dhis2} alt="SIVE" height="30" />
                                    <img className="mb-3 p-l-20" src={ukwaba} alt="SIVE" height="60" />
                                    </div>
                            </Form>
                       
                    </div>
                </div>
                <div id="dropDownSelect1"></div>
            </Container>
        </Row>
    )
}

export default Login