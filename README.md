# Mongo3dLiscenceManagementApi

crud
----

post /user (
    Create a new user
(urlEncoded)
email:[string][mandatory][unique]
password:[string][mandatory]
name:[string][otional]

response =>
token : [token]

get /user
(urlEncoded)
email:[string][mandatory]
password:[string][mandatory]

response =>
token : [token]

delete /user
(urlEncoded)
email || id

response =>
status : [string]