import React, { Component } from 'react';

class SimpleComponent extends Component {
    /// the costructor will be used for state definition
    // to accept data from parent component
    // the props the data to be recived from parent component
    constructor(props) {
       super(props);
       //state declaration
       // even biding to component
    }

    // the render methid encapsulate DOM and its data with behaviour
    render() {
        return (
            <div>
                <h2> The Simple Component {this.props.myname }</h2>
                <br />
                <NewComponent />
            </div>
        )
    }
}

class NewComponent extends Component {
    /// the costructor will be used for state definition
    // to accept data from parent component
    // the props the data to be recived from parent component
    constructor(props) {
       super(props);
       //state declaration
       // even biding to component
    }

    // the render methid encapsulate DOM and its data with behaviour
    render() {
        return (
            <div>
                <h2> THe New Component</h2>
            </div>
        )
    }

}

export default SimpleComponent;