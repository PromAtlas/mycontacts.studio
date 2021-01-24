<?php

	$inData = getRequestInfo();

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	}
	else
	{	
			// Alter current record with info passed in.
			$sql = "DELETE FROM Contacts C WHERE C.ContactID = '" . $inData["contactId"] . "'";
			if ($conn->query($sql) === TRUE)
			{
				successfulCreation();
			}
			else
			{
				returnWithError( "Contact deletion failed." );
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
		$retValue = '{"id" : 1, "message" : "Successfully deleted contact"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>