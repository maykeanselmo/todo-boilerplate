import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { SysFab } from '/imports/ui/components/sysFab/sysFab';
import { ToDosListControllerContext } from './toDosListController';
import { useNavigate } from 'react-router-dom';
import { ComplexTable } from '/imports/ui/components/ComplexTable/ComplexTable';
import DeleteDialog from '/imports/ui/appComponents/showDialog/custom/deleteDialog/deleteDialog';
import AppLayoutContext, { IAppLayoutContext } from '/imports/app/appLayoutProvider/appLayoutContext';
import ToDosListStyles from './toDosListStyles';
import SysTextField from '/imports/ui/components/sysFormFields/sysTextField/sysTextField';
import { SysSelectField } from '/imports/ui/components/sysFormFields/sysSelectField/sysSelectField';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';
import { SysDatePickerField } from '/imports/ui/components/sysFormFields/sysDatePickerField/sysDatePickerField';
import { List } from '@mui/material';
import TaskIcon from '@mui/icons-material/Task';
import { ToDosModuleContext } from '../../toDosContainer';


import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';



const ToDosListView = () => {
	const controller = React.useContext(ToDosListControllerContext);
	const sysLayoutContext = React.useContext(AppLayoutContext);
	const {id} = React.useContext(ToDosModuleContext);
	const navigate = useNavigate();
  const {
    Container,
    LoadingContainer,
    SearchContainer,
	TaskContainer
  } = ToDosListStyles;

  const options = [{ value: '', label: 'Nenhum' }, ...(controller?.schema?.type?.options?.() ?? [])];

	return (
		<Container>
			<Typography variant="h5">Lista de Itens</Typography>
			<SearchContainer>
				<SysTextField
					name="search"
					placeholder="Pesquisar por nome"
					onChange={controller.onChangeTextField}
					startAdornment={<SysIcon name={'search'} />}
				/>
				<SysSelectField
					name="Category"

					label="Categoria"
					options={options}
					placeholder="Selecionar"
					onChange={controller.onChangeCategory}
				/>
				
			</SearchContainer>
			{controller.loading ? (
				<LoadingContainer>
					<CircularProgress />
					<Typography variant="body1">Aguarde, carregando informações...</Typography>
				</LoadingContainer>
			) : (
				<TaskContainer>
				<List>
				  {controller.todoList.map((task, index) => (
					<React.Fragment key={task._id}>
					  <ListItem alignItems="flex-start">
						<ListItemText
						  primary={
							<Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
							  {task.description}
							</Typography>
						  }
						  secondary={
							<Typography variant="body2" color="text.secondary">
							  Criado por <strong>{task.user?.username || "Desconhecido"}</strong> — {new Date(task.date).toLocaleDateString()}
							</Typography>
						  }
						/>
						
					  </ListItem>
					  {index < controller.todoList.length - 1 && <Divider variant="inset" />}
					  
					</React.Fragment>
				  ))}
				</List>
			  </TaskContainer>
			)}

			<SysFab
				variant="extended"
				text="Adicionar"
				startIcon={<SysIcon name={'add'} />}
				fixed={true}
				onClick={controller.onAddButtonClick}
			/>
		</Container>
	);
};

export default ToDosListView;
