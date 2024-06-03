## Projeto front + back end

## Para rodar o projeto

- Como requisito principal é necessário ter o Docker instalado na máquina. Caso não tenha pode obter através do [site oficial](https://docs.docker.com/desktop/install/) selecionando a versão compatível com seu sistema operacional.

- Para consumo da collection e environment, é necessário o aplicativo [Postman](https://www.postman.com/downloads/) ou qualquer outro de sua preferência.

- Deverá copiar o arquivo .env.example para .env e adicionar o valor a env ```DB_PASSWORD```.

- rodar o comando ```docker-compose up --build``` para buildar  e subir ambiente.

Após executado os passos acima, a aplicação frontend estará disponivel através da URL [localhost:3000](http://localhost:3000) e a API através da URL [localhost:8000](http://localhost:8000).


## Documentação
- Para acessar a documentação da API, está disponível no diretório ```.docs``` os arquivos JSON da collection e environment do Postman.