<?php
    $link_identifier = mysql_connect('localhost', 'test', 'test'); 
    mysql_set_charset('utf8',$link_identifier); 
    mysql_select_db('test', $link_identifier); 	
	
	$query = "update data set text = '".$_POST['editor1']."' where id = 1";
	$retval = mysql_query( $query, $link_identifier );
	if(! $retval )
	{
	  die('Could not update data: ' . mysql_error());
	}
	echo "Updated data successfully\n";
	mysql_close($link_identifier);
	?>