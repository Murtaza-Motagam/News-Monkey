import React, { Component } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar';
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar';


export default class App extends Component {
  pageSize = 6;

  state = {
    progress: 0
  }

  setProgress = (progress) => {
    this.setState({progress: progress})
  }


  render() {
    return (
      <div>
        <BrowserRouter>
          <Navbar />

          <LoadingBar
          color = '#0d6efd'
          height = {4}
          progress = {this.state.progress}
          />

          <Routes>
            <Route path="/" exact element={<News setProgress={this.setProgress} key="general" pageSize={this.pageSize} category="general" country="in" />}></Route>

            <Route path="/business" exact  element={<News setProgress={this.setProgress} key="business" pageSize={this.pageSize} category="business" country="in" />}></Route>

            <Route path="/entertainment" exact key="entertainment" element={<News setProgress={this.setProgress} key="entertainment" pageSize={this.pageSize} category="entertainment" country="in" />}></Route>

            <Route path="/health" exact key="health" element={<News setProgress={this.setProgress} key="health"  pageSize={this.pageSize} category="health" country="in" />}></Route>

            <Route path="/science" exact  element={<News setProgress={this.setProgress} key="science" pageSize={this.pageSize} category="science" country="in" />}></Route>

            <Route path="/sports" exact  element={<News setProgress={this.setProgress} key="sports" pageSize={this.pageSize} category="sports" country="in" />}></Route>

            <Route path="/technology" exact  element={<News setProgress={this.setProgress} key="technology" pageSize={this.pageSize} category="technology" country="in" />}></Route>
            
          </Routes>

        </BrowserRouter >
      </div >
    )
  }
}
