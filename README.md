# Offline_Http_Request_Handler
In this project Im aiming to build a module that handles HTTP requests while the client is offline. This module should
enable options such as pending requests offline and invoking them again as soon as a connection triggred with the 
server. It should also enable the client to cancel the requests while being offline in order to remove them them from
pending list. This module has to be as flexible as possible such that every JavaScript client side libraries/frameworks (including mobile development ones) could use it. This means that while being framework independent, it should have a constant storage solution for both browser and mobile apps.
