import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig).then(()=>{
  // In main.ts, add temporarily:
console.log('App bootstrapped ✅');

})
  .catch((err) => console.error(err));
