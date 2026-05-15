<?php
require_once("../../_init.php");
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Scoreboard Test</title>
<link href="styles.css" rel="stylesheet" type="text/css" />
</head>

<body>

<?php
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// START: Updating game score.
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$update_check = true;
if ( isset($_POST["player_name"]) && isset($_POST["score"]) && isset($_POST["title"]) )
{	
	$player_name = strtoupper(stripslashes($_POST["player_name"]));

	$title = stripslashes($_POST["title"]);
	
	$score = stripslashes($_POST["score"]);
	settype( $score, "integer" );
	
	$url = $_POST["url"];
	
	//echo "$title : $player_name : $score";
	
	
	$u_data=mysqli_query($dbc, "SELECT title, exp, score, attempts FROM crest_scores WHERE player_name='$player_name' AND title='$title'");
	if ( mysqli_num_rows($u_data)==0 ) // No data yet. INSERTION
	{
		if ( $score >=0 )
			$exp = $score;
		else
			$exp = 0;
		
		if ( !(mysqli_query($dbc, "INSERT INTO crest_scores ( title, player_name, exp, score, attempts ) VALUES ( '$title', '$player_name', $score, $score, 1 )" )) )
		{
			$update_check=false;
		}
	}
	else // Data already exists, UPDATE
	{
		$u_row = mysqli_fetch_array($u_data);
		$old_score = $u_row['score'];
		$exp = $u_row['exp'];
		
		$attempts = $u_row['attempts'];
		$attempts++;
		
		if ( $score>=0 )
			$exp += $score;
				
		if ( $score > $old_score )
		{
			if ( !(mysqli_query($dbc, "UPDATE crest_scores SET exp=$exp, score=$score, attempts=$attempts WHERE player_name='$player_name' AND title='$title'" )) )
			{
				$update_check=false;
			}
		}
		else
		{
			if ( !(mysqli_query($dbc, "UPDATE crest_scores SET exp=$exp, attempts=$attempts WHERE player_name='$player_name' AND title='$title'" )) )
			{
				$update_check=false;
			}
		}
	}
	
	if ( $update_check )
	{
		echo "<div class=\"greentext_small\" align=\"center\">Congrats $player_name, your game score ($score) is saved.</div>";
		
		echo "<hr />";
		
		///////////////////
		// Show player profile.
		
		
		$level = 1;
		$next_level = 2000;
		if ( $exp<2000 )
		{
			$level = 1;
			$next_level=2000;
		}
		if ( $exp>=2000 && $exp<6000 )
		{
			$level = 2;
			$next_level=6000;
		}
		if ( $exp >=6000 )
		{
			$level = 3;
		}
		?>
        <table align="center" border="0">
            <tr>
                <td align="center">
            
                    <img src="<?php echo $level; ?>.png" width="200" height="200"/>
                
                </td>
            </tr>
            <tr>
                <td align="center">
                  <div class="greentext_large"><?php echo $player_name; ?></div>
                </td>
            </tr>
            </tr>
            <tr>
                <td align="center">
                    <?php 
                    
                        
                        echo "<strong>Level $level</strong><br />";
                        if ( $level <=2 )
                        {
                            echo "To next level: $exp/$next_level";
                        }
                        if ( $level == 3 )
                        {
                            echo "Your Experience Points: $exp";
                        }
                        ?>
                </td>
            </tr>
        </table> 
        
        <?php
		
		
		///////////////////////////
		
		
	}
	else
	{
		echo "<div align=\"center\">Error in score updating!</div>";
	}
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// END: Updating game score.
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




    $data = mysqli_query($dbc, "SELECT
        title, score, player_name, exp, attempts, update_time
		FROM crest_scores
		WHERE title='$title'
        ORDER BY score DESC, update_time ASC" );
        
    $total_num_scores = mysqli_num_rows($data);
    
?>
<br />
<br />
<div style="background-color:#FC6; width:800; height:50" align="center">
<a href="<?php echo $url; ?>", target="_self" class="blue_huge">Play Again</a>
</div>
<br />
<hr />
<br />

<table align="center" width="500" border="1" class="maintext_small" cellpadding="1" cellspacing="1">
    <tr>
        <td align="center" colspan="6" class="greentext_large">
               <?php if ($total_num_scores>0) echo $title?> Scoreboard
        </td>
    </tr>
    <tr>
        <td align="center" width="10%">Rank</td>
        <td align="center" width="30%">Name</td>
        <td align="center" width="30%">Highscore</td>
        <td align="center" width="15%">Attempts</td>
        <td align="center" width="15%">Timestamp</td>
    </tr>
    <?php

    if ( $total_num_scores <= 0 )
    {?>
        <tr>
            <td colspan="6" align="center">No Score Record Yet.</td>
        </tr>
    	<?php
    }
    else
    {
        // the while loop settles all the rows in the table.
        $rank_num = 1;
        while ( $row = mysqli_fetch_array($data) )
        {
			
			$exp = $row['exp']; 
			$level = 1;
			$next_level = 2000;
			if ( $exp<2000 )
			{
				$level = 1;
				$next_level=2000;
			}
			if ( $exp>=2000 && $exp<6000 )
			{
				$level = 2;
				$next_level=6000;
			}
			if ( $exp >=6000 )
			{
				$level = 3;
			}
			
            if ( $rank_num%2==0 )
            {
                ?>					
                <tr bgcolor="#EEFFEE">
                <?php
            }
            else
            {
                ?>
                <tr bgcolor="#FFFFFF">
                <?php
            }
			
			if ( strtoupper($player_name) == strtoupper($row['player_name']) )
			{
				?>
                <tr bgcolor="#DCB9FF">
                <?php
			}
            ?>
                    <td align="center"><?php echo $rank_num; ?></td>
                    <td align="center">
						<table border="0">
							<tr>
                            	<td>
                            
                                	<img src="<?php echo $level; ?>.png" width="50" height="50"/>
                                
                                </td>
                                <td>
								  <strong><?php echo $row['player_name']; ?></strong>
    							</td>
                            </tr>
                            <tr>
                            	<td align="center" colspan="2">
                                	<?php 
									
										
										echo "<strong>Level $level</strong><br />";
										if ( $level <=2 )
										{
											echo "To next level: $exp/$next_level";
										}
										if ( $level == 3 )
										{
											echo "Your Experience Points: $exp";
										}
										?>
                                </td>
                            </tr>
        				</table>                
                    
                    </td>
                    <td align="center" class="greentext_large"><?php echo $row['score']; ?></td>
                    <td align="center"><?php echo $row['attempts']; ?></td>
                    <td align="center"><?php echo $row['update_time']; ?></td>
                </tr>
                <?php
            $rank_num++;
        }
    }
    ?>
</table>

</body>


<?php
mysqli_close($dbc);
?>