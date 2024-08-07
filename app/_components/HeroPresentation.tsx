import React, { ChangeEvent, DragEvent, FC, useEffect, useState } from "react";
import Image from "next/image";
import resumeIlustration from "../../public/ilu/resume.svg";
import { UploadStatus } from "./HeroContainer";
import toast from "react-hot-toast";
import LoadingSpinner from "@/components/LoadingSpinner";

interface IHeroPresentationProps {
  uploadFile: (file: File) => void;
  uploadStatus: UploadStatus;
}
const HeroPresentation: FC<IHeroPresentationProps> = ({
  uploadFile,
  uploadStatus,
}) => {
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
    const file = e.target.files ? e.target.files[0] : null;
    // clear the input value to allow uploading the same file again
    e.target.value = "";

    // upload the file
    if (file) {
      uploadFile(file);
    }
  };

  return (
    <main className="w-screen flex justify-center h-[100vh] bg-background bg-[linear-gradient(to_bottom,#000,#200D42_34%,#4F21A1_65%,#A46EDB_98%)]">
      {/* hero section */}
      <section className="w-full flex items-center justify-between h-[100vh]  bg-dnark p-2 sm:max-w-[90%] md:p-8">
        {/* text container */}
        <div className="text-foreground w-full flex flex-col items-center gap-4 sm:gap-7 xl:items-start">
          <div className="scroll-m-20  font-extrabold tracking-tight text-4xl text-center sm:text-5xl md:text-6xl lg:text-7xl lg:w-full xl:text-start">
            <h1>Transform Your Resume</h1>
            <h1 className="pt-2">Transform Your Career</h1>
          </div>
          <p className="text-darkwhite font-light p-4 text-sm w-full text-center sm:text-xl sm:pl-4 md:text-2xl lg:max-w-3xl xl:text-start">
            Get expert feedback and tailored recommendations to elevate your
            resume and land your dream job.
          </p>

          {/* file upload button container and upload status */}
          <div className="w-full h-full  md:w-3/4 md:h-1/4 md:pl-4">
            <label
              className="flex flex-col items-center justify-center h-44 w-full xl:w-3/4  border-2 border-dashed rounded-lg cursor-pointer"
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  {" "}
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />{" "}
                </svg>
                <p className="mb-2 text-sm text-white dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span>
                  <span className="hidden sm:block">or drag and drop</span>{" "}
                </p>
                <p className="text-xs text-gray-200 dark:text-gray-400">
                  PDF or DOCX (MAX SIZE. 2MB)
                </p>
              </div>
              <input
                disabled={uploadStatus === UploadStatus.UPLOADING}
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={handleChange}
              />
            </label>
          </div>
        </div>

        {/* image container */}
        <div className="hidden xl:flex xl:justify-center xl:items-center xl:w-[35%]">
          <Image
            src={resumeIlustration}
            alt="reusme ilustration"
            className=""
          />
        </div>
      </section>
    </main>
  );
};

export default HeroPresentation;
