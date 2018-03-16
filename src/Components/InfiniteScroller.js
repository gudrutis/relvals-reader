import React, {Component} from "react";
import {AutoSizer, CellMeasurer, CellMeasurerCache, List} from "react-virtualized";
import JSONPretty from 'react-json-pretty';
import Table from "react-bootstrap/es/Table";

const cellMeasurerCacheConfig = {
    fixedWidth: true,
    // hard codded to match file line size
    defaultHeight: 91
};

class InfiniteScroller extends Component {
    constructor(props) {
        super(props);
        this.cache = new CellMeasurerCache(cellMeasurerCacheConfig);
        this.state = {
            data: props.data,
            location: props.location,
            headerSize: 65
        }
    }

    renderRow = ({index, parent, key, style}) => {
        const {id, passed} = this.state.data[index];
        return (
            <CellMeasurer
                key={key}
                cache={this.cache}
                parent={parent}
                columnIndex={0}
                rowIndex={index}
            >
                <div id="table" style={style}>
                    <div className="tr">
                        <div className="td">aaaaaa</div>
                        <div className="td">aaaaaa</div>
                        <div className="td">aaaaaa</div>
                        <div className="td">aaaaaa</div>
                        <div className="td">aaaaaa</div>
                        <div className="td">aaaaaa</div>
                        <div className="td">aaaaaa</div>
                        <div className="td">aaaaaa</div>
                        <div className="td">aaaaaa</div>
                        <div className="td">aaaaaa</div>
                        <div className="td">aaaaaa</div>
                        <div className="td">1</div>
                        <div className="td">aaaaaa</div>
                        <div className="td">aaaaaa</div>
                        <div className="td">4</div>
                        <div className="td">aaaaaa</div>
                        <div className="td">7</div>
                        <div className="td">aaaaaa</div>
                        <div className="td">aaaaaa</div>
                        <div className="td">aaaaaa</div>
                        <div className="td">aaaaaa</div>
                        <div className="td">aaaaaa</div>
                        <div className="td">aaaaaa</div>
                    </div>
                </div>
            </CellMeasurer>
        )
    };

    // updatePosition() {
    //     const index = this.state.currentLineSt - 1;
    //     if (index) {
    //         this.myInfiniteList.scrollToRow(index);
    //     }
    // }

    // updateGrid() {
    //     this.cache.clearAll();
    // }

    // componentDidUpdate() {
    //     this.updatePosition();
    // }

    componentDidMount() {
        this.getHeaderSize();
        window.addEventListener('resize', this.getHeaderSize.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.getHeaderSize.bind(this));
    }

    componentWillReceiveProps(newProps) {
        const {data} = newProps;
        this.setState({
            data
        });
    }

    getHeaderSize() {
        const headerHeight = document.getElementById('table-header').clientHeight;
        const headerWidth = document.getElementById('table-header').clientWidth;
        console.log(headerWidth);
        this.setState({headerHeight, headerWidth});
    }

    render() {
        // console.log(this.state.headerWidth);
        return (

            <AutoSizer>
                {
                    ({width, height}) => {
                        return (
                            <div style={{height, width}}>
                                <div id="table-header" style={{width:'auto', display:'table'}}>
                                    <div className="tr">
                                        <div className="td">a</div>
                                        <div className="td">a</div>
                                        <div className="td">a</div>
                                    </div>
                                    <div className="tr">
                                        <div className="td">aaaaaa</div>
                                        <div className="td">aaaaaa</div>
                                        <div className="td">aaaaaa</div>
                                        <div className="td">aaaaaa</div>
                                        <div className="td">aaaaaa</div>
                                        <div className="td">aaaaaa</div>
                                        <div className="td">aaaaaa</div>
                                        <div className="td">aaaaaa</div>
                                        <div className="td">aaaaaa</div>
                                        <div className="td">aaaaaa</div>
                                        <div className="td">aaaaaa</div>
                                        <div className="td">1</div>
                                        <div className="td">aaaaaa</div>
                                        <div className="td">aaaaaa</div>
                                        <div className="td">4</div>
                                        <div className="td">aaaaaa</div>
                                        <div className="td">7</div>
                                        <div className="td">aaaaaa</div>
                                        <div className="td">aaaaaa</div>
                                        <div className="td">aaaaaa</div>
                                        <div className="td">aaaaaa</div>
                                        <div className="td">aaaaaa</div>
                                        <div className="td">aaaaaa</div>
                                    </div>
                                </div>
                                <List
                                    rowCount={this.props.data.length}
                                    width={width}
                                    height={height - this.state.headerHeight - 20}
                                    deferredMeasurementCache={this.cache}
                                    rowHeight={this.cache.rowHeight}
                                    rowRenderer={this.renderRow}
                                />
                            </div>

                        )
                    }
                }
            </AutoSizer>
        );
    }
}

export default InfiniteScroller;
