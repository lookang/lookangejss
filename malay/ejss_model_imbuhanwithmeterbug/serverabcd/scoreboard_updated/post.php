<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Scoreboard Test</title>
<link href="http://abcd.sg/styles.css" rel="stylesheet" type="text/css" />
</head>

<body>

<script>
function post( path, params, method )
{
	method = method || "post"; // Set method to post by default if not specified.

	// The rest of this code assumes you are not using a library.
	// It can be made less wordy if you use one.
	var form = document.createElement("form");
	form.setAttribute("method", method);
	form.setAttribute("action", path);

	for(var key in params)
	{
		if(params.hasOwnProperty(key))
		{
			var hiddenField = document.createElement("input");
			hiddenField.setAttribute("type", "hidden");
			hiddenField.setAttribute("name", key);
			hiddenField.setAttribute("value", params[key]);
			
			form.appendChild(hiddenField);
		 }
	}

	document.body.appendChild(form);
	form.submit();
}


</script>
<br />
<hr />
<div align="center">
	<h2>Test 1: POST preset parameters</h2>
	Test for Preset parameters.
	<input onclick="post( 'http://abcd.sg/sls/update.php', { player_name: 'Kim From EJS', game_title: 'Testing Game 1', score: 9999 } );" type="button" value="Click to Send Data 1" class="title"/>
</div>
<hr />
<br />
<div align="center">
	<h2>Test 2: POST parameters via form submission</h2>
	<form action="http://abcd.sg/sls/scoreboard/update.php" method="post">
    	<table border="0" align="center">
            <tr height="50">
                <td>Game Title:</td><td><input type="text" name="title" value="title" class="title"/><br /></td>
            </tr>

            <tr height="50">
                <td>Name:</td><td><input type="text" name="player_name" value="name" class="title"/><br /></td>
            </tr>
            <tr height="50">
                <td>Score:</td><td><input type="text" name="score" value="1000" class="title"/><br /></td>
            </tr>
            <tr height="50">
                <td colspan="2"><input type="submit" value="Sumit Your Score" class="title"/></td>
            </tr>
   		</table>
    </form>
</div>


</body>
</html>