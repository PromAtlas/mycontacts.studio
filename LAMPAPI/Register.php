<?php

	$inData = getRequestInfo();
	
	$id = 0;
	$firstName = "";
	$lastName = "";
	$username = "";
	$password = "";

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	}
	else
	{	
		$sql = "SELECT Login FROM Users where Login='" . $inData["login"] . "'";
		$result = $conn->query($sql);
		if ($result->num_rows > 0)
		{
			returnWithError( "User already exists." );
		}
		else
		{
			$sql = "INSERT into Users (FirstName,LastName,Login,Password) VALUES ('" 
			. $inData["firstName"] . "','" . $inData["lastName"] . "','". $inData["login"] . "','" . $inData["password"] . "')";
			if ($conn->query($sql) === TRUE)
			{
				successfulCreation();
			}
			else
			{
				returnWithError( "Account Creation Failed." );
			}
		}
		$conn->close();
	}
	
	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"id" : 0, "message":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function successfulCreation()
	{
		$retValue = '{"id" : 1, "message" : "successfully created new user"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>