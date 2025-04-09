import React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import ListItemButton from '@mui/material/ListItemButton';
import { Checkbox } from '@mui/material';

import AuthContext from '/imports/app/authProvider/authContext';
import { SysFab } from '/imports/ui/components/sysFab/sysFab';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';
import { useNavigate } from 'react-router-dom';
import toDosHomeStyles from './toDosHomeStyles';

import { useTracker } from 'meteor/react-meteor-data';
import { toDosApi } from '../../api/toDosApi'; 
import AppLayoutContext from '/imports/app/appLayoutProvider/appLayoutContext';
import { ToDosModuleContext } from '../../toDosContainer';
import { IToDos } from '../../api/toDosSch';

const ToDosHomeView: React.FC = () => {
	const { Container, Header, RoundCheckbox } = toDosHomeStyles;
	const authContext = React.useContext(AuthContext);
	const navigate = useNavigate();
	const { id, state } = React.useContext(ToDosModuleContext);

	const { loading, toDoss } = useTracker(() => {
		const subHandle = toDosApi.subscribe('toDosLastFive');

		const toDoss = subHandle?.ready()
			? toDosApi.collectionInstance.find({}, { sort: { createdat: -1 }, limit: 5 }).fetch()
			: [];

		console.log("Dados recebidos do servidor:", toDoss);
		return {
			toDoss,
			loading: !!subHandle && !subHandle.ready(),
		};
	}, []);

	const handleToTaskList = () => {
		navigate(`/toDos`);
	};

	return (
		<Container>
			<Header>
				<Typography variant="h1">Olá, {authContext.user?.username}</Typography>
				<Typography variant="body1" textAlign="justify">
					Seus projetos muito mais organizados. Veja as tarefas adicionadas por seu time, por você e para você!
				</Typography>
			</Header>

			<Typography variant="h5" gutterBottom><strong>Adicionadas Recentemente</strong></Typography>

			{loading ? (
				<Typography variant="body2">Carregando tarefas...</Typography>
			) : toDoss.length === 0 ? (
				<Typography variant="body2">Nenhuma tarefa recente.</Typography>
			) : (
				<List sx={{ width: '100%', padding: 0 }}>
					<Divider variant="fullWidth" component="li" />
					{toDoss.map((task) => (
						<React.Fragment key={task._id}>
							<ListItem disablePadding>
								<ListItemButton sx={{ paddingLeft: 1 }}>
									<Checkbox
										checked={!!task.isCompleted}
										icon={<RadioButtonUncheckedIcon sx={{ fontSize: 28, color: 'gray' }} />}
										checkedIcon={<CheckCircleIcon sx={{ fontSize: 28, color: 'green' }} />}
										disableRipple
										disabled
									/>
									<ListItemText
										primary={
											<Typography
												variant="h6"
												sx={{
													fontWeight: 'bold',
													color: 'primary.dark',
													textDecoration: task.isCompleted ? 'line-through' : 'none',
												}}
											>
												{task.title}
											</Typography>
										}
										secondary={
											<Typography variant="body2" color="text.secondary">
												Criado por: <u>{task.user?.username || 'Desconhecido'}</u>
											</Typography>
										}
									/>
								</ListItemButton>
							</ListItem>
							<Divider variant="fullWidth" component="li" />
						</React.Fragment>
					))}
				</List>
			)}

			<SysFab
				variant="extended"
				text="Ir para Tarefas >>"
				startIcon={<SysIcon name="add" />}
				fixed
				onClick={handleToTaskList}
			/>
		</Container>
	);
};

export default ToDosHomeView;
