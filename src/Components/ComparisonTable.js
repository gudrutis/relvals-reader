import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {OverlayTrigger, Table, Tooltip} from "react-bootstrap";
import uuid from 'uuid';
import * as config from '../config';

const {tooltipDelayInMs, urls} = config;

function renderTooltip(cellContent, tooltipContent) {
    return (
        <OverlayTrigger key={uuid.v4()} placement="top"
                        overlay={<Tooltip id={uuid.v4()}>{tooltipContent}</Tooltip>}
                        delay={tooltipDelayInMs}>
            {cellContent}
        </OverlayTrigger>
    )
}

function renderCell(cellInfo) {
    return (
        <td key={uuid.v4()}>
            {cellInfo}
        </td>
    )
}

function renderLabel({colorType = "default", value, glyphicon, link, tooltipContent} = {}) {
    if (tooltipContent !== undefined) {
        const cellContent = (
            <a href={link} className={`btn label label-${colorType}`}>
                {glyphicon ? <span className={`glyphicon ${glyphicon}`}/> : value}
            </a>
        );
        return renderTooltip(cellContent, tooltipContent);

    } else {
        return (
            <a href={link} className={`btn label label-${colorType}`}>
                {glyphicon ? <span className={`glyphicon ${glyphicon}`}/> : value}
            </a>
        );
    }
}

class ComparisonTable extends Component {
    static propTypes = {
        data: PropTypes.array
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="table-responsive">
                <Table striped={true} bordered={true} condensed={true} hover>
                    <thead>
                    <tr>
                        <th className={'name-column'} rowSpan={2}/>
                    </tr>
                    <tr>

                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className={'name-column'}><b>Builds</b></td>
                    </tr>
                    <tr>
                        <td className={'name-column'}><b>Unit Tests</b></td>
                    </tr>
                    <tr>
                        <td className={'name-column'}><b>RelVals</b></td>
                    </tr>
                    <tr>
                        <td className={'name-column'}><b>Other Tests</b></td>
                    </tr>
                    <tr>
                        <td className={'name-column'}><b>FWLite</b></td>
                    </tr>
                    <tr>
                        <td className={'name-column'}><b>Q/A</b></td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        )
    }

}

export default ComparisonTable;
