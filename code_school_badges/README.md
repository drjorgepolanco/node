#Soup to Bits: Real-Time Web with Node.JS
###Code School Screencasts
by [TJ Krusinski](https://twitter.com/tjkrusinski)

**Real-Time App that fetches Code School badges**

###About this Screencast

This Soup to Bits episode takes what you learned in Real-time Web with Node.js and gives you the next steps toward building an application from the ground up. Gregg Pollack and guest screencaster TJ Krusinski will demonstrate how to build an application that provides a live stream of Code School badges as they are earned throughout various Code School courses.

###Pub/Sub

- Fetches badges from Code School and sends to WebServer

####Dependencies

- [Axon](https://github.com/tj/axon)
- [Express](http://expressjs.com/)
- [Redis](http://redis.io/)
- [Underscore](http://underscorejs.org/)



###WebServer

- Fetches badges from Pub/Sub and display them in the browser.

####Dependencies

- [Express](http://expressjs.com/)
- [Redis](http://redis.io/)
- [Request](https://github.com/request/request)
- [Socket.io](http://socket.io/)