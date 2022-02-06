import * as React from "react"

import { useStaticQuery, graphql } from "gatsby"
import { Helmet } from "react-helmet-async"

const SEO = ({ title, description, lang = "en" }) => {
  const { site } = useStaticQuery(graphql`
    query SeoQuery {
      site {
        siteMetadata {
          title
          description
          siteUrl
        }
      }
    }
  `)

  const metaDescription = description || site.siteMetadata.description
  const metaTitle = title || site.siteMetadata.title

  return (
    <>
      <Helmet
        title={metaTitle}
        htmlAttributes={{ lang }}
        titleTemplate={`%s · InterviewToast`}
        meta={[
          {
            property: `og:title`,
            content: `${metaTitle} · InterviewToast`,
          },
          {
            name: `description`,
            content: metaDescription,
          },
          {
            property: `og:description`,
            content: metaDescription,
          },
          {
            property: `og:image`,
            content: "https://interviewtoast.com/og-image.png",
          },
          {
            property: `og:type`,
            content: `website`,
          },
        ]}
      />
    </>
  )
}

export default SEO
