const buildUrlFromParams = (paramsObject) => {
    const urlParamsEmpty = new URLSearchParams();
    for (const key in paramsObject) {
        const value = paramsObject[key];
        if (Array.isArray(value)) {
            value.forEach((val) => {
                urlParamsEmpty.append(key, val);
            });
        } else {
            urlParamsEmpty.append(key, value);
        }
    }
    return '?' + urlParamsEmpty.toString();
};


const getUrlParams = () => {
    const params = {};
    const urlParams = new URLSearchParams(window.location.search);
    for (const [key, value] of urlParams.entries()) {
      if (params[key]) {
        if (!Array.isArray(params[key])) {
          params[key] = [params[key]];
        }
        params[key].push(value);
      } else {
        params[key] = value;
      }
    }
    return params;
  };