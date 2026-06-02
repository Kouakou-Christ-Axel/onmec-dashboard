'use client';

import {useQueries} from '@tanstack/react-query';
import {Bar, BarChart, XAxis, CartesianGrid, Cell} from 'recharts';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from '@/components/ui/chart';
import {signalementsApi} from '@/features/signalements/apis/signalements.api';

const STATUTS = [
	{key: 'NOUVEAU' as const, label: 'Nouveau', color: '#3b82f6'},
	{key: 'EN_COURS' as const, label: 'En cours', color: '#f59e0b'},
	{key: 'RESOLU' as const, label: 'Résolu', color: '#10b981'},
	{key: 'REJETE' as const, label: 'Rejeté', color: '#ef4444'},
];

const chartConfig = {
	total: {label: 'Signalements'},
} satisfies ChartConfig;

export function SignalementsStatutChart() {
	const results = useQueries({
		queries: STATUTS.map((statut) => ({
			queryKey: ['chart', 'signalements', statut.key],
			queryFn: () =>
				signalementsApi.obtenirTousLesSignalements({statut: statut.key, limit: 1, page: 1}),
			staleTime: 5 * 60 * 1000,
		})),
	});

	const isLoading = results.some((r) => r.isLoading);

	const chartData = STATUTS.map((statut, i) => ({
		statut: statut.label,
		total: results[i]?.data?.meta?.total ?? 0,
		color: statut.color,
	}));

	return (
		<Card className="@container/card">
			<CardHeader>
				<CardTitle>Signalements par statut</CardTitle>
				<CardDescription>Répartition actuelle des signalements citoyens</CardDescription>
			</CardHeader>
			<CardContent>
				{isLoading ? (
					<div className="h-[250px] flex items-center justify-center">
						<div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
					</div>
				) : (
					<ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
						<BarChart data={chartData} margin={{top: 8, right: 8, bottom: 0, left: 0}}>
							<CartesianGrid vertical={false} />
							<XAxis
								dataKey="statut"
								tickLine={false}
								axisLine={false}
								tickMargin={8}
							/>
							<ChartTooltip cursor={false} content={<ChartTooltipContent />} />
							<Bar dataKey="total" radius={[4, 4, 0, 0]}>
								{chartData.map((entry, index) => (
									<Cell key={index} fill={entry.color} />
								))}
							</Bar>
						</BarChart>
					</ChartContainer>
				)}
			</CardContent>
		</Card>
	);
}
