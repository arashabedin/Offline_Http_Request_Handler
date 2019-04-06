# Offline_Http_Request_Handler
In this project it is intended to build a module that handles HTTP requests while the client is offline. This module should
enable options such as pending requests offline and invoking them again as soon as a connection is happened again with the 
server. It should also enable the client to cancel the requests while being offline to remove them them from
pending list. This module has to be as flexible as possible such that every JavaScript client side libraries/frameworks (including mobile development ones) could use it. This means that while being framework independent, it should also have a constant storage solution for both browser and mobile apps.
