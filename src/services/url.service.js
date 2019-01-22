class UrlService {
    constructor() { }

    parseParams() {

        let splittedQueryString = location.href.split('?')[1];

        if (splittedQueryString) {
            let model = {};
            let paramsPairs = splittedQueryString.split('&');

            paramsPairs.forEach((pair) => {
                const param = pair.split('=');
                model[param[0]] = decodeURI(param[1]);
            });

            return model;
        }

        return null;
    }

    buildQueryString(searchObject) {
        var keys = Object.keys(searchObject),
            queryBuilder = '?';

        for (var prop in searchObject) {
            if (searchObject[prop]) {
                queryBuilder += `${prop}=${searchObject[prop]}&`;
            }
        }

        if (queryBuilder[queryBuilder.length - 1] === '&') {
            queryBuilder = queryBuilder.substring(0, queryBuilder.length - 1)
        }

        return queryBuilder;
    }

    fillBrowserHistory(queryString) {
        var url = location.href.split('?')[0];
        window.history.pushState({}, "", url + queryString);
    }
}

export default new UrlService();