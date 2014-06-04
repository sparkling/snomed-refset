#IHTSDO Refset Manager

An IHTSDO Open Tooling Framework project for editing and publishing Snomed Refsets. This is a single page application using Responsive Design, and is available for most resolutions, from mobile displays to pads to large screens.

This application was built with the Ember Framework, and is based on the [Ember App Kit](https://github.com/stefanpenner/ember-app-kit) template.

##How to install

###Install Node JS 0.10.x (Ubuntu 13.10, 14.04)
You can install using the apt package manager, following [these instructions]()

    sudo apt-get install nodejs
###Install Node Package Manager
You can install using the apt package manager, following [these instructions]()

    sudo apt-get install npm
###Install global node tools
- Grunt, the Javascript Task runner

        npm install -g grunt-cli
- Bower, the client package manager tool

        npm install -g bower
        npm update -g bower
        
- Less, the css pre-processor

       npm install -g less

###Create new user
Create a new user account for running the refset app, and login with this new user before continuing

    useradd -d /home/refset -m refset
    passwd refset
    su - refset
        
###Check out and prepare project

    git clone git@github.com:IHTSDO/snomed-refset.git
    cd snomed-refset
    npm install
    
###Start the application
Start the Grunt web server

    nohup grunt server &
    
###Configure an Nginx proxy for the app
Follow [these instructions](https://github.com/IHTSDO/snomed-publish/tree/master/config/nginx) for how to set up nginx. The Nginx configuration file for the refset app can also be found at this location.
    
    
