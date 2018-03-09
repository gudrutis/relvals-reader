import {EventEmitter} from "events";
import dispatcher from "../dispatcher";
import ShowArchActionTypes from "../Actions/ShowArchActionTypes";
import config from "../config";
import {getMultipleFiles} from "../Utils/ajax";
import {getStructureFromAvalableRelVals} from "../Utils/processing";

const {urls} = config;

class RelValStore extends EventEmitter {
    constructor() {
        super();
        this._getStructure()
    }

    _getStructure() {
        getMultipleFiles({
            fileUrlList: [urls.RelvalsAvailableResults, urls.exitcodes],
            onSuccessCallback: function (responseList) {
                const relvalsAvailableResults = responseList[0].data;
                const exitCodes = responseList[1].data;
                this.structure = getStructureFromAvalableRelVals(relvalsAvailableResults);
                this.emit("change");
            }.bind(this)
        });
    }

    // getData({date, que, flavorList = [], archList = []}) {
    //     if (!this.structure) {
    //         return
    //     }
    //     let results = [];
    //     for (let i = 0; i < flavorList; i++) {
    //         for (let z = 0; z < archList; z++) {
    //
    //         }
    //     }
    //
    //     // this.structure[date][que][flavorList]
    // }

    _getQueData({date, que}) {
        if (this.structure) {
            try {
                return this.structure[date][que];
            } catch (ex) {
                console.log('Wrong params: ' + date + " | " + que);
            }
        }
    }

    getAllArchsForQue({date, que}) {
        const allQueInfo = this._getQueData({date, que});
        if (allQueInfo) {
            return allQueInfo.allArchs
        }
    }

    getAllFlavorsForQue({date, que}) {
        const allQueInfo = this._getQueData({date, que});
        if (allQueInfo) {
            return Object.keys(allQueInfo.flavors);
        }
    }


    handleActions(action) {
        switch (action.type) {
            // TODO
        }
    }
}

const relValStore = new RelValStore;
dispatcher.register(relValStore.handleActions.bind(relValStore));
export default relValStore;
