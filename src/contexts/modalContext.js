import React from  'react';

const Context =  React.createContext('show');

export class ModalStore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {show: false}
    }

    onToggle = (show) => {
        this.setState({show: !this.state.show});
    }
    render () {
        return (
            <Context.Provider value={{...this.state, onToggle: this.onToggle }}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export default Context;
