import {error404, requestState, remoteRequest} from "../src/remote-request"
import { loading, notAsked, RemoteDataC, RemoteErrorC, WebData } from "../src/remote-data";
import { makeRe } from "minimatch";

const BAD_URL = 'www.thisisnotarealurlshouldreturn404.bad' 
const GOOD_URL = 'www.validurl.com' 
const getMethod = { method: 'GET', headers: null}

function mapMockRequest(url: string){
  switch(url){
    case BAD_URL:
      return (
          {
            ok: false, 
            status: 404,
            json: function() { 
              return new Promise((resolve, reject) => {
                resolve({message: 'Invalid URL'})
              })
            }
        }
      )
    case GOOD_URL:
      return (
            {
              ok: true, 
              status: 200,
              json: function() { 
                return new Promise((resolve, reject) => {
                  resolve({stuff: 'some valid fake stuff'})
                })
              }
          }
      )
    default: 
      return (
            {
              ok: true, 
              status: 200,
              json: function() { 
                return new Promise((resolve, reject) => {
                  resolve({stuff: 'some valid fake stuff'})
                })
              }
          }
      )
  }
}

beforeEach(function() {

  global.fetch = jest.fn().mockImplementation((url, requestHttpInfo) => {
      var p = new Promise((resolve, reject) => {
        resolve(mapMockRequest(url));
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


test('default valid request', async () => {
  let r = requestState() 
  const req = await remoteRequest(GOOD_URL, getMethod).fork(r.set)
  expect(r.getValue()).toEqual({type: RemoteDataC.SUCCESS, data: {stuff: 'some valid fake stuff'}})

});
