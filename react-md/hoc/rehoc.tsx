import React, { Component } from "react";

export const refHoc = () => {
  return (WrappedComponent: any) => {
    return class extends Component<any, any> {
      ref: any = null
      componentDidMount() {
        console.log(this.ref.state)
      }
      render() {
        return (
          <WrappedComponent {...this.props} ref=((instance: any) => {this.ref = instance})/>
        )
      }
    }
  }
}