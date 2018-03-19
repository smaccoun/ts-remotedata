export type RemoteData<a,e> = Success<a> | Failure<e> | Loading | NotAsked
export type WebData<a> = Success<a> | Failure<RemoteError> | Loading | NotAsked

export enum RemoteDataC {
    SUCCESS = 'SUCCESS',
    FAILURE = 'FAILURE',
    LOADING = 'LOADING',
    NOT_ASKED = 'NOT_ASKED'
}

interface Success<a> {
    type: RemoteDataC.SUCCESS
    data: a
}

interface Failure<e> {
    type: RemoteDataC.FAILURE
    error: e
}



interface Loading {
    type: RemoteDataC.LOADING
}

interface NotAsked {
    type: RemoteDataC.NOT_ASKED
}



/** Response Types **/

export interface HttpResponse {
    url: string
    status: Status
}

interface Status {
    code: number
    message: string
}

/** Error Types **/

export enum RemoteErrorC {
    NETWORK_ERROR = 'NETWORK_ERROR',
    TIMEOUT = 'TIMEOUT',
    BAD_STATUS = 'BAD_STATUS'
}

interface BadStatus {
    type: RemoteErrorC.BAD_STATUS
    response: HttpResponse
}

interface NetworkError {
    type: RemoteErrorC.NETWORK_ERROR
}

interface TimeOut {
    type: RemoteErrorC.TIMEOUT
}

export type RemoteError = NetworkError | TimeOut | BadStatus
