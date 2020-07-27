import React from 'react'
import { graphql, StaticQuery } from "gatsby"
import Layout from '../../components/Layout'

class RandomShotIndexPage extends React.Component {
  render() {
    console.log(this.props)
    return (
      <Layout>
        <div
          className="full-width-image-container margin-top-0"
          style={{
            backgroundImage: `url('/img/blog-index.jpg')`,
          }}
        >
          <h1
            className="has-text-weight-bold is-size-1"
            style={{
              boxShadow: '0.5rem 0 0 #f40, -0.5rem 0 0 #f40',
              backgroundColor: '#f40',
              color: 'white',
              padding: '1rem',
            }}
          >
            Random shots
          </h1>
        </div>
        <section className="section">
          <div className="container">
            <div className="content">
              
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

export default () => (
  <StaticQuery
    query={graphql`
      query {
        alcool: allMarkdownRemark(
          sort: { order: ASC, fields: [frontmatter___title] }
          filter: { 
            frontmatter: { 
              templateKey: { eq: "random-shot-post" } 
              category: { eq: "Alcool" } 
            }
          }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                name
                templateKey
              }
            }
          }
        }
        liquor: allMarkdownRemark(
          sort: { order: ASC, fields: [frontmatter___title] }
          filter: { 
            frontmatter: { 
              templateKey: { eq: "random-shot-post" } 
              category: { eq: "Liquor" } 
            }
          }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                name
                templateKey
              }
            }
          }
        }
        syrup: allMarkdownRemark(
          sort: { order: ASC, fields: [frontmatter___title] }
          filter: { 
            frontmatter: { 
              templateKey: { eq: "random-shot-post" } 
              category: { eq: "Syrup" } 
            }
          }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                name
                templateKey
              }
            }
          }
        }
        allDirectory {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    `}
    render={(data) => (
      <RandomShotIndexPage alcool={data.alcool} liquor={data.liquor} syrup={data.syrup} />
    )}
  />
)
