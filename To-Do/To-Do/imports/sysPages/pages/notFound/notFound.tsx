import React from 'react';
import NotFoundStyles from './notFoundStyles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';

export const NotFound: React.FC = () => {
	const navigate = useNavigate();
  const { Container, } = NotFoundStyles;
	const backToHome = () => navigate('/');

	return (
		<Container sx={{ textAlign: 'center', mt: 4 }}>
			<img
				src="/images/page-not-found.jpg"
				alt="Página não encontrada"
				style={{ maxWidth: '300px', width: '100%', marginBottom: '24px' }}
			/>
			<Typography variant="h3" textAlign="center">
				Ops! Algo deu errado...
			</Typography>
			<Typography variant="body1" textAlign="center" sx={{ mt: 2, mb: 4 }}>
				A página que você está procurando não foi encontrada ou está temporariamente indisponível.
			</Typography>
			<Button
				startIcon={<SysIcon name="replyAll" />}
				onClick={backToHome}
				variant="contained"
			>
				Ir para a página inicial
			</Button>
		</Container>

	  
	);
};
