# create-awesome-react-app

This is a CLI command for creating a React app configured with a headless CMS. Based on the options chosen when running the command you can choose between a selection of React frameworks and CMS frameworks.

# Install

To get started install the command as a global package.

	npm install create-awesome-react-app --global

-
	> Before starting  make sure you are running at least node verison 9.

## Running Command

Now you will have access to the `create-awesome-react-app` command.  Before running the command make sure to create a directory for your project and then `cd` into that project.

-
	> Running at least node verison 9, SQL is running, can create domains for local repos (MAMP PRO)

	mkdir myProject
	cd myProject
	create-awesome-react-app

## Options

There are a number of options you can pass when running `create-awesome-react-app`

|Option          |Description                    |Default                      |
|----------------|-------------------------------|-----------------------------|
|--git           |Installs git to your repo      |false                        |
|--ignoreInstall |Ignore installing dependencies |false                        |
|--yes           |Skips the prompts              |false                        |
