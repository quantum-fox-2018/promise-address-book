let help = `
node main Contact
node main Contact show

node main Contact add '{"name":"parker","phone_number":"1445438787","email":"baker@gmail.com"}'

node main Contact delete '{"id":"1"}'

node main Contact update '{"id":"2","name":"Dani","phone_number":"082120858592"}'


node main Groups
node main Groups add '{"name":"To Del"}'
node main Groups update '{"id":"4","name":"Bekasi Planet"}'
node main Groups delete '{"id":"5"}'

node main Group showContact '{"id":"1"}'
node main Groups addContact '{"id":"4"}' '{"id":"5"}'
node main Groups deleteContact '{"id":"4"}' '{"id":"5"}'
`
