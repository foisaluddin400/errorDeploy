import baseApi from "./baseApi";


const article = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getArticle: builder.query({
      query: ({searchTerm}) => {
        return {
          url: `/article/get-all-article?searchTerm=${searchTerm}`,
          method: "GET",
        };
      },
      providesTags: ["videos"],
    }),
   
    getOnlyArticle: builder.query({
      query: () => {
        return {
          url: `/article/get-all-article`,
          method: "GET",
        };
      },
      providesTags: ["videos"],
    }),
   

    getSingleArticle: builder.query({
      query: ({ id }) => {
        return {
          url: `/article/single-article/${id}`,
          method: "GET",
        };
      },
      providesTags: ["videos"],
    }),


    bookmarkArticle: builder.mutation({
      query: (id, data) => {
        return {
          url: `/bookmark/add-delete-article-bookmark/${id}`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["videos"],
    }),

    getShortArtiles: builder.query({
      query: ({ category }) => {
        console.log(category)
        return {
          url: `/article/get-all-article?category=${category}`,
          method: "GET",
        };
      },
      providesTags: ["videos"],
    }),


  }),
});

export const {
 
  useGetArticleQuery,
  useGetSingleArticleQuery,
  useBookmarkArticleMutation,
  useGetOnlyArticleQuery,
  useGetShortArtilesQuery
  
} = article;
