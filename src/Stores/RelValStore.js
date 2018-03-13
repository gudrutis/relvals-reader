import {EventEmitter} from "events";
import dispatcher from "../dispatcher";
import * as config from "../config";
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

    _getQueData({date, que}) {
        if (this.structure) {
            try {
                return this.structure[date][que];
            } catch (ex) {
                console.error('Wrong params: ' + date + " | " + que + ' ;', ex);
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

    getFlavorStructure({date, que}) {
        if (this.structure) {
            try {
                if (!this.structure[date][que].dataLoaded) {
                    let archsToLoad = [];
                    const {flavors} = this.structure[date][que];
                    const allFlavors = this.getAllFlavorsForQue({date, que});
                    allFlavors.map(flavorName => {
                        const archs = Object.keys(flavors[flavorName]);
                        archs.map(arch => {
                            archsToLoad.push(flavors[flavorName][arch]);
                        })
                    });
                    getMultipleFiles({
                        fileUrlList: archsToLoad.map(i => urls.relValsResult(i.arch, i.date, i.que, i.flavor)),
                        onSuccessCallback: function (responseList) {
                            for (let i = 0; i < archsToLoad.length; i++) {
                                const {data} = responseList[i];
                                const {que, date, arch, flavor} = archsToLoad[i];

                                this.structure[date][que].flavors[flavor][arch] = data;
                            }
                            this.structure[date][que].dataLoaded = true;
                            this.emit("change");
                        }.bind(this)
                    });
                    return this.structure[date][que];
                }
                return this.structure[date][que];
            }
            catch
                (ex) {
                console.error('Wrong params: ' + date + " | " + que + ' ;', ex);
            }
        }
    }

    handleActions(action) {
        switch (action.type) {
            // TODO
        }
    }

}

const
    relValStore = new RelValStore;
dispatcher
    .register(relValStore

        .handleActions
        .bind(relValStore)
    )
;
export default relValStore;
