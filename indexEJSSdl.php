<?php
//-------------------------Start of utilities functions-----------------------------------
	function endsWith($FullStr, $EndStr) {
		if ($FullStr === null || $EndStr === null) return false;
		$StrLen = strlen($EndStr); // Get the length of the end string
		if ($StrLen == 0) return true;
		$FullStrEnd = substr($FullStr, -$StrLen); // Get the end of FullStr with the length of EndStr
		return $FullStrEnd === $EndStr; // If it matches, it does end with EndStr
	}
  
	function startsWith($haystack, $needle) {
		if ($haystack === null || $needle === null) return false;
		return substr($haystack, 0, strlen($needle)) === $needle;
	}
  
	function stringMatch($haystack, $needle){
		$matchresult = false;
		foreach($haystack as $element => $action) {
			switch($action)
			{
				case "Exact": 
				$matchresult = strcasecmp($element, $needle) === 0; //0 = match	
				break;
				case "Prefix":
				$matchresult = startsWith($needle, $element); // find element in needle
				break;
				case "Suffix":
				$matchresult = endsWith($needle, $element);   // find element in needle
				break;
				//case "Pattern":
				//$matchresult = preg_match($element, $needle);
			}
			if ($matchresult) return $matchresult;
		}
		return $matchresult;
	}
  
	function listDir($prefix, $baseAddress, $dir, $tab, $excludefolders) { 
		$folders = [];
		$files = [];

		$tab = $tab . "  ";  // indentation in the generated XML code

		// Get the directory listing and sort it into 2 arrays - folders and files - to allow comparison
		$dh = opendir($dir);
		if ($dh === false) return;

		while (false !== ($filename = readdir($dh))) {
			$path = $dir . "/" . $filename;
			if (is_dir($path)) 
				$folders[] = $filename;
			else
				$files[] = $filename;
		}
		closedir($dh);
		sort($folders);
		sort($files);  														
															
		// Process recursively the subdirectories first
		foreach($folders as $foldername) {			
			if(!stringMatch($excludefolders, $foldername)){
				$path = $dir . "/" . $foldername;
				
				// Entry for the directory	
				print $tab . '<dir url="' . $baseAddress . $foldername . '/"';
				if (file_exists($path . "/info.html")) 
					print ' html="info.html"';
				print ' name="' . $foldername . '">' . "\n";
				print listDir($prefix, $baseAddress . $foldername . "/", $path, $tab, $excludefolders);   // Recursively "navigate" into folders within.
				print $tab . "</dir>\n";
			} 
		}
		
		// Process now the models (ZIP files)  
		$prefixLength = strlen($prefix);
		foreach($files as $filename) {		  
			if (!startsWith($filename, $prefix)) continue; 		// Only files with the correct prefix
			if (!endsWith($filename, ".zip")) continue; 		// Only zip files

			$plainname = substr($filename, 0, -4);
			$name = substr($plainname, $prefixLength);
			print $tab . "<model";
			print ' name="' . $name . '"';
			$htmlfile = $plainname . ".html";
			if (file_exists($dir . "/" . $htmlfile)) print ' html="' . $htmlfile . '"';
			else {
				$htmlfile = "ejss_html_" . $name . ".html";
				if (file_exists($dir . "/" . $htmlfile)) print ' html="' . $htmlfile . '"';
			}
			print ' zip="' . $filename . '">' . $plainname . "</model>\n";
		}

		// Process now the webejs models (ZIP files)  
		foreach($files as $filename) {  
			if (startsWith($filename, "webejs") && endsWith($filename, ".zip")) {
				// Only files starting with "webejs" and ending with ".zip"
				
				$plainname = substr($filename, 0, -4);
				$name = substr($plainname, strlen("webejs"));
				print $tab . "<model";
				print ' name="' . $name . '"';
				
				$htmlfile = $plainname . ".html";
				if (file_exists($dir . "/" . $htmlfile)) {
					print ' html="' . $htmlfile . '"';
				} else {
					$htmlfile = "ejss_html_" . $name . ".html";
					if (file_exists($dir . "/" . $htmlfile)) {
						print ' html="' . $htmlfile . '"';
					}
				}
				print ' zip="' . $filename . '">' . $plainname . "</model>\n";
			}
}




	}
//-------------------------End of utilities functions-----------------------------------


//------------------------------------Main----------------------------------------------
	$excludefolders = array("." => "Exact",
							".."=> "Exact",
							"_"=> "Exact",
							"ejs" => "Exact", 
							"trz" => "Exact",
							"flash" => "Exact",
							"xls" => "Exact",
							"swf" => "Exact",
							"ejss_model_" => "Prefix"); 		  
	
	$baseAddress =  "http://" . $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];
	$baseAddress = substr($baseAddress, 0, strlen($baseAddress) - strlen(strrchr($baseAddress, "/")) + 1);
	$prefix = $_GET["prefix"] ?? '';
	if ($prefix === '') $prefix = "ejss_model_";
		
	print '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
	print '<dir url="' . $baseAddress . '"'; 
	if (file_exists("info.html")) print ' html="info.html"';
	print ">\n";
	print listDir($prefix, $baseAddress, ".", "  ", $excludefolders);
	print "</dir>\n";
?>
