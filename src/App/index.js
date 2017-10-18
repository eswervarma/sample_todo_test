import React, { PropTypes } from 'react'

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillUpdateProps(props) {
    this.props = props;
  }

  render(){
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
App.propTypes = {
  children: PropTypes.node
}

export default App
