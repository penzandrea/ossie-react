import React, {Component} from 'react';
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
                    key={product.key}/>
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
class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {clicked: false};
        this.filterActiveChange = this.filterActiveChange.bind(this);
    }

    filterActiveChange(e) {
        //https://stackoverflow.com/questions/37639122/using-event-target-with-react-components
        e.stopPropagation();
        this.props.onFilterActiveChange(e.target.dataset.txt, this.props.parameter);
        this.setState({clicked: !this.state.clicked});
    }

    render() {
        var clicked = this.state && this.state.clicked;
        return <button type="button" className={clicked ? 'clicked' : undefined}
                       data-txt={this.props.txt}
                       txt={this.props.txt}
                       onClick={ this.filterActiveChange}>{this.props.txt}</button>
    }

}
;
class SearchRule extends React.Component {
    constructor(props) {
        super(props);
        this.onFilterActiveChange = this.onFilterActiveChange.bind(this);
        //this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    }
    onFilterActiveChange(e, parameter) {
        this.props.onFilterActiveChange(e, parameter);
    }
    handleFilterTextChange(e) {
        this.props.onFilterTextChange(e.target.value);
        console.log('e.target.value');
        console.log(e.target.value);
    }

    render() {
        const filterRuleButtons = this.props.filterRules;
        const rulesButtons = [];
        let lastCategory = null;

        filterRuleButtons.forEach((buttonRule, i) => {
            rulesButtons.push(
                <Button txt={buttonRule} key={i} parameter="rule" onFilterActiveChange={this.onFilterActiveChange}/>
            );
        });

        return (
            <div>
                <h2>Rules</h2>
                {rulesButtons}
            </div>
        );
    }
}

class SearchComponent extends React.Component {

    constructor(props) {
        super(props);
        this.onFilterActiveChange = this.onFilterActiveChange.bind(this);
        //this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    }
    onFilterActiveChange(e, parameter) {
        this.props.onFilterActiveChange(e, parameter);
    }
    handleFilterTextChange(e) {
        this.props.onFilterTextChange(e.target.value);
        console.log('e.target.value');
        console.log(e.target.value);
    }

    render() {
        const filterComponentButtons = this.props.filterComponents;
        const buttons = [];

        filterComponentButtons.forEach((buttonComp, i) => {
            buttons.push(
                <Button txt={buttonComp} key={i} parameter="component"
                        onFilterActiveChange={this.onFilterActiveChange}/>
            );
        });

        return (
            <div>
                <h2>Components</h2>
                {buttons}</div>
        );
    }
}

class SearchSeverity extends React.Component {

    constructor(props) {
        super(props)
        this.onFilterActiveChange = this.onFilterActiveChange.bind(this);
    }

    onFilterActiveChange(e, parameter) {
        this.props.onFilterActiveChange(e, parameter);
    }

    //filterSeverity={this.props.filterSeverity}
    //filterSeverityActive={this.props.filterSeverityActive}
    //onSevFilterActiveChange={this.props.onSevFilterActiveChange}

    render() {
        const filterSeverityButtons = this.props.filterSeverity;
        const buttons = [];
        let lastCategory = null;

        filterSeverityButtons.forEach((buttonSev, i) => {

            buttons.push(
                <Button txt={buttonSev} parameter="severity" key={i} onFilterActiveChange={this.onFilterActiveChange}/>
            );
        });

        return (
            <div>
                <h2>Severity</h2>
                {buttons}</div>
        );
    }
}
class SearchBarGrouped extends React.Component {

    constructor(props) {
        super(props);
        this.onFilterActiveChange = this.onFilterActiveChange.bind(this);
    }

    onFilterActiveChange(e, parameter) {
        this.props.onFilterActiveChange(e, parameter);
    }


