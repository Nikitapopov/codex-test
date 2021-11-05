import React, {Component} from 'react';
import './App.css';
import Menu from './components/Menu/Menu';

class App extends Component {
    componentDidMount() {
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors, {passive: true});
        document.title = 'codex test';
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }

    catchAllUnhandledErrors() {
        // alert('Some Error');
    }

    render() {
        return (
            <Menu/>
        );
    }
}

export default App;
