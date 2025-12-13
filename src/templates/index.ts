import { isPage } from "~/page";

import "./spoiler";
import "./youtube";

if (isPage(["Template:MainPageInfopush", "Main_Page"]))
	mw.loader
		.using(["oojs-ui-core", "oojs-ui-windows"])
		.then(() => import("./infopush"));
