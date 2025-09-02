export type FileTab = {
	id: string;
	filePath: string;
	fileName: string;
	content: string;
	isActive: boolean;
	isDirty?: boolean;
};
