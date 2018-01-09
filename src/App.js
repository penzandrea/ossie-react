import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class ProductCategoryRow extends React.Component {
    render() {
        const category = this.props.category;
        return (
            <tr>
                <th colSpan="4">
                    {category}
                </th>
            </tr>
        );
    }
}

class ProductRow extends React.Component {
    render() {
        const product = this.props.product;
        const name = product.stocked ?
            product.key :
            <span style={{color: 'red'}}>
        {product.props.children.key}
      </span>;

        return (
            <tr>
                {product.props.children}
            </tr>
        );
    }
}
class ProductTable extends React.Component {
    render() {
        const filterText = this.props.filterText;
        const rows = [];
        let lastCategory = null;

        this.props.products.forEach((product) => {


                        // if it is not found it doesnt get added to output, it get filtered out
                        if (product.props.children[0].props.children.indexOf(filterText) === -1 &&
                            product.props.children[1].props.children.indexOf(filterText) === -1 &&
                            product.props.children[2].props.children.indexOf(filterText) === -1 &&
                            product.props.children[3].props.children.indexOf(filterText) === -1) {
                            console.log(product.props.children[0].props.children);
                            return;
                        }
           /* if (product.category !== lastCategory) {
                rows.push(
                    <ProductCategoryRow
                        category={product.category}
                        key={product.category} />
                );
            }*/
            rows.push(
                <ProductRow
                    product={product}
                    key={product.key} />
            );
            //lastCategory = product.category;
        });

        return (
            <table>
                <thead>
                <tr>
                    <th>Key</th>
                    <th>Rule</th>
                    <th>Component</th>
                    <th>Severity</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    }

    handleFilterTextChange(e) {
        this.props.onFilterTextChange(e.target.value);
        console.log('e.target.value');

        console.log(e.target.value);
    }

    render() {
        return (
            <form>
                <input type="text" placeholder="Search..." value={this.props.filterText}  onChange={this.handleFilterTextChange}/>
                <p>
                    <input type="checkbox" />
                    {' '}
                    Only show products in stock
                </p>
            </form>
        );
    }
}
class FilterableProductTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
        };

        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    }

    handleFilterTextChange(filterText) {
        this.setState({
            filterText: filterText
        });
    }


    render() {
        return (

            <div>

            <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
    </p>
                <SearchBar filterText={this.state.filterText} onFilterTextChange={this.handleFilterTextChange} />
                <ProductTable products={this.props.products} filterText={this.state.filterText}/>
    </div>
        );
    }
}
class App extends Component {

    constructor(){
        super();
        this.state = {
            data: [],
        };
    }
    componentDidMount(){
        fetch('http://localhost:3000/projects/419/issues').then(results => { return results.json();}).then(data => {
           let issues = data.issues.map((pic, i) => {
               return(
                   <tr key={i}><td>{pic.key}</td><td>{pic.rule}</td><td>{pic.component}</td><td>{pic.severity}</td></tr>
               )
           })
            this.setState({ data: issues});
            console.log(data);
            console.log(this.state.data);
        })

    }

  render() {
    return (
        <FilterableProductTable products={this.state.data} />);
  }
}

export default App;
