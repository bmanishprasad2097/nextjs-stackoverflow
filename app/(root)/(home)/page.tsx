
import Link from "next/link";
import { Button } from "@/components/ui/button"
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import NoResult from "@/components/shared/NoResult";
import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import QuestionCard from "@/components/cards/QuestionCard";
import { Suspense } from "react";
import { getQuestions } from "@/database/actions/question.action";
import { SearchParamsProps } from "@/types";
import { images } from "@/constants/images";
import { HomePagefilter } from "@/constants/filters";
import Pagination from "@/components/shared/Pagination";

interface QuestionProps {
  _id: string;
  title: string;
  tags: {
    _id: string;
    name: string;
  }[];
  author: {
    _id: string;
    name: string;
    picture: string;
    clerkId: string;
  };
  upvotes: string[];
  views: number;
  answers: Array<object>;
  createdAt: string;
  clerkId?: string | null;
}

export default async function Home({ searchParams }: SearchParamsProps) {

  let result = await getQuestions({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });

  console.log(result, 'hola')
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <Suspense>
          <LocalSearchbar
            placeholder="Search questions"
            iconPosition="left"
            iconSrc={images.search}
            route="/"
          />
        </Suspense>
        <Filter
          filters={HomePagefilter}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilters/>

      <div className="mt-10 flex w-full flex-col gap-6">
        {result.questions && result.questions.length > 0 ? (
          result.questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There’s no question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion."
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
      <div className="mb-4 mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          // @ts-ignore
          isNext={result?.isNext}
        />
      </div>
    </>
  );
}
