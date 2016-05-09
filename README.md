# Angular 2 (rc1) Tour of Heroes using ngrx, Angular Cli and ASP.NET 5 in Visual Studio 2015

This repository aims to implement the [Angular 2 Tour of Heroes Tutorial](https://angular.io/docs/ts/latest/tutorial/)
using the [Angular Cli](https://github.com/angular/angular-cli), [ngrx/store](https://github.com/ngrx/store), 
[ngrx/router](https://github.com/ngrx/router) and [ASP.NET 5](https://docs.asp.net/en/latest/) in Visual Studio 2015.

## Perequisite

I'm using:

* Visual Studio 2015 Community Update 2
* [ASP.NET and Web Tools 2015 (RC1 Update 1)](https://docs.asp.net/en/latest/getting-started/installing-on-windows.html#install-asp-net-5-with-visual-studio)
* [ASP.NET 5 Scripts Task Runner](https://visualstudiogallery.msdn.microsoft.com/9397a2da-c93a-419c-8408-4e9af30d4e36)
* Typescript 1.8.30.0
* Typings 0.8.1
* NPM 3.8.8
* Angular Cli 0.1.0

Visual Studio 2015 includes its own version of external tools, unfortunately these tools have not been updated causing errors with some required packages.
To fix this we are going to force Visual Studio to use our global installs of node and npm.
Follow the instructions in the follow blog - [Customize external web tools in visual studio 2015](https://blogs.msdn.microsoft.com/webdev/2015/03/19/customize-external-web-tools-in-visual-studio-2015/).

### Setting up ASP.NET Core RC1

1. Follow instructions to [Install ASP.NET 5 on Windows](https://docs.asp.net/en/1.0.0-rc1/getting-started/installing-on-windows.html)

1. Upgrade to latest framework, in command prompt

    ```powershell
    > dnvm upgrade latest -r clr -arch x64
    ```

## Getting Started

Have a look at the [5 Min QuickStart Guide](https://angular.io/docs/ts/latest/quickstart.html) before continuing to have a better understanding of we are doing here.

### Step 1. Create an empty ASP.NET Core project

1. Open Visual Studio 2015 and click *New Project...* on Start Page.

1. Create a new ***ASP.NET Web Application***
    ![Create ASP.NET Web Application](./assets/create-web-application.png)

1. Select ***Empty*** from *ASP.NET 5 Templates*
    ![Select Web API template](./assets/select-web-api-template.png)

### Step 2. Setup Angular 2 in the project

1. Open an elevated command prompt at the project folder, i.e. {solution}/src/{project}

1. Initalise Angular by running the following angular-cli command

    ```cmd
    > ng init --name toh --prefix toh --source-dir clientSrc
    ```
    > Here we are calling our angular app toh (tour of heroes). We are also saying we want to default our
    > components with toh and that the app source folder should be clientSrc instead of src

1. ASP.NET Core expects our static files to be placed in ***wwwroot/*** however by default the Angulare Cli will output to *dist/*.
  To fix this add a new ***JSON File*** to the project's root folder called ***.ember-cli*** and copy/paste the following:

    ```json
    {
        "output-path": "wwwroot/"
    }
    ```
    > In future versions this will probably be move into angular-cli.json

### Step 3. Configure Typescript

1. Copy/paste the following into *tsconfig.json* in *clientSrc/*

    ```json
    {
        "compileOnSave": true,
        "compilerOptions": {
            "declaration": false,
            "emitDecoratorMetadata": true,
            "experimentalDecorators": true,
            "module": "system",
            "moduleResolution": "node",
            "noEmitOnError": true,
            "noImplicitAny": false,
            "outDir": "../wwwroot/",
            "rootDir": ".",
            "sourceMap": false,
            "target": "es5",
            "inlineSources": false
        },
        "files": [
            "main.ts",
            "typings.d.ts"
        ]
    }
    ```

### Step 4. Configure ASP.NET Core

#### Add support in ASP.NET 5 for static files

1. Update ***project.json*** in the root folder, copy/paste the following:

        ```json
        {
            "version": "1.0.0-*",
            "compilationOptions": {
                "emitEntryPoint": true
            },

            "dependencies": {
                "Microsoft.AspNet.IISPlatformHandler": "1.0.0-rc1-final",
                "Microsoft.AspNet.Server.Kestrel": "1.0.0-rc1-final",
                "Microsoft.AspNet.StaticFiles": "1.0.0-rc1-final"
            },

            "commands": {
                "web": "Microsoft.AspNet.Server.Kestrel"
            },

            "scripts": { "postbuild": [ "powershell -Command \"$env:project:Directory=Get-Location;Start-Process powershell -Verb runAs -ArgumentList \\\"-Command `\\\"Set-Location $env:project:Directory;ng build`\\\"\\\" " ] },

            "frameworks": {
                "dnx46": { },
                "dnxcore50": { }
            },

            "exclude": [
                "wwwroot",
                "node_modules",
                "tmp"
            ],

            "publishExclude": [
                "**.user",
                "**.vspscc"
            ],

            "contentExclude": [
                "tmp"
            ]
        }
        ```
    > Note: We also added a post build scipt for running Angular Cli build command, which we will integrate soon 

1. Update ***Configure()*** in *Startup.cs* in the root folder

        ```csharp
        public void Configure(IApplicationBuilder app)
        {
            app.UseIISPlatformHandler();
            app.UseDefaultFiles();
            app.UseStaticFiles();
        }
        ```

#### Integrate Angular Cli with MSBuild

1. Open the ***Task Runner Explorer***, you should see the following:

    ![Task Runner Explorer](./assets/task-runner-explorer.png)

1. Right Click ***ng build*** and bind to ***After Build***

> Task Runner Seems to be a little buggy at the moment so you might need to run this manually
from Task Runner Explorer or in the command prompt using *ng build*