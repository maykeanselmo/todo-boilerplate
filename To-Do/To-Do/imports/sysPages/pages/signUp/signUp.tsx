// signup component similar to login page (except loginWithPassword)
// instead createUser to insert a new user account document

// login page overrides the form’s submit event and call Meteor’s loginWithPassword()
// Authentication errors modify the component’s state to be displayed
import React from 'react';
import { Link, NavigateFunction } from 'react-router-dom';
import Container from '@mui/material/Container';
import TextField from '/imports/ui/components/SimpleFormFields/TextField/TextField';
import Button from '@mui/material/Button';
import { userprofileApi } from '../../../modules/userprofile/api/userProfileApi';
import SimpleForm from '/imports/ui/components/SimpleForm/SimpleForm';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { IUserProfile } from '/imports/modules/userprofile/api/userProfileSch';
import SignUpStyles from './signUpStyle';
import SysIcon from '../../../ui/components/sysIcon/sysIcon';
import SysFormButton from '../../../ui/components/sysFormFields/sysFormButton/sysFormButton';
import AppLayoutContext from '/imports/app/appLayoutProvider/appLayoutContext';
import { ShowNotification } from '../../../ui/appComponents/showNotification/showNotification';


interface ISignUp {
	showNotification: (options?: Object) => void;
	navigate: NavigateFunction;
	user: IUserProfile;
}

const signUpPhrases = [
	"Organize suas ideias. Realize seus sonhos.",
	"Tudo sob controle, no seu tempo.",
	"Sua produtividade começa aqui.",
	"Chega de esquecer até de lembrar!",
	"O começo da sua rotina mais organizada começa agora.",
	"Transforme tarefas em conquistas diárias.",
	"Planeje hoje, conquiste amanhã.",
	"Dê um check nas suas metas. Cadastre-se!",
	"Você no controle da sua lista. Sempre.",
	"Simplifique seu dia, uma tarefa de cada vez.",
	"Menos caos, mais foco. Vamos nessa?",
	"Listas que fazem sentido. Dias que rendem mais.",
	"Seu tempo é precioso. Organize com propósito.",
	"Viva o prazer de riscar uma tarefa feita!",
	"Uma mente organizada começa com uma boa lista.",
	"Cadastre-se e comece sua revolução produtiva!",
	"A lista perfeita começa com um clique.",
	"Deixe a bagunça mental no passado. Vem pro ToDo!",
	"Porque sua rotina merece ser leve e eficiente.",
	"Tarefas sob controle. Vida em equilíbrio.",
  ];
  

export const SignUp = (props: ISignUp) => {
	//const { showNotification } = props;
	const { Container, Content, FormContainer, FormWrapper } = SignUpStyles;
	const randomPhrase = signUpPhrases[Math.floor(Math.random() * signUpPhrases.length)];
	const {showNotification} = React.useContext(AppLayoutContext);

	const handleSubmit = (doc: { email: string; password: string, username: string }) => {
		const { email, password , username} = doc;

		userprofileApi.insertNewUser({username: username ,email, password }, (err, r) => {
			console.log("RESULTADO DA CRIAÇÃO:", { err, r });
			if (err) {
				console.log('Login err', err);
				
					showNotification({
						type: 'warning',
						title: 'Problema na criação do usuário!',
						message: 'Erro ao fazer registro em nossa base de dados!'
					});
			} else {
				console.log("Chamando notificação de sucesso");
				
					showNotification({
						type: 'success',
						title: 'Cadastrado com sucesso!',
						message: 'Registro de usuário realizado em nossa base de dados!'
					});
			}
		});
	};


	

	return (
		<Container >
			<Content>
			<Box
				display="flex"
				flexDirection="column"
				alignItems="center"
				justifyContent="center"
				gap={2}
				sx={{ maxWidth: 300, mx: 'auto', mt: 4 }}
				>
				<Box
					component="img"
					src="/images/sing-up.jpg"
					alt="Ícone de cadastro"
					sx={{
					width: '100%',
					maxWidth: 200,
					height: 'auto',
					objectFit: 'contain',
					}}
				/>

				<Typography variant="h6" textAlign="center">
					{randomPhrase} 
				</Typography>
			</Box>
					<FormContainer>

						<SimpleForm
							schema={{
								username: {
									type: String,
									label: 'Username',
									optional: false
								},

								email: {
									type: String,
									label: 'Email',
									optional: false
								},
								password: {
									type: String,
									label: 'Senha',
									optional: false
								}
							}}
							onSubmit={handleSubmit}>
							<FormWrapper>
								<TextField id="Username" label="Username" fullWidth name="username" placeholder="Digite um nome de usuário" />
								<TextField id="Email" label="Email" fullWidth name="email" type="email" placeholder="Digite um email" />
								<TextField id="Senha" label="Senha" fullWidth name="password" placeholder="Digite uma senha" type="password" />
								
								<SysFormButton variant={'outlined'} color="primary" id="submit" endIcon={<SysIcon name={'arrowForward'} />}>
									Cadastrar
								</SysFormButton>
							</FormWrapper>

						</SimpleForm>
					</FormContainer>
				<Box >
					Já tem uma conta? Faça login clicando{' '}
					<Link to="/signin" color={'secondary'}>
						aqui
					</Link>
				</Box>
			</Content>
		</Container>
	);
};
