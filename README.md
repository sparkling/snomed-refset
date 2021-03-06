#IHTSDO Refset Manager

An IHTSDO Open Tooling Framework project for editing and publishing Snomed Refsets. This is a single page application using Responsive Design, and is available for most resolutions, from mobile displays to pads to large screens.

This application was built with the Ember Framework, and is based on the [Ember App Kit](https://github.com/stefanpenner/ember-app-kit) template.

##How to install

###Install Node JS 0.10.x (Ubuntu 13.10, 14.04)
You can install using the apt package manager, following [these instructions]()

    sudo apt-get install nodejs
    ln -s /usr/bin/node /usr/bin/nodejs
###Install Node Package Manager
You can install using the apt package manager, following [these instructions]()

    sudo apt-get install npm
###Install global node tools
- Grunt, the Javascript Task runner

        npm install -g grunt-cli
- Bower, the client package manager tool

        npm install -g bower
        npm update -g bower
        
- Ember CLI, the ember framework tool

        npm install -g ember-cli

###Create new user
Create a new user account for running the refset app, and login with this new user before continuing

    useradd -d /home/refset -m refset
    passwd refset
    su - refset
        
###Check out and prepare project

    git clone git@github.com:IHTSDO/snomed-refset.git
    cd snomed-refset
    npm install
    bower install
###Build the application

    ember build --environment=production
    
###Using a CDN
It is highly reccomended that you use a CDN for delivering the app resources for optimal resource loading and page speed, as the initial page load is about 1Mb in size. You are free to choose any CDN provider you wish. 

In order to build the app with the correct CDN URL, you need to modify the [Brocoli build file](https://github.com/IHTSDO/snomed-refset/blob/master/Brocfile.js) to include this section:

    fingerprint: {
      enabled: true,
      prepend: 'https://sudomain.cloudfront.net/'
    },
    
as detailed in [these instructions](http://iamstef.net/ember-cli/#asset-compilation) (See 'Fingerprinting and CDN URLs' section)
###Configure an Nginx proxy for the app

Follow [these instructions](https://github.com/IHTSDO/snomed-publish/tree/master/config/nginx) for how to set up nginx. The Nginx configuration file for the ember app can also be found at this location.
