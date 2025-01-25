import baseApi from "./baseApi";


const email = baseApi.injectEndpoints({
  endpoints: (builder) => ({


    postContuct: builder.mutation({
        query: (data) => {
          return {
            url: "/contact-us",
            method: "POST",
            body: data,
          };
        },
      }),


  }),
});

export const {
 
usePostContuctMutation
  
} = email;
