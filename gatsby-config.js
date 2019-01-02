module.exports = {
  siteMetadata: {
    title: "gopher.rocks",
    subtitle: "Learn Go Online",
    description:
      "Gopher.rocks is home to free online courses to help you learn the Go programming language.",
    keywords: [
      "learn golang",
      "golang video course",
      "free go videos",
      "learn go online"
    ]
  },
  //pathPrefix: "/my-repo-name", // if you're using GitHub Pages, put the name of the repo here with a leading slash
  plugins: [
    `gatsby-plugin-netlify-identity-widget`,
    `gatsby-plugin-netlify`,
    `gatsby-plugin-layout`,
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/app/*`] },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/courses`,
        name: "markdown-pages"
      }
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-prismjs`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              linkImagesToOriginal: true,
              sizeByPixelDensity: false
            }
          }
        ]
      }
    }
  ]
};
