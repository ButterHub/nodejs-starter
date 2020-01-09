# Node with SSL reverse proxy setup
`index.js` can be your own nodeJS server. I am using it as a facebook messenger bot.
## Technologies
- [NGINX](https://www.nginx.com/resources/wiki/start/) for reverse proxy to NodeJS server, to allow SSL to be separated from NodeJS
    - I will add load balancing functionality in the future too.
- [Certbot](https://certbot.eff.org/) for easy and regular SSL cert renewal
- [NodeJS](https://nodejs.org/en/) for application
- [PM2](https://www.npmjs.com/package/pm2) for NodeJS process management (restarting on crash, etc)

## Steps: quick way to create them. Any problems? see the guides linked. Tested on Ubuntu 18.04
- Install depedencies
    - Install node with [nvm](https://github.com/nvm-sh/nvm#installation-and-update)
      - `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash`
      - `nvm install node`
    - Get nginx if it wasn't preinstalled: `sudo apt install nginx`
    - `npm i -g pm2` to manage node processes for scaling
- Configure server block for nginx as below. [or read Digital Ocean Guide](https://www.digitalocean.com/community/tutorials/how-to-set-up-nginx-server-blocks-virtual-hosts-on-ubuntu-16-04)
  - Create new `example.com` file in `/etc/nginx/sites-available` with correct nginx server block, see [example](./examples/example.com). 
  - Create `example.com` soft link from `/etc/nginx/sites-enabled` to `/etc/nginx/sites-available` by running `sudo ln -s ../sites-available/example.com example.com`
- Follow [installation instructions for certbot](https://certbot.eff.org/instructions).
  - Point a domain (.e.g example.com) to the server/ nginx.
  - Or just do: `sudo certbot --nginx -d example.com -d www.example.com`
- Ensure NodeJS server and NGINX server are running
    - NGINX: `sudo systemctl nginx enable`, then `sudo systemctl nginx start`
    - NodeJS (using pm2): `pm2 startup`, then run provided command
    - Run server manually: `pm2 start index.js`
- To disable
    - NGINX: `sudo systemctl nginx disable`, then `sudo systemctl nginx stop`
    - NodeJS: `pm2 unstartup`, then run provided command.
    - Stop server manually: `pm2 ps`, then `pm2 stop [id]`
