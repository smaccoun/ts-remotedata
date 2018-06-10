import {error404, remoteRequest} from "../src/RequestUtil"
import { loading, notAsked, RemoteDataC, RemoteErrorC, WebData } from "../src/RemoteData";
import { makeRe } from "minimatch";

const BAD_URL = 'www.thisisnotarealurlshouldreturn404.bad' 
const getMethod = { method: 'GET', headers: null}

beforeEach(function() {

  global.fetch = jest.fn().mockImplementation((url, requestHttpInfo) => {
      var p = new Promise((resolve, reject) => {
        resolve({
          ok: false, 
          status: 404,
          json: function() { 
            return new Promise((resolve, reject) => {
              resolve({message: 'Invalid URL'})
            })
          }
      });
    })

      return p;
  });

});


test('invalid url returns BadStatus 404', async () => {
  let r = {type: RemoteDataC.NOT_ASKED}
  let allStates = [r]

  const updateR = (res: WebData<any>) => {
    allStates = allStates.concat(res)
  }
  const req = await remoteRequest(BAD_URL, getMethod).fork(updateR)
  expect(allStates).toEqual([notAsked, loading, error404(BAD_URL)])

});
