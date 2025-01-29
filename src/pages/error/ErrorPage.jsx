import React from 'react';
import { Button } from 'shards-react';
import '../../assets/styles/error.css'
import errorImg from '../../assets/images/errorpage.gif';

const ErrorPage = () => {
  return (
    <div className='error-page'>
      <div>
        <h4 className='mb-4'>Ocorreu um <span>erro</span> inesperado</h4>
        <h6>A página que tentou acessar não foi encontrada. Contacte-nos</h6>
        <h6 className='mb-4'>ou recarregue a página</h6>
        <Button onClick={()=>window.location.reload()} outline>Recarregar a página</Button>
      </div>
      <img src={errorImg} alt="" />
    </div>
  )
}

export default ErrorPage;