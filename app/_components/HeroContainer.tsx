"use client";
import React, { ChangeEvent, DragEvent, useState } from "react";
import HeroPresentation from "./HeroPresentation";

const HeroContainer = () => {
	const [_dragActive, setDragActive] = useState(false);

	const handleDrag = (e: DragEvent<HTMLLabelElement>): void => {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === "dragenter" || e.type === "dragover") {
			setDragActive(true);
		} else if (e.type === "dragleave") {
			setDragActive(false);
		}
	};

	const handleDrop = (e: DragEvent<HTMLLabelElement>): void => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);
		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			uploadFile(e.dataTransfer.files[0]);
		}
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
		if (e.target.files && e.target.files[0]) {
			uploadFile(e.target.files[0]);
		}
	};

	const uploadFile = async (file: File) => {
		const formData = new FormData();
		formData.append("file", file);

		try {
			const response = await fetch("/api/upload", {
				method: "POST",
				body: formData,
			});

			if (!response.ok) {
				throw new Error("Failed to upload file");
			}

			const data = await response.json();
			console.log("File uploaded successfully:", data);
		} catch (error) {
			console.error("Error uploading file:", error);
		}
	};
	return (
		<HeroPresentation
			handleDrag={handleDrag}
			handleDrop={handleDrop}
			handleChange={handleChange}
		/>
	);
};
export default HeroContainer;
