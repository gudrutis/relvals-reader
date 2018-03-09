import _ from 'underscore';

/**
 *  In this modules functions for pre-processing data are stored.
 */

export function groupAndTransformIBDataList(data) {
    let x = _.map(data, _getComparisons);
    x = _.flatten(x, true);
    x = _.groupBy(x, 'next_ib');
    let grouped = _.map(_.groupBy(x['false'], 'ib_date'), function (item, key) {
        return {dateKey: key, data: item};
    });
    let result = x['true'] !== undefined ? [x['true']] : [];
    let groupedArray = _.map(_.sortBy(grouped, 'dateKey').reverse(), function (item) {
        return item.data;
    });
    result = result.concat(groupedArray);
    return result;
}

function _getComparisons(listEl) {
    return _.map(listEl.comparisons, function (comparison) {
        return comparison;
    });
}

export function getAllArchitecturesFromIBGroup(IBGroup) {
    let a = _.map(IBGroup, function (item) {
        return item.tests_archs;
    });
    a = _.flatten(a, true);
    a = _.uniq(a);
    return a;
}

function _filterArchs(archs, activeArchs) {
    return _.filter(archs, (arch) => {
        const [os, cpu, compiler] = arch.split('_');
        return activeArchs['os'].indexOf(os) > -1 && activeArchs['cpu'].indexOf(cpu) > -1
            && activeArchs['compiler'].indexOf(compiler) > -1;
    });
}

export function getAllActiveArchitecturesFromIBGroupByFlavor(IBGroup, activeArchs) {
    let a = _.map(IBGroup, function (ib) {
        const filteredArchs = _filterArchs(ib.tests_archs, activeArchs);

        return {
            flavor: ib.release_queue,
            name: ib.release_name,
            archs: filteredArchs,
            cmsdistTags: ib.cmsdistTags,
            current_tag: getCurrentIbTag(ib)
        };
    });
    a = _.flatten(a, true);
    a = _.uniq(a);
    return a;
}

export function extractInfoFromArchs(archList) {
    archList = _.filter(archList, (arch) => arch !== undefined);
    let infoObject = {
        'os': [],
        'cpu': [],
        'compiler': []
    };
    archList.map(
        (arch) => {
            const results = arch.split("_");
            infoObject['os'].push(results[0]);
            infoObject['cpu'].push(results[1]);
            infoObject['compiler'].push(results[2]);
        }
    );
    return {
        'os': _.uniq(infoObject['os']),
        'cpu': _.uniq(infoObject['cpu']),
        'compiler': _.uniq(infoObject['compiler']),
    };
}

/**
 * general utility functions
 */
export function getCurrentIbTag(ib) {
    return ib.compared_tags.split("-->")[1]
}

export function getPreviousIbTag(ib) {
    return ib.compared_tags.split("-->")[0]
}

export function checkIfTableIsEmpty({fieldsToCheck = [], IBGroup = []}) {
    for (let i = 0; i < IBGroup.length; i++) {
        let ib = IBGroup[i];
        for (let i = 0; i < fieldsToCheck.length; i++) {
            let field = fieldsToCheck[i];
            if (!(ib[field] === undefined || ib[field].length === 0 )) {
                return false // there are some data in the table
            }
        }
    }
    return true // fields are empty
}

export function checkIfCommitsAreEmpty({IBGroup = []}) {
    for (let i = 0; i < IBGroup.length; i++) {
        let ib = IBGroup[i];
        if (!(ib['merged_prs'] === undefined || ib['merged_prs'].length === 0 )) {
            return false // there are commits
        }
    }
    return true // there are no commits
}

// keeping short display name for an object
let displayNameCache = {};

export function getDisplayName(name) {
    // TODO could be writen as service and load json
    let lookUp = displayNameCache[name];
    if (lookUp) {
        return lookUp;
    } else {
        let re = /^[a-zA-Z]+_[0-9]+_[0-9]+_/g; // will match 'CMSSW_10_0_'
        let result = name.replace(re, '');
        if (result === 'X') {
            displayNameCache[name] = 'DEFAULT';
            return 'DEFAULT'
        } else {
            displayNameCache[name] = result;
            return result;
        }
    }
}

export function getStructureFromAvalableRelVals(relvalInfoObject) {
    let re = /^([a-zA-Z]+_[0-9]+_[0-9])+_(.*)_(\d{4}-\d{2}-\d{2}-\d{4})/;  //CMSSW_5_3 _X _ 2018-03-04-0000
    const keysList = Object.keys(relvalInfoObject);
    let config = {};
    keysList.map((key) => {
        const [org, que, flavor, date] = key.match(re);
        const archs = relvalInfoObject[key].split(',');
        if (!config[date]) {
            config[date] = {}
        }
        if (!config[date][que]) {
            config[date][que] = {
                flavors: {},
                allArchs: []
            }
        }
        config[date][que].flavors[flavor] = {};
        archs.map(arch => {
            config[date][que].flavors[flavor][arch] = undefined;
        });
        config[date][que].allArchs = _.uniq(config[date][que].allArchs.concat(archs));
    });
    return config;
}

