const baseUrl = "http://localhost:7000/"
const url = baseUrl + "api/strongholds"

function translateStatusToErrorMessage(status: number) {
    switch (status) {
        case 401:
            return 'Not authenticated'
        case 403:
            return 'You do not have permission'
        default:
            return 'Something went wrong, please try again'
    }
}

function checkStatus(response: any) {
    if (response.ok) {
        return response;
    } else {
        const httpErrorInfo = {
            status: response.status,
            statusText: response.statusText,
            url: response.url,
        };
        console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);

        let errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
        throw new Error(errorMessage);
    }
}

const strongholdsAPI = {
    get() {
        return fetch(url)
            .then(checkStatus)
            .then(res => res.json())
    }
}

export { strongholdsAPI }