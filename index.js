var _exec = require('child_process');
var _intervalSeconds = parseInt(process.argv[3]) || 1;
var _process = process.argv[2].toLowerCase();

function poll()
{
  var tasklist = _exec.execSync('tasklist').toString('ascii').toLowerCase();
  var process_exists;

  if(tasklist.indexOf(_process) > -1) 
    process_exists = 1;
  else 
    process_exists = 0;

//  console.log('PARAMS: %s - %d', _process, _intervalSeconds);
  console.log('PROC_EXISTS %d', process_exists );

  setTimeout(poll, _intervalSeconds * 1000);  // param in milliseonds
}

poll();