import { interface as interface_ } from "@webfill/webidl";
import type { Interface } from "@webfill/webidl";
import NavigatorID from "@webfill/html-navigator/NavigatorID.js";
import NavigatorLanguage from "@webfill/html-navigator/NavigatorLanguage.js";
import NavigatorOnLine from "@webfill/html-navigator/NavigatorOnLine.js";
import NavigatorConcurrentHardware from "@webfill/html-navigator/NavigatorConcurrentHardware.js";

@interface_("WorkerNavigator", false)
// @ts-ignore
class WorkerNavigator implements Interface {}

interface WorkerNavigator extends NavigatorID {}
WorkerNavigator._includes(NavigatorID);

interface WorkerNavigator extends NavigatorLanguage {}
WorkerNavigator._includes(NavigatorLanguage);

interface WorkerNavigator extends NavigatorOnLine {}
WorkerNavigator._includes(NavigatorOnLine);

interface WorkerNavigator extends NavigatorConcurrentHardware {}
WorkerNavigator._includes(NavigatorConcurrentHardware);

export default WorkerNavigator;
