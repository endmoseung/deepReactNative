import DefaultIos from "./ApplicationTabs.ios";
import * as ios from "./ApplicationTabs.ios";
import DefaultAndroid from "./ApplicationTabs.android";
import * as android from "./ApplicationTabs.android";

declare var _test: typeof ios;
declare var _test: typeof android;

declare var _testDefault: typeof DefaultIos;
declare var _testDefault: typeof DefaultAndroid;

export * from "./ApplicationTabs.ios";
export default DefaultIos;
