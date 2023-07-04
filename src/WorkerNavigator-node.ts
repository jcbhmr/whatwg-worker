import { interface as interface_, includes } from "@webfill/webidl";
import NavigatorID from "@webfill/html-navigator/NavigatorID.js";
import NavigatorLanguage from "@webfill/html-navigator/NavigatorLanguage.js";
import NavigatorOnLine from "@webfill/html-navigator/NavigatorOnLine.js";
import NavigatorConcurrentHardware from "@webfill/html-navigator/NavigatorConcurrentHardware.js";

@interface_("WorkerNavigator", false)
class WorkerNavigator {}

interface WorkerNavigator extends NavigatorID {}
includes(WorkerNavigator, NavigatorID);

interface WorkerNavigator extends NavigatorLanguage {}
includes(WorkerNavigator, NavigatorLanguage);

interface WorkerNavigator extends NavigatorOnLine {}
includes(WorkerNavigator, NavigatorOnLine);

interface WorkerNavigator extends NavigatorConcurrentHardware {}
includes(WorkerNavigator, NavigatorConcurrentHardware);

export default WorkerNavigator;
