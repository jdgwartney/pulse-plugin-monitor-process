var _exec = require('child_process');
var _interval;
var _process;

function poll() 
{
  if(_process) 
  {
    var tasklist = _exec.execSync('tasklist').toString('ascii').toLowerCase();
    var process_exists;

    if(tasklist.indexOf(_process) > -1) 
      process_exists = 1;
    else 
      process_exists = 0;

    //console.log('PARAMS: %s - %d', _process, _intervalSeconds);
    console.log('PROCESS_EXISTS %d', process_exists );
  }
  else
  {
    //var fs = require('fs');
    //var file = __dirname + '/param.json';
    //var configData = JSON.parse(fs.readFileSync(file));
    var paramData = require('./param.json');
    _interval = parseInt(paramData['Poll interval']);
    _process = paramData['Process name'].toLowerCase();
    console.log('Interval: %d\nProcess: %s', _interval, _process)
  }

  setTimeout(poll, _interval);  // param in milliseonds
}

poll();