"use client";
import { Icon } from "@iconify/react";

/**
 * Client-side wrapper around Iconify's Icon component.
 * Icon uses "useState" internally and is not marked with "use client".
 */
const IconifyIcon: typeof Icon = (props) => <Icon ssr {...props} />;

export default IconifyIcon;
