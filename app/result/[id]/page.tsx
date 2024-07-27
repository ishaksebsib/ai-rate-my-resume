"use server";
import React, { FC } from "react";
import ResultPresentation from "./_components/ResultPresentation";
import axios from "axios";
import { CONSTANT } from "@/constant";
import { notFound } from "next/navigation";

const ResultContainer: FC<{ params: { id: string } }> = async ({ params }) => {
  const resumeResult = await getResults(params.id);

  if (!resumeResult) {
    return notFound();
  }
  return <ResultPresentation resumeResult={resumeResult} />;
};

export default ResultContainer;

const getResults = async (id: string) => {
  try {
    //console.log(CONSTANT.URLS.getResumeResult + `/${id}`);
    const response = await axios.get(CONSTANT.URLS.getResumeResult + `/${id}`);
    return response.data;
  } catch (error) {
    //console.error(error);
    return null;
  }
};
