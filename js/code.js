var urlBase = 'http://mycontacts.studio/LAMPAPI'
var extension = 'php';

var userId = 0; 
var contactId = 0;
var firstName = "";
var lastName = "";

function doLogin()
{
	userId = 0;
	firstName = "";
	lastName = "";
	
	var login = document.getElementById("loginName").value;
	var password = document.getElementById("loginPassword").value;
	var hash = md5( password );
	
	document.getElementById("loginResult").innerHTML = "";

//	var jsonPayload = '{"login" : "' + login + '", "password" : "' + hash + '"}';
	var jsonPayload = '{"login" : "' + login + '", "password" : "' + hash + '"}';
	var url = urlBase + '/Login.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				var jsonObject = JSON.parse( xhr.responseText );
		
				userId = jsonObject.userId;
				console.log(userId);
				if( userId < 1 )
				{
					document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
					return;
				}
		
				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;

				saveCookie();
	
				window.location.href = "main.html";
			}
		};
		
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

function doRegister()
{
	userId = 0;
	firstName = "";
	lastName = "";
	
	var login = document.getElementById("loginName").value;
	var password = document.getElementById("loginPassword").value;
  	var confirmPassword = document.getElementById("confirmPassword").value;
  	firstName = document.getElementById("firstName").value;
  	lastName = document.getElementById("lastName").value;
 	 var hash = md5( password );
	
	document.getElementById("registerResult").innerHTML = "";

//	var jsonPayload = '{"login" : "' + login + '", "password" : "' + hash + '"}';
	var jsonPayload = '{"login" : "' + login + '", "password" : "' + hash + '", "firstName" : "' + firstName + '", "lastName" : "' + lastName + '", "email" : "' + email + '"}';
	var url = urlBase + '/Register.' + extension;
 
 if (confirmPassword != password) {
   document.getElementById("registerResult").innerHTML = "Passwords do not match, please try again";
   return;
 }

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
   		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				var jsonObject = JSON.parse( xhr.responseText );
		
				id = jsonObject.id;
		
				if( id < 1 )
				{
					document.getElementById("registerResult").innerHTML = jsonObject.message;
					return;
				}

        doLogin();
				saveCookie();
	
				window.location.href = "main.html";
			}
		};
		
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("registerResult").innerHTML = err.message;
	}

}

function saveCookie()
{
	var minutes = 20;
	var date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ",contactId=" + contactId;"expires=" + date.toGMTString();
}

function readCookie()
{
	userId = -1;
	var data = document.cookie;
	var splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		var thisOne = splits[i].trim();
		var tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
   else if( tokens[0] == "contactId" )
		{
			contactId = parseInt( tokens[1].trim() );
		}
	}
	
	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
		document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
	}
}

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}
function loginDisappear()
{
  document.getElementById("showLogin").style.display = "none";
  document.getElementById("showRegistration").style.display = "none";
}
function registerDisappear()
{
  document.getElementById("showRegistration").style.display = "none";
  document.getElementById("showLogin").style.display = "none";
}

function addContact()
{
  add();
  document.getElementById("firstNameCont").value = '';
  document.getElementById("lastNameCont").value = '';
  document.getElementById("emailCont").value = '';
  document.getElementById("phoneCont").value = '';
  document.getElementById("addressCont").value = '';
  document.getElementById("zipCodeCont").value = '';
  document.getElementById("cityCont").value = '';
  document.getElementById("stateCont").value = '';
  document.getElementById("stateCont").value = '';
}

function add()
{
  var cfirstName = document.getElementById("firstNameCont").value;
	var clastName = document.getElementById("lastNameCont").value;
	var cemail = document.getElementById("emailCont").value;
	var cphone = document.getElementById("phoneCont").value;
	var caddress = document.getElementById("addressCont").value;
	var czipCode = document.getElementById("zipCodeCont").value;
	var ccity = document.getElementById("cityCont").value;
	var cstate = document.getElementById("stateCont").value;
  var search = document.getElementById("searchText").value;
	document.getElementById("contactAddResult").innerHTML = "";
	
	var jsonPayload = '{"firstName" : "' + cfirstName + '", "lastName" : "' + clastName + '", "email" : "' + cemail + '", "phone" : "' + cphone + '", "address" : "' + caddress + '", "zipCode" : "' + czipCode + '", "city" : "' + ccity + '", "state" : "' + cstate + '", "userId" : ' + userId + '}';
	var url = urlBase + '/Create.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactAddResult").innerHTML = "Contact has been added";
        searchContact();
			}
      
		};

    
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactAddResult").innerHTML = err.message;
	}
	//searchContact();
}

function searchContact()
{
	var name = document.getElementById("searchText").value;
  if (name == "")
  {
    return;
  }
 
	document.getElementById("contactSearchResult").innerHTML = "";
	
	var contactList = [['firstName', 'lastName', 'contactID']];
  var jsonPayload = '{"name" : "' + name + '","userId" : ' + userId + '}'; 
	
	var url = urlBase + '/Search.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				var jsonObject = JSON.parse( xhr.responseText );
  
        //var test = jsonObject.contacts[1].firstName;
				
			  for( var i=0; i<jsonObject.num_rows; i++ )
				{
					contactList.push([jsonObject.contacts[i].firstName, jsonObject.contacts[i].lastName, jsonObject.contacts[i].contactId]);
				}
        
        console.table(contactList);
        if (contactList.length == 1)
        {
          document.getElementById("contactSearchResult").innerHTML = "<br> No Matching Contacts";
        }
        else
        {
          document.getElementById("contactSearchResult").innerHTML = "Contact(s) retrieved";
        }
        document.getElementById("contactTable").innerHTML = array2table(contactList);
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}
	
}

