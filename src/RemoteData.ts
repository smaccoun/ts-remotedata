export enum RemoteDataC {
    SUCCESS = 'SUCCESS',
    FAILURE = 'FAILURE',
    LOADING = 'LOADING',
    NOT_ASKED = 'NOT_ASKED'
}

interface Success {
    type: RemoteDataC.SUCCESS
    data: any
}

interface Failure {
    type: RemoteDataC.FAILURE
    error: RemoteError
}



interface Loading {
    type: RemoteDataC.LOADING
}

interface NotAsked {
    type: RemoteDataC.NOT_ASKED
}


export type RemoteData = Success | Failure | Loading | NotAsked


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
