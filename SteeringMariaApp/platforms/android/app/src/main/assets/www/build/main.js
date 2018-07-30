webpackJsonp([0],{

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BleDeviceService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_native_ble__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bledevice__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_log_log_service__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var BleDeviceService = /** @class */ (function () {
    function BleDeviceService(ble, ngzone, logs) {
        this.device = new __WEBPACK_IMPORTED_MODULE_2__bledevice__["a" /* Bledevice */](ble, ngzone, logs, "", "");
    }
    BleDeviceService.prototype.setDevice = function (json) {
        var obj = __WEBPACK_IMPORTED_MODULE_2__bledevice__["a" /* Bledevice */].decode(json);
        this.device.id = obj.id;
        this.device.name = obj.name;
        this.device.connected = false;
        this.device.connect();
    };
    BleDeviceService.prototype.clearDevice = function () {
    };
    BleDeviceService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__ionic_native_ble__["a" /* BLE */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["M" /* NgZone */], __WEBPACK_IMPORTED_MODULE_3__services_log_log_service__["a" /* LogService */]])
    ], BleDeviceService);
    return BleDeviceService;
}());

//# sourceMappingURL=bledevice.service.js.map

/***/ }),

/***/ 112:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 112;

/***/ }),

/***/ 153:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 153;

/***/ }),

/***/ 196:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__device_device_component__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__servos_servos_component__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__logs_logs_component__ = __webpack_require__(201);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TabsPage = /** @class */ (function () {
    function TabsPage() {
        this.tabDeviceRoot = __WEBPACK_IMPORTED_MODULE_1__device_device_component__["a" /* DeviceComponent */];
        this.tabServosRoot = __WEBPACK_IMPORTED_MODULE_2__servos_servos_component__["a" /* ServosComponent */];
        this.tabLogsRoot = __WEBPACK_IMPORTED_MODULE_3__logs_logs_component__["a" /* LogsComponent */];
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/bb/Dropbox/src/SteeringMaria/SteeringMariaApp/src/pages/tabs/tabs.html"*/'<ion-tabs>\n  <ion-tab [root]="tabDeviceRoot" tabTitle="Device" tabIcon="bluetooth"></ion-tab>\n  <ion-tab [root]="tabServosRoot" tabTitle="Servos" tabIcon="cog"></ion-tab>\n  <ion-tab [root]="tabLogsRoot" tabTitle="Logs" tabIcon="contacts"></ion-tab>\n</ion-tabs>\n\n'/*ion-inline-end:"/home/bb/Dropbox/src/SteeringMaria/SteeringMariaApp/src/pages/tabs/tabs.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 197:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DeviceComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_ble__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_log_log_service__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_bledevice_bledevice_service__ = __webpack_require__(102);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var DeviceComponent = /** @class */ (function () {
    function DeviceComponent(navCtrl, toastCtrl, ble, logService, bleDeviceService, ngZone) {
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.ble = ble;
        this.logService = logService;
        this.bleDeviceService = bleDeviceService;
        this.ngZone = ngZone;
        this.devices = [];
    }
    DeviceComponent.prototype.ionViewDidEnter = function () {
        console.log('ionViewDidEnter');
        //this.scan();
    };
    DeviceComponent.prototype.scan = function () {
        var _this = this;
        this.setStatus('Scanning for Bluetooth LE Devices');
        this.devices = []; // clear list
        this.ble.scan([], 5).subscribe(function (device) { return _this.onDeviceDiscovered(device); }, function (error) { return _this.scanError(error); });
        setTimeout(this.setStatus.bind(this), 5000, 'Scan complete');
    };
    DeviceComponent.prototype.onDeviceDiscovered = function (device) {
        var _this = this;
        console.log('Discovered ' + JSON.stringify(device, null, 2));
        this.logService.add('Discovered ' + JSON.stringify(device, null, 2));
        this.ngZone.run(function () {
            _this.devices.push(device);
        });
    };
    // If location permission is denied, you'll end up here
    DeviceComponent.prototype.scanError = function (error) {
        this.setStatus('Error ' + error);
        var toast = this.toastCtrl.create({
            message: 'Error scanning for Bluetooth low energy devices',
            position: 'middle',
            duration: 5000
        });
        toast.present();
    };
    DeviceComponent.prototype.setStatus = function (message) {
        console.log(message);
        this.logService.add(message);
        /*this.ngZone.run(() => {
          this.statusMessage = message;
        });*/
    };
    DeviceComponent.prototype.deviceSelected = function (device) {
        console.log(JSON.stringify(device) + ' selected');
        this.bleDeviceService.setDevice(device);
    };
    DeviceComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-device',template:/*ion-inline-start:"/home/bb/Dropbox/src/SteeringMaria/SteeringMariaApp/src/pages/device/device.component.html"*/'\n<ion-content>\n    <h2>Device</h2>\n    <ion-list>\n        <ion-item>Name: {{ bleDeviceService.device.name }}</ion-item>\n        <ion-item>ID: {{ bleDeviceService.device.id }}</ion-item>\n        <ion-item>Connected: {{ bleDeviceService.device.connected }}</ion-item>\n    </ion-list> \n     <button ion-button (click)="scan()">\n        Scan\n      </button>\n   <ion-list> \n    <button ion-item *ngFor="let device of devices" (click)=deviceSelected(device) >\n      <h2>{{ device.name || \'Unnamed\' }}</h2>\n      <p>{{ device.id }}</p>\n      <p>RSSI: {{ device.rssi }}</p>\n    </button>  \n   </ion-list> \n   </ion-content>'/*ion-inline-end:"/home/bb/Dropbox/src/SteeringMaria/SteeringMariaApp/src/pages/device/device.component.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_ble__["a" /* BLE */],
            __WEBPACK_IMPORTED_MODULE_3__services_log_log_service__["a" /* LogService */],
            __WEBPACK_IMPORTED_MODULE_4__services_bledevice_bledevice_service__["a" /* BleDeviceService */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */]])
    ], DeviceComponent);
    return DeviceComponent;
}());

