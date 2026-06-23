"use client";
import React, { useState } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import { IActualite } from "@/features/actualites/types/actualite.type";
import { useRouter } from "@/i18n/navigation";
import Image from "next/image";
import { Pencil, Trash } from "lucide-react";
import ConfirmDialog from "@/components/common/confirm-dialog";
import { useSupprimerActualiteMutation } from "@/features/actualites/queries/actualite-delete.mutation";

function ActualiteCard({actualite}: { actualite: IActualite }) {
	const router = useRouter();
	const fallbackImg = "/assets/images/fallback.png";
	const imageSrc = actualite.imageUrl || fallbackImg;
	const formattedDate = new Date(actualite.date).toLocaleDateString();

	const [isConfirmOpen, setConfirmOpen] = useState(false);
	const { mutateAsync: supprimer, isPending: isDeleting } =
		useSupprimerActualiteMutation();

	const handleDelete = async () => {
		await supprimer(
			{ id: actualite.id },
			{ onSuccess: () => setConfirmOpen(false) }
		);
	};

	return (
		<Card className="h-full flex flex-col">
			<CardBody className="overflow-visible p-0">
				<Image
					alt={actualite.title}
					className="object-cover rounded-t-lg w-full"
					src={imageSrc}
					width={400}
					height={200}
					unoptimized
				/>
			</CardBody>
			<CardHeader className="flex-1 flex-col items-start gap-2 px-4 py-3">
				<small className="text-tiny uppercase font-bold">{formattedDate}</small>
				<h4 className="font-bold text-large line-clamp-2">{actualite.title}</h4>
				<p className="text-default-500 line-clamp-3 text-sm">{actualite.excerpt}</p>
			</CardHeader>
			<CardFooter className="mt-auto justify-end gap-2 px-4 pb-4 pt-0">
				<Button
					size="sm"
					variant="flat"
					startContent={<Pencil className="w-4 h-4" />}
					onPress={() =>
						router.push(`/dashboard/actualites/${actualite.id}/modifier`)
					}
				>
					Éditer
				</Button>
				<Button
					size="sm"
					variant="flat"
					color="danger"
					startContent={<Trash className="w-4 h-4" />}
					onPress={() => setConfirmOpen(true)}
				>
					Supprimer
				</Button>
			</CardFooter>

			<ConfirmDialog
				isOpen={isConfirmOpen}
				onClose={() => setConfirmOpen(false)}
				onConfirm={handleDelete}
				title="Supprimer l'actualité"
				alertMessage="Cette action est irréversible."
				description={
					<>
						Voulez-vous vraiment supprimer l&apos;actualité{" "}
						<strong>{actualite.title}</strong> ?
					</>
				}
				confirmLabel="Supprimer"
				confirmColor="danger"
				isLoading={isDeleting}
			/>
		</Card>
	);
}

export default ActualiteCard;
