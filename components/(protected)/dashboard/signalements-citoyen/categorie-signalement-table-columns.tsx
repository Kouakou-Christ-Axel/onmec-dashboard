import { ColumnDef } from "@tanstack/react-table";
import { ICategorieSignalement } from "@/features/signalements";
import { CheckCircle2, XCircle } from "lucide-react";
import { formatDateTime } from "@/utils/date.utils";
import { Badge } from "@/components/ui/badge";
import CategorieSignalementRowActions from "./categorie-signalement-row-actions";

export const categorieSignalementTableColumns: ColumnDef<ICategorieSignalement>[] = [
	{
		accessorKey: 'nom',
		header: 'Nom',
		cell: ({ row }) => (
			<span className="text-sm font-medium">
				{row.original.nom}
			</span>
		)
	},
	{
		accessorKey: 'description',
		header: 'Description',
		cell: ({ row }) => (
			<p className="text-sm text-gray-600 line-clamp-2 max-w-xs">
				{row.original.description || 'Aucune description'}
			</p>
		)
	},
	{
		accessorKey: 'validationObligatoire',
		header: 'Validation requise',
		cell: ({ row }) => (
			<div className="flex items-center gap-2">
				{row.original.validationObligatoire ? (
					<>
						<CheckCircle2 className="h-5 w-5 text-green-600" />
						<Badge className="bg-green-100 text-green-800">Oui</Badge>
					</>
				) : (
					<>
						<XCircle className="h-5 w-5 text-gray-400" />
						<Badge className="bg-gray-100 text-gray-800">Non</Badge>
					</>
				)}
			</div>
		)
	},
	{
		accessorKey: 'createdAt',
		header: 'Date de création',
		cell: ({ row }) => (
			<time className="text-sm">
				{row.original.createdAt ? formatDateTime(row.original.createdAt) : "N/A"}
			</time>
		)
	},
	{
		id: 'actions',
		header: 'Actions',
		cell: ({ row }) => <CategorieSignalementRowActions categorie={row.original} />
	}
];

