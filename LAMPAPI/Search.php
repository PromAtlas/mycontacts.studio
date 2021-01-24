<?php

	$inData = getRequestInfo();

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	}
	else
	{	
			// Search on first and last name passed in.
			$sql = "SELECT C.FirstName, C.LastName, C.ContactID FROM Contacts C WHERE C.UserID = '" . $inData["userId"] . "' AND (C.FirstName like '%" . $inData["name"] . "%' OR C.LastName like '%" . $inData["name"] . "%')" ;
			$result = $conn->query($sql);
			$num_rows = $result->num_rows;
			if ( $num_rows > 0)
			{
				$contacts = array();
				
				for ($i = 0; $i < $num_rows; $i++)
				{	
					$row = $result->fetch_assoc();
					array_push($contacts, ['firstName' => $row["FirstName"], 'lastName' => $row["LastName"], 'contactId' => $row["ContactID"] ]);
				}
				returnWithInfo($contacts, $num_rows);
			}
			else
			{
				returnWithError( "No contacts found." );
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
	
	function returnWithInfo( $contacts, $num_rows )
	{
		$retValue = '{"contacts" :' . json_encode($contacts) . ', "num_rows" : "' . $num_rows .'","error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>