# Node with SSL reverse proxy setup
`index.js` can be your own nodeJS server. I am using it as a facebook messenger bot.
## Technologies
- [NGINX](https://www.nginx.com/resources/wiki/start/) for reverse proxy to NodeJS server, to allow SSL to be separated from NodeJS
    - I will add load balancing functionality in the future too.
- [Certbot](https://certbot.eff.org/) for easy and regular SSL cert renewal
- [NodeJS](https://nodejs.org/en/) for application
- [PM2](https://www.npmjs.com/package/pm2) for NodeJS process management (restarting on crash, etc)

## Steps
- Install depedencies: node, certbot, nginx, pm2
    - `sudo apt install node nginx`
    - `npm i -g pm2`
    - Follow [installation instructions for certbot](https://certbot.eff.org/instructions).
- Configure nginx as node reverse proxy [example code](https://github.com/Juriy/easyio/blob/master/conf/1-reverse-proxy/nginx/conf.d/nanogram.io.conf): or just edit `/etc/nginx/sites-available/default` to have only: 
- Run `sudo certbot`, and supply the correct information to set up SSL certs
- Ensure NodeJS server and NGINX server are running
    - NGINX: `sudo systemctl nginx enable`, then `sudo systemctl nginx start`
    - NodeJS (using pm2): `pm2 startup`, then run provided command
    - Run server manually: `pm2 start index.js`
- To disable
    - NGINX: `sudo systemctl nginx disable`, then `sudo systemctl nginx stop`
    - NodeJS: `pm2 unstartup`, then run provided command.
    - Stop server manually: `pm2 ps`, then `pm2 stop [id]`
