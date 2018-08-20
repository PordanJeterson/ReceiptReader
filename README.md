# Ad Lead Generator
This project was written in TypeScript utilizing Express.js, Node.js, and React. TypeScript helps prevent easy to avoid
issues common in frontend JavaScript development. Being able to write common interfaces and function definitions made
it much easier to work with data, hammering down types being passed between different functions. The source mapping 
feature makes writing in TypeScript and debugging your code easy. Modern ES features are also present, including 
Async/Await. 

## Highlights

#### Submit Leads
Leads can be submitted on the "New Leads" page and are stored on the server, but  the application was coded with being 
able to easily add in a different data source in mind.

#### View Leads
Leads can be viewed after submission on the "view leads" page.

#### Responsive
The pages are responsive and the fields adjust appropriately for phones and desktops 

#### Automatic Form Population
The US State automatically populates when a user enters a valid US ZIP code utilizing the free trade.gov API

#### Automatic advertiser bid loader
Advertisers are created using an abstract class, which ensures a common interface and allows for each advertiser to be 
loaded without affecting any code but that file. The advertising class simply has to match the interface of the bid. 
This is also coded so that one failing Advertiser does not cause the entire system to go down, as it should be. There
was a particular challenge in waiting for all promises to resolve or reject, then moving forward only with the advertisers
who had returned data (one test case sends a funny message instead). It's important when relying on other people's servers 
to only trust it as far as you have to.

#### 
The form clears after receiving a successful submission reply from the server.

### API

#### Advertising API
```/api/ads``` GET with JSON body like ```{"zipCode": "41018","type": "health"}```
Returns a list of ads matching both ZIP Code and type, ordered from highest bid to lowest. 

#### Lead API
```/api/lead``` POST post a new lead with the JSON body format of  
```
{ zipCode: string, firstName: string, lastName: string, leadType: LeadType, state: string }
```
validation will prevent obviously invalid data
Used by the submit leads page

```/api/lead/list``` GET lists all leads. Used by the view leads page

## Setup
A .env file or the environment variables need to be set as follows 

```
PORT=8080
ZIP_API_KEY=not_real_api_key
ZIP_API_URL=https://api.trade.gov/ita_zipcode_to_post/search
```
You can sign up for a free API key at [Trade.gov](https://api.trade.gov/)


For development work, simply use 

```npm install```

then

```npm run dev```

For production, use
```
npm install
npm run build
npm start
```

