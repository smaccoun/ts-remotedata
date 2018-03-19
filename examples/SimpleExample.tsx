import {RemoteData, RemoteDataC, RemoteErrorC, WebData} from "../src/RemoteData";
import {remoteRequest} from "../src/RequestUtil";

const GET_METHOD = "GET"

const GET_HEADER =
    {
        method: GET_METHOD
        , headers: {Accept: 'application/json'}
    }


function doWithResult() {
    const sampleApiUrl = "https://jsonplaceholder.typicode.com/posts/1"
    let result: WebData<string>;
    result = remoteRequest(sampleApiUrl, GET_HEADER)

    switch(result.type){
        case RemoteDataC.SUCCESS:
            console.log("SUCCESS! " , result.data)
            break;
        case RemoteDataC.FAILURE:
            console.log("FAILURE: " , result.error)
        case RemoteDataC.LOADING:
            console.log("LOADING....")
            break;
        case RemoteDataC.NOT_ASKED:
            console.log("NOT ASKED ")
            break;
    }
}


