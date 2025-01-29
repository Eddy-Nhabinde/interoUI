import Cookies from 'js-cookie';
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from 'shards-react'
import warning from '../../assets/images/warning.png'
import { AuthContext } from '../../context/AuthProvider';
import '../../assets/styles/uanuthorizePage.css';

const UnauthorizedPage = () => {

  const history = useHistory();
  const { setAuth, auth } = useContext(AuthContext)

  console.log(auth)
  const goBack = () => {
    history.goBack();
    if (auth.user && auth.roles.length === 0) {
      Cookies.remove('user')
      setAuth(null);
    }
  }

  return (
    <div style={{ height: '100vh', flexDirection: 'column' }} className='w-100 d-flex justify-content-center align-items-center'>
<img className="mb-3" src={warning} alt="SIVE" height="120" />
      <h5 className='text-center text-muted mb-4'><span style={{ color: '#c4183c' }}> NÃO ESTÁ AUTORIZADO A ACEDER A ESTA PÁGINA!</span></h5>
      <h5 className='text-center text-muted mb-4'>Por favor contacto a equipa de Admnistração do SISMA para a actuaização do seu Perfil!</h5>
      <Button className="btn-lg" onClick={() => goBack()}>Voltar</Button>
    </div>
  )
}

export default UnauthorizedPage