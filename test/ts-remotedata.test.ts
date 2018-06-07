import {remoteRequest, remoteFetch} from "../src/RequestUtil"
import { RemoteDataC, RemoteErrorC } from "../src/RemoteData";
import { makeRe } from "minimatch";

beforeEach(function() {

  global.fetch = jest.fn().mockImplementation((url, requestHttpInfo) => {
      var p = new Promise((resolve, reject) => {
        resolve({
          ok: true, 
          Id: '123', 
          json: function() { 
            return {Id: '123'}
          }
        });
      });

      return p;
  });

});


test('invalid url returns BadStatus 404', async () => {
  const BAD_URL = 'www.thisisnotarealurlshouldreturn404.bad' 
  const getMethod = { method: 'GET', headers: null} 
  expect.assertions(2);
  const makeRemoteFetch = () => {
      return new Promise((resolve, reject) => 
      {
        let result = remoteFetch(BAD_URL, getMethod)
        console.log(result)
        expect(result).toEqual({type: RemoteDataC.LOADING})
        resolve(result)

      })
  }

  let r = await makeRemoteFetch()
  expect(r).toEqual({type: RemoteDataC.FAILURE, error: {type: RemoteErrorC.BAD_STATUS}})

});
