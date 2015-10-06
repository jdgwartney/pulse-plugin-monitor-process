var _exec = require('child_process');
var _os = require('os');
var _interval;
var _process;
var _OSType;

function poll() 
{
  if(_process) 
  {
    var tasklist;
    if(_OSType == 'windows_nt')
      tasklist = _exec.execSync('c:/windows/system32/tasklist.exe').toString('ascii').toLowerCase();
    else
      tasklist = _exec.execSync('ps -e').toString('ascii').toLowerCase();

    var process_exists;
    if(tasklist.indexOf(_process) > -1) 
      process_exists = 1;
    else 
      process_exists = 0;

    console.log('PROCESS_EXISTS %d', process_exists );
  }
  else
  {
    var paramData = require(__dirname + '/param.json');
    _interval = parseInt(paramData['Poll interval']);
    _process = paramData['Process name'].toLowerCase();
    _OSType = _os.type().toString('ascii').toLowerCase();
    console.log('Interval: %d\nProcess: %s\nOS: %s', _interval, _process, _OSType)
  }

  setTimeout(poll, _interval);  // param in milliseonds
}

poll();