import React, {Component} from 'react';
import Navigation from "./Navigation";
import RelValStore from "../Stores/RelValStore";
import JSONPretty from 'react-json-pretty';
import queryString from 'query-string';

// Smart component tracking data change and laying basic layout
class Layout extends Component {
    constructor(props) {
        super(props);
        this.doUpdateData = this.doUpdateData.bind(this);
        const {match} = props;
        this.state = {
            navigationHeight: 62,
        };
    }

    componentWillMount() {
        RelValStore.on("change", this.doUpdateData);
    }

    getData({date, que}) {
        this.setState({
            allArchs: RelValStore.getAllArchsForQue({date, que}),
            allFlavors: RelValStore.getAllFlavorsForQue({date, que})
        });
    }

    doUpdateData() {
        const {date, que} = this.props.match.params;
        this.getData({date, que});
    }

    componentWillReceiveProps(newProps) {
        const {date, que} = newProps.match.params;
        this.getData({date, que});
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
        const {navigationHeight} = this.state;
        return (
            <div className={'container'} style={{paddingTop: navigationHeight + 20}}>
                <Navigation
                />
                <JSONPretty json={this.props}/>
                <JSONPretty json={queryString.parse(this.props.location.search)}/>
                <JSONPretty json={this.state}/>
            </div>
        );
    }
}

export default Layout;
