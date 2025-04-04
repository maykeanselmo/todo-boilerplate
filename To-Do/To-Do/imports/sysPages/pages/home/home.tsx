import React from 'react';
import Typography from '@mui/material/Typography';
import HomeSectionNotificacoes from './sections/notificacoes';
import HomeSectionDialogs from './sections/dialogs';
import HomeStyles from './homeStyle';
import HomeSectionComponents from "/imports/sysPages/pages/home/sections/componentTests";
import AuthContext from '/imports/app/authProvider/authContext';
import { SysFab } from '/imports/ui/components/sysFab/sysFab';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const { Container, Header, } = HomeStyles;
  const authContext = React.useContext(AuthContext);

  const navigate = useNavigate();

  const handleToTaskList = () =>{
	navigate(`/toDos`);
  }

  

	return (
		<Container>
			<Header>
				<Typography variant="h1">Olá, {authContext.user?.username}</Typography>
				<Typography variant="body1" textAlign={'justify'}>
					Seus projetos muito mais organizados. Veja as tarefas adicionadas por seu time, por você e para você!
				</Typography>
			</Header>
			<Typography variant="h5" textAlign={'justify'}>
					<strong>Adicionadas Recentemente</strong>
			</Typography>
			

			<SysFab
				variant="extended"
				text="Irpara Tarefas >>"
				startIcon={<SysIcon name="add" />}
				fixed
				onClick={handleToTaskList}
				
			/>
		</Container>
	);
};



export default Home;
