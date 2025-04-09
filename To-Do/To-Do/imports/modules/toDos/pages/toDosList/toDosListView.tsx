import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { SysFab } from '/imports/ui/components/sysFab/sysFab';
import { ToDosListControllerContext } from './toDosListController';
import { useNavigate } from 'react-router-dom';
import AppLayoutContext from '/imports/app/appLayoutProvider/appLayoutContext';
import ToDosListStyles from './toDosListStyles';
import SysTextField from '/imports/ui/components/sysFormFields/sysTextField/sysTextField';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import ListItemButton from '@mui/material/ListItemButton';

const ToDosListView = () => {
	const controller = React.useContext(ToDosListControllerContext);
	const sysLayoutContext = React.useContext(AppLayoutContext);
	const navigate = useNavigate();

	const { Container, LoadingContainer, SearchContainer, TaskContainer, RoundCheckbox } = ToDosListStyles;

	
	const [anchorEl, setAnchorEl] = useState<{ [key: string]: null | HTMLElement }>({});
	

	const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, taskId: string) => {
		setAnchorEl({ ...anchorEl, [taskId]: event.currentTarget });
	};

	
	const handleMenuClose = (taskId: string) => {
		setAnchorEl({ ...anchorEl, [taskId]: null });
	};

	return (
		<Container>
			<Typography variant="h5">Lista de Tarefas</Typography>

			<SearchContainer>
				<SysTextField
					name="search"
					placeholder="Procurar tarefa(s)"
					onChange={controller.onChangeTextField}
					startAdornment={<SysIcon name="search" />}
				/>
			</SearchContainer>

			{controller.loading ? (
				<LoadingContainer>
					<CircularProgress />
					<Typography variant="body1">Aguarde, carregando informações...</Typography>
				</LoadingContainer>
			) : (
				<List sx={{ width: '100%', padding: 0 }}>
					<Divider variant="fullWidth" component="li" />
						{controller.todoList.map((task, index) => {

					
							
						const taskId = task._id ?? ''; 
					
						return (
							<React.Fragment key={taskId}>
								<ListItem disablePadding>
									<ListItemButton sx={{ paddingLeft: 1 }}>
										<RoundCheckbox
											checked={task.isCompleted}
											onChange={(e) => controller.toggleTaskCompletion(taskId, e.target.checked)}
											icon={<RadioButtonUncheckedIcon sx={{ fontSize: 28, color: 'gray' }} />}
											checkedIcon={<CheckCircleIcon sx={{ fontSize: 28, color: 'green' }} />}
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

									<IconButton onClick={(event) => handleMenuOpen(event, taskId)}>
										<MoreVertIcon />
									</IconButton>

									<Menu
										anchorEl={anchorEl[taskId]}
										open={Boolean(anchorEl[taskId])}
										onClose={() => handleMenuClose(taskId)}
									>
										<MenuItem
											onClick={() => {
												console.log("no botão edit",task)
												controller.onEditButtonClick(task);
												handleMenuClose(taskId);
											}}
										>
											<SysIcon name="edit" sx={{ marginRight: 1 }} />
											Editar
										</MenuItem>
										<MenuItem
											onClick={() => {
												controller.onDeleteButtonClick(task);
												handleMenuClose(taskId);
											}}
											sx={{ color: 'red' }}
										>
											<SysIcon name="delete" sx={{ marginRight: 1 }} />
											Excluir
										</MenuItem>
									</Menu>
								</ListItem>

								<Divider variant="fullWidth" component="li" />
							</React.Fragment>
						);
					})}
				</List>
			)}

			<SysFab
				variant="extended"
				text="Adicionar Tarefa"
				startIcon={<SysIcon name="add" />}
				fixed
				onClick={controller.onAddButtonClick}
			/>
		</Container>
	);
};

export default ToDosListView;
