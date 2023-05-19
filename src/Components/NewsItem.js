import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
        return (
            <div>
                <div className="card my-5 m-auto">
                    <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>
                        <span className="badge rounded-pill bg-danger">{source}</span>
                    </div>
                    <img src={!imageUrl ? "https://images.hindustantimes.com/img/2022/12/26/1600x900/weather-pollution_3574acb8-a275-11e6-b234-3982876c2dbb_1672048987646_1672048987646.jpg" : imageUrl} className="card-img-top" alt="headlineImg" />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{!description ? "The results, published in the journal Environmental Science" : description}</p>
                        <p className="card-text"><small className="text-muted">By - {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
                    </div>
                    <div className="buttons my-2">
                        <a href={newsUrl} rel="noreferrer" target="_blank" className="ms-2 btn btn-sm btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
