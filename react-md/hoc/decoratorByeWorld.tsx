import React from "react";

import { decoratorWithNameHeight, decoratorWithWidth } from "./index";

interface Props {
  name?: string;
}

@decoratorWithWidth(100)
@decoratorWithNameHeight(180) // 装饰器传参
class UglyWorld extends Compontent<Props, any> {
  render() {
    return <div>bye ugly world my name is {this.props.name}</div>
  }
}

export default UglyWorld