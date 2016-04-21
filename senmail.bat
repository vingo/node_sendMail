@echo off
:::::::::::::: 参数设置::::::::::::::
set from=*@163.com"
set user="*"
set pass="*"
set to="maoobo@163.com"
set subj="test"
set mail="hello from blat"
set server=smtp.163.com
set attach=blat.log
set debug=-debug -log blat.log -timestamp
rem blat %mail% -to %to% -base64 -charset Gb2312 -subject %subj%  -server %server% -f %from% -u %user% -pw %pass% -attach %attach% %debug%
blat %mail% -to %to% -base64 -charset Gb2312 -subject %subj%  -server %server% -f %from% -u %user% -pw %pass% %debug%
