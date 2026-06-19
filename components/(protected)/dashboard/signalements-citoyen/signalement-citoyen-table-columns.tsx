import {ColumnDef} from "@tanstack/react-table";
import {ISignalement} from "@/features/signalements";
import {CheckCircle2, Clock, MapPin} from "lucide-react";
import {formatDateTime} from "@/utils/date.utils";
import {Badge} from "@/components/ui/badge";
import SignalementRowActions from "./signalement-row-actions";

// Mapping des statuts avec couleurs
const statutConfig = {
	NOUVEAU: {label: 'Nouveau', color: 'bg-blue-100 text-blue-800'},
	EN_COURS: {label: 'En cours', color: 'bg-yellow-100 text-yellow-800'},
	RESOLU: {label: 'Résolu', color: 'bg-green-100 text-green-800'},
	REJETE: {label: 'Rejeté', color: 'bg-red-100 text-red-800'},
};

export const signalementCitoyenTableColumns: ColumnDef<ISignalement>[] = [
	// {
	// 	accessorKey: 'photo',
	// 	header: 'Photo',
	// 	cell: ({row}) => (
	// 		<Image
	// 			src={row.original.photo || "/assets/fallback/image-fallback.png"}
	// 			alt={row.original.titre.slice(0,20)}
	// 			width={60}
	// 			height={60}
	// 			className="rounded-md object-cover"
	// 			unoptimized
	// 		/>
	// 	)
	// },
	{
		accessorKey: 'titre',
		header: 'Titre',
		cell: ({row}) => (
			<span title={row.original.titre} className="text-sm font-medium max-w-xs truncate block">
				{row.original.titre}
			</span>
		)
	},
	// {
	// 	accessorKey: 'description',
	// 	header: 'Description',
	// 	cell: ({row}) => (
	// 		<p className="text-sm text-gray-600 line-clamp-2 max-w-xs">
	// 			{row.original.description}
	// 		</p>
	// 	)
	// },
	{
		accessorKey: 'categorie',
		header: 'Catégorie',
		cell: ({row}) => (
			<span className="text-sm line-clamp-2">
				{row.original.categorie?.nom || 'N/A'}
			</span>
		)
	},
	{
		accessorKey: 'adresse',
		header: 'Localisation',
		cell: ({row}) => (
			<div className="flex items-center gap-2 text-sm">
				<MapPin className="size-8 text-gray-500" />
				<span className="line-clamp-1">{row.original.adresse}</span>
			</div>
		)
	},
	{
		accessorKey: 'statut',
		header: 'Statut',
		cell: ({row}) => {
			const config = statutConfig[row.original.statut as keyof typeof statutConfig];
			return (
				<Badge className={config.color}>
					{config.label}
				</Badge>
			);
		}
	},
	{
		accessorKey: 'validation',
		header: 'Validation',
		cell: ({row}) => (
			<div className="flex items-center gap-2">
				{row.original.validation ? (
					<CheckCircle2 className="h-5 w-5 text-green-600" />
				) : (
					<Clock className="h-5 w-5 text-gray-400" />
				)}
				<span className="text-sm">{row.original.validation ? 'Validé' : 'En attente'}</span>
			</div>
		)
	},
	{
		accessorKey: 'citoyen',
		header: 'Signalé par',
		cell: ({row}) => (
			<span className="text-sm">
				{row.original.citoyen?.fullname || 'Utilisateur supprimé'}
			</span>
		)
	},
	{
		accessorKey: 'createdAt',
		header: 'Date de création',
		cell: ({row}) => (
			<time className="text-sm">
				{formatDateTime(row.original.createdAt)}
			</time>
		)
	},
	{
		id: 'actions',
		header: 'Actions',
		cell: ({row}) => <SignalementRowActions signalement={row.original} />
	}
];

