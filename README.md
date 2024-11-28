# FindSign - Front-End

## Descrição

O **FindSign** é um website desenvolvido para servir como um repositório de sinais de Libras, com foco em quatro cursos específicos: **Tecnologia da Informação, Medicina Veterinária, Nutrição e Business**. Ele foi idealizado para facilitar a consulta e o gerenciamento de representações visuais em Libras.

Este projeto é o **front-end** do FindSign, criado pela turma do **7º e 8º semestre de Ciência da Computação** para a disciplina de **Projeto de Linguagem de Programação**, sob orientação da professora **Kadidja Valéria Reginaldo de Oliveira**. O stakeholder do projeto é o professor **Saulo Xavier**, especialista em Libras.

O sistema foi desenvolvido utilizando **Nuxt.js** (versão 3.11.2) e **Node.js** (versão 20.15.0).

---

## Pré-requisitos

Antes de começar, é necessário que você tenha instalado em sua máquina:

- [Git](https://git-scm.com)  
- [Node.js](https://nodejs.org/en/download) (última versão LTS recomendada: **v20.15.0**, inclui o npm)

### Ferramentas opcionais

- [Github Desktop](https://desktop.github.com/)

Além disso, recomenda-se o uso de uma IDE como o [Visual Studio Code (VSCode)](https://code.visualstudio.com/).  
Se optar pelo VSCode, instale as extensões recomendadas para **Vue.js** e **Nuxt.js**.

---

## 🛠 Tecnologias

As seguintes tecnologias foram utilizadas no desenvolvimento deste projeto:

![Javascript](https://img.shields.io/badge/Javascript-F0DB4F?style=for-the-badge&labelColor=black&logo=javascript&logoColor=F0DB4F)
![Typescript](https://img.shields.io/badge/Typescript-007acc?style=for-the-badge&labelColor=black&logo=typescript&logoColor=007acc)
![VueJs3](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)
![Nuxt](https://img.shields.io/badge/nuxt.js-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white)
![Nodejs](https://img.shields.io/badge/Nodejs-3C873A?style=for-the-badge&labelColor=black&logo=node.js&logoColor=3C873A)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![VSCode](https://img.shields.io/badge/Visual_Studio-0078d7?style=for-the-badge&logo=visual%20studio&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![EsLint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)

- **[Vue.js 3](https://vuejs.org/)**
- **[Nuxt.js](https://nuxt.com/)**
- **[Node.js](https://nodejs.org/)**
- **[Bootstrap](https://getbootstrap.com/)**
- **[NPM](https://www.npmjs.com/)**
- **[ESLint](https://eslint.org/)**

---

# Estrutura de Pastas do Projeto

```plaintext
src
├── assets
├── components
│   ├── Modal
│   │   ├── Content.vue
│   │   ├── EditContent.vue
│   │   ├── EditTopic.vue
│   │   ├── Login.vue
│   │   ├── LoginInfo.vue
│   │   ├── Topic.vue
│   ├── ButtonComponent.vue
│   ├── Footer.vue
│   ├── IconFontAwesome.vue
│   ├── Navbar.vue
│   ├── ToastComponent.vue
├── composables
│   ├── CoursesComposable.js
│   ├── ManageComposable.js
│   ├── ModalLoginComposable.js
│   ├── TopicComposable.js
│   ├── UsersComposable.js
├── layouts
│   ├── default.vue
├── middleware
│   ├── auth.global.js
│   ├── register.global.js
│   ├── users.global.js
├── pages
│   ├── topicos
│   │   ├── [id].vue
│   │── cadastro_usuario.vue
│   │── findsign.vue
│   │── gerenciamento_libras.vue
│   │── index.vue
│   │── usuarios.vue
├── public
│   ├── favicon.ico
├── stores
│   ├── modal_store.js
│   ├── toast_store.js
│   ├── user_store.js
├── app.config.ts
├── app.vue
```
---

## 👥 Equipe

### **Design**
- **Lucas Gonçalves Barbosa**  
  RGM: 26748983

### **Front-End**
- **Líder:** Bernardo de Melo Matuchewski  
  RGM: 31957226  
- **Vice-Líder:** Matheus Alves Torres  
  RGM: 28255402

---

## 🎲 Como executar o projeto

Siga os passos abaixo para rodar a aplicação localmente:

```bash
# Clone este repositório
$ git clone <url-do-repositorio>

# Acesse a pasta do projeto no terminal/cmd
$ cd nome-do-projeto

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm start

# O servidor será iniciado na porta 3000
# Acesse no navegador: http://localhost:3000
