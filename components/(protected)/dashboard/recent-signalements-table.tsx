'use client';

import Link from 'next/link';
import {useQuery} from '@tanstack/react-query';
import {IconArrowRight, IconMapPin} from '@tabler/icons-react';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {signalementsApi} from '@/features/signalements/apis/signalements.api';
import {ISignalement} from '@/features/signalements';

const STATUT_CONFIG: Record<ISignalement['statut'], {label: string; className: string}> = {
	NOUVEAU: {label: 'Nouveau', className: 'bg-blue-100 text-blue-800 hover:bg-blue-100'},
	EN_COURS: {label: 'En cours', className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'},
	RESOLU: {label: 'Résolu', className: 'bg-green-100 text-green-800 hover:bg-green-100'},
	REJETE: {label: 'Rejeté', className: 'bg-red-100 text-red-800 hover:bg-red-100'},
};

export function RecentSignalementsTable() {
	const {data, isLoading} = useQuery({
		queryKey: ['recent-signalements'],
		queryFn: () => signalementsApi.obtenirTousLesSignalements({limit: 10, page: 1}),
		staleTime: 2 * 60 * 1000,
	});

	const signalements: ISignalement[] = data?.data ?? [];

	return (
		<div className="flex flex-col gap-4 px-4 lg:px-6">
			<div className="flex items-center justify-between">
				<h2 className="text-base font-semibold">Signalements récents</h2>
				<Button variant="ghost" size="sm" asChild>
					<Link href="/dashboard/signalements">
						Voir tous <IconArrowRight className="ml-1 size-4" />
					</Link>
				</Button>
			</div>
			<div className="overflow-hidden rounded-lg border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Titre</TableHead>
							<TableHead>Statut</TableHead>
							<TableHead>Catégorie</TableHead>
							<TableHead className="hidden md:table-cell">Adresse</TableHead>
							<TableHead className="hidden lg:table-cell">Date</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{isLoading ? (
							Array.from({length: 5}).map((_, i) => (
								<TableRow key={i}>
									{Array.from({length: 5}).map((_, j) => (
										<TableCell key={j}>
											<div className="h-4 animate-pulse rounded bg-muted" />
										</TableCell>
									))}
								</TableRow>
							))
						) : signalements.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={5}
									className="text-center text-muted-foreground py-8"
								>
									Aucun signalement pour le moment
								</TableCell>
							</TableRow>
						) : (
							signalements.map((item) => {
								const config = STATUT_CONFIG[item.statut];
								return (
									<TableRow key={item.id}>
										<TableCell className="font-medium max-w-[200px]">
											<span className="block truncate">{item.titre}</span>
										</TableCell>
										<TableCell>
											<Badge className={config.className}>{config.label}</Badge>
										</TableCell>
										<TableCell>{item.categorie?.nom ?? '-'}</TableCell>
										<TableCell className="hidden md:table-cell text-muted-foreground max-w-[150px]">
											<div className="flex items-center gap-1">
												<IconMapPin className="size-3 shrink-0" />
												<span className="truncate">{item.adresse}</span>
											</div>
										</TableCell>
										<TableCell className="hidden lg:table-cell text-muted-foreground text-sm">
											{new Date(item.createdAt).toLocaleDateString('fr-FR')}
										</TableCell>
									</TableRow>
								);
							})
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
