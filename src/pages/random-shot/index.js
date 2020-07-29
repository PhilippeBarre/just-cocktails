import React from 'react'
import { graphql, StaticQuery } from "gatsby"
import Layout from '../../components/Layout'

class RandomShotIndexPage extends React.Component {
  randomShot = {
    alcool: '',
    liquor: '',
    syrup: ''
  }

  constructor(props) {
    super(props);
    this.giveRandomShot = this.giveRandomShot.bind(this);
    this.state = {showRandomShot: false};
  }

  giveRandomShot() {
    this.randomShot.alcool = this.props.alcool[Math.floor(Math.random() * this.props.alcool.length)].node.frontmatter.name
    this.randomShot.liquor = this.props.liquor[Math.floor(Math.random() * this.props.liquor.length)].node.frontmatter.name
    this.randomShot.syrup = this.props.syrup[Math.floor(Math.random() * this.props.syrup.length)].node.frontmatter.name
    this.setState({showRandomShot: true});
  }

  render() {
    let displayRandomShot;

    if (this.state.showRandomShot) {
      displayRandomShot = 
      <div>
        <p>Drink this shot :</p>
        <div><span className="tag is-danger">{this.randomShot.alcool}</span></div>
        <div><span className="tag is-warning">{this.randomShot.liquor}</span></div>
        <div><span className="tag is-success">{this.randomShot.syrup}</span></div>
      </div>
    } else {
      displayRandomShot = <div></div>;
    }

    return (
      <Layout>
        <div
          className="full-width-image-container margin-top-0"
          style={{
            backgroundImage: `url('/img/random-shot-3.jpg')`,
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
              <div className="columns">
                <div className="column">
                  <div className="card">
                    <div className="card-content tag-container">
                      <p className="title has-text-danger-dark">Alcool list</p>
                      { this.props.alcool.map(el => <span key={el.node.id} className="tag is-danger is-light">{el.node.frontmatter.name}</span>) }
                    </div>
                  </div>
                </div>
                <div className="column">
                  <div className="card">
                    <div className="card-content tag-container">
                      <p className="title has-text-warning-dark">Liquor list</p>
                      { this.props.liquor.map(el => <span key={el.node.id} className="tag is-warning is-light">{el.node.frontmatter.name}</span>) }
                    </div>
                  </div>
                </div>
                <div className="column">
                 <div className="card">
                    <div className="card-content tag-container">
                      <p className="title has-text-success-dark">Syrup list</p>
                      { this.props.syrup.map(el => <span key={el.node.id} className="tag is-success is-light">{el.node.frontmatter.name}</span>) }
                    </div>
                  </div>
                </div>
              </div>

              <button onClick={this.giveRandomShot} className="button is-primary">Give me a random shot !</button>
              {displayRandomShot}
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
      <RandomShotIndexPage alcool={data.alcool.edges} liquor={data.liquor.edges} syrup={data.syrup.edges} />
    )}
  />
)
