import { app } from './app/app';
import { appConfig } from './app/configs';
import * as cronUserToken from './app/tasks/jobUserToken'
import * as cronExpiredToken from './app/tasks/jobExpiredToken'

  const PORT = appConfig.APP_PORT;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    cronUserToken.jobUserToken.start();
    cronExpiredToken.jobExpiredToken.start();
  });
