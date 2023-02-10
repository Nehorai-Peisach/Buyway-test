import React, { Component, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Helmet } from 'react-helmet';

class LambdaDemo extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, msg: null };
    }

    handleClick = (api) => (e) => {
        e.preventDefault();

        this.setState({ loading: true });
        fetch('/.netlify/functions/' + api)
            .then((response) => response.json())
            .then((json) => this.setState({ loading: false, msg: json.msg }));
    };

    render() {
        const { loading, msg } = this.state;

        return (
            <p>
                <button onClick={this.handleClick('hello')}>{loading ? 'Loading...' : 'Call Lambda'}</button>
                <button onClick={this.handleClick('async-dadjoke')}>{loading ? 'Loading...' : 'Call Async Lambda'}</button>
                <br />
                <span>{msg}</span>
            </p>
        );
    }
}

class App extends Component {
    render() {
        const [product, setProduct] = useState(null);
        useEffect(() => {
            getData();
        }, []);

        const getData = async () => {
            const response = await axios.get('https://api.buy-way.net/products/ast_0IDuOXE1oZg1oTYWyoZg');
            const data = response.data;
            setProduct(data);
        };

        return (
            <div className="App">
                {product && (
                    <Helmet>
                        <meta property="og:title" content={product.name} />
                        <meta property="og:image" content={'https://buyway.fra1.cdn.digitaloceanspaces.com/content/images/product-images' + product.advancedDataItems.images[0]} />
                        <meta property="og:image:type" content="image/jpeg" />
                        <meta property="og:image:width" content="400" />
                        <meta property="og:image:height" content="300" />
                        <meta property="og:image:alt" content={product.description} />
                    </Helmet>
                )}
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <LambdaDemo />
                </header>
            </div>
        );
    }
}

export default App;