    render() {
        return (
            <form>
                <SearchSeverity filterSeverity={this.props.filterSeverity}
                                filterSeverityActive={this.props.filterSeverityActive}
                                onFilterActiveChange={this.onFilterActiveChange}/>
                <SearchComponent filterComponents={this.props.filterComponents}
                                 filterComponentActive={this.props.filterComponentActive}
                                 onFilterActiveChange={this.onFilterActiveChange}/>
                <SearchRule filterRules={this.props.filterRules}
                            filterRuleActive={this.props.filterRuleActive}
                            onFilterActiveChange={this.onFilterActiveChange}/>

                <input type="text" placeholder="Search..." value={this.props.filterText}
                       onChange={this.handleFilterTextChange}/>
            </form>
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
        //console.log('e.target.value'); console.log(e.target.value);
    }

    render() {
        return (
            <form>
                <input type="text" placeholder="Search..." value={this.props.filterText}
                       onChange={this.handleFilterTextChange}/>
            </form>
        );
    }
}
class FilterableProductTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            filterActiveS: []
        };
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleFilterActiveChange = this.handleFilterActiveChange.bind(this);

    }

    handleFilterTextChange(filterText) {
        this.setState({
            filterText: filterText
        });
    }

    handleFilterActiveChange(activeSevFilterSet) {

        /*const filterSeverityButtons = this.props.filterSeverity;
         const active = this.state.filterActiveS;
         let active = [];

         filterSeverityButtons.forEach((buttonSev, i) => {

         buttons.push(
         <button data-space={buttonSev}
         className={buttonSev}
         data-txt={buttonSev}
         key={i} type="button" onClick={this.filterSeverityActiveChange}>{buttonSev}</button>
         );
         });*/

        this.setState({
            filterActiveS: activeSevFilterSet
        });
    }


    render() {
        return (

            <div>

                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <SearchBar filterText={this.state.filterText} onFilterTextChange={this.handleFilterTextChange}/>
                <SearchBarGrouped filterSeverity={this.props.filterSeverity}
                                  filterSeverityActive={this.state.filterActiveS}
                                  onFilterActiveChange={this.handleFilterActiveChange}
                                  filterComponents={this.props.filterComponents} filterRules={this.props.filterRules}/>
                <ProductTable products={this.props.products} filterText={this.state.filterText}/>
            </div>
        );
    }
}
class App extends Component {

    constructor() {
        super();
        this.state = {
            data: [],
            severityFilter: [],
            ruleFilter: [],
            componentFilter: [],
        };
    }

    componentDidMount() {
        fetch('http://localhost:3000/projects/419/issues').then(results => {
            return results.json();
        }).then(data => {
            let issues = data.issues.map((pic, i) => {
                return (
                    <tr key={i}>
                        <td>{pic.key}</td>
                        <td>{pic.rule}</td>
                        <td>{pic.component}</td>
                        <td>{pic.severity}</td>
                    </tr>
                )
            });
            let severities = data.issues.map((issue) => {
                return (
                    issue.severity
                )
            });
            let rules = data.issues.map((issue) => {
                return (
                    issue.rule
                )
            });
            let components = data.issues.map((issue) => {
                return (
                    issue.component
                )
            })
            this.setState({data: issues});
            //ES6 only https://stackoverflow.com/questions/1960473/get-all-unique-values-in-an-array-remove-duplicates
            var uniqueSeverities = severities.filter((v, i, a) => a.indexOf(v) === i);
            var uniqueRules = rules.filter((v, i, a) => a.indexOf(v) === i);
            var uniqueComponents = components.filter((v, i, a) => a.indexOf(v) === i);

            /*console.log(data);
             console.log(this.state.data);
             console.log('uniqueSeverities');
             console.log(uniqueSeverities);*/
            this.setState({severityFilter: uniqueSeverities});
            this.setState({ruleFilter: uniqueRules});
            this.setState({componentFilter: uniqueComponents});

        })
    }

    render() {
        return (
            <FilterableProductTable products={this.state.data} filterSeverity={this.state.severityFilter}
                                    filterComponents={this.state.componentFilter}
                                    filterRules={this.state.ruleFilter}/>);
    }
}

export default App;
