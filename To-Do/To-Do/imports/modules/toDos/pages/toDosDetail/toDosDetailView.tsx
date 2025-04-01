import React, { useContext } from 'react';
import { ToDosDetailControllerContext } from './toDosDetailContoller';
import { ToDosModuleContext } from '../../toDosContainer';
import ToDosDetailStyles from './toDosDetailStyles';
import SysForm from '/imports/ui/components/sysForm/sysForm';
import SysTextField from '/imports/ui/components/sysFormFields/sysTextField/sysTextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { SysSelectField } from '/imports/ui/components/sysFormFields/sysSelectField/sysSelectField';
import { SysRadioButton } from '/imports/ui/components/sysFormFields/sysRadioButton/sysRadioButton';
import { SysCheckBox } from '/imports/ui/components/sysFormFields/sysCheckBoxField/sysCheckBoxField';
import SysFormButton from '/imports/ui/components/sysFormFields/sysFormButton/sysFormButton';
import { SysUploadFile } from '/imports/ui/components/sysFormFields/sysUploadFile/sysUploadFile';
import SysSlider from '/imports/ui/components/sysFormFields/sysSlider/sysSliderField';
import { SysLocationField } from '/imports/ui/components/sysFormFields/sysLocationField/sysLocationField';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';
import { SysDatePickerField } from '/imports/ui/components/sysFormFields/sysDatePickerField/sysDatePickerField';
import TaskIcon from '@mui/icons-material/Task';
import AppLayoutContext from '/imports/app/appLayoutProvider/appLayoutContext';

const ToDosDetailView = () => {
	const controller = useContext(ToDosDetailControllerContext);
	const { state } = useContext(ToDosModuleContext);
	const isView = state === 'view';
	const isEdit = state === 'edit';
	const isCreate = state === 'create';
  const {
    Container,
    Body,
    Header,
    Footer,
    FormColumn
  } = ToDosDetailStyles;
  const sysLayoutContext = React.useContext(AppLayoutContext);

	return (
		<Container>
			<Header>
				{isView && (
					<IconButton onClick={controller.closePage}>
						<SysIcon name={'arrowBack'} />
					</IconButton>
				)}
				<Typography variant="h5" sx={{ flexGrow: 1 }}>
					{isCreate ? 'Adicionar Tarefa' : isEdit ? 'Editar Tarefa' : controller.document.title}
				</Typography>
				<IconButton
					onClick={!isView ? () => sysLayoutContext.closeModal(): () => controller.changeToEdit(controller.document._id || '')}>
					{!isView ? <SysIcon name={'close'} /> : <SysIcon name={'edit'} />}
				</IconButton>
				
			</Header>
			<SysForm
				mode={state as 'create' | 'view' | 'edit'}
				schema={controller.schema}
				doc={controller.document}
				onSubmit={controller.onSubmit}
				loading={controller.loading}>
				<Body>
					<FormColumn>
						<SysTextField name="title" placeholder="Ex.: Tarefa XX" />
						
						<SysRadioButton name="typeMulti" childrenAlignment="row" size="small" />
						<SysTextField
							name="description"
							placeholder="Descrição da Tarefa (3 linhas)"
							multiline
							rows={3}
							maxRows={3}
							showNumberCharactersTyped
							max={200}
						/>
						<SysDatePickerField name="date" placeholder="Selecione uma data" />
						
					</FormColumn>
					
				</Body>
				<Footer>
			
					<SysFormButton>Salvar</SysFormButton>
				</Footer>
			</SysForm>
		</Container>
	);
};

export default ToDosDetailView;

