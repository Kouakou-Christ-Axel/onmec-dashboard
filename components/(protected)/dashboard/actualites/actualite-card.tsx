"use client";
import React from 'react';
import {Card, CardBody, CardHeader} from "@heroui/react";
import {IActualite} from "@/features/actualites/types/actualite.type";
import {useRouter} from "@/i18n/navigation";
import Image from "next/image";

function ActualiteCard({actualite}: { actualite: IActualite }) {
	const router = useRouter();
	const fallbackImg = "/assets/images/fallback.png";
	const imageSrc = actualite.imageUrl || fallbackImg;
	const formattedDate = new Date(actualite.date).toLocaleDateString();

	return (
		<Card
			className="h-full flex flex-col"
			isPressable
			onPress={() => router.push(`/dashboard/actualites/${actualite.id}/modifier`)}
		>
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
			<CardHeader className="flex-col items-start gap-2 px-4 py-3">
				<small className="text-tiny uppercase font-bold">{formattedDate}</small>
				<h4 className="font-bold text-large line-clamp-2">{actualite.title}</h4>
				<p className="text-default-500 line-clamp-3 text-sm">{actualite.excerpt}</p>
			</CardHeader>
		</Card>
	);
}

export default ActualiteCard;
