import {SectionCards} from '@/components/(protected)/dashboard/section-cards';
import {SignalementsStatutChart} from '@/components/(protected)/dashboard/signalements-statut-chart';
import {RecentSignalementsTable} from '@/components/(protected)/dashboard/recent-signalements-table';
import Content from '@/components/primitives/Content';

export default async function DashboardPage() {
	return (
		<Content className="flex flex-col gap-4">
			<SectionCards />
			<div className="px-4 lg:px-6">
				<SignalementsStatutChart />
			</div>
			<RecentSignalementsTable />
		</Content>
	);
}
