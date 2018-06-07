import {HttpResponse, RemoteData, RemoteDataC, RemoteError, RemoteErrorC, WebData} from "./RemoteData";
import { request } from "http";

export interface Get_HTTP {
    method: string
    headers: any
}

export interface Mutate_HTTP {
    method: string
    headers: any
    body: any
}

export type REQUEST_HTTP = Get_HTTP | Mutate_HTTP

const RETURN_STATUSES = [200, 422, 401, 500]

export function remoteRequestPromise<a>(url: string, requestHttpInfo: REQUEST_HTTP): Promise<WebData<a>> {
    return new Promise((resolve, reject) => {
        fetch(url, requestHttpInfo)
            .then(response => {
                const {status} = response
                if (RETURN_STATUSES.includes(status)) {
                    response.json()
                        .then(body => {
                            resolve(mapHttpStatuses(url, status, body))
                        })
                } else{
                    throw new Error()
                }
            })
            .catch(error => {
                const remoteError: WebData<RemoteError> =  
                     { type: RemoteDataC.FAILURE 
                     , error: {type: RemoteErrorC.NETWORK_ERROR} 
                     }
                resolve(remoteError)
            })
    })

}


export function remoteRequest<a>(url: string, requestHttpInfo: REQUEST_HTTP): any {
    return {
        handle: () => {
            let requestResult: WebData<a> = {type: RemoteDataC.NOT_ASKED}
            return {
                initialState: requestResult,
                remoteFetch
                }
            }
        }
}


export function remoteFetch<a>(url: string, requestHttpInfo: REQUEST_HTTP): any {
    let requestResult = {type: RemoteDataC.LOADING}
    const sendRemoteRequest: Promise<WebData<a>> =  remoteRequestPromise(url, requestHttpInfo)
    sendRemoteRequest
        .then(result => requestResult = result)

    return requestResult
}



function mapHttpStatuses<a>(url: string, resultStatus: number, body: a): WebData<a> {
    if (resultStatus == 200) {
        return {type: RemoteDataC.SUCCESS, data: body}
    }
    else {
        const errorResponse: HttpResponse = {url, status: {code: resultStatus, message: "Bad status"}}
        const error: RemoteError = {type: RemoteErrorC.BAD_STATUS, response: errorResponse}
        return {type: RemoteDataC.FAILURE, error}
    }
}
