# Angular Service Workers example

## Development server with service workers
Run `npm run watch`.
Then in a new terminal, start a simple HTTP server with `npx http-server -p 8080 -c-1 dist/ird`. Use `localhost:8080` and not `127.0.0.1` or any other URL to access the app.

During development, re-build is automatic, but make sure to refresh **twice** the app to install a new version of your service worker.

## Classic development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.3.
