/*
Copyright 2015, 2019 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

// Incrementing OFFLINE_VERSION will kick off the install event and force
// previously cached resources to be updated from the network.
const OFFLINE_VERSION = 1
var CACHE_VERSION = 1
var CURRENT_CACHES = {
  "read-through": "read-through-cache-v" + CACHE_VERSION,
}
const CACHE_NAME = "offline"
// Customize this with a different URL if needed.
const OFFLINE_URL = "/"

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME)
      // Setting {cache: 'reload'} in the new request will ensure that the response
      // isn't fulfilled from the HTTP cache; i.e., it will be from the network.
      await cache.add(new Request(OFFLINE_URL, { cache: "reload" }))
    })()
  )
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // Enable navigation preload if it's supported.
      // See https://developers.google.com/web/updates/2017/02/navigation-preload
      if ("navigationPreload" in self.registration) {
        await self.registration.navigationPreload.enable()
      }
    })()
  )

  // Tell the active service worker to take control of the page immediately.
  self.clients.claim()
})

self.addEventListener("fetch", (event) => {
  // We only want to call event.respondWith() if this is a navigation request
  // for an HTML page.
  if (event.request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          // First, try to use the navigation preload response if it's supported.
          const preloadResponse = await event.preloadResponse
          if (preloadResponse) {
            return preloadResponse
          }

          const networkResponse = await fetch(event.request)
          return networkResponse
        } catch (error) {
          // catch is only triggered if an exception is thrown, which is likely
          // due to a network error.
          // If fetch() returns a valid HTTP response with a response code in
          // the 4xx or 5xx range, the catch() will NOT be called.
          console.log("Fetch failed; returning offline page instead.", error)

          const cache = await caches.open(CACHE_NAME)
          const cachedResponse = await cache.match(OFFLINE_URL)
          return cachedResponse
        }
      })()
    )
  }

  // If our if() condition is false, then this fetch handler won't intercept the
  // request. If there are any other fetch handlers registered, they will get a
  // chance to call event.respondWith(). If no fetch handlers call
  // event.respondWith(), the request will be handled by the browser as if there
  // were no service worker involvement.
})


self.addEventListener("activate", function (event) {
  // Delete all caches that aren't named in CURRENT_CACHES.
  // While there is only one cache in this example, the same logic will handle the case where
  // there are multiple versioned caches.
  var expectedCacheNames = Object.keys(CURRENT_CACHES).map(function (key) {
    return CURRENT_CACHES[key]
  })

  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (expectedCacheNames.indexOf(cacheName) === -1) {
            // If this cache name isn't present in the array of "expected" cache names, then delete it.
            console.log("Deleting out of date cache:", cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

// This sample illustrates an aggressive approach to caching, in which every valid response is
// cached and every request is first checked against the cache.
// This may not be an appropriate approach if your web application makes requests for
// arbitrary URLs as part of its normal operation (e.g. a RSS client or a news aggregator),
// as the cache could end up containing large responses that might not end up ever being accessed.
// Other approaches, like selectively caching based on response headers or only caching
// responses served from a specific domain, might be more appropriate for those use cases.
self.addEventListener("fetch", function (event) {
  console.log("Handling fetch event for", event.request.url)

  event.respondWith(
    caches.open(CURRENT_CACHES["read-through"]).then(function (cache) {
      return cache
        .match(event.request)
        .then(function (response) {
          if (response) {
            // If there is an entry in the cache for event.request, then response will be defined
            // and we can just return it.
            console.log(" Found response in cache:", response)

            return response
          }

          // Otherwise, if there is no entry in the cache for event.request, response will be
          // undefined, and we need to fetch() the resource.
          console.log(
            " No response for %s found in cache. " +
              "About to fetch from network...",
            event.request.url
          )

          // We call .clone() on the request since we might use it in the call to cache.put() later on.
          // Both fetch() and cache.put() "consume" the request, so we need to make a copy.
          // (see https://fetch.spec.whatwg.org/#dom-request-clone)
          return fetch(event.request.clone()).then(function (response) {
            console.log(
              "  Response for %s from network is: %O",
              event.request.url,
              response
            )

            // Optional: add in extra conditions here, e.g. response.type == 'basic' to only cache
            // responses from the same domain. See https://fetch.spec.whatwg.org/#concept-response-type
            if (response.status < 400) {
              // This avoids caching responses that we know are errors (i.e. HTTP status code of 4xx or 5xx).
              // One limitation is that, for non-CORS requests, we get back a filtered opaque response
              // (https://fetch.spec.whatwg.org/#concept-filtered-response-opaque) which will always have a
              // .status of 0, regardless of whether the underlying HTTP call was successful. Since we're
              // blindly caching those opaque responses, we run the risk of caching a transient error response.
              //
              // We need to call .clone() on the response object to save a copy of it to the cache.
              // (https://fetch.spec.whatwg.org/#dom-request-clone)
              cache.put(event.request, response.clone())
            }

            // Return the original response object, which will be used to fulfill the resource request.
            return response
          })
        })
        .catch(function (error) {
          // This catch() will handle exceptions that arise from the match() or fetch() operations.
          // Note that a HTTP error response (e.g. 404) will NOT trigger an exception.
          // It will return a normal response object that has the appropriate error code set.
          console.error("  Read-through caching failed:", error)

          throw error
        })
    })
  )
})
