# ToonilyID2Title

Converts Toonily IDs to titles using the JSON created from [Paperback2Aidoku](https://github.com/kymotsujason/Paperback2Aidoku). Since Aidoku's Toonily source uses the `toonily.com/webtoon/id` URL, we can't use the Paperback Toonily IDs which use `toonily.com/?p=id`.

Download and run the app from [releases](https://github.com/kymotsujason/ToonilyID2Title/releases/latest) (build is huge because electron)

## Getting Started (development)

These instructions will get you a copy of the project up and running on your local machine for development. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to utilize this project and how to install them

```
NodeJS - https://nodejs.org/en/download/package-manager/current
```

### Installing

Clone the project to your system or download the zip

```
git clone https://github.com/kymotsujason/ToonilyID2Title.git
```

Install the dependencies from inside the root project folder

```
npm install
```

Run the dev server

```
npm run dev
```

## Deployment

Run the following commmand to build the app for Windows

```
npm run build:win
```

Then go to the dist folder and run the exe

## Built With

* [electron-vite](https://electron-vite.org/) - Build tool combining Electron, Vite, and React

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us. If you have any issues or questions, feel free to open an issue, comment on an existing issue, or ping me in the Aidoku discord (kymotsujason).

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Jason Yue** - *Initial work* - [kymotsujason](https://github.com/kymotsujason)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details