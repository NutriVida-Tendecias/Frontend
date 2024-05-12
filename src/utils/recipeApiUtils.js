const getQueryStringOf = (name, params) => {
    let queryString = "";

    if (!params?.length) return queryString;

    params.forEach(param => {
        queryString += `&${name}=${param}`;
    });

    return queryString;
};

const createQueryStringOldVersion = (searchParamsString) => {
    const edamamAppId = process.env.REACT_APP_EDAMAM_APP_ID;
    const edamamApiKey = process.env.REACT_APP_EDAMAM_API_KEY;
    const authString = `&app_id=${edamamAppId}&app_key=${edamamApiKey}`;

    const searchParams = new URLSearchParams(searchParamsString.replace("query", "q"));

    if (!searchParams.has("page")) {
        searchParams.set("page", 1);
    }
    
    const page = searchParams.get("page");
    searchParams.delete("page");
    searchParams.delete("currentId");
    searchParams.set("from", (page - 1) * 10);
    searchParams.set("to", page * 10);
    const queryString = `${searchParams.toString()}${authString}`;

    return queryString;
};

const createQueryStringNewVersion = (query) => {
    const edamamAppId = process.env.REACT_APP_EDAMAM_APP_ID;
    const edamamApiKey = process.env.REACT_APP_EDAMAM_API_KEY;
    const authString = `&app_id=${edamamAppId}&app_key=${edamamApiKey}`;

    const queryString = query?.trim() ? `q=${query.trim()}` : "";

    return `?type=public&${queryString}${authString}&random=true&field=uri&field=label&field=image&field=source&field=url&field=yield&field=calories&field=cuisineType&field=mealType`;
};

const createQueryStringVersionByUri = (uri) => {
    const edamamAppId = process.env.REACT_APP_EDAMAM_APP_ID;
    const edamamApiKey = process.env.REACT_APP_EDAMAM_API_KEY;
    const authString = `&app_id=${edamamAppId}&app_key=${edamamApiKey}`;

    const encodedUri = encodeURIComponent(uri);

    return `?type=public&uri=${encodedUri}${authString}&random=true&field=uri&field=label&field=image&field=source&field=url&field=dietLabels&field=healthLabels&field=yield&field=calories&field=cuisineType&field=mealType`;
};

const createMealPlanQueryString = (diets, allergies) => {
    const appId = process.env.REACT_APP_EDAMAM_MEAL_PLAN_APP_ID;
    const requestBody = {
        size: 7,
        plan: {
            accept: {
                all: [
                    { health: allergies },
                    { diet: diets } 
                ]
            },
            fit: {
                ENERC_KCAL: { max: 2000 }
            },
            sections: {
                Breakfast: {
                    accept: { all: [{ meal: ["breakfast"] }] },
                    fit: { ENERC_KCAL: { max: 600 } }
                },
                Lunch: {
                    accept: { all: [{ meal: ["lunch/dinner"] }] },
                    fit: { ENERC_KCAL: { max: 900 } }
                },
                Dinner: {
                    accept: { all: [{ meal: ["lunch/dinner"] }] },
                    fit: { ENERC_KCAL: { max: 900 } }
                }
            }
        }
    };

    const requestBodyJson = JSON.stringify(requestBody);

    const queryString = `${appId}/select`;
    return { queryString, requestBodyJson };
};

export {
    getQueryStringOf,
    createQueryStringOldVersion,
    createQueryStringNewVersion,
    createQueryStringVersionByUri,
    createMealPlanQueryString
};