//# sourceMappingURL=device.component.js.map

/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServosComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_log_log_service__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_servos_servos_service__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(31);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ServosComponent = /** @class */ (function () {
    //private logService: LogService;
    function ServosComponent(navCtrl, logService, servoService) {
        this.navCtrl = navCtrl;
        this.logService = logService;
        this.servoService = servoService;
        //this.logService = logService;
    }
    ServosComponent.prototype.ngOnInit = function () {
        this.logService.add("Calling Servos!");
    };
    ServosComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-servos',template:/*ion-inline-start:"/home/bb/Dropbox/src/SteeringMaria/SteeringMariaApp/src/pages/servos/servos.component.html"*/'<ion-content>\n    <h2>Servos</h2>\n    <ion-list>\n        <ion-item *ngFor="let servo of servoService.servos">\n\n            <ion-range min="0" max="4095"  [(ngModel)]=servo.pos (ionChange)=servo.sendPos($event)  >\n                <ion-label range-left>{{servo.id}}: {{servo.pos}}</ion-label>\n            </ion-range>\n\n        </ion-item>\n    </ion-list>\n</ion-content>'/*ion-inline-end:"/home/bb/Dropbox/src/SteeringMaria/SteeringMariaApp/src/pages/servos/servos.component.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* NavController */], __WEBPACK_IMPORTED_MODULE_1__services_log_log_service__["a" /* LogService */], __WEBPACK_IMPORTED_MODULE_2__services_servos_servos_service__["a" /* ServoService */]])
    ], ServosComponent);
    return ServosComponent;
}());

