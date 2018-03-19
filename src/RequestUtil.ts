import {HttpResponse, RemoteData, RemoteDataC, RemoteError, RemoteErrorC, WebData} from "./RemoteData";

interface Get_HTTP {
    method: string
    headers: any
}

interface Mutate_HTTP {
    method: string
    headers: any
    body: any
}

type REQUEST_HTTP = Get_HTTP | Mutate_HTTP


export function remoteRequest<a>(url: string, requestHttpInfo: REQUEST_HTTP): WebData<a> {
    let requestResult: WebData<a> = {type: RemoteDataC.LOADING}

    fetch(url, requestHttpInfo)
        .then(response => {
            const {status} = response
            const returnStatuses = [200, 422, 401, 500]
            if (returnStatuses.includes(status)) {
                response.json()
                    .then(body => {
                        requestResult = mapHttpStatuses(url, status, body)
                    })
            }
        })
        .catch(error => {
            requestResult = {type: RemoteDataC.FAILURE, error: {type: RemoteErrorC.NETWORK_ERROR}}
        })

    return requestResult
}

function mapHttpStatuses<a>(url: string, status: number, body: any): WebData<a> {
    if (status == 200) {
        return {type: RemoteDataC.SUCCESS, data: body}
    }
    else {
        const errorResponse: HttpResponse = {url, status: {code: status, message: body}}
        const error: RemoteError = {type: RemoteErrorC.BAD_STATUS, response: errorResponse}
        return {type: RemoteDataC.FAILURE, error}
    }
}
