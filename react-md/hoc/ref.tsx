import React, { Component } from "react";

import { refHoc } from './rehoc'

interface Props {
  name?: string
}

interface State {
  weight?: number;
  height?: number;
}

@refHoc()
class RefDemoComponent extends Component<Props, State> {
  
}