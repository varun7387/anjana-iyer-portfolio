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
    title: `Anjana Iyer - Illustrator - Motion Designer - Auckland, NZ`,
    siteUrl: `https://www.anjanaiyer.co.nz`
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-tslint`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-netlify`,
    `gatsby-plugin-robots-txt`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN
      }
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-image`
  ]
};
