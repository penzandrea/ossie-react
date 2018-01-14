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


function flatten (list) {
    var clonedList = list.slice(0)
    var flatList = []
    while (clonedList.length) {
        var item = clonedList.shift()
        if (item instanceof Array === true) {
            clonedList = item.concat(clonedList)
        } else {
            flatList.push(item)
        }
    }
    return flatList
}
function isEmptyFilter( array ){
    let empty = true;
    if (array !== undefined && Object.keys(array).length != 0){
        //console.log('enter parameter parts of filter array');
        console.log('array not undefined');

        for (var item in array) {
            //  filters for those parameters, which are set get scanned
            if (array[item] !== undefined && Object.keys(array[item]).length != 0) {
                console.log('not empty ' + array[item]);
                empty = false;
            }
        }
    }
    return empty;
}

function isEmptyParamFilter( paramArray ){
    let empty = true;
    if (paramArray !== undefined && Object.keys(paramArray).length != 0){
        //console.log('enter parameter parts of filter array');
        console.log('paramArray empty');
        empty = false;
    }
    return empty;
}

class ProductTable extends React.Component {
    render() {
        const filterText = this.props.filterText;
        let filterActive = {};
        filterActive = this.props.filterActive;

        console.log("-------sdifhasöoidghösaidjöasdijfösadföoaisjf");
        console.log(_.isEmpty(filterActive));
        console.log(Object.keys(filterActive).length);
        console.log(Object.values(filterActive).length);
        console.log(isEmptyFilter(filterActive));

        //=== JSON.stringify({});
        const rows = [];

        this.props.products.forEach((product) => {
            // with no filter active output all results
            if (!isEmptyFilter(filterActive)) {
                console.log("||||||||||||||||||||||||||||||||||||||||||||||||||||");
                //console.log(product);
                console.log(product.props.children[0].props.children + "  " + product.props.children[1].props.children + "  " + product.props.children[2].props.children + "  " + product.props.children[3].props.children);


                /* KEY */           //console.log(product.props.children[0].props.children);
                /* RULE */          //console.log(product.props.children[1].props.children);
                /* COMPONENT */     //console.log(product.props.children[2].props.children);
                /* SEVERITY */      //console.log(product.props.children[3].props.children);

                let keepKey = true;
                let keepRule = true;
                let keepComponent = true;
                let keepSeverity = true;

                //console.log(Object.keys(filterActive).length);
                //console.log(filterActive);
                //console.log(Object.keys(filterActive.severity).length);

                //console.log(filterActive);

                //enter parameter parts of filter array
                console.log('LENGTH');
                console.log(Object.keys(filterActive).length);
                if (filterActive !== undefined && Object.keys(filterActive).length != 0) {
                    //console.log('enter parameter parts of filter array');
                    console.log("filtering for row");

                    for (var filterParam in filterActive) {
                        console.log("$$$");

                        console.log(filterActive[filterParam]);

                        //console.log(filterParam);
                        // thos filters for those parameters, which are set get scanned
                        if (filterActive[filterParam] !== undefined && Object.keys(filterActive[filterParam]).length != 0) {
                            //console.log(filterParam);
                            //console.log('0000000000000000000');

                            for (var filterItem of filterActive[filterParam]) {
                                console.log(filterItem);

                                if (filterParam == "rules") {
                                    if (product.props.children[1].props.children.indexOf(filterItem) === -1) {
                                        keepRule = false;
                                        console.log('keepRule');
                                    } else {
                                        keepRule = true;
                                        break;
                                    }
                                }
                                if (filterParam == "components") {
                                    if (product.props.children[2].props.children.indexOf(filterItem) === -1) {
                                        keepComponent = false;
                                        console.log('keepComponent');
                                    } else {
                                        keepComponent = true;
                                        break;
                                    }
                                }
                                if (filterParam == "severities") {

                                    if (product.props.children[3].props.children.indexOf(filterItem) === -1) {
                                        keepSeverity = false;
                                        console.log('keepSeverity');
                                    } else {
                                        keepSeverity = true;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }


                /*            if (product.props.children[0].props.children.indexOf(filterText) === -1) {
                 keepKey = true;
                 }
                 if (product.props.children[1].props.children.indexOf(filterText) === -1) {
                 keepRule = true;
                 }

                 if (product.props.children[3].props.children.indexOf(filterText) === -1) {
                 keepSeverity = true;
                 }*/
                // er findet in keinem Bereich eine übereinstimmung
                if (!keepKey || !keepRule || !keepComponent || !keepSeverity) {
                    console.log("RRRRRREMOVE ITEM");
                    return;
                }

                console.log("MATCHMATCHMATCHMATCHMATCHMATCH");
                console.log(filterActive);
                console.log("MATCHMATCHMATCHMATCHMATCHMATCH");

                // if it is not found it doesnt get added to output, it get filtered out
                if (product.props.children[0].props.children.indexOf(filterText) === -1 &&
                    product.props.children[1].props.children.indexOf(filterText) === -1 &&
                    product.props.children[2].props.children.indexOf(filterText) === -1 &&
                    product.props.children[3].props.children.indexOf(filterText) === -1) {
                    console.log(product.props.children[0].props.children);
                    return;
                }
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
        this.props.onFilterActiveChange(e.target.dataset.txt, this.props.parameter, this.state.clicked);
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


class Search extends React.Component {

    constructor(props) {
        super(props)
        this.onFilterActiveChange = this.onFilterActiveChange.bind(this);



    }

    onFilterActiveChange(e, parameter, clickedState) {
        this.props.onFilterActiveChange(e, parameter, clickedState);
        console.log('|||||||||||||||');
        console.log(this.props.filterActive);
        console.log('|||||||||||||||');
    }

    render() {
        let allFilterButtons = [];
        allFilterButtons = this.props.filter;

        const filterButtons = this.props.filter.severities;
        const buttons = [];

        for( let parameter in allFilterButtons){
            //console.log("- - - - - - - - - - - - - - - - - - -" + parameter);
            if (allFilterButtons[parameter].length !== 0){
                buttons.push(
                    <h3 key={parameter}>{parameter}</h3>
                );
                for( let key in allFilterButtons[parameter]) {
                    buttons.push(
                        <Button txt={allFilterButtons[parameter][key][1]} parameter={parameter} key={allFilterButtons[parameter][key][0]} onFilterActiveChange={this.onFilterActiveChange}/>
                    );
                }
            }
        };

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

    onFilterActiveChange(e, parameter, clickedState) {
        this.props.onFilterActiveChange(e, parameter, clickedState);
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
            filterTest: ''
        };
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleFilterActiveChange = this.handleFilterActiveChange.bind(this);

    }

    handleFilterTextChange(filterText) {
        this.setState({
            filterText: filterText
        });
    }

    handleFilterActiveChange(e, parameter, clickedState) {

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

        let filterActiveS = this.state.filterActiveS;


        let allfilter = this.props.filter;


        //console.log('e');
        //console.log(e);



        if (filterActiveS[parameter] !== undefined && filterActiveS[parameter].length != 0){
            //filter needs to be added
            if (!clickedState){
                //console.log('NICHT LEER');
                // console.log(filterActiveS[parameter].length);
                filterActiveS[parameter].push(e);
                // console.log(filterActiveS);
            } else {
                // filter needs to be removed
                //console.log('filter needs to be removed');
                // console.log(filterActiveS);
                _.remove(filterActiveS[parameter], function (entry) {
                    return entry === e
                });
                // console.log(filterActiveS);
            }
        } else {
            // no item added yet, add it anyways
            //console.log('... LEEEEER');
            filterActiveS[parameter] = [e];
            //console.log(filterActiveS[parameter]);

        }

        /*        for (var item in filterActiveS[parameter]){
         if (filterActiveS[parameter].length != 0){
         for (var currentActive in filterActiveS[parameter]) {
         console.log(allfilter[parameter][item][1]);

         // if (allfilter[parameter][item][1] == e)
         console.log(allfilter[parameter][item][1]);
         console.log(currentActive[parameter]);

         }
         } else {
         filterActiveS[parameter].push(e);
         }
         }*/

        this.setState({
            filterActiveS: filterActiveS
        }, function () {
            console.log(this.state.filterActiveS);
        });
        // https://stackoverflow.com/questions/30782948/why-calling-react-setstate-method-doesnt-mutate-the-state-immediately
        /* setState() does not immediately mutate this.state but creates a pending state transition.
         Accessing this.state after calling this method can potentially return the existing value.
         There is no guarantee of synchronous operation of calls to setState and calls may be batched for performance gains.
         */

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
                <ProductTable products={this.props.products} filterText={this.state.filterText} filterActive={this.state.filterActiveS}/>
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

            // equip lists with unique lodash key
            for ( var item in uniqueSeverities){
                var uniqueKey = _.uniqueId();
                uniqueSeverities[item] = [uniqueKey, uniqueSeverities[item]];
            }


            for ( var item in uniqueRules){
                var uniqueKey = _.uniqueId();
                uniqueRules[item] = [uniqueKey, uniqueRules[item]];
            }

            for ( var item in uniqueComponents){
                var uniqueKey = _.uniqueId();
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



// WEBPACK FOOTER //
// src/App.js