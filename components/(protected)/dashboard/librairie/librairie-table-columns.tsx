import {ColumnDef} from "@tanstack/react-table";
import {IDocument} from "@/features/librairie/types/document.types";
import Image from "next/image";
import Link from "next/link";
import {FileIcon} from "lucide-react";
import {formatDateTime} from "@/utils/date.utils";

export const librairieTableColumns: ColumnDef<IDocument>[] = [
	{
		accessorKey: 'coverImage',
		header: 'Couverture',
		cell: ({row}) => (
			<Image
				src={"https://admin.mec-ci.org"+row.original.coverImage || "/assets/fallback/book-fallback.png"}
				alt={row.original.title}
				width={60}
				height={60}
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
			<Link href={`${row.original.fileUrl}`}>
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
]