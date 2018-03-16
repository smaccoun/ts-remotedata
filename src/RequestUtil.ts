import {HttpResponse, RemoteData, RemoteDataC, RemoteError, RemoteErrorC} from "./RemoteData";

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


function remoteRequest(url: string, requestHttpInfo: REQUEST_HTTP): RemoteData {
    let remoteData: RemoteData = {type: RemoteDataC.LOADING}

    fetch(url, requestHttpInfo)
        .then(response => {
            const {status} = response
            const returnStatuses = [200, 422, 401, 500]
            if (returnStatuses.includes(status)) {
                response.json()
                    .then(body => {
                        remoteData = mapHttpStatuses(url, status, body)
                    })
            }
        })
        .catch(error => {
            remoteData = {type: RemoteDataC.FAILURE, error: {type: RemoteErrorC.NETWORK_ERROR}}
        })

    return remoteData
}

function mapHttpStatuses(url: string, status: number, body: any): RemoteData {
    if (status == 200) {
        return {type: RemoteDataC.SUCCESS, data: body}
    }
    else {
        const errorResponse: HttpResponse = {url, status: {code: status, message: body}}
        const error: RemoteError = {type: RemoteErrorC.BAD_STATUS, response: errorResponse}
        return {type: RemoteDataC.FAILURE, error}
    }
}
