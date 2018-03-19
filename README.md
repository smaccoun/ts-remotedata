# ts-remotedata
Typescript version of [Elm RemoteData package](http://package.elm-lang.org/packages/krisajenkins/remotedata/4.3.3/RemoteData)

### Currently WIP!

## Why?

Handling http requests and all possible outcomes is a challenge in javascript.
This package provides a typesafe and clean way to handle everything from a successful response to a 422 to a network error.

Will allow you to do things like...


```
    const sampleApiUrl = "https://jsonplaceholder.typicode.com/posts/1"
    let result: WebData<User>;
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
```

## API

```
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
