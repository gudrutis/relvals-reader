import {getCurrentIbTag} from "./Utils/processing";

export default {
    tooltipDelayInMs: 200,
    urls: {
        exitcodes: "https://cms-sw.github.io/exitcodes.json",
        RelvalsAvailableResults: "https://cms-sw.github.io/data/RelvalsAvailableResults.json",
        relValsResult: (arch, date, flavor) => `https://cms-sw.github.io/data/relvals/"${arch}/${date}/${flavor}.json`
    },

    // Color coding
    // Help message config
    // Default hidden archs
};
