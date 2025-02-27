import { Button, ButtonGroup } from '@rocket.chat/fuselage';
import { useMutableCallback } from '@rocket.chat/fuselage-hooks';
import { useRoute, useTranslation } from '@rocket.chat/ui-contexts';
import type { FC, ReactElement, Dispatch, SetStateAction } from 'react';
import React from 'react';

import GenericNoResults from '../../../../client/components/GenericNoResults';
import GenericTable from '../../../../client/components/GenericTable';
import Page from '../../../../client/components/Page';

type CannedResponsesPageProps = {
	data: any;
	header: ReactElement[];
	setParams: Dispatch<SetStateAction<{ current: number; itemsPerPage: 25 | 50 | 100 }>>;
	params: { current: number; itemsPerPage: 25 | 50 | 100 };
	title: string;
	renderFilter?: (props: any) => ReactElement;
	renderRow?: (props: any) => ReactElement;
	totalCannedResponses: number;
	busy?: boolean;
};

const CannedResponsesPage: FC<CannedResponsesPageProps> = ({
	data,
	header,
	setParams,
	params,
	title,
	renderRow,
	renderFilter,
	totalCannedResponses,
	busy,
}) => {
	const t = useTranslation();

	const Route = useRoute('omnichannel-canned-responses');

	const handleClick = useMutableCallback(() =>
		Route.push({
			context: 'new',
		}),
	);

	return (
		<Page>
			<Page.Header title={title}>
				<ButtonGroup>
					<Button onClick={handleClick} title={t('New_Canned_Response')}>
						{t('New')}
					</Button>
				</ButtonGroup>
			</Page.Header>
			<Page.Content>
				{totalCannedResponses < 1 ? (
					<GenericNoResults
						icon='baloon-exclamation'
						title={t('No_Canned_Responses_Yet')}
						description={t('No_Canned_Responses_Yet-description')}
						buttonTitle={t('Create_your_First_Canned_Response')}
						buttonAction={handleClick}
					></GenericNoResults>
				) : (
					<GenericTable
						renderFilter={renderFilter}
						header={header}
						renderRow={renderRow}
						results={data?.cannedResponses}
						total={data?.total}
						setParams={setParams}
						params={params}
						aria-busy={busy}
					/>
				)}
			</Page.Content>
		</Page>
	);
};

export default CannedResponsesPage;
