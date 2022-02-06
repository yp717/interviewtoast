require("dotenv").config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    title: `interviewToast`,
    siteUrl: `https://www.interviewtoast.com`,
    author: `Yannis Panagis & Sam Larsen Disney`,
    description: `Your new favourite interview preparation, assessment and feedback tool`,
  },
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet-async`,
    `gatsby-plugin-gatsby-cloud`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "InterviewToast",
        short_name: "InterviewToast",
        start_url: "/",
        background_color: "#FB923D",
        theme_color: "#FB923D",
        display: "standalone",
        icon: `src/images/favicon.png`,
      },
    },
  ],
}
