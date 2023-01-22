# Node API Docs

## Routes

- /createpile/:adminEmail
    creates a pile and returns pile ID given admin email
- /adduser/:pileID/:userEmail/:sumToPay
    adds user to pile
- /piledata/:pileID
    get pile data like admin email and members
- /markpaid/:pileID/:userEmail
    mark a member of the pile as paid
- /markunpaid/:pileID/:userEmail
    mark a member of the pile as unpaid
