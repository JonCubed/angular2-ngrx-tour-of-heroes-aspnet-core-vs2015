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
* Angular Cli 1.0.0-beta.1

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

### Step 1. Create an empty ASP.NET Core project

1. Open Visual Studio 2015 and click *New Project...* on Start Page.

1. Create a new ***ASP.NET Web Application***
    ![Create ASP.NET Web Application](./assets/create-web-application.png)

1. Select ***Empty*** from *ASP.NET 5 Templates*
    ![Select Web API template](./assets/select-web-api-template.png)

### Step 2. Setup Angular 2 in the project

1. Open an elevated command prompt at the project folder, i.e. *{solution}/src/{project}*

1. Initalise Angular by running the following angular-cli command

    ```cmd
    > ng init --name toh --prefix toh --source-dir clientSrc
    ```
    > Here we are calling our angular app toh (tour of heroes). We are also saying we want to default our
    > components with toh and that the app source folder should be clientSrc instead of src

1. ASP.NET Core expects our static files to be placed in ***wwwroot/*** however by default the angular cli will output to *dist/*.
  To fix this add a new ***JSON File*** to the project's root folder called ***.ember-cli*** and copy/paste the following:

    ```json
    {
        "output-path": "wwwroot/"
    }
    ```
    > In future versions this will probably be move into angular-cli.json

### Step 3. Configure Typescript

1. Copy/paste the following into ***tsconfig.json*** in *clientSrc/*

    ```json
    {
        "compileOnSave": true,
        "compilerOptions": {
            "declaration": false,
            "emitDecoratorMetadata": true,
            "experimentalDecorators": true,
            "module": "commonjs",
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
    > Note: We also added a post build scipt for running angular cli *build* command, which we will integrate soon

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

## Install Packages

### Angular 2 Material

1. Install the following packages

    ```cmd
    npm install @angular2-material/core --save
    npm install @angular2-material/list --save
    npm install @angular2-material/toolbar --save
    npm install @angular2-material/input --save
    npm install @angular2-material/card --save
    ```

1. Include material2 in ***angular-cli-build.js***. Copy/paste the following:

    ```js
    /* global require, module */

    var Angular2App = require('angular-cli/lib/broccoli/angular2-app');

    module.exports = function(defaults) {
        return new Angular2App(defaults, {
            vendorNpmFiles: [
            'systemjs/dist/system-polyfills.js',
            'systemjs/dist/system.src.js',
            'zone.js/dist/*.js',
            'es6-shim/es6-shim.js',
            'reflect-metadata/*.js',
            'rxjs/**/*.js',
            '@angular/**/*.js',
            '@angular2-material/**/*.js'
            ]
        });
    };
    ```

1. Set up SystemJS configuration ***system-config.ts*** in *clientSrc/*. Copy/paste the following:

    ```js
    /***********************************************************************************************
    ** User Configuration.
    **********************************************************************************************/
    /** Map relative paths to URLs. */
    var map = {
        '@angular2-material': 'vendor/@angular2-material'
    };
    var materialPackages = [
        'core',
        'toolbar',
        'icon',
        'list',
        'card',
        'input'
    ];
    /** User packages configuration. */
    var packages = createCustomConfig(materialPackages);

    function createCustomConfig(packages) {
        return packages.reduce(function (packageConfig, packageName) {
            packageConfig[("@angular2-material/" + packageName)] = {
                format: 'cjs',
                defaultExtension: 'js',
                main: packageName
            };
            return packageConfig;
        }, {});
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////
    /***********************************************************************************************
    ** Everything underneath this line is managed by the CLI.
    **********************************************************************************************/
    var barrels = [
        // Angular specific barrels.
        '@angular/core',
        '@angular/common',
        '@angular/compiler',
        '@angular/http',
        '@angular/router',
        '@angular/platform-browser',
        '@angular/platform-browser-dynamic',
        // Thirdparty barrels.
        'rxjs',
        // App specific barrels.
        'app',
        'app/shared'
    ];
    var cliSystemConfigPackages = {};
    barrels.forEach(function (barrelName) {
        cliSystemConfigPackages[barrelName] = { main: 'index' };
    });
    // Apply the CLI SystemJS configuration.
    System.config({
        map: {
            '@angular': 'vendor/@angular',
            'rxjs': 'vendor/rxjs',
            'main': 'main.js'
        },
        packages: cliSystemConfigPackages
    });
    // Apply the user's configuration.
    System.config({ map: map, packages: packages });
    ```

### Install ngrx/store

1. Install the ngrx/store package

    ```cmd
    npm install @ngrx/store --save
    ```

1. Include ngrx/store in ***angular-cli-build.js***. Copy/paste the following:

    ```js
    /* global require, module */

    var Angular2App = require('angular-cli/lib/broccoli/angular2-app');

    module.exports = function(defaults) {
        return new Angular2App(defaults, {
            vendorNpmFiles: [
            'systemjs/dist/system-polyfills.js',
            'systemjs/dist/system.src.js',
            'zone.js/dist/*.js',
            'es6-shim/es6-shim.js',
            'reflect-metadata/*.js',
            'rxjs/**/*.js',
            '@angular/**/*.js',
            '@angular2-material/**/*.js',
            '@ngrx/**/*.js'
            ]
        });
    };
    ```

1. Set up SystemJS configuration ***system-config.ts*** in *clientSrc/*. Copy/paste the following:

    ```js
    /***********************************************************************************************
    ** User Configuration.
    **********************************************************************************************/
    /** Map relative paths to URLs. */
    const map: any = {
        '@angular2-material': 'vendor/@angular2-material',
        '@ngrx': 'vendor/@ngrx'
    };

    const materialPackages:string[] = [
        'core',
        'toolbar',
        'icon',
        'list',
        'card',
        'input'
    ];

    /** User packages configuration. */
    let packages:any = {
        "@ngrx/store" : { main: 'index', defaultExtension: 'js' }
    };

    packages = Object.assign(
        packages,
        createCustomConfig(materialPackages)
    );

    function createCustomConfig(packages: string[]): any {
        return packages.reduce((packageConfig: any, packageName: string) => {
            packageConfig[`@angular2-material/${packageName}`] = {
            format: 'cjs',
            defaultExtension: 'js',
            main: packageName
            };
            return packageConfig;
        }, {});
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////
    /***********************************************************************************************
    ** Everything underneath this line is managed by the CLI.
    **********************************************************************************************/
    const barrels: string[] = [
        // Angular specific barrels.
        '@angular/core',
        '@angular/common',
        '@angular/compiler',
        '@angular/http',
        '@angular/router',
        '@angular/platform-browser',
        '@angular/platform-browser-dynamic',

        // Thirdparty barrels.
        'rxjs',
        '@ngrx/store',

        // App specific barrels.
        'app',
        'app/shared',
        /** @cli-barrel */
    ];

    const cliSystemConfigPackages: any = {};
    barrels.forEach((barrelName: string) => {
        cliSystemConfigPackages[barrelName] = { main: 'index' };
    });

    /** Type declaration for ambient System. */
    declare var System: any;

    // Apply the CLI SystemJS configuration.
    System.config({
    map: {
        '@angular': 'vendor/@angular',
        'rxjs': 'vendor/rxjs',
        'main': 'main.js'
    },
    packages: cliSystemConfigPackages
    });

    // Apply the user's configuration.
    System.config({ map, packages });
    ```

## Tour of Heroes

Have a look at the [Angular 2 Tour of Heroes Tutorial](https://angular.io/docs/ts/latest/tutorial/) before continuing to have a better understanding of we are doing here.

### Step 1. Setup file structure

1. Create a ***heroes*** folder in *app/*

1. Create a ***shared*** folder in *app/heroes/*

### Step 2. Hero Model

1. Create a ***Hero*** class in *app/heroes/shared* using the cli

    ```powershell
    > ng generate class heroes/shared/Hero model
    ```

1. Give the Hero class ***id*** and ***name*** properties. Copy/paste the following:

    ```typescript
    export class Hero {
        id: number;
        name: string;
    }
    ```

### Step 3. Map Model

1. Create a ***Map*** class in *app/shared* using the cli

    ```powershell
    > ng generate class shared/Map model
    ```

1. Copy/paste the following:

    ```typescript
    export interface Map<V> {
        [key:string]: V;
    }
    ```

### Step 4. Create App Store

1. Create a *AppState* class to *app/shared*

    ```powershell
    > ng generate class shared/AppState store
    ```

1. Change the AppState class to an interface. Copy/paste the following:

    ```typescript
    import { Hero, EntitiesInitialState, HeroesInitialState } from '../heroes'
    import { Map } from './map.model'

    export interface AppState {
        entities: {
            heroes: Map<Hero>
        },
        heroes: {
            list: number[],
            selected: number;
        }
    }

    export const AppInitialState:AppState = {
        entities: EntitiesInitialState,
        heroes: HeroesInitialState
    }
    ```

### Step 5. Create Actions

1. Create a *actions* folder in *app/heroes/*

1. Create a *Hero* class to *app/actions*

    ```powershell
    > ng generate class heroes/actions/hero actions
    ```

1. Change the *Hero* class to constants. Copy/paste the following:

    ```typescript
    export const HEROES_UPDATE_NAME = 'HEROES_UPDATE_NAME'
    export const HEROES_LOAD = 'HEROES_LOAD'
    export const HEROES_SELECT = 'HEROES_SELECT'
    ```

### Step 6. Create Reducers

1. Create a *reducers* folder in *app/heroes/*

1. Create a *Heroes* class in *app/heroes/reducers*

    ```powershell
    > ng generate class heroes/reducers/Heroes reducer
    ```

1. Change Heroes class into a function. Copy/paste the following:

    ```typescript
    import { Reducer, Action } from '@ngrx/store'

    import { HEROES_LOAD, HEROES_SELECT } from '../actions'
    import { Hero } from '../shared'
    import { Map } from '../../shared'

    interface IHeroesState {
        list: number[];
        selected: number;
    }

    export const HeroesInitialState:IHeroesState = {
        list: [],
        selected: null
    }

    export const heroesReducer:Reducer<IHeroesState> = (state:IHeroesState = HeroesInitialState, action: Action) => {

        switch (action.type) {
            case HEROES_LOAD:
                return Object.assign({}, state, { list: action.payload.result });

            case HEROES_SELECT:
                return Object.assign({}, state, { selected: action.payload });

            default:
                return state;
        }
    }
    ```

1. Create a *Entities* class in *app/heroes/reducers*

    ```powershell
    > ng generate class heroes/reducers/Entities reducer
    ```

1. Change *Entities* class into a function. Copy/paste the following:

    ```typescript
    import { Reducer, Action } from '@ngrx/store'

    import { Hero } from '../shared'
    import { Map } from '../../shared'

    interface IEntitiesState {
        heroes: Map<Hero>
    }

    export const EntitiesInitialState:IEntitiesState = {
        heroes: {}
    }

    export const entitiesReducer:Reducer<IEntitiesState> = (state:IEntitiesState = EntitiesInitialState, action: Action) => {        
        // updates state.entities state when any payload has .entities on it
        if (action.payload && action.payload.entities) {
            let payload:IEntitiesState = EntitiesInitialState;

            // merge individual entities first
            for(var entityType in action.payload.entities) {
                payload[entityType] = Object.assign({}, state[entityType], action.payload.entities[entityType]);
            }

            return Object.assign({}, state, payload);
        }

        return state;
    }
    ```

1. Create a *AppState* class in *app/shared/*

    ```powershell
    > ng generate class shared/AppState reducer
    ```

1. Change *AppSate* class into an object literal. Copy/paste the following:

    ```typescript
    import { entitiesReducer, heroesReducer } from '../'

    export var AppStateReducer = {
        entities: entitiesReducer,
        heroes: heroesReducer
    };
    ```

### Step 7. Create Heroes Mock data

1. Create a ***MockHero** class to *app/heroes/shared* using the angular cli

    ```powershell
    > ng generate class Heroes/Shared/MockHeroes
    ```

1. Add the mock data. Copy/paste the following into ***mock-heroes.ts*** in *app/heroes/shared/*

    ```typescript
    import { Hero } from './hero';

    export var HEROES: Array<Hero> = [
        {"id": 11, "name": "Mr. Nice"},
        {"id": 12, "name": "Narco"},
        {"id": 13, "name": "Bombasto"},
        {"id": 14, "name": "Celeritas"},
        {"id": 15, "name": "Magneta"},
        {"id": 16, "name": "RubberMan"},
        {"id": 17, "name": "Dynama"},
        {"id": 18, "name": "Dr IQ"},
        {"id": 19, "name": "Magma"},
        {"id": 20, "name": "Tornado"}
    ];
    ```

### Step 8. Create Hero Service

1. Create a ***Hero** service to *app/heroes/shared/* using the angular cli

    ```powershell
    > ng generate service Heroes/Shared/Hero
    ```

1. Replace ***hero.service.ts*** in *app/heroes/shared/*. Copy/paste the following:

    ```typescript
    import { Injectable } from '@angular/core';
    import { Observable,   } from 'rxjs/observable';
    import { Store } from '@ngrx/store';

    import { HEROES_UPDATE_NAME, HEROES_SELECT, HEROES_LOAD } from '../actions';
    import { HEROES } from './mock-heroes';
    import { Hero } from './hero.model';
    import { AppState, Map } from '../../shared';

    @Injectable()
    export class HeroService {
    heroes$: Observable<Map<Hero>>;

    constructor(public store: Store<AppState>) {
        this.heroes$ = store.select(store => store.entities.heroes);
    }

    loadHeroes() {
        let heroes = HEROES;

        let heroEntities:Map<Hero> = {};
        let heroList:number[] = [];

        // Normalise heroes into a hash map
        heroes.forEach((hero)=> {
            heroEntities[hero.id] = hero;
            heroList.push(hero.id);
        });

        this.store.dispatch({
        type:HEROES_LOAD, payload: {
            entities: {
            heroes: heroEntities
            },
            result: heroList
        }
        });
    }

    updateName(id: number, name:string) {
        let hero = {};
        hero[id] = {id, name};

        this.store.dispatch({
            type: HEROES_UPDATE_NAME,
            payload: {
                entities: {
                    heroes: hero
                }
            }
        });
    }

    select(heroId: number) {
        this.store.dispatch({type:HEROES_SELECT, payload:heroId});
    }

    }
    ```

### Step 9. Hero List Component

1. Add a ***HeroList** component to *app/heroes* using the angular cli

    ```powershell
    > ng generate component Heroes/HeroList
    ```

1. Replace ***/hero-list.component.ts*** in *app/heroes/hero-list/* with the following:

    ```typescript
    import {
        Component,
        Input,
        Output,
        EventEmitter,
        ChangeDetectionStrategy
    } from '@angular/core';

    import { Hero } from '../shared';

    @Component({
        moduleId: module.id,
        selector: 'toh-hero-list',
        templateUrl: 'hero-list.component.html',
        styleUrls: ['hero-list.component.css'],
        changeDetection: ChangeDetectionStrategy.OnPush
    })
    export class HeroListComponent {

        @Input() heroes: Hero[];
        @Input() selectedHero: number;
        @Output() select = new EventEmitter<number>(true);

        onSelect(heroId: number) {
            this.select.emit(heroId);
        }
    }
    ```

1. Add a template for HeroList Component ***hero-List.component.html*** in *app/heroes/hero-list/*. Copy/paste the following:

    ```html
    <div *ngIf="heroes">
        <md-list class="heroes">
            <div *ngFor="let hero of heroes"
                class="hero"
                [class.selected]="hero.id === selectedHero"
                (click)="onSelect(hero.id)">
                <md-list-item>
                    <p md-line>
                        <span class="badge">{{hero.id}}</span> {{hero.name}}
                    </p>
                </md-list-item>
            </div>
        </md-list>
    </div>
    ```

1. Add a styles for HeroList Component ***hero-List.component.css*** in *app/heroes/hero-list/*. Copy/paste the following:

    ```css
    .hero:hover {
        color: #212121;
        background-color: #B3E5FC;
        left: .1em;
    }

    .hero.selected {
        color: #212121;
        background-color: #536DFE;
    }

    .hero.selected:hover {
        color: #212121;
    }

    .hero.selected .badge {
        background-color: #03A9F4;
    }

    .heroes .text {
        position: relative;
        top: -4px;
    }

    .heroes .badge {
        display: inline-block;
        font-size: small;
        color: #FFFFFF;
        padding: 0.8em 0.7em 0 0.7em;
        background-color: #0288D1;
        line-height: 1em;
        position: relative;
        left: -1px;
        top: -4px;
        height: 1.8em;
        margin-right: .8em;
        border-radius: 4px 0 0 4px;
    }
    ```

### Step 10. Hero Detail Component

1. Add a ***HeroDetail** component to *app/heroes* using the angular cli

    ```powershell
    > ng generate component Heroes/HeroDetail
    ```

1. Replace ***/hero-detail.component.ts*** in *app/heroes/hero-detail/* with the following:

    ```typescript
    import {
        Component
        , Input
        , Output
        , EventEmitter
        ,ChangeDetectionStrategy
    } from '@angular/core';

    import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';

    import { Hero } from '../shared/index'

    @Component({
        moduleId: module.id,
        selector: 'toh-hero-detail',
        templateUrl: 'hero-detail.component.html',
        styleUrls: ['hero-detail.component.css'],
        directives: [ MD_INPUT_DIRECTIVES ],
        changeDetection: ChangeDetectionStrategy.OnPush
    })
    export class HeroDetailComponent {

        @Input() hero: Hero;
        @Output() change = new EventEmitter(true);

        onNameChange(name:string) {
            this.change.emit({id: this.hero.id, name});
        }
    }
    ```

1. Add a template for HeroDetail Component ***hero-detail.component.html*** in *app/heroes/hero-detail/*. Copy/paste the following:

    ```html
    <div *ngIf="hero">
        <h2>{{hero.name}} details!</h2>
        <div>
            <md-input [value]="hero.id" placeholder="id" disabled></md-input>
            <md-input #name [value]="hero.name" (keyup)="onNameChange(name.value)" placeholder="name"></md-input>
        </div>
    </div>
    ```

### Step 11. Barrel files

> Hopefully in the future the angular cli will do this automatically

1. Create a barrel file ***index.ts*** in *app/heroes/shared/*. Copy/paste the following:

    ```typescript
    export { Hero } from './hero.model';
    export { HEROES } from './mock-heroes';
    export { HeroService } from './hero.service';
    ```

1. Create a barrel file ***index.ts*** in *app/heroes/reducers*

    ```typescript
    export { entitiesReducer, EntitiesInitialState, } from './entities.reducer'
    export { heroesReducer, HeroesInitialState } from './heroes.reducer''
    ```

1. Create a barrel file ***index.ts*** in *app/heroes/actions*

    ```typescript
    export { HEROES_LOAD, HEROES_SELECT, HEROES_UPDATE_NAME } from './hero.Actions';
    ```

1. Create a barrel file ***index.ts*** in *app/heroes/*. Copy/paste the following:

    ```typescript
    export * from './hero-detail';
    export * from './hero-list';
    export * from './shared';
    export * from './reducers';
    export * from './actions';
    ```

1. Create a barrel file ***index.ts*** in *app/shared/*. Copy/paste the following:

    ```typescript
    export { AppState, AppInitialState } from './app-state.store';
    export { AppStateReducer } from './app-state.reducer';
    export { Map } from './map.model';
    ```

1. Create a barrel file ***index.ts*** in *app/*. Copy/paste the following:

    ```typescript
    export {environment} from './environment';
    export {TohAppComponent} from './toh.component';
    export * from './heroes';
    export {AppInitialState, AppState, AppStateReducer, Map} from './shared';
    ```

### Step 12. App Component

1. Copy/paste the following into ***toh.component.ts*** in *app/*

    ```typescript
    import { Component, OnInit } from '@angular/core';
    import { MdToolbar } from '@angular2-material/toolbar';
    import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
    import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
    import { Store } from '@ngrx/store';
    import { Observable } from 'rxjs/observable';
    import 'rxjs/add/operator/combineLatest';

    import { AppState, Map } from './index'
    import {
        Hero,
        HeroService,
        HeroListComponent,
        HeroDetailComponent
    } from './heroes/index';

    @Component({
        moduleId: module.id,
        selector: 'toh-app',
        templateUrl: 'toh.component.html',
        styleUrls: ['toh.component.css'],
        directives: [
            MdToolbar,
            MD_CARD_DIRECTIVES,
            MD_LIST_DIRECTIVES,
            HeroListComponent,
            HeroDetailComponent
        ],
        providers: [ HeroService ]
    })
    export class TohAppComponent implements OnInit {
        title = 'Tour of Heroes';
        selectedHero$: Observable<Hero>;
        heroes$: Observable<Hero[]>;

        constructor(private heroService: HeroService, public store: Store<AppState>){
            let heroes$ = this.heroService
                            .heroes$;

            // convert heroes map back into array
            this.heroes$ = store.select(state => state.heroes.list)
                                .combineLatest(
                                    heroes$,
                                    (heroList, heroEntities) => {
                                        return heroList.reduce((arr, id) => {
                                            arr.push(heroEntities[id]);

                                            return arr;
                                        }, []);
                                    }
                                )

            // get the selected hero
            this.selectedHero$ = store.select<number>(state => state.heroes.selected)
                                    .combineLatest(
                                        heroes$,
                                        (id, heroes) => heroes[id]
                                    );
        }

        ngOnInit() {
            this.heroService.loadHeroes();
        }

        onHeroListSelectChange(heroId: number) {
            this.heroService.select(heroId);
        }

        onHeroDetailsChange(event:{id:number, name:string}) {
            this.heroService.updateName(event.id, event.name);
        }
    }
    ```

1. Update toh component template. Copy/paste the following into ***toh.component.html*** in *app/*:

    ```html
    <md-toolbar [color]="accent">
        <span>{{title}}</span>
    </md-toolbar>
    <div class="card-container">
        <md-card class="master-card">
            <md-card-header>
                <md-card-title>My Heroes</md-card-title>
            </md-card-header>
            <md-card-content>
                <toh-hero-list
                    [heroes]="heroes$ | async"
                    [selectedHero]="selectedHero$ | async"
                    (select)="onHeroListSelectChange($event)">
                </toh-hero-list>
            </md-card-content>
        </md-card>
        <md-card class="detail-card">
            <toh-hero-detail
                [hero]="selectedHero$ | async"
                (change)="onHeroDetailsChange($event)">
            </toh-hero-detail>
        </md-card>
    <div>
    ```

1. Update toh component styles. Copy/paste the following into ***toh.component.css*** in *app/*:

    ```css
    md-toolbar {
        background-color: #03A9F4;
        color: #FFFFFF;
    }

    .card-container {
    display: flex;
    flex-flow: row wrap;
    }

    .master-card {
    width: 300px;
    box-sizing: border-box;
    }

    .detail-card {
    flex-grow: 1;
    box-sizing: border-box;
    }

    .master-card md-card-title {
        font-size: 2rem;
    }
    ```

### Step 13. Update bootstrap

1. Update bootstrap to provide store in ***main.ts***

    ```typescript
    import { bootstrap } from '@angular/platform-browser-dynamic';
    import { enableProdMode } from '@angular/core';
    import { provideStore } from '@ngrx/store';

    import { TohAppComponent, environment, AppStateReducer, AppInitialState } from './app/';

    if (environment.production) {
        enableProdMode();
    }

    bootstrap(
        TohAppComponent,
        [ provideStore(AppStateReducer, AppInitialState) ]
    );
    ```

### Step 14. Update ***system-config.ts*** in *app/* with all the app folders

    ```
    /***********************************************************************************************
    ** User Configuration.
    **********************************************************************************************/
    /** Map relative paths to URLs. */
    const map: any = {
        '@angular2-material': 'vendor/@angular2-material',
        '@ngrx': 'vendor/@ngrx'
    };

    const materialPackages:string[] = [
        'core',
        'toolbar',
        'icon',
        'list',
        'card',
        'input'
    ];

    /** User packages configuration. */
    let packages:any = {
        "@ngrx/store" : { main: 'index', defaultExtension: 'js' }
    };

    packages = Object.assign(
        packages,
        createCustomConfig(materialPackages)
    );

    function createCustomConfig(packages: string[]): any {
        return packages.reduce((packageConfig: any, packageName: string) => {
            packageConfig[`@angular2-material/${packageName}`] = {
            format: 'cjs',
            defaultExtension: 'js',
            main: packageName
            };
            return packageConfig;
        }, {});
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////
    /***********************************************************************************************
    * Everything underneath this line is managed by the CLI.
    **********************************************************************************************/
    const barrels: string[] = [
        // Angular specific barrels.
        '@angular/core',
        '@angular/common',
        '@angular/compiler',
        '@angular/http',
        '@angular/router',
        '@angular/platform-browser',
        '@angular/platform-browser-dynamic',

        // Thirdparty barrels.
        'rxjs',
        '@ngrx/store',

        // App specific barrels.
        'app',
        'app/shared',
        'app/heroes',
        'app/heroes/hero-list',
        'app/heroes/hero-detail',
        'app/heroes/shared',
        'app/heroes/reducers',
        'app/heroes/actions',
        /** @cli-barrel */
    ];

    const cliSystemConfigPackages: any = {};
        barrels.forEach((barrelName: string) => {
        cliSystemConfigPackages[barrelName] = { main: 'index' };
    });

    /** Type declaration for ambient System. */
    declare var System: any;

    // Apply the CLI SystemJS configuration.
    System.config({
        map: {
            '@angular': 'vendor/@angular',
            'rxjs': 'vendor/rxjs',
            'main': 'main.js'
        },
        packages: cliSystemConfigPackages
    });

    // Apply the user's configuration.
    System.config({ map, packages });
    ```

### Step 15. Run App

1. Start the Visual Studio Debugger, press **F5**