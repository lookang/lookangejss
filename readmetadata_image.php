//-------------------------Start of utilities functions-----------------------------------
	function endsWith($FullStr, $EndStr) {
		$StrLen = strlen($EndStr); // Get the length of the end string
		$FullStrEnd = substr($FullStr, strlen($FullStr) - $StrLen); // Look at the end of FullStr for the substring the size of EndStr
		return $FullStrEnd == $EndStr; // If it matches, it does end with EndStr
	}
  
	function startsWith($haystack, $needle) {
		return substr($haystack, 0, strlen($needle)) === $needle;
	}
  
	function stringMatch($haystack, $needle){
		$matchresult = false;
		foreach($haystack as $element=>$action) {
			switch($action)
			{
				case "Exact": 
				$matchresult = strcasecmp($element, $needle) === 0; //0 = match	
				break;
				case "Prefix":
				$matchresult = startsWith($needle, $element); //tt: find element in needle
				break;
				case "Suffix":
				$matchresult = endsWith($needle, $element);   //tt: find element in needle
				break;
				//case "Pattern":
				//$matchresult = preg_match($element, $needle);
			}
			if ($matchresult) return $matchresult;
		}
		return $matchresult;
	}
  
  
	function listDir($prefix, $baseAddress, $dir, $tab, $excludefolders) { 
		$tab = $tab . "  ";  //TT: indentation in the generated XML code
		#Get the directory listing and sort it into 2 arrays - folders and files - to allow comparison
		$dh = opendir($dir);
		$files = array();
		$folders = array();
	
		while (false !== ($filename = readdir($dh))) {
			$path = $dir . "/" . $filename;
			if (is_dir($path)) 
				$folders[] = $filename;
			else
				$files[] = $filename;
		}
		sort($folders);
		sort($files);  		
		
		if(preg_match('/ejss_model_/', $dir))
		{
			foreach($files as $filename) {
				if($filename == '_metadata.txt')
				{	
					$metadatafilename = $baseAddress.$filename;
					//echo $metadatafilename."<br>";
					$lines = file($metadatafilename);
					foreach ($lines as $key=>$value)
					{	
						$metafield = explode(": ", $value);		
						//echo 'key='.$metafield[0].', value='.$metafield[1].'<br>';
						if($metafield[0] == "logo-image") {
							$images = explode(";", $metafield[1]);
							$metafields[$metafield[0]] = $images[0]; //$fieldvalue;	
							$imagepath = $baseAddress.$images[0];
							echo $imagepath.'<br>';
							//echo '{"image_intro":"'.str_replace('/', '\/', $imagepath).'","float_intro":"","image_intro_alt":"","image_intro_caption":"","image_fulltext":"","float_fulltext":"","image_fulltext_alt":"","image_fulltext_caption":""}<br>'; 
						}
					}
				}
			}
		}	
		else 
		{
			//if($dir == "00workshop")
			//{	
			foreach($folders as $foldername) {
				if(!stringMatch($excludefolders, $foldername)){
					$path = $dir . "/" . $foldername;		
					listDir ($prefix, $baseAddress . $foldername . "/", $path, $tab, $excludefolders);   //TT: This will recursively "navigate" into folders within.
				} 
			}
		}	
	}
//-------------------------End of utilities functions-----------------------------------


//------------------------------------Main----------------------------------------------
	//Format: key => action where key is the folder name to be excluded
	//                            action is the type of name comparison. 
	//                            Valid action values are: "Exact" (exact match), "Prefix" (begins with), "Suffix" (ends with)
	//Special folders that needed to be excluded: . = current location, .. = parent location, _ = hidden files,   
	$excludefolders = array("." => "Exact",
							".."=> "Exact",
							"_"=> "Exact",
							"ejs" => "Exact", 
							"trz" => "Exact",
							"flash" => "Exact",
							"xls" => "Exact",
							"swf" => "Exact");
							//"ejss_model_" => "Prefix"); 		  

	$baseAddress =  "http://" . $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];
	$baseAddress = substr($baseAddress,0,strlen($baseAddress)-strlen(strrchr($baseAddress, "/"))+1);
	//$prefix = $_GET["prefix"];
	$prefix = "ejss_model_";
		
	/*print '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
	print '<dir url="' . $baseAddress . '"'; 
	if (file_exists("info.html")) $code .= ' html="info.html"';
	print ">\n";
	*/
	print listDir ($prefix,$baseAddress,".","  ", $excludefolders);
	//print "</dir>\n";
?>
