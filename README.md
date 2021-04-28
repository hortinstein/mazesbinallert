[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/hortinstein/mazesbinallert) 

# mazes🅱️inallert

![spinny boy and his spinny toy](https://i.imgur.com/SSoVX9h.png)

This is a script that alerts via text when Mazepin s🅱️ins out. It uses an advanced spin detection algorithm, interfacing with data on http://mazesp.in/

![patent pending](https://i.imgur.com/EWtTCRk.png)

Dont want to wake up to watch the practice sessions but still want to know our boy is beyblading?  Wake up to these:
![Imola](https://i.imgur.com/9gzB0Cg.png) 

Special thanks to him for spinning out in P1 @ Imola to allow me to integration test my algos.

# Instructions

You will need a twilio account go here and sign up for a trial: https://www.twilio.com/

``` sh
$ npm install
$ export TWILIO_ACCOUNT_SID='ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
$ export TWILIO_AUTH_TOKEN='your_auth_token'
# for phone numbers include '+1' ie '+12344557888'
$ export TWILIO_PHONE_NUMBER='your_twilio_phone_number'
$ export MY_PHONE_NUMBER='your_phone_number' 
$ node index.js
```

If you did it right you should see:

![mazespin](https://i.imgur.com/Y8q0UJl.png)

I fully endorse someone turning this into a SAAS product.  

To send group texts to can supply a json file containing a list of recipients in the following format:
``` sh
#test.json
{
  "Kimi":    "+10000000000",
  "Mazepin": "+80081351111"
}
```
and run:
``` sh
node index.js test.json
```

Special thanks to [/u/scooty14](https://reddit.com/u/scooty14) for running an awesome site
