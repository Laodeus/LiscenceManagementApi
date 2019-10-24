# Mongo3dLiscenceManagementApi

crud
----

**post /user**  
***Create a new user***  

****params****  
email:string mandatory unique  
password: string mandatory  
name: string otional  

response =>  
token :  token  

Public route.  
anyone can crate a user  

**post /login**  
***login as an existing user***  

****params****  
email: string mandatory  
password: string mandatory  

response =>  
token :  token  

Public route.  
return the authentification token  

**delete /user**  
***mark a user as deleted***  

****params****   
id: int mandatory  

response =>  
confirmation : string  

admin or user (himself) route.  
return a confirmation or a error a the deletion of the user.  

**put /user**  
***Modify a existing user***  

****params****   
id :  int mandatory  
email :  string optional  
password :  string optional  
role = :  string optional  
name = :  string optional  

admin or user (himself) route.  
admin can modify all the information of any users.  
user can modify all his information except the role  
only an admin can modify a role.  
return a confirmation or a error a the deletion of the user.  

**post /liscence**  
***Create a unique liscence***  

****params****   
id :  id optional  

if an id is provided, the liscence will be linked to this id,  
if no id is provided, the id will be linked in the token authenticate id.  

return a liscence or an error  

**get /liscence**  
***list the liscence***  

****params****   
id : int optional  
offset : int optional (default:0)  
limit : int optional (default:0)  

this route is only reachable by an admin.  

if an id is provided, the list will be filled only with the liscence of this owner id.  
if not, if an offset is provided, the list will be filled with the liscence at the position provided at the offset.  

if an id and an offset is provided, the list will be if an id is provided, the list will be filled only with the liscence of this owner id.  
starting a the position of the offset provided.  

if a limit is provided, the number of entries returned will max the number provided.  

**put /liscence**  
***display, add delete and clear the data linked to the licence***  

****params****   
id : int mandatory  
clear : boolean optional (default false) 
delete : array optional
add : object optional


this route is only reachable by an admin or the user himself.
if only an id is provided, will return the data object without any modification

if clear is setted to true, it will clear the object.
clear is the first params, so it will be effective before add and delete.

if a delete array is provided, it will search the key provided in the data object, if the key exist, it will delete the pair key-value.
delete is the second params to take it's effect.

if add is provided, the object will be added to the existing key.
if a key already exist, it will overide it's value to the value provided.

 