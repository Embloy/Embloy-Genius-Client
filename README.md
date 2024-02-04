<h1><a href="https://about.embloy.com">Embloy Genius</a></h1>

> __NOTE__: _The current prototype is not deployed yet._

This repository contains the code for the web application of Embloy Genius. In the future it will be available online at: [https://genius.embloy.com](https://genius.embloy.com) 
## License

### Licensed under

> GNU AFFERO GENERAL PUBLIC LICENSE v3.0 ([gpl-3](https://www.gnu.org/licenses/gpl-3.0.en.html))
> This is due to the possibility of publication of this version in the future.

## Contribution

Unless you explicitly state otherwise, any contribution intentionally submitted for inclusion in the work by anyone, as
defined in the GNU AFFERO GENERAL PUBLIC LICENSE v3.0 license, shall be licensed as above, without any additional terms
or conditions.

<details>
  <summary> Contriution Guide </summary>

- This web application is based on Next.JS 13 and uses the App Router system

- Against current design best-practises it is meant to render pages, components on client side if possible (SEO doesnt matter)

- Study the app/layout.js file, AuthWrapper makes sure that every URL is secured with Embloy Authentication (instead stated otherwise), UserContext makes sure that certain data is available globally without fetiching the same data multiple times. NOrmally the best practise would be to fetch data where it is needed

- To fetch data use the predefined request functions in lib/misc_requests.js to ensure the fulöfillment of the designed security patterns of Embloy Authentication

- Embloy Genius Web App relies on both big backend systems of Embloy - Core and Genius. Dont get confused with the name, it is called Genius because this web application is positioned as a solely B2B tool to ioerate Embloy asa business like [Youtube Studio](https://studio.youtube.com/)

</details>


## Functionality

> A verified Embloy Account is required to use Embloy Genius.

### Integration, Data Import/ Export (planned)

Instead of manually adding jobs on Embloy Core, users can import or export data in specific formats or via an API. This also enables existing HR Software like SAP HR to interact with Embloy. A tighter integration in an existing Tool environment is possible, but requires a manual set up of data pipelines by Embloy Platforms staff, billed by the hour.

### Process Controlling (planned)
#### Workflows
- Like Github Workflows but for HR processes
#### Applications
- Recieved applications for a specific job are depicted and need to be acknowledged (manually/ workflow automated) to be fed into Genius
- Each application opens a new line in a kanban board like DOM and a each aplication has a status pointer object that is draggable
- Each application on the board now gets a task pipeline and the user can ut the pointer on whatever task he wants
- Each task has a commands/ api cllas/ actions prefdeined taht wll be executed by GEnius automatically
- Users can so overview each individual application and at the same glance manipulatie/ steer/ controll the individual progress
- tbd.
#### tbd.
tbd.
### Analytics (planned)
tbd.
### Promotion (planned)
tbd.
### Widget Generator (planned)
Genius should create custom backend / frontend code snipplets for users to integrate EMbloy in their own pages (like [Paypal developer](https://developer.paypal.com/docs/checkout/))

## Config

> __NOTE__: _You only need to follow these steps if you wish to contribute and need to test your changes locally_

<details>
  <summary> 1. Prerequisites </summary>

- Embloy Core instance available & running

- Embloy Genius instance available & running

- Install npm

</details>

<details>
  <summary> 2. Start the server </summary>

If you wish to experiment on our backend or contribute to our front end, you can test your changes by starting a local
server.

1. (PLANNED) Create a file './env.local' with the following content:

   ```
   tbd.
   ```

2. Verify correct IP addresses & i.a. updated CORS plicies of Core and Genius 
3. Run ``npm install`` to install all required packages.
3. Run ``npm run dev`` to start the web applciation.
4. Go to http://localhost:8081
</details>

© Carlo Bortolan, Jan Hummel

> Carlo Bortolan &nbsp;&middot;&nbsp;
> GitHub [@carlobortolan](https://github.com/carlobortolan) &nbsp;&middot;&nbsp;
> contact via Software Development Department @ [bortolanoffice@embloy.com](mailto:bortolanoffice@embloy.com)
>
> Jan Hummel &nbsp;&middot;&nbsp;
> GitHub [@github4touchdouble](https://github.com/github4touchdouble) &nbsp;&middot;&nbsp;
> contact via Product Department @ [hummeloffice@embloy.com](mailto:hummeloffice@embloy.com)
