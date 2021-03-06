import React, {Component} from 'react';
import Navigation from "./Navigation";
import RelValStore from "../Stores/RelValStore";
import queryString from 'query-string';
import TogglesShowRow from "./TogglesShowRow";
import {goToLinkWithoutHistoryUpdate, partiallyUpdateLocationQuery} from "../Utils/commons";
import ReactTable from 'react-table';
import 'react-table/react-table.css';


// Smart component tracking data change and laying basic layout
class Layout extends Component {
    constructor(props) {
        super(props);
        this.doUpdateData = this.doUpdateData.bind(this);
        this.state = {
            navigationHeight: 62,
        };
    }

    componentWillMount() {
        RelValStore.on("change", this.doUpdateData);
    }

    doUpdateData() {
        const {date, que} = this.props.match.params;
        const allArchs = RelValStore.getAllArchsForQue({date, que});
        const allFlavors = RelValStore.getAllFlavorsForQue({date, que});
        const structure = RelValStore.getFlavorStructure({date, que});
        this.setState({structure, allArchs, allFlavors, date, que});

        const {location, history} = this.props;
        if (location.search === "") {
            partiallyUpdateLocationQuery(location, 'selectedArchs', allArchs);
            partiallyUpdateLocationQuery(location, 'selectedFlavors', allFlavors);
            goToLinkWithoutHistoryUpdate(history, location);
        }

    }

    componentWillReceiveProps(newProps) {
        const {date, que} = newProps.match.params;
        const oldDate = this.props.match.params.date;
        const oldQue = this.props.match.params.que;
        if (date !== oldDate || que !== oldQue) {
            const allArchs = RelValStore.getAllArchsForQue({date, que});
            const allFlavors = RelValStore.getAllFlavorsForQue({date, que});
            const structure = RelValStore.getFlavorStructure({date, que});
            this.setState({structure, allArchs, allFlavors, date, que});

            const {location, history} = newProps;
            partiallyUpdateLocationQuery(location, 'selectedArchs', allArchs);
            partiallyUpdateLocationQuery(location, 'selectedFlavors', allFlavors);
            goToLinkWithoutHistoryUpdate(history, location);
        }
    }

    getNavigationHeight() {
        const navigationHeight = document.getElementById('navigation').clientHeight;
        this.setState({navigationHeight});
    }

    componentDidMount() {
        window.addEventListener('resize', this.getNavigationHeight.bind(this));
        this.doUpdateData();
        this.getNavigationHeight();
    }

    componentWillUnmount() {
        RelValStore.removeListener("change", this.doUpdateData);
        window.removeEventListener('resize', this.getNavigationHeight.bind(this));
    }

    getTopPadding() {
        return this.state.navigationHeight + 20;
    }

    getSizeForTable() {
        return document.documentElement.clientHeight - this.getTopPadding() - 20
    }

    render() {
        const {navigationHeight, allArchs = [], allFlavors = []} = this.state;
        const {selectedArchs, selectedFlavors} = queryString.parse(this.props.location.search);
        let data;
        const {structure = {}} = this.state;
        if (structure.dataLoaded) {
            // data = <JSONPretty json={this.state.structure.allRelvals}/>;
            data = this.state.structure.allRelvals;
        } else {
            data = [];
        }

        const columns = [
            {
                Header: "",
                columns: [
                    {
                        Header: "#",
                        id: "index",
                        accessor: d => <b>{d.index}</b>,
                        maxWidth: 100
                    }
                ]
            },
            {
                Header: "Name",

                columns: [
                    {
                        Header: "First Name",
                        accessor: "id"
                    },
                    {
                        Header: "Last Name",
                        id: "passed",
                        accessor: d => d.passed ? d.passed.toString() : null
                    },                    {
                        Header: "First Name",
                        accessor: "id"
                    },
                    {
                        Header: "Last Name",
                        id: "passed",
                        accessor: d => d.passed ? d.passed.toString() : null
                    },                    {
                        Header: "First Name",
                        accessor: "id"
                    },
                    {
                        Header: "Last Name",
                        id: "passed",
                        accessor: d => d.passed ? d.passed.toString() : null
                    },                    {
                        Header: "First Name",
                        accessor: "id"
                    },
                    {
                        Header: "Last Name",
                        id: "passed",
                        accessor: d => d.passed ? d.passed.toString() : null
                    },                    {
                        Header: "First Name",
                        accessor: "id"
                    },
                    {
                        Header: "Last Name",
                        id: "passed",
                        accessor: d => d.passed ? d.passed.toString() : null
                    },                    {
                        Header: "First Name",
                        accessor: "id"
                    },
                    {
                        Header: "Last Name",
                        id: "passed",
                        accessor: d => d.passed ? d.passed.toString() : null
                    },                    {
                        Header: "First Name",
                        accessor: "id"
                    },
                    {
                        Header: "Last Name",
                        id: "passed",
                        accessor: d => d.passed ? d.passed.toString() : null
                    },
                ]
            }
        ];

        return (
            <div className={'container'} style={{paddingTop: this.getTopPadding()}}>
                <Navigation
                    flaworControl={
                        <TogglesShowRow
                            rowName={'Flavors'}
                            nameList={allFlavors}
                            initSelections={selectedFlavors}
                            callbackToParent={(v) => {
                                const {location, history} = this.props;
                                partiallyUpdateLocationQuery(location, 'selectedFlavors', v);
                                goToLinkWithoutHistoryUpdate(history, location);
                            }}/>
                    }
                    archControl={
                        <TogglesShowRow
                            rowName={'Architectures'}
                            nameList={allArchs}
                            initSelections={selectedArchs}
                            callbackToParent={(v) => {
                                const {location, history} = this.props;
                                partiallyUpdateLocationQuery(location, 'selectedArchs', v);
                                goToLinkWithoutHistoryUpdate(history, location);
                            }}/>
                    }
                />
                <ReactTable
                    data={data}
                    columns={columns}
                    defaultPageSize={50}
                    style={{
                        height: this.getSizeForTable()
                    }}
                />
            </div>
        );
    }
}

export default Layout;
