"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import {
  DocumentUpdateDTO,
  DocumentUpdateSchema,
} from "@/features/librairie/schema/document.schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Content from "@/components/primitives/Content";
import Title from "@/components/primitives/Title";
import Subtitle from "@/components/primitives/Subtitle";
import { Card, CardBody, Spinner } from "@heroui/react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { useDocumentQuery } from "@/features/librairie/queries/document-detail.query";
import { useModifierDocumentMutation } from "@/features/librairie/queries/document-update.mutation";

function ModifierDocumentPage() {
  const router = useRouter();
  const params = useParams();
  const id = (params?.id as string) ?? "";

  const { data: documentData, isLoading: isLoadingDocument, isError } =
    useDocumentQuery(id);

  const form = useForm<DocumentUpdateDTO>({
    resolver: zodResolver(DocumentUpdateSchema),
    defaultValues: {
      title: documentData?.title ?? "",
      description: documentData?.description ?? "",
      // covers et fichiers sont optionnels en update; on ne préremplit pas les File
    },
    values: documentData
      ? {
          title: documentData.title,
          description: documentData.description ?? "",
        }
      : undefined,
  });

  const { mutateAsync: modifierDocument, isPending: isUpdatingDocument } =
    useModifierDocumentMutation();

  const isLoading =
    isUpdatingDocument || form.formState.isSubmitting || isLoadingDocument;

  const onSubmit = async (data: DocumentUpdateDTO) => {
    await modifierDocument(
      {
        id,
        data,
      },
      {
        onSuccess: () => {
          router.push("/dashboard/librairie");
        },
      }
    );
  };

  if (!id) {
    return (
      <Content>
        <div className="py-10 text-center">Identifiant du document manquant.</div>
      </Content>
    );
  }

  if (isLoadingDocument) {
    return (
      <Content>
        <div className="flex items-center justify-center py-10">
          <Spinner label="Chargement du document..." />
        </div>
      </Content>
    );
  }

  if (isError || !documentData) {
    return (
      <Content>
        <div className="py-10 text-center text-danger-500">
          Impossible de charger le document.
        </div>
      </Content>
    );
  }

  return (
    <Content>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <Title>Modifier un document</Title>
            <Subtitle>Mettre à jour les informations du document</Subtitle>
          </div>
        </div>
      </div>

      {/* Formulaire */}
      <Card className="shadow-sm border-0">
        <CardBody className="p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Titre */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">Titre</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Entrez le titre du document..."
                        {...field}
                        className="text-lg h-12"
                      />
                    </FormControl>
                    <FormDescription>
                      Le titre principal du document (3-255 caractères)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Écrivez une description du document..."
                        {...field}
                        className="min-h-24 resize-none"
                      />
                    </FormControl>
                    <FormDescription>
                      Une description du document (10-500 caractères)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Covers (optionnel) */}
              <FormField
                control={form.control}
                name="covers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      Image de couverture
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          // En update, renseigner le File pour envoyer multipart
                          field.onChange(file as File);
                        }}
                        id="cover-input"
                      />
                    </FormControl>
                    <FormDescription>
                      Remplacez l'image de couverture (JPG, PNG, WebP)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Fichier du document (optionnel) */}
              <FormField
                control={form.control}
                name="fichiers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fichier</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept=".pdf,.epub"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          field.onChange(file as File);
                        }}
                        id="fichier-input"
                      />
                    </FormControl>
                    <FormDescription>
                      Remplacez le fichier du document (PDF ou EPUB)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Boutons d'action */}
              <div className="flex gap-4 pt-6 border-t">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Annuler
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading
                    ? "Modification en cours..."
                    : "Enregistrer les modifications"}
                </Button>
              </div>
            </form>
          </Form>
        </CardBody>
      </Card>
    </Content>
  );
}

export default ModifierDocumentPage;
