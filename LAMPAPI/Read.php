<?php

	$inData = getRequestInfo();

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	}
	else
	{	
			// Get row based on contactID
			$sql = "SELECT * FROM Contacts C WHERE C.ContactID = '" . $inData["contactId"] . "'";
			if ($conn->query($sql)->num_rows > 0)
			{
				$row = $conn->query($sql)->fetch_assoc();
				$firstName = $row["FirstName"];
				$lastName = $row["LastName"];
				$id = $row["ContactID"];
				$email = $row["Email"];
				$phone = $row["Phone"];
				$address = $row["Address"];
				$zipcode = $row["ZipCode"];
				$city = $row["City"];
				$state = $row["State"];
				$dateCreated = $row["DateCreated"];
				returnWithInfo($firstName, $lastName, $id, $email, $phone, $address, $zipcode, $city, $state, $dateCreated);
			}
			else
			{
				returnWithError( "Failed to read contact." );
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
	
	function returnWithInfo( $firstName, $lastName, $id, $email, $phone, $address, $zipcode, $city, $state, $dateCreated)
	{
		$retValue = '{"contactId":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '", "email":"' . $email . '", "phone":"' . $phone . '", "address":"' . $address . '", "zipcode":"' . $zipcode . '", "city":"' . $city . '", "state":"' . $state . '", "dateCreated":"' . $dateCreated . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>