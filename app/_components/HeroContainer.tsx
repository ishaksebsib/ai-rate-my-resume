"use client";
import React, { useState } from "react";
import HeroPresentation from "./HeroPresentation";
import axios from "axios";
import { CONSTANT } from "@/constant";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export enum UploadStatus {
  INITIAL = "INITIAL",
  UPLOADING = "UPLOADING",
  UPLOADED = "UPLOADED",
  ERROR = "ERROR",
}

const HeroContainer = () => {
  const router = useRouter();
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>(
    UploadStatus.INITIAL,
  );

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    // Validate file type
    const validFileTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!validFileTypes.includes(file.type)) {
      toast.error("Invalid file type. Please upload a PDF or DOCX file.");
      return;
    }

    // Upload file
    try {
      //console.log("uploading file");
      setUploadStatus(UploadStatus.UPLOADING);
      const response = await axios.post(CONSTANT.URLS.uploadResume, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      //console.log("File uploaded successfully:", response.data);
      setUploadStatus(UploadStatus.UPLOADED);
      router.push("/result/" + response.data.result_id);
    } catch (error) {
      //console.error("Error uploading file:", error);
      setUploadStatus(UploadStatus.ERROR);
    }
  };

  return (
    <HeroPresentation uploadFile={uploadFile} uploadStatus={uploadStatus} />
  );
};
export default HeroContainer;
