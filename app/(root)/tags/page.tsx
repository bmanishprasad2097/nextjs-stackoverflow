import TagCard from "@/components/cards/TagCard";
import Filter from "@/components/shared/Filter";
import NoResults from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { TagFilters } from "@/constants/filters";
import { images } from "@/constants/images";
import { getAllTags } from "@/database/actions/tag.action";
import { SearchParamsProps } from "@/types";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Tags | Dev Overflow",
};

export default async function TagsPage({ searchParams }: SearchParamsProps) {
  const result = await getAllTags({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Tags</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <Suspense>
          <LocalSearchbar
            placeholder="Search by tag name..."
            iconPosition="left"
            iconSrc={images.search}
            route="/tags"
            otherClasses="flex-1"
          />
        </Suspense>
        <Suspense>
          <Filter
            filters={TagFilters}
            otherClasses="min-h-[56px] sm:min-w-[170px]"
          />
        </Suspense>
      </div>

      <section className="mt-12 flex flex-wrap gap-4">
        {result.tags && result.tags.length > 0 ? (
          result.tags.map((tag) => (
            <TagCard key={tag._id} tag={JSON.parse(JSON.stringify(tag))} />
          ))
        ) : (
          <NoResults
            title="No tags yet 😢"
            description="¡Create a question to start interacting with the community!"
            link="/ask-question"
            linkTitle="Ask Question"
          />
        )}
      </section>
      <div className="mt-10">
        <Suspense>
          <Pagination
            pageNumber={searchParams.page ? +searchParams.page : 1}
            isNext={result.isNext || false}
          />
        </Suspense>
      </div>
    </>
  );
}
