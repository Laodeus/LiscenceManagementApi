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

Public route.
anyone can crate a user

post /login
(urlEncoded)
email:[string][mandatory]
password:[string][mandatory]

response =>
token : [token]

Public route.
return the authentification token

delete /user
(urlEncoded)
id:[int][mandatory]

response =>
confirmation : [string]

admin or user (himself) route.
return a confirmation or a error a the deletion of the user.

put /user
id : [int][mandatory]
email : [string][optional]
password : [string][optional]
role = : [string][optional]
name = : [string][optional]

admin or user (himself) route.
admin can modify all the information of any users.
user can modify all his information except the role
only an admin can modify a role.
return a confirmation or a error a the deletion of the user.