import React, { FC } from "react";

interface FeedbackDetails {
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
  return (
    <main>
      <section>
        <h1>Result</h1>
        <p>Result ID: id</p>
        <p>Score: {resumeResult.score}</p>
      </section>
    </main>
  );
};

export default ResultPresentation;
