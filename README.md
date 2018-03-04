# ts-remotedata
Typescript version of Elm RemoteData package

Currently WIP

##Why?

Handling http requests and all possible outcomes is a challenge in javascript.
This package provides a typesafe and clean way to handle everything from a successful response to a 422 to a network error.

##API

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