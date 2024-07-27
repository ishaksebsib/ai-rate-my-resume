import Image from "next/image";
import resumeIlustration from "../public/ilu/resume.svg";
export default function Home() {
  return (
    <main className="w-screen flex justify-center h-[100vh] bg-background bg-[linear-gradient(to_bottom,#000,#200D42_34%,#4F21A1_65%,#A46EDB_98%)]">
      {/* hero section */}
      <section className="w-full p-8 flex items-center justify-between h-[95vh] max-w-[90%] bg-dnark">
        {/* text container */}
        <div className="text-foreground w-full flex flex-col gap-7">
          <div className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-7xl">
            <h1>Transform Your Resume</h1>
            <h1 className="pt-2">Transform Your Caree</h1>
          </div>
          <p className="text-2xl pl-4 w-3/4 text-darkwhite font-light">
            Get expert feedback and tailored recommendations to elevate your
            resume and land your dream job.
          </p>

          {/* file upload button container */}
          <div className="w-2/4 h-1/4 pl-4">
            <label className="flex flex-col items-center justify-center w-3/4 h-44 border-2 border-dashed rounded-lg cursor-pointer">
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
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>
        </div>

        {/* image container */}
        <div className="w-auto flex justify-center items-center ">
          <Image
            src={resumeIlustration}
            alt="reusme ilustration"
            className=""
          />
        </div>
      </section>
    </main>
  );
}
