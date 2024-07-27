"use client";
import React, { FC } from "react";
import { DetailScoreComponent } from "@/components/DetailScore";
import { ScoreComponentCard } from "@/components/ScoreCard";
import { BarChartCard } from "@/components/BarChartCard";

export interface FeedbackDetails {
  score: number;
  strengths: string[];
  areas_for_improvement: string[];
  suggestions: string[];
}

interface Feedback {
  content: FeedbackDetails;
  format: FeedbackDetails;
  additionals: FeedbackDetails;
}

export interface IResumeResult {
  score: number;
  feedback: Feedback;
}

const ResultPresentation: FC<{ resumeResult: IResumeResult }> = ({
  resumeResult,
}) => {
  const { feedback } = resumeResult;
  const { content, format, additionals } = feedback;
  return (
    <main className="w-full flex flex-col gap-4 bg-black p-6 sm:p-8">
      {/* score cards*/}
      <section className="flex flex-col gap-4 pt-5 sm:flex-row sm:justify-center sm:w-full">
        <ScoreComponentCard score={resumeResult.score} />
        <BarChartCard
          contentScore={content.score}
          formatScore={format.score}
          additionalsScore={additionals.score}
        />
      </section>

      {/* detail section */}
      <section className="mb-24 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <DetailScoreComponent feedbackName="Content" feedback={content} />
        <DetailScoreComponent feedbackName="Format" feedback={format} />
        <DetailScoreComponent
          feedbackName="Additionals"
          feedback={additionals}
        />
      </section>
    </main>
  );
};

export default ResultPresentation;
