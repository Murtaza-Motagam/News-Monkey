import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component"


export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'sports'

  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  articles = [
    {
      "source": {
        "id": "news24",
        "name": "News24"
      },
      "author": "AFP",
      "title": "'I didn't have any support': Warner fires shot at Cricket Australia over leadership appeal",
      "description": "Veteran David Warner accused Cricket Australia Saturday of a lack of support in his appeal against a lifetime leadership ban and revealed he struggled mentally during the recent series against the West Indies.",
      "url": "https://www.news24.com/sport/cricket/i-didnt-have-any-support-warner-fires-shot-at-cricket-australia-over-leadership-appeal-20221224",
      "urlToImage": "https://cdn.24.co.za/files/Cms/General/d/7617/11aa7ea266c3490eb4947d3a62d873c8.jpg",
      "publishedAt": "2022-12-24T10:35:40+00:00",
      "content": "Veteran David Warner accused Cricket Australia Saturday of a lack of support in his appeal against a lifetime leadership ban and revealed he struggled mentally during the recent series against the We… [+1993 chars]"
    },
    {
      "source": {
        "id": "espn-cric-info",
        "name": "ESPN Cric Info"
      },
      "author": null,
      "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
      "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
      "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
      "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
      "publishedAt": "2020-04-27T11:41:47Z",
      "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
    },
    {
      "source": {
        "id": "espn-cric-info",
        "name": "ESPN Cric Info"
      },
      "author": null,
      "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
      "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
      "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
      "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
      "publishedAt": "2020-03-30T15:26:05Z",
      "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
    }
  ]

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    }

    document.title = `NewsMonkey - ${this.capitalizeFirstLetter(this.props.category)} Category`;
  }

  async updateNews() {
    this.props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cc1cbcf82bb94ce0a26c313d6e273977&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cc1cbcf82bb94ce0a26c313d6e273977&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults
    })
    
  }

  render() {


    return (
      <>
        {/* <div className='container my-3'> */}
          <h2 className='text-center my-5 bg-success text-light py-5'>NewsMonkey - {this.capitalizeFirstLetter(this.props.category)} Top Headlines</h2>
          {this.state.loading && <Spinner/>}

          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner/>}
          >

          <div className="container">
            <div className="row my-5 m-auto">
              {this.state.articles.map((element) => {
                return <div className="col-md-4 m-auto" key={element.url}>
                  <NewsItem title={element.title ? element.title.slice(0, 38) : ""} description={element.description ? element.description.slice(0, 48) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })}

            </div>
          </div>

          </InfiniteScroll>
      </>
    )
  }
}

export default News
