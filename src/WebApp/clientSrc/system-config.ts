/***********************************************************************************************
 * User Configuration.
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
  'app/heroes/hero-detail',
  'app/heroes/shared',
  'app/heroes/reducers',
  'app/heroes/hero-list',
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
