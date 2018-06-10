# ts-remotedata
Simple, zero dependency Typescript version of [Elm RemoteData package](http://package.elm-lang.org/packages/krisajenkins/remotedata/4.3.3/RemoteData)

### Currently WIP!

## Why?

Handling http requests and all possible outcomes is a challenge in javascript.
This package provides a typesafe and clean way to handle everything from a successful response to a 422 to a network error.

Will allow you to do things like...


```typescript
    import {error404, requestState, remoteRequest} from "ts-remotedata/remote-request"

    const SAMPLE_API_URL = "https://jsonplaceholder.typicode.com/posts/1"
    let remotePost = requestState();    // getter and setter of WebData<any>;
    const req = remoteRequest(SAMPLE_API_URL, GET_HEADER).fork(remotePost.set)

    switch(remotePost.getValue().type){
        case RemoteDataC.SUCCESS:
            console.log("SUCCESS! " , remotePost.getValue().data)
            break;
        case RemoteDataC.FAILURE:
            console.log("FAILURE: " , remotePost.getValue().error)
        case RemoteDataC.LOADING:
            console.log("LOADING....")
            break;
        case RemoteDataC.NOT_ASKED:
            console.log("NOT ASKED ")
            break;
    }
```

## API

```typescript
  type RemoteData a RemoteError =
       Success a
     | Error e
     | Loading
     | NotAsked
     
  type RemoteError =
      NetworkError
    | BadStatus Status
    
  interface Status {
    code: number
    message: string 
  }
```