import React, { Component } from "react";

interface State {
  name: string;
}

export const decoratorWithNameHeight = (height?: number) => {
  return (WrappedCompoenent: any) => {
    return class extends Component<any, State> {
      public state: State = {
        name: ''
      }

      componentWillMount() {
        let username = localStorage.getItem('myName')
        this.setState({
          name: username || ''
        })
      }

      render() {
        return (
          <div>
            <WrappedCompoenent name={this.state.name} {...this.props}/>
            <p>身高为 {height || 0}</p>
          </div>
        )
      }
    }
  }
}

export const decoratorWithWidth = (width?: number) => {
  return (WrappedCompoenent: any) => {
    return class extends Component<any, State> {
      render() {
        return (
          <div>
            <WrappedCompoenent {...this.props}/>
            <p>宽度为 {width || 0}</p>
          </div>
        )
      }
    }
  }
}