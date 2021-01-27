<?php

	$inData = getRequestInfo();

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
				$sql = "SELECT UserID,FirstName,LastName FROM Users where Login='" . $inData["login"] . "' and Password='" . $inData["password"] . "'";
		    		$newResult = $conn->query($sql);
        			$row = $newResult->fetch_assoc();
        			$id = $row["UserID"];
				successfulCreation($id);
			}
			else
			{
				returnWithError( "Account creation failed." );
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
	
	function successfulCreation($id)
	{
		$retValue = '{"userId":' . $id . ', "message" : "Successfully created new user"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
