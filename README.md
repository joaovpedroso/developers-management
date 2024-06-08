## Projeto front + back end

## Para rodar o projeto

- Como requisito principal é necessário ter o Docker instalado na máquina. Caso não tenha pode obter através do [site oficial](https://docs.docker.com/desktop/install/) selecionando a versão compatível com seu sistema operacional.

- Para consumo da collection e environment, é necessário o aplicativo [Postman](https://www.postman.com/downloads/) ou qualquer outro de sua preferência.

- Deverá copiar o arquivo .env.example para .env e adicionar o valor a env ```DB_PASSWORD```.

- Deverá duplicar o arquivo .env.example dentro do diretório ```/frontend``` para .env e definir a URL da API para que a aplicação frontend consiga acessar.

- rodar o comando ```make build-up``` para buildar  e subir ambiente.

Após executado os passos acima, a aplicação frontend estará disponivel através da URL [localhost:3000](http://localhost:3000) e a API através da URL [localhost:8000/api](http://localhost:8000/api).


## Documentação
- Para acessar a documentação da API, está disponível no diretório ```.docs``` os arquivos JSON da collection e environment do Postman.

### Testes
Para executar os testes execute ```make fe-test```

### Frontend
Para acessar o terminal do container frontend ```make fe-bash```

### Backend
Para acessar o terminal do container backend ```make api-bash```