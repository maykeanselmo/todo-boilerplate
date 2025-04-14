import React, { useContext, useEffect } from 'react';
import SignInStyles from './signInStyles';
import { useNavigate } from 'react-router-dom';
import SysTextField from '../../../ui/components/sysFormFields/sysTextField/sysTextField';
import SysForm from '../../../ui/components/sysForm/sysForm';
import SysFormButton from '../../../ui/components/sysFormFields/sysFormButton/sysFormButton';
import { signInSchema } from './signinsch';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SysIcon from '../../../ui/components/sysIcon/sysIcon';
import AuthContext, { IAuthContext } from '/imports/app/authProvider/authContext';
import AppLayoutContext from '/imports/app/appLayoutProvider/appLayoutContext';

const SignInPage: React.FC = () => {
	const { showNotification } = useContext(AppLayoutContext);
	const { user, signIn } = useContext<IAuthContext>(AuthContext);
	const navigate = useNavigate();
	const { Container, Content, FormContainer, FormWrapper } = SignInStyles;

	const handleSubmit = ({ email, password }: { email: string; password: string }) => {
		console.log(email + password)
		signIn(email, password, (err) => {
			console.log('login err:', err);
			if (!err) {
				navigate('/');
				return;
			}
		
			showNotification({
				type: 'error',
				title: 'Erro ao tentar logar',
				message: 'Email ou senha inválidos',
			});
		});
		
;	};

	const handleForgotPassword = () => navigate('/password-recovery');
	const handleRegister = () => navigate('/signup');

	useEffect(() => {
		if (user) navigate('/');
	}, [user]);

	return (
		<Container>
			<Content>
			<Typography variant="h1" display={'inline-flex'} gap={1} sx={{ fontSize: "60px", fontWeight: 900 }}>
					
					ToDo List
					
				</Typography>
				<Typography variant="h6" textAlign={'center'}>
  					Boas-vindas à sua lista de tarefas. <br />
  					Insira seu e-mail e senha para efetuar o login.
				</Typography>
			
				<FormContainer>
					<SysForm schema={signInSchema} onSubmit={handleSubmit} debugAlerts={true}>
						<FormWrapper>
							<SysTextField name="email" label="Email" fullWidth placeholder="Digite seu email" />
							<SysTextField label="Senha" fullWidth name="password" placeholder="Digite sua senha" type="password" />
						
							<Box />
							
							<SysFormButton variant="contained" color="primary" endIcon={<SysIcon name={'arrowForward'} />}>
								Entrar
							</SysFormButton>
							<Typography 
								variant="body2" 
								sx={{ fontSize: '16px', cursor: 'pointer', textDecoration: 'none' }} 
								onClick={handleForgotPassword}
								>
								Esqueceu sua senha? <span style={{ textDecoration: 'underline' }}>Clique aqui</span>
							</Typography>
							
							<Typography 
								variant="body2" 
								sx={{ fontSize: '16px', cursor: 'pointer', fontFamily: 'Roboto, sans-serif', textDecoration: 'none' }}
								onClick = {handleRegister}
								>
								Novo por aqui? <span style={{ textDecoration: 'underline' }}>Cadastre-se</span>
							</Typography>
						</FormWrapper>
					</SysForm>
				</FormContainer>

			</Content>
		</Container>
	);
};

export default SignInPage;
