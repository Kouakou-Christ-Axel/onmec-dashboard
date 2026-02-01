import {ColumnDef} from "@tanstack/react-table";
import {ICategorieSignalement} from "@/features/signalements";
import Link from "next/link";
import {Loader2, MoreHorizontal, CheckCircle2, XCircle} from "lucide-react";
import {formatDateTime} from "@/utils/date.utils";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {supprimerCategorieAction} from "@/features/signalements";
import {useState} from "react";

export const categorieSignalementTableColumns: ColumnDef<ICategorieSignalement>[] = [
	{
		accessorKey: 'nom',
		header: 'Nom',
		cell: ({row}) => (
			<span className="text-sm font-medium">
				{row.original.nom}
			</span>
		)
	},
	{
		accessorKey: 'description',
		header: 'Description',
		cell: ({row}) => (
			<p className="text-sm text-gray-600 line-clamp-2 max-w-xs">
				{row.original.description || 'Aucune description'}
			</p>
		)
	},
	{
		accessorKey: 'validationObligatoire',
		header: 'Validation requise',
		cell: ({row}) => (
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
		cell: ({row}) => (
			<time className="text-sm">
				{formatDateTime(row.original.createdAt)}
			</time>
		)
	},
	{
		id: 'actions',
		header: 'Actions',
		cell: ({row}) => {
			const [isPending, setIsPending] = useState(false);

			const handleSupprimer = async () => {
				// Confirmation utilisateur avant suppression
				const confirmed = typeof window !== 'undefined'
					? window.confirm(`Voulez-vous vraiment supprimer la catégorie « ${row.original.nom} » ?`)
					: true;

				if (!confirmed) return;

				setIsPending(true);
				try {
					await supprimerCategorieAction(row.original.id);
				} catch (error) {
					console.error('Erreur lors de la suppression:', error);
				} finally {
					setIsPending(false);
				}
			};

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Ouvrir le menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuGroup>
							<DropdownMenuItem asChild>
								<Link
									href={`/dashboard/categories-signalement/${row.original.id}/modifier`}
									className="w-full cursor-pointer"
								>
									Modifier
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem
								disabled={isPending}
								onClick={handleSupprimer}
								className="text-red-600 focus:text-red-600 cursor-pointer"
							>
								<Loader2
									className={`mr-2 h-4 w-4 ${isPending ? 'animate-spin' : 'hidden'}`}
								/>
								<span>Supprimer</span>
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		}
	}
];

