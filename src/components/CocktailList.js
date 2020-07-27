import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

class CocktailList extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <div className="columns is-multiline">
        {posts &&
          posts.map(({ node: post }) => (
            <div className="is-parent column is-6" key={post.id}>
              <article
                className={`cocktail-list-item tile is-child box notification ${
                  post.frontmatter.featuredpost ? 'is-featured' : ''
                }`}
              >
                <header>
                  {post.frontmatter.image ? (
                    <div className="featured-thumbnail">
                      <Link to={post.fields.slug}>
                        <PreviewCompatibleImage
                          imageInfo={{
                            image: post.frontmatter.image,
                            alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                          }}
                        />
                      </Link>
                    </div>
                  ) : null}
                  <p className="post-meta">
                    <Link className="title has-text-primary is-size-4" to={post.fields.slug}>
                      {post.frontmatter.title}
                    </Link>
                    <span className="tag is-rounded is-primary">Rounded</span>
                  </p>
                </header>
                <p>
                  {post.frontmatter.date}
                </p>
              </article>
            </div>
          ))}
      </div>
    )
  }

  componentDidMount() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark
    
    posts.map(({ node: post }) => {
      console.log(post)
    })
  }
}

CocktailList.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query CocktailListQuery {
        allMarkdownRemark(
          sort: { order: ASC, fields: [frontmatter___title] }
          filter: { frontmatter: { templateKey: { eq: "cocktail-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                description
                image {
                  childImageSharp {
                    fluid(maxWidth: 512, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
                recipe {
                  ingredients {
                    name
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <CocktailList data={data} count={count} />}
  />
)
