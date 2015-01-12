Test tracking numbers:

  * Colissimo: `node api/track_cli.js colissimo 7C00010931103`
  * UPS: `node api/track_cli.js ups 1Z20V8546820013687`
  * Chronopost: `node api/track_cli.js chronopost XY667554759JB`

Start the API server: `npm start` or `DEBUG=express:* npm start`

Test API calls:

  * Carrier detection: `http://localhost:3000/guess-carrier/7C00010931103`
  * Colissimo: `http://localhost:3000/track/colissimo/7C00010931103`
  * UPS: `http://localhost:3000/track/ups/1Z20V8546820013687`
  * Chronopost: `http://localhost:3000/track/chronopost/XY667554759JB`
