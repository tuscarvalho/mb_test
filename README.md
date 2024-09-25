# Vue 3(Composition API) + Vite

## Descrição

A proposta deste teste é criar um layout de cadastro de usuario para pessoa física e jurídica. 

Neste fluxo, é realizado a validação de todos os campos de formulário, exibindo suas respectivas mensagens de validação e adição de mascaras(utilizado o pacote maska) nos campos necessários(cpf/cnpj, telefone, data);

Após o final do fluxo, é possível simular a integração com uma API(mock) que recebe os dados enviados pela aplicação WEB e os devolve informando que foi salvo com sucesso;


## Ferramentas

- [Vite](https://vitejs.dev/)
- [Vue.js](https://vuejs.org/)
- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/)
- [Maska](https://beholdr.github.io/maska/v3/#/)


## Serviços

Foi adicionado um servidor node na raiz do projeto(server.js), onde o mesmo é responsavel por retornar 2 rotas: 

-[GET](/registration);
-[POST](/registration);


## Rodando o projeto

Install project:
```
npm install
```

Run project:
```
npm run dev:custom (Comando que rodará tanto o servidor node quanto a aplicação web;)
``` 

