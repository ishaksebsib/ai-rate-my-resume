"use client";
import React, { FC } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label, Pie, PieChart } from "recharts";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface FeedbackDetails {
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
      {/* score, content, format and addtionals section */}
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

export function ScoreComponentCard({ score }: { score: number }) {
  const chartData = [
    { browser: "left", score: 100 - score, fill: "var(--color-outof)" },
    { browser: "score", score: score, fill: "var(--color-score)" },
  ];

  const chartConfig = {
    outof: {
      label: "out of 100%",
      color: "hsl(var(--chart-2))",
    },

    score: {
      label: "Score",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="sm:w-[80%] bg-transparent text-foreground ">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-2xl">Resume Score </CardTitle>
        <CardDescription className="flex-col gap-2 text-sm">
          You scored {chartData[1].score} out of 100%
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="score"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
												className="text-foreground"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="text-4xl font-bold"
													fill="white"
                        >
                          {chartData[1].score}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Score
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function BarChartCard({
  contentScore,
  formatScore,
  additionalsScore,
}: {
  contentScore: number;
  formatScore: number;
  additionalsScore: number;
}) {
  const chartData = [
    { type: "Content", score: contentScore },
    { type: "Format", score: formatScore },
    { type: "Additionals", score: additionalsScore },
  ];
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;
  return (
    <Card className="sm:w-[80%] md:w-[50%] bg-transparent text-foreground">
      <CardHeader>
        <CardTitle>Bar Chart - Horizontal</CardTitle>
        <CardDescription>
          Score for Content, Format and Additionals
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: -20,
            }}
          >
            <XAxis type="number" dataKey="score" hide />
            <YAxis
              dataKey="type"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="score" fill="var(--color-desktop)" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function DetailScoreComponent({
  feedbackName,
  feedback,
}: {
  feedbackName: string;
  feedback: FeedbackDetails;
}) {
  return (
    <section className="bg-backgorund p-4 border rounded-lg text-foreground">
      <h1 className="font-bold pt-8 pb-4 pl-1">{feedbackName}</h1>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="pl-1">Strengths</AccordionTrigger>
          {feedback.strengths.map((strength, index) => (
            <AccordionContent className="pl-2" key={index}>
              {strength}
            </AccordionContent>
          ))}
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="pl-1">
            Areas for improvement
          </AccordionTrigger>
          {feedback.areas_for_improvement.map((area, index) => (
            <AccordionContent className="pl-2" key={index}>
              {area}
            </AccordionContent>
          ))}
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="pl-2">Suggestions</AccordionTrigger>
          {feedback.suggestions.map((suggestion, index) => (
            <AccordionContent className="pl-2" key={index}>
              {suggestion}
            </AccordionContent>
          ))}
        </AccordionItem>
      </Accordion>
    </section>
  );
}
