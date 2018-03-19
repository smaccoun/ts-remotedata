import {RemoteData, WebData} from "../src/RemoteData";
import {remoteRequest} from "../src/RequestUtil";

const GET_METHOD = "GET"

const GET_HEADER =
    {
        method: GET_METHOD
        , headers: {Accept: 'application/json'}
    }



function doWithResult() {
    const result: WebData<string> = remoteRequest("'https://jsonplaceholder.typicode.com/posts/1'", GET_HEADER)

    switch(result){

    }
}