//# sourceMappingURL=servos.component.js.map

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServoService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__servo__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__servoConstants__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_log_log_service__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_bledevice_bledevice_service__ = __webpack_require__(102);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ServoService = /** @class */ (function () {
    function ServoService(ble, log) {
        // Common definitions . rhey have to be the same as in the 
        // used sketch!
        this.servos = [];
        for (var i = 0; i < __WEBPACK_IMPORTED_MODULE_2__servoConstants__["a" /* ServoConstants */].NumberOfServos; i++) {
            this.servos.push(new __WEBPACK_IMPORTED_MODULE_1__servo__["a" /* Servo */](i, ble, log));
        }
    }
    ServoService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__services_bledevice_bledevice_service__["a" /* BleDeviceService */], __WEBPACK_IMPORTED_MODULE_3__services_log_log_service__["a" /* LogService */]])
    ], ServoService);
    return ServoService;
}());

//# sourceMappingURL=servos.service.js.map

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServoConstants; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/*
These constants need to have exactly the same vals as the constants in the sketch!
 */
var ServoConstants = /** @class */ (function () {
    function ServoConstants() {
    }
    ServoConstants.NumberOfServos = 2;
    ServoConstants.servoService = '4d41';
    ServoConstants.setServoCharacteristic = '1010';
    ServoConstants = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], ServoConstants);
    return ServoConstants;
}());

//# sourceMappingURL=servoConstants.js.map

/***/ }),

/***/ 201:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LogsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_log_log_service__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(31);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LogsComponent = /** @class */ (function () {
    //private logService: LogService;
    function LogsComponent(navCtrl, logService) {
        this.navCtrl = navCtrl;
        this.logService = logService;
        //this.logService = logService;
    }
    LogsComponent.prototype.ngOnInit = function () {
        this.logService.add("Hello");
        this.logService.add("World");
    };
    LogsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-logs',template:/*ion-inline-start:"/home/bb/Dropbox/src/SteeringMaria/SteeringMariaApp/src/pages/logs/logs.component.html"*/'<div *ngIf="logService.logs.length">\n\n    <h2>Log</h2>\n    <button ion-button\n            (click)="logService.clear()">clear\n    </button>\n    <ion-list>\n        <ion-item *ngFor=\'let logentry of logService.logs\'> \n            <ion-label>{{logentry.date | date: \'short\' }}</ion-label>\n            <ion-label> {{logentry.message}}</ion-label>\n        </ion-item>\n    </ion-list>\n</div>'/*ion-inline-end:"/home/bb/Dropbox/src/SteeringMaria/SteeringMariaApp/src/pages/logs/logs.component.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* NavController */], __WEBPACK_IMPORTED_MODULE_1__services_log_log_service__["a" /* LogService */]])
    ], LogsComponent);
    return LogsComponent;
}());

//# sourceMappingURL=logs.component.js.map

/***/ }),

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(225);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 225:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(268);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_logs_logs_component__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_device_device_component__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_servos_servos_component__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_log_log_service__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_bledevice_bledevice_service__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_servos_servos_service__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_status_bar__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_splash_screen__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_ble__ = __webpack_require__(101);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                //   AboutPage,
                //   ContactPage,
                //    HomePage,
                __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_device_device_component__["a" /* DeviceComponent */],
                __WEBPACK_IMPORTED_MODULE_7__pages_servos_servos_component__["a" /* ServosComponent */],
                __WEBPACK_IMPORTED_MODULE_5__pages_logs_logs_component__["a" /* LogsComponent */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: []
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_device_device_component__["a" /* DeviceComponent */],
                __WEBPACK_IMPORTED_MODULE_7__pages_servos_servos_component__["a" /* ServosComponent */],
                __WEBPACK_IMPORTED_MODULE_5__pages_logs_logs_component__["a" /* LogsComponent */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_8__services_log_log_service__["a" /* LogService */],
                __WEBPACK_IMPORTED_MODULE_9__services_bledevice_bledevice_service__["a" /* BleDeviceService */],
                __WEBPACK_IMPORTED_MODULE_10__services_servos_servos_service__["a" /* ServoService */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_ble__["a" /* BLE */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 268:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(196);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/bb/Dropbox/src/SteeringMaria/SteeringMariaApp/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/home/bb/Dropbox/src/SteeringMaria/SteeringMariaApp/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 276:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Logentry; });
var Logentry = /** @class */ (function () {
    function Logentry(msg) {
        this.date = new Date();
        this.message = msg;
    }
    return Logentry;
}());

//# sourceMappingURL=logentry.js.map

/***/ }),

