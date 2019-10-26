# create-awesome-react-app

This is a CLI command for creating a React app configured with a headless CMS. Based on the options chosen when running the command you can choose between a selection of React frameworks and CMS frameworks.

# Install

To get started install the package with the follow command.

	npm install create-awesome-react-app --global

 > It is best to install as a global dependency as you can continue to use the command anytime you are creating new projects.

## Creating a project

 When you run the command `create-awesome-react-app` it will prompt you will a series of options for configuring your project. You can choose between different React  and CMS frameworks as well as configure the sql credentials for connecting to the sql server.

 This package will create a repo with two folders, the `/app` folder and the `/api` folder. The `/app` folder will container all the files needed to run the bootstrap demo app. The `/api` folder will contain all your CMS related files including an `.htaccess` file which is used for connecting to the database.

**Before running command there are a few important things to note, make sure the following are all true before running the `create-awesome-react-app` command**

- > Your terminal is running at least node verison 9 or greater
- > SQL is running on port 3306
- > Ideally you can create domains for local repos (MAMP PRO)

If any of these aren't true, you may run into install issues. If so please add an issue to the github repo so I can fix it as soon as possible.

You can run the command two ways, with or without a project name. If you include a project name it will add a parent folder around the the app equal to the name you give the project.

**Running with defining a project**


	create-awesome-react-app myProject

The resulting folder structure after completion will be

	myProject/
	  > app/
	  > api/

**Running without a project defined**


	create-awesome-react-app

The resulting folder structure after completion will be

	> app/
	> api/

## After install
After a successful install you will see two folders.

	> app/
	> api/

<br/>
#### Handling CMS domian
During the installment you were asked to point the domain for your CMS to the `myProject/api/` directory. Depending on your machines set up this may be done differently from person to person. The simplest way is to use MAMP PRO and just use the host manager to create a domain pointing to `myProject/api/` . Make sure it is using apache as the `.htaccess` file is used to connect the CMS to the database created during the install. If you use another method and need to change you CMS url you created during the install, you will need to update the urls in the database as well as the the `myProject/app/app.config.json` file where you will see an `APP_HOST` object. Update the `development` key inside that object.

If you chose WordPress as you CMS you can update the urls in the CMS with the following SQL query.

	UPDATE wp_options SET option_value = replace(option_value, 'http://myoldsite.com', 'http://mynewsite.com') WHERE option_name = 'home' OR option_name = 'siteurl';

	UPDATE wp_posts SET guid = replace(guid, 'http://myoldsite.com','http://mynewsite.com');

	UPDATE wp_posts SET post_content = replace(post_content, 'http://myoldsite.com', 'http://mynewsite.com');

	UPDATE wp_postmeta SET meta_value = replace(meta_value,'http://myoldsite.com','http://mynewsite.com');

#### Starting the app
To run the app just simply `cd` int the `myProject/app` directory and run `npm run dev`. You can also run tests with `npm run test`.

#### Learning the about the boilerplate
When you create the app, you will see a folder called `myProject/app/developer-manual`. Inside you will see an `index.html` file. Open it in a browser to see the docs for the boilerplate. In here you can learn about the different features and patterns including examples on how to make changes.

## Options

There are a number of options you can pass when running `create-awesome-react-app`

|Option          |Description                    |Options                      |
|----------------|-------------------------------|-----------------------------|
|[project]       |Create a parent project folder |string                       |
|--template      |Choose a React template to use |nextjs                       |
|--git           |Installs git to your repo      |Boolean                      |
|--ignoreInstall |Ignore installing dependencies |Boolean                      |
|--yes           |Skips the promps               |Boolean                      |
