A serverless dynamodb and vue thing for prototyping a Komodo assetchain

![Komodo Blockchain Wizard](https://raw.githubusercontent.com/imylomylo/komodo-blockchain-wizard/4e16602919fcfe9feb27459889ce87da0cc2329c/komodo-blockchain-wizard.png)

Pre-requisite
=============

*serverless framework installed
*aws creditials in your ~/.aws

Install, run, deploy
====================
```
git clone https://github.com/imylomylo/komodo-blockchain-wizard.git
cd komodo-blockchain-wizard
npm install
serverless deploy
```
this will output the url of the rest api.  replace it into the url in src/vue/App.vue
```
cd vue
npm run build
```
now deploy the client end
```
serverless client deploy
```
Then you can visit the URL output http://......./index.html

There's no "response" on submitting the form.  So you submit it and it gets saved to AWS DynamoDB.

To get all your submissions
```
curl https://URL-of-REST-API/v0/acwiz
```
and you get json which you can pipe through a tool like `jq` instead of being messy.
```
$ curl https://3p744v40oa.execute-api.ap-southeast-2.amazonaws.com/v0/acwiz | jq '.[]'
{
  "password": "FreedomFix",
  "active": true,
  "ticker": "BLAH",
  "updatedAt": 1531190058052,
  "status": "Proposed",
  "supply": "10000",
  "createdAt": 1531190058052,
  "id": "be716040-83e9-11e8-8ae1-ad2f05546016",
  "email": "john.doe@gmail.com",
  "notarisation": "none",
  "name": "blah"
}
{
  "password": "FreedomFix",
  "active": true,
  "ticker": "FREE2",
  "updatedAt": 1516677649676,
  "status": "Proposed",
  "supply": "10000002",
  "createdAt": 1516677649676,
  "id": "68fb64c0-ffec-11e7-bf27-a3975719b409",
  "email": "john.doe@gmail.com",
  "notarisation": "full",
  "name": "Freedom Howto Coin 2"
}
{
  "password": "FreedomFix",
  "active": true,
  "ticker": "MYLO1",
  "updatedAt": 1531199124891,
  "status": "Proposed",
  "supply": "555555555",
  "createdAt": 1531199124891,
  "id": "dab336b0-83fe-11e8-a844-131776238f0b",
  "email": "mylo@mylo.com",
  "notarisation": "none",
  "name": "Mylo's First Coin"
}
{
  "password": "FreedomFix",
  "active": true,
  "ticker": "FREE",
  "updatedAt": 1516677192213,
  "status": "Proposed",
  "supply": "10000001",
  "createdAt": 1516677192213,
  "id": "58501450-ffeb-11e7-bf27-a3975719b409",
  "email": "john.doe@gmail.com",
  "notarisation": "none",
  "name": "Freedom Howto Coin"
}
```
