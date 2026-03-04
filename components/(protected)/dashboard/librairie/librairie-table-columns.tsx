import {ColumnDef} from "@tanstack/react-table";
import {IDocument} from "@/features/librairie/types/document.types";
import Image from "next/image";
import Link from "next/link";
import {FileIcon, Loader2, MoreHorizontal} from "lucide-react";
import {formatDateTime} from "@/utils/date.utils";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup, DropdownMenuItem,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {useSupprimerDocumentMutation} from "@/features/librairie/queries/document-delete.mutation";

export const librairieTableColumns: ColumnDef<IDocument>[] = [
	{
		accessorKey: 'coverImage',
		header: 'Couverture',
		cell: ({row}) => (
			<Image
				src={row.original.coverImage || "/assets/fallback/book-fallback.png"}
				alt={row.original.title}
				width={60}
				height={60}
				unoptimized
			/>
		)
	},
	{
		accessorKey: 'title',
		header: 'Titre',
		cell: ({row}) => (
			<span title={row.original.title} className="text-medium">{row.original.title}</span>
		)
	},
	{
		accessorKey: 'description',
		cell: ({row}) => (
			<p className="truncate text-sm text-wrap line-clamp-2">{row.original.description}</p>
		)
	},
	{
		accessorKey: 'fileUrl',
		header: 'Fichier',
		cell: ({row}) => (
			<Link href={`${row.original.fileUrl}`} className="text-blue-500">
				<FileIcon/>
			</Link>
		)
	},
	{
		accessorKey: 'fileType',
		header: 'Type de fichier',
		cell: ({row}) => (
			<span className="text-medium">{row.original.fileType}</span>
		)
	},
	{
		accessorKey: 'uploadedAt',
		header: 'Mis en ligne',
		cell: ({row}) => (
			<time>
				{formatDateTime(row.original.uploadedAt)}
			</time>
		)
	},
	{
		id: 'actions',
		header: 'Actions',
		cell: ({row}) => {
			const {
				mutate: supprimerDocument,
				isPending
			} = useSupprimerDocumentMutation();

			const handleSupprimer = () => {
				// Confirmation utilisateur avant suppression
				const confirmed = typeof window !== 'undefined'
					? window.confirm(`Voulez-vous vraiment supprimer le document « ${row.original.title} » ?`)
					: true;
				if (!confirmed) return;
				supprimerDocument({id: row.original.id});
			}
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Ouvrir le menu</span>
							<MoreHorizontal/>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuGroup>
							<DropdownMenuItem asChild>
								<Link href={`/dashboard/librairie/${row.original.id}/modifier`} className="w-full">
									Modifier
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem
								disabled={isPending}
								onClick={handleSupprimer}
								variant="destructive"
							>
								<Loader2
									className={`mr-2 h-4 w-4 animate-spin ${isPending ? 'inline-block' : 'hidden'}`}
								/>
								<span>Supprimer</span>
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		}
	}
]