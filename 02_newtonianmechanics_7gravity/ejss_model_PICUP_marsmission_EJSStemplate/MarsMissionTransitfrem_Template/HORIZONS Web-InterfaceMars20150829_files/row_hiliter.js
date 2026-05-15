// -----------------------------------------------------------------------------
// if you don't want a selected row to change with a rollover, leave bgc_both blank

function hiliteRow(row, evt, type, bgc_def, bgc, bgc_set, bgc_both)
{
  var srcElem;
  if ( evt.srcElement ) { srcElem = evt.srcElement; }
  else if ( evt.target )
  {
    srcElem = evt.target;
    if ( srcElem.nodeType != 1 ) { srcElem = srcElem.parentNode; }
  }
  //
  var foundRow = 0;
  if ( srcElem == row && row.style ) { foundRow = 1; }
  else
  {
    var targetCell = srcElem;
    while ( targetCell && targetCell.tagName.toLowerCase() != 'td' )
    {
      targetCell = targetCell.parentNode;
    }
    if ( targetCell && targetCell.cellIndex >= 0 ) { foundRow = 1; }
  }
  //
  //  If we found an actual row element, then hilight it according to the specified "type":
  if ( foundRow )
  {
    if ( type == 'set' )
    {
      // Only select row if click was in "TD" (ignore links "A" in rows)
      if ( srcElem.tagName.toLowerCase() == 'td' )
      {
        if ( row.isSet )
        {
          row.style.backgroundColor = bgc_def;
          row.isSet = '';
        }
        else
        {
          row.style.backgroundColor = bgc_set;
          row.isSet = 1;
        }
      }
    }
    else if ( type == 'lite' )
    {
      if ( ! row.isSet ) { row.style.backgroundColor = bgc; }
      else if ( bgc_both ) { row.style.backgroundColor = bgc_both; }
    }
    else
    {
      if ( row.isSet ) { row.style.backgroundColor = bgc_set; }
      else { row.style.backgroundColor = bgc_def; }
    }
  }
}
