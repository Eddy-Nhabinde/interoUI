import React from "react";
import { Container, Row, Col, Card } from "shards-react";
import "../../assets/styles/apidocs.css";

const APIDocumentation = () => {

  var string = "Alzira de Francisco de Xerinda";
  var names = string.split(" ");
  //names = names.filter(e => e !== 'de')

/*   var initials = names[0].substring(0, 1).toUpperCase() + ". ";
  names.shift();

  if (names.length > 1) {
    for (const i of names) {
      initials += i + " ";
    }
  } */
  names.splice(0,2)
  console.log(names);

  return (
    <Container fluid className="main-content-container py-4 px-4">
      <Row className={"mb-4"}>
        <Col>
          <Card small className="mb-4 p-4">
            <h4>API Documentation</h4>
            <span className="my-3">
              Master Facility List - External (MFL)
              <br /> Esta documentação é referente aos recursos disponíveis para
              obter a lista actualizada das Unidades Sanitárias utilizadas pelo
              Ministério da Saúde.
            </span>

            <div className="mt-3">
              <div>
                <h5 className="text-dark"> I. Unidades Sanitárias</h5>
                <div className="pl-3 mb-5">
                  <div className="my-4">
                    <h6>1. Obter lista de todas unidades sanitárias</h6>
                    <p>
                      Permite listar todas as unidades sanitárias. Nesta lista
                      pode se encontrar, apenas as unidades organizacionais do
                      nível 4.
                    </p>

                    <blockquote className="block-quote my-2 d-flex">
                      <p className="text-dark fw-bold">GET</p>
                      <a
                        href="https://apps.hisplp.org/mozapi/api/mfl/organisationUnits"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="endpoint text-primary ml-3"
                      >
                        https://apps.hisplp.org/mozapi/api/mfl/organisationUnits
                      </a>
                    </blockquote>
                  </div>
                  <div className="my-4">
                    <h6>1.1. Paginação</h6>
                    <p>
                      {" "}
                      É possível especificar o tamanho da resposta e o número da
                      página pretendido, bastando indicar os parâmetros{" "}
                      <code>paging</code>, <code>page</code> e{" "}
                      <code>pageSize</code>. Caso estes parâmetros não sejam
                      indicados, é trazida por defeito uma lista com as
                      primeiras 50 unidades.
                    </p>
                    <blockquote className="block-quote my-2 d-flex">
                      <p className="text-dark fw-bold">GET</p>
                      <a
                        href="https://apps.hisplp.org/mozapi/api/mfl/organisationUnits?paging=true&page=1&pageSize=20"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="endpoint text-primary ml-3"
                      >
                        https://apps.hisplp.org/mozapi/api/mfl/organisationUnits?paging=true&page=1&pageSize=20
                      </a>
                    </blockquote>
                  </div>
                  <div className="my-4">
                    <h6>2. Detalhes de unidade sanitária</h6>
                    <p>
                      Retorna os dados de uma unidade sanitária. É necessário
                      adicionar o parâmetro <code>id</code> na url,
                      correspondente à uma unidade específica, podendo se
                      observar todos detalhes da mesma.
                    </p>

                    <blockquote className="block-quote my-2 d-flex">
                      <p className="text-dark fw-bold">GET</p>
                      <a
                        href="https://apps.hisplp.org/mozapi/api/mfl/organisationUnits?id=TBqm5OayabT"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="endpoint text-primary ml-3"
                      >
                        https://apps.hisplp.org/mozapi/api/mfl/organisationUnits?id=TBqm5OayabT
                      </a>
                    </blockquote>
                  </div>
                </div>
              </div>

              <div>
                <h5 className="text-dark"> II. Parâmetros e filtros</h5>
                <div className="pl-3 mb-5">
                  <div className="my-4">
                    <h6>1. Unidades Sanitárias por histórico de criação</h6>
                    <p>
                      <code>createdStartDate</code>: Permite aplicar o filtro
                      pela data de criação, retornando todas unidades sanitárias
                      com data de criação maior ou igual a fornecida.
                    </p>
                    <blockquote className="block-quote my-2 d-flex">
                      <p className="text-dark fw-bold">GET</p>
                      <a
                        href="https://apps.hisplp.org/mozapi/api/mfl/organisationUnits?createdStartDate=2022-02-01"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="endpoint text-primary ml-3"
                      >
                        https://apps.hisplp.org/mozapi/api/mfl/organisationUnits?createdStartDate=2022-02-01
                      </a>
                    </blockquote>
                    <p>
                      <code>createdEndDate</code>: Permite aplicar o filtro pela
                      data de criação, retornando todas unidades sanitárias com
                      data de criação menor ou igual a fornecida.
                    </p>
                    <blockquote className="block-quote my-2 d-flex">
                      <p className="text-dark fw-bold">GET</p>
                      <a
                        href="https://apps.hisplp.org/mozapi/api/mfl/organisationUnits?createdEndDate=2022-07-01"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="endpoint text-primary ml-3"
                      >
                        https://apps.hisplp.org/mozapi/api/mfl/organisationUnits?createdEndDate=2022-07-01
                      </a>
                    </blockquote>
                    <p>
                      Podemos usar a data inicial e final de criação para
                      definir intervalo de dados a ser retornado.
                    </p>

                    <blockquote className="block-quote my-2 d-flex">
                      <p className="text-dark fw-bold">GET</p>
                      <a
                        href="https://apps.hisplp.org/mozapi/api/mfl/organisationUnits?createdStartDate=2022-02-01&createdEndDate=2022-07-01"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="endpoint text-primary ml-3"
                      >
                        https://apps.hisplp.org/mozapi/api/mfl/organisationUnits?createdStartDate=2022-02-01&createdEndDate=2022-07-01
                      </a>
                    </blockquote>
                  </div>

                  <div className="my-5">
                    <h6>
                      2. Unidades Sanitárias por histórico de actualização
                    </h6>
                    <p>
                      <code>lastUpdatedStartDate</code>: Permite aplicar o
                      filtro pela data de criação, retornando todas unidades
                      sanitárias com data de criação maior ou igual a fornecida.
                    </p>
                    <blockquote className="block-quote my-2 d-flex">
                      <p className="text-dark fw-bold">GET</p>
                      <a
                        href="https://apps.hisplp.org/mozapi/api/mfl/organisationUnits?lastUpdatedStartDate=2022-07-07"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="endpoint text-primary ml-3"
                      >
                        https://apps.hisplp.org/mozapi/api/mfl/organisationUnits?lastUpdatedStartDate=2022-07-07
                      </a>
                    </blockquote>
                    <p>
                      <code>lastUpdatedEndDate</code>: Permite aplicar o filtro
                      pela data de criação, retornando todas unidades sanitárias
                      com data de criação menor ou igual a fornecida.
                    </p>
                    <blockquote className="block-quote my-2 d-flex">
                      <p className="text-dark fw-bold">GET</p>
                      <a
                        href="https://apps.hisplp.org/mozapi/api/mfl/organisationUnits?lastUpdatedEndDate=2022-08-07"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="endpoint text-primary ml-3"
                      >
                        https://apps.hisplp.org/mozapi/api/mfl/organisationUnits?lastUpdatedEndDate=2022-08-07
                      </a>
                    </blockquote>

                    <p>
                      Podemos usar a data inicial e final de criação para
                      definir intervalo de dados a ser retornado.
                    </p>
                    <blockquote className="block-quote my-2 d-flex">
                      <p className="text-dark fw-bold">GET</p>
                      <a
                        href="https://apps.hisplp.org/mozapi/api/mfl/organisationUnits?lastUpdatedStartDate=2022-07-07&lastUpdatedEndDate=2022-08-07"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="endpoint text-primary ml-3"
                      >
                        https://apps.hisplp.org/mozapi/api/mfl/organisationUnits?lastUpdatedStartDate=2022-07-07&lastUpdatedEndDate=2022-08-07
                      </a>
                    </blockquote>
                  </div>

                  <div className="my-4">
                    <h6>3. Unidades Sanitárias por tipo de resposta</h6>
                    <p>
                      <code>fileType</code>: Este parâmetro permite definir o
                      formato da resposta [json, csv, xml], que por defeito é
                      json, ou seja, no caso de não ser indicado.
                    </p>
                    <blockquote className="block-quote my-2 d-flex">
                      <p className="text-dark fw-bold">GET</p>
                      <a
                        href="https://apps.hisplp.org/mozapi/api/mfl/organisationUnits?fileType=xml"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="endpoint text-primary ml-3"
                      >
                        https://apps.hisplp.org/mozapi/api/mfl/organisationUnits?fileType=xml
                      </a>
                    </blockquote>
                  </div>

                  <div className="my-5">
                    <h6>4. Filtro por nome da Unidade Sanitária</h6>
                    <p>
                      <code>name</code>: Permite obter uma ou lista de unidades
                      sanitárias que tenham ou contenham o nome igual ao
                      fornecido no parâmetro.
                    </p>
                    <blockquote className="block-quote my-2 d-flex">
                      <p className="text-dark fw-bold">GET</p>
                      <a
                        href="https://apps.hisplp.org/mozapi/api/mfl/organisationUnits?name=Centro de Exames Médicos"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="endpoint text-primary ml-3"
                      >
                        https://apps.hisplp.org/mozapi/api/mfl/organisationUnits?name=Centro
                        de Exames Médicos
                      </a>
                    </blockquote>
                  </div>

                  <div className="my-5">
                    <h6>5. Filtro por classificação da Unidade Sanitária</h6>
                    <p>
                      <code>classification</code>: Permite obter a lista de
                      unidades sanitárias que possuam a classificação fornecida
                      como parâmetro.
                    </p>
                    <blockquote className="block-quote my-2 d-flex">
                      <p className="text-dark fw-bold">GET</p>
                      <a
                        href="https://apps.hisplp.org/mozapi/api/mfl/organisationUnits?classification='Centro de Saúde Rural Tipo 1'"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="endpoint text-primary ml-3"
                      >
                        https://apps.hisplp.org/mozapi/api/mfl/organisationUnits?classification="Centro
                        de Saúde Rural Tipo 1"
                      </a>
                    </blockquote>
                  </div>

                  <div className="my-4">
                    <h6>5. Filtro por localização da Unidade Sanitária</h6>
                    <p>
                      <code>province</code>: Permite obter a lista de unidades
                      sanitárias que estejam localizadas na província
                      correspondente ao id indicado no parâmetro.
                    </p>
                    <blockquote className="block-quote my-2 d-flex">
                      <p className="text-dark fw-bold">GET</p>
                      <a
                        href="https://apps.hisplp.org/mozapi/api/mfl/organisationUnits?province=L6z1mqFYii6'"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="endpoint text-primary ml-3"
                      >
                        https://apps.hisplp.org/mozapi/api/mfl/organisationUnits?province=L6z1mqFYii6'
                      </a>
                      <p className="text-primary ml-3"></p>
                    </blockquote>
                    <p>
                      <code>district</code>: Permite obter a lista de unidades
                      sanitárias que estejam localizadas no distrito
                      correspondente ao id indicado no parâmetro.
                    </p>
                    <blockquote className="block-quote my-2 d-flex">
                      <p className="text-dark fw-bold">GET</p>
                      <a
                        href="https://apps.hisplp.org/mozapi/api/mfl/organisationUnits?district=ZjpSEMx9KIf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="endpoint text-primary ml-3"
                      >
                        https://apps.hisplp.org/mozapi/api/mfl/organisationUnits?district=ZjpSEMx9KIf
                      </a>
                    </blockquote>

                    <p>
                      Podemos indicar os dois parâmetros para obter unidades
                      sanitárias que estejam localizadas em uma determinada
                      província e distrito.
                    </p>
                    <blockquote className="block-quote my-2 d-flex">
                      <p className="text-dark fw-bold">GET</p>
                      <a
                        href="https://apps.hisplp.org/mozapi/api/mfl/organisationUnits?province=L6z1mqFYii6&district=ZjpSEMx9KIf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="endpoint text-primary ml-3"
                      >
                        https://apps.hisplp.org/mozapi/api/mfl/organisationUnits?province=L6z1mqFYii6&district=ZjpSEMx9KIf
                      </a>
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default APIDocumentation;