/***/ 277:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Bledevice; });
var Bledevice = /** @class */ (function () {
    function Bledevice(ble, ngZone, logs, name, id) {
        this.ble = ble;
        this.ngZone = ngZone;
        this.logs = logs;
        this.name = name;
        this.id = id;
        this.peripheral = {};
        this.connected = false;
    }
    Bledevice.prototype.connect = function () {
        var _this = this;
        this.ble.connect(this.id).subscribe(function (peripheral) { return _this.onConnected(peripheral); }, function (peripheral) { return _this.onDeviceDisconnected(peripheral); });
    };
    Bledevice.prototype.onConnected = function (peripheral) {
        var _this = this;
        this.ngZone.run(function () {
            _this.peripheral = peripheral;
            _this.logs.add(JSON.stringify(peripheral, null, 2));
            _this.connected = true;
            // Test-Code: Send command 
        });
    };
    Bledevice.prototype.onDeviceDisconnected = function (peripheral) {
        this.connected = false;
    };
    Bledevice.decode = function (json) {
        var bdev = Object.create(Bledevice.prototype);
        return Object.assign(bdev, json, {});
    };
    Bledevice.prototype.sendCharacteristic = function (service, characteristic, buffer) {
        this.ble.write(this.peripheral.id, service, characteristic, buffer).then(function () { return console.log("Success!"); }, //this.logs.add("Sending test command succeeded!"),
        function (//this.logs.add("Sending test command succeeded!"),
            e) { return console.log('Error!' + e); });
    };
    return Bledevice;
}());

//# sourceMappingURL=bledevice.js.map

/***/ }),

/***/ 278:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Servo; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__servoConstants__ = __webpack_require__(200);

var Servo = /** @class */ (function () {
    function Servo(nr, ble, log) {
        this.id = nr;
        this.pos = 0;
        this.ble = ble;
        this.log = log;
    }
    // Pack the number to send and the own id in a common array buffer
    Servo.prototype.toArrayBuffer = function (para) {
        var tempBuffer = new ArrayBuffer(2);
        var fView1 = new Uint16Array(tempBuffer);
        fView1[0] = para;
        var fview2 = new Uint8Array(tempBuffer);
        var result = new ArrayBuffer(3);
        var fview3 = new Uint8Array(result);
        fview3[0] = this.id;
        fview3[1] = fview2[0];
        fview3[2] = fview2[1];
        return result;
    };
    // Sending the position to ble!
    Servo.prototype.sendPos = function () {
        var buffer = this.toArrayBuffer(this.pos);
        this.ble.device.sendCharacteristic(__WEBPACK_IMPORTED_MODULE_0__servoConstants__["a" /* ServoConstants */].servoService, __WEBPACK_IMPORTED_MODULE_0__servoConstants__["a" /* ServoConstants */].setServoCharacteristic, buffer);
    };
    return Servo;
}());

//# sourceMappingURL=servo.js.map

/***/ }),

/***/ 33:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LogService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__logentry__ = __webpack_require__(276);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LogService = /** @class */ (function () {
    function LogService() {
        this.logs = [];
    }
    LogService.prototype.add = function (msg) {
        this.logs.push(new __WEBPACK_IMPORTED_MODULE_1__logentry__["a" /* Logentry */](msg));
    };
    LogService.prototype.clear = function () {
        this.logs = [];
    };
    LogService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], LogService);
    return LogService;
}());

//# sourceMappingURL=log.service.js.map

/***/ })

},[202]);
//# sourceMappingURL=main.js.map