'use client';

import {
	IconAlarmAverage,
	IconNews,
	IconUsers,
	IconAlertCircle,
} from '@tabler/icons-react';
import {Card, CardAction, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {useQuery} from '@tanstack/react-query';
import {signalementsApi} from '@/features/signalements/apis/signalements.api';
import {actualiteApi} from '@/features/actualites/apis/actualite.api';
import {obtenirTousUtilisateursAction} from '@/features/utilisateur/actions/utilisateur.action';

function StatCard({
	label,
	value,
	icon: Icon,
	isLoading,
}: {
	label: string;
	value?: number;
	icon: React.ElementType;
	isLoading: boolean;
}) {
	return (
		<Card className="@container/card">
			<CardHeader>
				<CardDescription>{label}</CardDescription>
				<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
					{isLoading ? (
						<div className="h-8 w-20 animate-pulse rounded bg-default-200" />
					) : (
						(value ?? 0).toLocaleString('fr-FR')
					)}
				</CardTitle>
				<CardAction>
					<Badge variant="outline">
						<Icon className="size-4" />
					</Badge>
				</CardAction>
			</CardHeader>
		</Card>
	);
}

export function SectionCards() {
	const {data: signalementsTotal, isLoading: loadingSignalements} = useQuery({
		queryKey: ['stats', 'signalements', 'total'],
		queryFn: () => signalementsApi.obtenirTousLesSignalements({limit: 1, page: 1} as any),
		staleTime: 2 * 60 * 1000,
		select: (d) => d.meta.total,
	});

	const {data: signalementsNouveaux, isLoading: loadingNouveaux} = useQuery({
		queryKey: ['stats', 'signalements', 'nouveau'],
		queryFn: () =>
			signalementsApi.obtenirTousLesSignalements({limit: 1, page: 1, statut: 'NOUVEAU'} as any),
		staleTime: 2 * 60 * 1000,
		select: (d) => d.meta.total,
	});

	const {data: actualitesTotal, isLoading: loadingActualites} = useQuery({
		queryKey: ['stats', 'actualites'],
		queryFn: () => actualiteApi.obtenirToutesActualites({limit: 1, page: 1} as any),
		staleTime: 2 * 60 * 1000,
		select: (d) => d.meta.total,
	});

	const {data: utilisateursTotal, isLoading: loadingUtilisateurs} = useQuery({
		queryKey: ['stats', 'utilisateurs'],
		queryFn: async () => {
			const result = await obtenirTousUtilisateursAction({limit: 1, page: 1});
			if (!result.success) throw new Error(result.error);
			return result.data!;
		},
		staleTime: 2 * 60 * 1000,
		select: (d) => d.meta.total,
	});

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4 lg:px-6">
			<StatCard
				label="Total signalements"
				value={signalementsTotal}
				icon={IconAlarmAverage}
				isLoading={loadingSignalements}
			/>
			<StatCard
				label="Signalements nouveaux"
				value={signalementsNouveaux}
				icon={IconAlertCircle}
				isLoading={loadingNouveaux}
			/>
			<StatCard
				label="Actualités publiées"
				value={actualitesTotal}
				icon={IconNews}
				isLoading={loadingActualites}
			/>
			<StatCard
				label="Utilisateurs"
				value={utilisateursTotal}
				icon={IconUsers}
				isLoading={loadingUtilisateurs}
			/>
		</div>
	);
}
