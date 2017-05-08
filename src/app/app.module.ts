import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule, Http } from '@angular/http';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { First } from "../pages/first/first";
import { Login } from "../pages/login/login";
import { Services } from "../providers/services";
import { Facebook } from "@ionic-native/facebook";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { About } from "../pages/about/about";
import { Browse } from "../pages/browse/browse";
import { BrowseCategory } from "../pages/browse-category/browse-category";
import { ChangePassword } from "../pages/change-password/change-password";
import { Contact } from "../pages/contact/contact";
import { EventDetail } from "../pages/event-detail/event-detail";
import { Forgotpassword } from "../pages/forgotpassword/forgotpassword";
import { Gallery } from "../pages/gallery/gallery";
import { Notifications } from "../pages/notifications/notifications";
import { Photos } from "../pages/photos/photos";
import { Privacy } from "../pages/privacy/privacy";
import { Search } from "../pages/search/search";
import { Settings } from "../pages/settings/settings";
import { Terms } from "../pages/terms/terms";
import { Terms1 } from "../pages/terms1/terms1";
import { Termsofuse } from "../pages/termsofuse/termsofuse";
import { Upcomming } from "../pages/upcomming/upcomming";
import { VenueDetail } from "../pages/venue-detail/venue-detail";
import { Geolocation } from '@ionic-native/geolocation';
import { InAppBrowser } from '@ionic-native/in-app-browser';    
import { IonicImageLoader } from 'ionic-image-loader';
import { PhotoDetail } from "../pages/photo-detail/photo-detail";
import { EmailComposer } from '@ionic-native/email-composer';
import { SocialSharing } from '@ionic-native/social-sharing';




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Login,
    First,
    About,
    Browse,
    BrowseCategory,
    ChangePassword,
    Contact,
    EventDetail,
    Forgotpassword,
    Gallery,
    Notifications,
    Photos,
    Privacy,
    Search,
    Settings,
    Terms,
    Terms1,
    Termsofuse,
    Upcomming,
    VenueDetail,
    PhotoDetail
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicImageLoader.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    First,
    Login,
    About,
    Browse,
    BrowseCategory,
    ChangePassword,
    Contact,
    EventDetail,
    Forgotpassword,
    Gallery,
    Notifications,
    Photos,
    Privacy,
    Search,
    Settings,
    Terms,
    Terms1,
    Termsofuse,
    Upcomming,
    VenueDetail,
    PhotoDetail
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    Camera,
    Services,
    Http,
    Geolocation,
    InAppBrowser,
    EmailComposer,
    SocialSharing,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
