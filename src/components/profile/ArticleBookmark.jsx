import React from "react";
import ArticleBookmarks from "../articlebookmark/ArticleBookmarks";
import { useGetOnlyArticleQuery } from "@/redux/Api/article";
import Loading from "../Loading";
import { NoData } from "../NoData"; // Import the NoData component

const ArticleBookmark = () => {
  const { data, isLoading, error } = useGetOnlyArticleQuery();

  if (isLoading) {
    return (
      <p className="h-screen">
        <Loading />
      </p>
    );
  }

  if (error) {
    return <div>Error loading articles: {error.message}</div>;
  }

  // Filter articles with isBookmark true
  const articlesBookmark = (data?.data?.result || []).filter(
    (article) => article.isBookmark === true
  );

  return (
    <div>
      <div className="max-w-[1400px] m-auto mb-20">
        {articlesBookmark.length > 0 ? (
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
            {articlesBookmark.map((article) => (
              <div key={article.id}>
                <ArticleBookmarks videose={article} />
              </div>
            ))}
          </div>
        ) : (
          <NoData /> 
        )}
      </div>
    </div>
  );
};

export default ArticleBookmark;
