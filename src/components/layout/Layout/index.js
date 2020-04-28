import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Helmet from 'react-helmet'

import TopBar from '../TopBar'
import Header from '../Header'
import HeaderSponsors from '../HeaderSponsors'
import Sponsors from '../../entities/Sponsors'
import Footer from '../Footer'
import FooterCopywrite from '../FooterCopywrite'

import './style.scss'

const Layout = props => {
  return (
    <StaticQuery
      query={graphql`
        query LayoutQuery {
          site {
            siteMetadata {
              title
            }
          }
          headerSponsors: allNodeSponsors(
            filter: {
              field_sponsor_level: { eq: "diamond" }
              relationships: {
                field_tags: { elemMatch: { name: { eq: "2020" } } }
              }
            }
            sort: { fields: [title], order: ASC }
          ) {
            edges {
              node {
                title
                path {
                  alias
                }
                link: field_sponsor_link {
                  uri
                }
                body {
                  processed
                }
                r: relationships {
                  logo: field_sponsor_logo {
                    localFile {
                      cis: childImageSharp {
                        fluid(maxWidth: 350) {
                          ...GatsbyImageSharpFluid
                        }
                      }
                    }
                  }
                }
              }
            }
          }

          diamondSponsors: allNodeSponsors(
            filter: {
              field_sponsor_level: { eq: "diamond" }
              relationships: {
                field_tags: { elemMatch: { name: { eq: "2020" } } }
              }
            }
            sort: { fields: [title], order: ASC }
          ) {
            edges {
              node {
                title
                field_sponsor_level
                body {
                  processed
                }
                path {
                  alias
                }
                link: field_sponsor_link {
                  uri
                }
                relationships {
                  field_sponsor_logo {
                    localFile {
                      childImageSharp {
                        sizes(maxWidth: 250) {
                          src
                        }
                      }
                    }
                  }
                }
              }
            }
          }

          goldSponsors: allNodeSponsors(
            filter: {
              field_sponsor_level: { eq: "gold" }
              relationships: {
                field_tags: { elemMatch: { name: { eq: "2020" } } }
              }
            }
            sort: { fields: [title], order: ASC }
          ) {
            edges {
              node {
                title
                body {
                  processed
                }
                path {
                  alias
                }
                field_sponsor_level
                link: field_sponsor_link {
                  uri
                }
                relationships {
                  field_sponsor_logo {
                    localFile {
                      childImageSharp {
                        sizes(maxWidth: 200) {
                          src
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          silverSponsors: allNodeSponsors(
            filter: {
              field_sponsor_level: { eq: "silver" }
              relationships: {
                field_tags: { elemMatch: { name: { eq: "2020" } } }
              }
            }
            sort: { fields: [title], order: ASC }
          ) {
            edges {
              node {
                title
                body {
                  processed
                }
                path {
                  alias
                }
                field_sponsor_level
                link: field_sponsor_link {
                  uri
                }
                relationships {
                  field_sponsor_logo {
                    localFile {
                      childImageSharp {
                        sizes(maxWidth: 150) {
                          src
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          bronzeSponsors: allNodeSponsors(
            filter: {
              field_sponsor_level: { eq: "bronze" }
              relationships: {
                field_tags: { elemMatch: { name: { eq: "2020" } } }
              }
            }
            sort: { fields: [title], order: ASC }
          ) {
            edges {
              node {
                title
                field_sponsor_level
                link: field_sponsor_link {
                  uri
                }
                relationships {
                  field_sponsor_logo {
                    localFile {
                      childImageSharp {
                        sizes(maxWidth: 100) {
                          src
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          mediaSponsors: allNodeSponsors(
            filter: {
              field_sponsor_level: { eq: "media" }
              relationships: {
                field_tags: { elemMatch: { name: { eq: "2020" } } }
              }
            }
            sort: { fields: [title], order: ASC }
          ) {
            edges {
              node {
                title
                field_sponsor_level
                link: field_sponsor_link {
                  uri
                }
                relationships {
                  field_sponsor_logo {
                    localFile {
                      childImageSharp {
                        sizes(maxWidth: 150) {
                          src
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `}
      render={data => {
        return (
          <div>
            <Helmet>
              <title>{data.site.siteMetadata.title}</title>
              <meta name="description" content="Decoupled Days" />
              <meta
                name="keywords"
                content="decoupled, conferences, javascript, jamstack"
              />
              <link
                rel="shortcut icon"
                href="/favicon.ico"
                type="image/x-icon"
              />
              <link rel="icon" href="/favicon.ico" type="image/x-icon" />
            </Helmet>
            <TopBar />
            <Header />
            {data.headerSponsors.edges.length > 0 && (
              <HeaderSponsors sponsors={data.headerSponsors.edges} />
            )}
            <section className="wrapper">{props.children}</section>
            <section className="footer-sponsors">
              <div className="wrapper">
                {data.diamondSponsors.edges.length > 0 && (
                  <Sponsors
                    level="Diamond"
                    sponsors={data.diamondSponsors.edges}
                  />
                )}
                {data.goldSponsors.edges.length > 0 && (
                  <Sponsors level="Gold" sponsors={data.goldSponsors.edges} />
                )}
                {data.silverSponsors.edges.length > 0 && (
                  <Sponsors
                    level="Silver"
                    sponsors={data.silverSponsors.edges}
                  />
                )}
                {data.bronzeSponsors.edges.length > 0 && (
                  <Sponsors
                    level="Bronze"
                    sponsors={data.bronzeSponsors.edges}
                  />
                )}
                {data.mediaSponsors.edges.length > 0 && (
                  <Sponsors level="Media" sponsors={data.mediaSponsors.edges} />
                )}
              </div>
            </section>
            <Footer />
            <FooterCopywrite />
          </div>
        )
      }}
    />
  )
}

export default Layout
