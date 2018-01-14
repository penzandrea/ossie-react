import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

var _ = require('lodash');

class ProductRow extends React.Component {
    render() {
        const product = this.props.product;

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
        const filterRuleButtons = this.props.filter.rules;

        const rulesButtons = [];

       /* console.log('filterRuleButtonss');
        console.log(filterRuleButtons);
        console.log(typeof filterRuleButtons);*/

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
        const filterComponentButtons = this.props.filter.components;
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

    //filter={this.props.filter}
    //filterActive={this.props.filterActive}
    //onSevFilterActiveChange={this.props.onSevFilterActiveChange}

    render() {
        const filterButtons = this.props.filter.severities;
        const buttons = [];

        filterButtons.forEach((buttonSev, i) => {

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


class Search extends React.Component {

    constructor(props) {
        super(props)
        this.onFilterActiveChange = this.onFilterActiveChange.bind(this);
    }

    onFilterActiveChange(e, parameter) {
        this.props.onFilterActiveChange(e, parameter);
    }

    render() {
        let allFilterButtons = [];
        allFilterButtons = this.props.filter;
        //console.log("- - - - - - - - - "+allFilterButtons + " - - - - - - - - -");
        //console.log(allFilterButtons);

        const filterButtons = this.props.filter.severities;
        const buttons = [];
        // You want to do the check for undefined first. If you do it the other way round, it will generate an error if the array is undefined.
        // https://stackoverflow.com/questions/24403732/check-if-array-is-empty-does-not-exist-js
       /* if (allFilterButtons['severities'] === undefined || allFilterButtons['severities'].length == 0) {
            // array empty or does not exist
            console.log('leer');
        } else {
            console.log(allFilterButtons.severities.length);
        }*/

        for( let parameter in allFilterButtons){
            //console.log("- - - - - - - - - - - - - - - - - - -" + parameter);
            if (allFilterButtons[parameter].length !== 0){
                buttons.push(
                    <h3 key={parameter}>{parameter}</h3>
                );
                for( let key in allFilterButtons[parameter]) {

                    //console.log(allFilterButtons[parameter][key]);
                    //console.log(key + ' Button Component key');
                    //console.log(uniqueKey + ' Button Component uniqueKey');

                    buttons.push(
                        <Button txt={allFilterButtons[parameter][key][1]} parameter={parameter} key={allFilterButtons[parameter][key][0]} onFilterActiveChange={this.onFilterActiveChange}/>
                    );
                }
/*                buttons.push(
                    <Button txt={buttonSev} parameter="severity" key={i} onFilterActiveChange={this.onFilterActiveChange}/>
                );*/
            }
        };

/*        allFilterButtons.forEach((filterparam, i) => {
            console.log("- - - - - - - - - - - - - - - - - -" + i);
        });*/
        //console.log(allFilterButtons.length);
        //console.log(allFilterButtons);

        //console.log(allFilterButtons.severities);
/*        allFilterButtons.forEach((filterparam, i) => {
                console.log("- - - - - - - - - "+filterparam + " - - - - - - - - -");
           buttons.push(
                <Button txt={buttonSev} parameter="severity" key={i} onFilterActiveChange={this.onFilterActiveChange}/>
            );
        });*/

/*        filterButtons.forEach((buttonSev, i) => {

            buttons.push(
                <Button txt={buttonSev} parameter="severity" key={i} onFilterActiveChange={this.onFilterActiveChange}/>
            );
        });*/

        return (
            <div>
                <h2>ALL</h2>
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
                <Search filter={this.props.filter}
                        filterActive={this.props.filterActive}
                        onFilterActiveChange={this.onFilterActiveChange} />
                { /*<SearchSeverity filter={this.props.filter}
                                filterActive={this.props.filterActive}
                                onFilterActiveChange={this.onFilterActiveChange}/>
                <SearchComponent filter={this.props.filter}
                                 filterComponentActive={this.props.filterComponentActive}
                                 onFilterActiveChange={this.onFilterActiveChange}/>
                <SearchRule filter={this.props.filter}
                            filterRuleActive={this.props.filterRuleActive}
                            onFilterActiveChange={this.onFilterActiveChange}/>
*/}
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
            filterActiveS: {
                severities: [],
                rules: [],
                components: []
            },
        };
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleFilterActiveChange = this.handleFilterActiveChange.bind(this);

    }

    handleFilterTextChange(filterText) {
        this.setState({
            filterText: filterText
        });
    }

    handleFilterActiveChange(e, parameter) {

        /*const filterButtons = this.props.filter;
         const active = this.state.filterActiveS;
         let active = [];

         filterButtons.forEach((buttonSev, i) => {

         buttons.push(
         <button data-space={buttonSev}
         className={buttonSev}
         data-txt={buttonSev}
         key={i} type="button" onClick={this.filterActiveChange}>{buttonSev}</button>
         );
         });*/
        console.log("filterActiveS");

        const filterActiveS = {};
        filterActiveS[parameter] = [e];
        filterActiveS.rules = [];
        filterActiveS.components= [];
        console.log("filterActiveS");
        console.log(filterActiveS);

        let allfilter = this.props.filter;


        // console.log('e');
        // console.log(e);
        // console.log('this.props.filter');
        // console.log(this.props.filter);


        for (var item in allfilter[parameter]){
            console.log("-");
        }

        this.setState({
            filterActiveS: filterActiveS
        });

        console.log("this.state.filterActiveS");
        console.log(this.state.filterActiveS);
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
                <SearchBarGrouped filter={this.props.filter}
                                  filterActive={this.state.filterActiveS}
                                  onFilterActiveChange={this.handleFilterActiveChange}/>
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
            filterArray: {
                severities: [],
                rules: [],
                components: []
            },
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
            });
            this.setState({data: issues});
            //ES6 only https://stackoverflow.com/questions/1960473/get-all-unique-values-in-an-array-remove-duplicates
            const uniqueSeverities = severities.filter((v, i, a) => a.indexOf(v) === i);
            const uniqueRules = rules.filter((v, i, a) => a.indexOf(v) === i);
            const uniqueComponents = components.filter((v, i, a) => a.indexOf(v) === i);



            //console.log(uniqueSeverities);

            for ( var item in uniqueSeverities){
                var uniqueKey = _.uniqueId();

                //console.log(item);
                uniqueSeverities[item] = [uniqueKey, uniqueSeverities[item]];
            }

            //console.log(uniqueSeverities);

            //console.log(uniqueRules);

            for ( var item in uniqueRules){
                var uniqueKey = _.uniqueId();
                //console.log(item);
                uniqueRules[item] = [uniqueKey, uniqueRules[item]];
            }

            //console.log(uniqueRules);


            for ( var item in uniqueComponents){
                var uniqueKey = _.uniqueId();

                //console.log(item);
                uniqueComponents[item] = [uniqueKey, uniqueComponents[item]];
            }

            const filterArray = {};

            filterArray.severities = uniqueSeverities;
            filterArray.rules = uniqueRules;
            filterArray.components = uniqueComponents;

            //this.setState({severityFilter: uniqueSeverities});
            //this.setState({ruleFilter: uniqueRules});
            //this.setState({componentFilter: uniqueComponents});
            this.setState({filterArray: filterArray});
            console.log(this.state.filterArray);

        })
    }

    render() {
        return (
            <FilterableProductTable products={this.state.data} filter={this.state.filterArray}/>);
    }
}

export default App;