function viewContact(conId)
{
  contactId = conId;
  saveCookie();
  window.location.href = "view.html";
}

function view()
{
  var jsonPayload = '{"contactId" : ' + contactId + '}';
	var url = urlBase + '/Read.' + extension;
  
  var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
        var jsonObject = JSON.parse( xhr.responseText );
				//document.getElementById("firstName").innerHTML = firstName;
        document.getElementById("firstNameView").innerHTML = jsonObject.firstName;
        document.getElementById("lastNameView").innerHTML = jsonObject.lastName;
        document.getElementById("emailView").innerHTML = "Email: " + jsonObject.email;
        document.getElementById("phoneView").innerHTML = "Phone #: " + jsonObject.phone;
        document.getElementById("addressView").innerHTML = "Address: " + jsonObject.address;
        document.getElementById("zipCodeView").innerHTML = "Zip Code: " + jsonObject.zipcode;
        document.getElementById("cityView").innerHTML = "City: " + jsonObject.city;
        document.getElementById("stateView").innerHTML = "State: " + jsonObject.state;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		//document.getElementById("contactAddResult").innerHTML = err.message;
	}
}


function array2table(array)
{
  var table = "<table class='infoTable'>";
  var link = "view.html";
  for (var i = 1; i < array.length; i++)
  {
    table += "<tr>";
    for (var j = 0; j < 5; j++)
    {
      if (j < array[i].length)
      {
        if (array[i][j] == "")
        {
          table += "<td> N/A </td>";
        }
        else
        {
          if (j == 0)
          {
            table += "<td>" + array[i][j] + "</td>";
          }
          else if (j == 2)
          {
          
            //var val = parseInt(array[i][j], 10);
            table += "<td><button type='button' class='buttons' onclick='viewContact(" + array[i][j] + ")';> View </button></td>";
            table += "<td><button type='button' class='buttons' onclick='editContact(" + array[i][j] + ")';> Edit </button></td>";
            table += "<td id='del"+array[i][j]+"'><button type='button' class='buttons' onclick='deleteContact(" + array[i][j] + ")';> Delete </button></td>";
          }
          else
          {
            table += "<td>" + array[i][j] + "</td>";
          }
        }
      }
      if (j == 3)
      {
      }
      if (j == 4)
      {
      }
    }
    table += "</tr>";
  }
  table += "</table>";
  return table;
}

function editContact(conId)
{
  contactId = conId;
  saveCookie();
  window.location.href = "edit.html";
}

function edit()
{
  var jsonPayload = '{"contactId" : ' + contactId + '}';
	var url = urlBase + '/Read.' + extension;
  
  var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
        var jsonObject = JSON.parse( xhr.responseText );
				//document.getElementById("firstName").innerHTML = firstName;
        document.getElementById("firstName").value = jsonObject.firstName;
        document.getElementById("lastName").value = jsonObject.lastName;
        document.getElementById("email").value = jsonObject.email;
        document.getElementById("phone").value = jsonObject.phone;
        document.getElementById("address").value = jsonObject.address;
        document.getElementById("zipCode").value = jsonObject.zipcode;
        document.getElementById("city").value = jsonObject.city;
        document.getElementById("state").value = jsonObject.state;
        
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		//document.getElementById("contactAddResult").innerHTML = err.message;
	}
}

function confirmEdit()
{
  var first = document.getElementById("firstName").value;
	var last = document.getElementById("lastName").value;
	var email = document.getElementById("email").value;
	var phone = document.getElementById("phone").value;
	var address = document.getElementById("address").value;
	var zipCode = document.getElementById("zipCode").value;
	var city = document.getElementById("city").value;
	var state = document.getElementById("state").value;
	document.getElementById("contactEditResult").innerHTML = "";
	
	var jsonPayload = '{"firstName" : "' + first + '", "lastName" : "' + last + '", "email" : "' + email + '", "phone" : "' + phone + '", "address" : "' + address + '", "zipCode" : "' + zipCode + '", "city" : "' + city + '", "state" : "' + state + '", "contactId" : ' + contactId + '}';
	var url = urlBase + '/Update.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactEditResult").innerHTML = "Contact has been updated";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactEditResult").innerHTML = err.message;
	}
}

function deleteContact(conId)
{
  contactId = conId;
  saveCookie();
  confirmDelete();
}

function deleteC()
{
  //var search = document.getElementById("searchText").value;
  
  var jsonPayload = '{"contactId" : ' + contactId + '}';
	var url = urlBase + '/Delete.' + extension;
  
  var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
        var jsonObject = JSON.parse( xhr.responseText );
        
        id = jsonObject.id;
		
				if( id < 1 )
				{
					//document.getElementById("deleteResult").innerHTML = jsonObject.message;
					return;
				}
        else
        {
          $("td#del" + contactId).parent().remove();
        }
        
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		//document.getElementById("deleteResult").innerHTML = err.message;
	}
}

function confirmDelete()
{
  if (confirm("Are you sure you want to Delete the Contact?")) 
  {
    deleteC();
  } 
  else 
  {
    return; 
  }
}

$(document).ready(function(){
  $(".collapsible").click(function(){
this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });

});
