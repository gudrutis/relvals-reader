import * as React from "react";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import {ButtonToolbar, DropdownButton, MenuItem} from "react-bootstrap";

let products = [{
    id: 1,
    name: "Item name 1",
    price: 100
}, {
    id: 2,
    name: "Item name 2",
    price: 100
}, {
    id: 2,
    name: "Item name 2",
    price: 100
}, {
    id: 2,
    name: "Item name 2",
    price: 100
}, {
    id: 2,
    name: "Item name 2",
    price: 100
}, {
    id: 2,
    name: "Item name 2",
    price: 100
}, {
    id: 2,
    name: "Item name 2",
    price: 100
}, {
    id: 2,
    name: "Item name 2",
    price: 100
}, {
    id: 2,
    name: "Item name 2",
    price: 100
}, {
    id: 2,
    name: "Item name 2",
    price: 100
}, {
    id: 2,
    name: "Item name 2",
    price: 100
}, {
    id: 2,
    name: "Item name 2",
    price: 100
}, {
    id: 2,
    name: "Item name 2",
    price: 100
}, {
    id: 2,
    name: "Item name 2",
    price: 100
}, {
    id: 2,
    name: "Item name 2",
    price: 100
}, {
    id: 2,
    name: "Item name 2",
    price: 100
}, {
    id: 2,
    name: "Item name 2",
    price: 100
}, {
    id: 2,
    name: "Item name 2",
    price: 100
}, {
    id: 2,
    name: "Item name 2",
    price: 100
}, {
    id: 2,
    name: "Item name 2",
    price: 100
}, {
    id: 2,
    name: "Item name 2",
    price: 100
}, {
    id: 2,
    name: "Item name 2",
    price: 100
}, {
    id: 2,
    name: "Item name 2",
    price: 100
}, {
    id: 2,
    name: "Item name 2",
    price: 100
}, {
    id: 2,
    name: "Item name 2",
    price: 100
}, {
    id: 2,
    name: "Item name 2",
    price: 100
}, {
    id: 2,
    name: "Item name 2",
    price: 100
}, {
    id: 2,
    name: "Item name 2",
    price: 100
}, {
    id: 2,
    name: "Item name 2",
    price: 100
}, {
    id: 2,
    name: "Item name 2",
    price: 100
}, {
    id: 2,
    name: "Item name 2",
    price: 100
}, {
    id: 2,
    name: "Item name 2",
    price: 100
}, {
    id: 2,
    name: "Item name 2",
    price: 100
}, {
    id: 2,
    name: "Item name 2",
    price: 100
}, {
    id: 2,
    name: "Item name 2",
    price: 100
}, {
    id: 2,
    name: "Item name 2",
    price: 100
}, {
    id: 2,
    name: "Item name 2",
    price: 100
}, {
    id: 2,
    name: "Item name 2",
    price: 100
}, {
    id: 2,
    name: "Item name 2",
    price: 100
}, {
    id: 2,
    name: "Item name 2",
    price: 100
}, {
    id: 2,
    name: "Item name 2",
    price: 100
}, {
    id: 2,
    name: "Item name 2",
    price: 100
}, {
    id: 2,
    name: "Item name 2",
    price: 100
}, {
    id: 2,
    name: "Item name 2",
    price: 100
}, {
    id: 2,
    name: "Item name 2",
    price: 100
}, {
    id: 2,
    name: "Item name 2",
    price: 100
}];

function priceFormatter(cell, row) {
    return (
        <ButtonToolbar>
            <DropdownButton
                bsSize="xsmall"
                title="Extra small button"
                id="dropdown-size-extra-small"
            >
                <MenuItem eventKey="1">Action</MenuItem>
                <MenuItem eventKey="2">Another action</MenuItem>
                <MenuItem eventKey="3">Something else here</MenuItem>
                <MenuItem divider/>
                <MenuItem eventKey="4">Separated link</MenuItem>
            </DropdownButton>
        </ButtonToolbar>
    )

}

class ExpandRow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BootstrapTable insertRow exportCSV data={products}
                            tableStyle={{border: '#0000FF 2.5px solid'}}
                            containerStyle={{border: '#FFBB73 2.5px solid'}}
                            headerStyle={{border: 'red 1px solid'}}
                            bodyStyle={{border: 'green 1px solid'}}>
                <TableHeaderColumn dataField='id' isKey={true}>Product ID</TableHeaderColumn>
                <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
                <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
            </BootstrapTable>
        )
    }

}

export default ExpandRow;
