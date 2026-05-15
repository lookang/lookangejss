<?php
    $n = 12;
    if (isset($_GET['n'])) {
        $n = intval($_GET['n']);
        if ($n < 1)
            $n = 12;
    }
    
?>
<!DOCTYPE html>
<html class="no-js" lang="en">
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />

    <title>Factor Game by Anggakusuma</title>

    <meta name="description" content="Factor Game customised to Singapore Math." />
    <meta property="og:title" content="Factor Game" />
    <meta property="og:site_name" content="Factor Game customised to Singapore Math" />
    <meta property="og:description" content="" />
    <meta property="og:locale" content="en_US" />
    
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;600&family=Roboto:wght@300;400;700&display=swap"
      rel="stylesheet"
    />

    <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>

    <style>
        body, input {
            font-family: Montserrat;
            font-size:20px;
        }
        .paychecks {
            border: 1px solid #000;
            width:70px;
            height:37px;
            padding-top:13px;

            font-size:20px;
            font-weight:bold;
            float:left;
            margin:3px;

            text-align: center;   
            cursor: pointer;
        }

        .paychecks:hover{
            background-color: yellow;
        }
        .takenbytaxcollector {
            background-color: lightcoral;
        }
        .takenbyplayer {
            background-color: aqua;
        }
        #rules {
            padding-top: 20px;
            clear:both;
            font-size:17px;
        }
        #guide {
            padding-top: 0px;

        }
        .creator {
            font-size:14px;
        }
    </style>
  </head>
  <body>
    <div id="header">
        <h2><img src="images/dollars-stack.png" width="80" height="60" align="absmiddle" /> Factors Game App  
        <span class="creator">by Anggakusuma</span></h2>
    </div>
    <div id="container">
        <?php 
        for ($i=1; $i<=$n; $i++) {
        ?>
            <div class="paychecks" num="<?=$i?>">
                <?=$i?>
            </div>
        <?php } ?>
    </div>
    
    <div id="rules">
        <h2>Rules</h2>
        <ul>
            <li>You will get to choose any number first. </li>
            <li>After you have chosen a number at each turn,  the computer will collect <u>all</u> factors (that are not taken) of the number that you have chosen previously. </li>
            <li>The computer must collect a factor at each turn. Otherwise, the game will end and the computer will collect all the remaining numbers that were not taken.</li>
            <li>You win the game if the sum of the numbers that you collected is more than that collected by the computer.</li>

    </div>
    <hr />
    <div id="guide">
        <h3>Gameplay</h3>
        Please choose a paycheck ...

    </div>
    
    <script>
        
        $( document ).ready(function() {
			//$('#').addClass('');
			console.log('Test');
            window.alert('Test');
		});
        
        function game_over() {
            var n = <?=$n?>;
            var score_player = 0;
            var score_taxcollector = 0;
            for (i=1; i<=n; i++) {            
                if ($('.paychecks[num='+i+']').hasClass('takenbyplayer')) { 
                    score_player += i;
                }
                else {
                    score_taxcollector += i;
                    $('.paychecks[num='+i+']').addClass('notavailable');
                    $('.paychecks[num='+i+']').addClass('takenbytaxcollector');
                }
            }
            
            $('#guide').append("<br /><br /><b>Game over!</b>");
            $('#guide').append("<br /><br />You earned $"+score_player+", tax collector earned $"+score_taxcollector);
            $('#guide').append("<hr /><br />Play again with <input type='text' id='n' size='3' value='"+n+"'> paychecks <input type='button' value='Go' onclick=document.location.href='?n='+$('#n').val();>");
            window.alert('Game over!');

        }

        $('body').on("click",".paychecks",function(e){
            if (!$(this).hasClass('notavailable')) {
                
                
                var num = parseInt($(this).attr('num'));

                // find available factor of num
                var taxcollector = '';
                for (i=1; i<num; i++) {
                    if (num % i == 0)
                        if (!$('.paychecks[num='+i+']').hasClass('notavailable')) {
                            if (taxcollector != '') taxcollector += ', ';
                            taxcollector += '$' + i;
                            
                            $('.paychecks[num='+i+']').addClass('notavailable');
                            $('.paychecks[num='+i+']').addClass('takenbytaxcollector');
                        }
                }

                $('#guide').append("<br /><br />You picked $"+num);

                if (taxcollector == '') {
                    $('#guide').append(", tax collector could not pick any paychecks.");
                    game_over();
                    return; // Add this line to exit the function and prevent further execution
                }
                else {
                    $('#guide').append(", tax collector picked "+taxcollector);
                    $(this).addClass('notavailable');
                    $(this).addClass('takenbyplayer');
                }
                
            }
        });


    </script>

  </body>

  
</html>
