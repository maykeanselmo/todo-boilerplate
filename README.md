# 📋 Advanced To-Do List

Um gerenciador de tarefas completo, construído com **Meteor, React, TypeScript e Material UI**. Esse projeto permite que usuários criem, editem, visualizem e excluam tarefas com controle de visibilidade e autenticação. Ideal para demonstrar habilidades com Meteor, lógica de permissões e responsividade. Esta versão utiliza o boilerplate desenvolvido pela equipe do Synergia.

## ✨ Funcionalidades

- 🔐 Acesso somente para usuários autenticados.
- 👋 Tela de boas-vindas com últimas tarefas adicionadas/atualizadas.
- 📃 Criação, edição e exclusão de tarefas.
- ✅ Marcar/desmarcar tarefas como concluídas.
- 🔍 Pesquisa por descrição das tarefas.
- 📄 Controle de visibilidade (pessoal/público).
- 🧾 Paginação com limite de 4 tarefas por página.
- 📱 Layout responsivo para dispositivos móveis.
- 🛡️ Apenas o dono da tarefa pode editá-la ou removê-la.
- 💬 Notificações de sucesso ou erro com `showNotification`.

## 🚀 Tecnologias

- [Boilerplate](https://github.com/synergia-labs/MeteorReactBaseMUI.git)
- [MeteorJS](https://www.meteor.com/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Material UI](https://mui.com/)
- [MongoDB](https://www.mongodb.com/)

## 🔧 Como executar o projeto

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/advanced-todo-list.git

# Acesse a pasta
cd advanced-todo-list

# Instale as dependências
meteor npm install

# Inicie o servidor
meteor run
