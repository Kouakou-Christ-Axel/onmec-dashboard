"use client";
import React, {useEffect} from 'react';
import {useEditor, EditorContent} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {Card, CardContent} from "@/components/ui/card";
import {
	Bold,
	Italic,
	Heading2,
	List,
	ListOrdered,
	Quote,
	Code,
	Undo2,
	Redo2,
} from 'lucide-react';
import {Button} from "@/components/ui/button";

interface TiptapEditorProps {
	value?: string;
	onChange?: (content: string) => void;
	disabled?: boolean;
}

function TiptapEditor({value = '', onChange, disabled = false}: TiptapEditorProps) {
	const editor = useEditor({
		extensions: [
			StarterKit,
		],
		content: value,
		onUpdate: ({editor}) => {
			onChange?.(editor.getHTML());
		},
		editorProps: {
			attributes: {
				class: 'prose prose-sm dark:prose-invert max-w-none focus:outline-none min-h-96 p-4',
			},
		},
		immediatelyRender: false
	});

	useEffect(() => {
		if (!editor) return;
		const current = editor.getHTML();
		const next = value || '';
		if (current !== next) {
			editor.commands.setContent(next);
		}
	}, [editor, value]);

	if (!editor) return null;

	const ToolButton = ({
		                    icon: Icon,
		                    onClick,
		                    isActive,
		                    title
	                    }: {
		icon: React.ReactNode;
		onClick: () => void;
		isActive: boolean;
		title: string;
	}) => (
		<Button
			type={'button'}
			onClick={onClick}
			disabled={disabled}
			title={title}
			variant={'ghost'}
		>
			{Icon}
		</Button>
	);

	return (
		<Card className="p-0.5">
			<CardContent className="p-0 py-0">
				{/* Toolbar */}
				<div className="flex flex-wrap gap-1 p-3 border-b bg-gray-50 dark:bg-gray-900 rounded-t-lg">
					<div className="flex gap-1">
						<ToolButton
							icon={<Bold className="w-4 h-4"/>}
							onClick={() => editor.chain().focus().toggleBold().run()}
							isActive={editor.isActive('bold')}
							title="Gras"
						/>
						<ToolButton
							icon={<Italic className="w-4 h-4"/>}
							onClick={() => editor.chain().focus().toggleItalic().run()}
							isActive={editor.isActive('italic')}
							title="Italique"
						/>
					</div>

					<div className="w-px bg-gray-300 dark:bg-gray-700"/>

					<div className="flex gap-1">
						<ToolButton
							icon={<Heading2 className="w-4 h-4"/>}
							onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
							isActive={editor.isActive('heading', {level: 2})}
							title="Titre H2"
						/>
						<ToolButton
							icon={<Quote className="w-4 h-4"/>}
							onClick={() => editor.chain().focus().toggleBlockquote().run()}
							isActive={editor.isActive('blockquote')}
							title="Citation"
						/>
					</div>

					<div className="w-px bg-gray-300 dark:bg-gray-700"/>

					<div className="flex gap-1">
						<ToolButton
							icon={<List className="w-4 h-4"/>}
							onClick={() => editor.chain().focus().toggleBulletList().run()}
							isActive={editor.isActive('bulletList')}
							title="Liste à puces"
						/>
						<ToolButton
							icon={<ListOrdered className="w-4 h-4"/>}
							onClick={() => editor.chain().focus().toggleOrderedList().run()}
							isActive={editor.isActive('orderedList')}
							title="Liste numérotée"
						/>
						<ToolButton
							icon={<Code className="w-4 h-4"/>}
							onClick={() => editor.chain().focus().toggleCodeBlock().run()}
							isActive={editor.isActive('codeBlock')}
							title="Bloc de code"
						/>
					</div>

					<div className="w-px bg-gray-300 dark:bg-gray-700"/>

					<div className="flex gap-1">
						<ToolButton
							icon={<Undo2 className="w-4 h-4"/>}
							onClick={() => editor.chain().focus().undo().run()}
							isActive={false}
							title="Annuler"
						/>
						<ToolButton
							icon={<Redo2 className="w-4 h-4"/>}
							onClick={() => editor.chain().focus().redo().run()}
							isActive={false}
							title="Refaire"
						/>
					</div>
				</div>

				{/* Editor */}
				<div className="bg-white dark:bg-gray-950 rounded-b-lg">
					<EditorContent
						editor={editor}
						className="w-full"
					/>
				</div>
			</CardContent>
		</Card>
	);
}

export default TiptapEditor;