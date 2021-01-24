<?php

	$inData = getRequestInfo();

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	}
	else
	{	
		// Change to insert a new record into the DB
		$sql = "INSERT into Contacts (FirstName,LastName,Email,Phone,Address,ZipCode,City,State,UserID) VALUES ('" 
		. $inData["firstName"] . "','" . $inData["lastName"] . "','". $inData["email"] . "','" . $inData["phone"] . "','" . $inData["address"] . 
		"','" . $inData["zipCode"] . "','" . $inData["city"] . "','" . $inData["state"] . "','" . $inData["userId"] . "')";
		if ($conn->query($sql) === TRUE)
			successfulCreation();
		else
			returnWithError( "Contact creation failed." );
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
		$retValue = '{"id" : 1, "message" : "Successfully created new contact"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>