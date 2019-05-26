require(`dotenv`).config({ path: `.env` });

module.exports = {
  siteMetadata: {
    author: `Anjana Iyer`,
    description: "",
    keywords: [
      "illustrator",
      "illustration",
      "motion design",
      "design",
      "auckland",
      "new zealand",
      "nz"
    ],
    lang: "en",
    meta: [],
    title: `Anjana Iyer - Illustrator - Motion Designer - Auckland, NZ`
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-tslint`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN
      }
    }
  ]
};
