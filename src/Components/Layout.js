import React, {Component} from 'react';
import Navigation from "./Navigation";
import RelValStore from "../Stores/RelValStore";
import JSONPretty from 'react-json-pretty';
import queryString from 'query-string';
import TogglesShowRow from "./TogglesShowRow";
import {goToLinkWithoutHistoryUpdate, partiallyUpdateLocationQuery} from "../Utils/commons";

// Smart component tracking data change and laying basic layout
class Layout extends Component {
    constructor(props) {
        super(props);
        this.doUpdateData = this.doUpdateData.bind(this);
        // const {match, location} = props;
        this.state = {
            navigationHeight: 62,
        };
    }

    componentWillMount() {
        RelValStore.on("change", this.doUpdateData);
    }

    getData({date, que}) {
        const allArchs = RelValStore.getAllArchsForQue({date, que});
        const allFlavors = RelValStore.getAllFlavorsForQue({date, que});
        this.setState({allArchs, allFlavors, date, que});
        const {location, history} = this.props;
        // partiallyUpdateLocationQuery(location, 'allArchs', allArchs);
        // partiallyUpdateLocationQuery(location, 'allFlavors', allFlavors);
        // goToLinkWithoutHistoryUpdate(history, location);
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

    render() {
        const {navigationHeight, allArchs = [], allFlavors = []} = this.state;
        const {selectedArchs, selectedFlavors} = queryString.parse(this.props.location.search);
        return (
            <div className={'container'} style={{paddingTop: navigationHeight + 20}}>
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
                <JSONPretty json={this.props}/>
                <h1>Location search</h1>
                <JSONPretty json={queryString.parse(this.props.location.search)}/>
                <h1>State</h1>
                <JSONPretty json={this.state}/>
            </div>
        );
    }
}

export default Layout;
