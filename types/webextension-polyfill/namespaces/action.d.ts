//////////////////////////////////////////////////////
// BEWARE: DO NOT EDIT MANUALLY! Changes will be lost!
//////////////////////////////////////////////////////

import { Events } from "./events";
import { Tabs } from "./tabs";

/**
 * Namespace: browser.action
 */
export namespace Action {
    /**
     * Specifies to which tab or window the value should be set, or from which one it should be retrieved.
     * If no tab nor window is specified, the global value is set or retrieved.
     */
    interface Details {
        /**
         * When setting a value, it will be specific to the specified tab, and will automatically reset when the tab navigates.
         * When getting, specifies the tab to get the value from; if there is no tab-specific value,
         * the window one will be inherited.
         * Optional.
         */
        tabId?: number;

        /**
         * When setting a value, it will be specific to the specified window. When getting, specifies the window to get the value
         * from; if there is no window-specific value, the global one will be inherited.
         * Optional.
         */
        windowId?: number;
    }

    type ColorArray = [number, number, number, number];

    /**
     * Pixel data for an image. Must be an ImageData object (for example, from a <code>canvas</code> element).
     */
    interface ImageDataType extends ImageData {
        [s: string]: unknown;
    }

    /**
     * An array of four integers in the range [0,255] that make up the RGBA color of the badge. For example,
     * opaque red is <code>[255, 0, 0, 255]</code>. Can also be a string with a CSS value, with opaque red being <code>
     * #FF0000</code> or <code>#F00</code>.
     */
    type ColorValue = string | ColorArray | null;

    /**
     * Information sent when a browser action is clicked.
     */
    interface OnClickData {
        /**
         * An array of keyboard modifiers that were held while the menu item was clicked.
         */
        modifiers: OnClickDataModifiersItemEnum[];

        /**
         * An integer value of button by which menu item was clicked.
         * Optional.
         */
        button?: number;
    }

    interface SetTitleDetailsType extends Details {
        /**
         * The string the browser action should display when moused over.
         */
        title: string | null;
    }

    /**
     * The collection of user-specified settings relating to an extension's action.
     */
    interface GetUserSettingsCallbackUserSettingsType {
        /**
         * Whether the extension's action icon is visible on browser windows' top-level toolbar (i.e.,
         * whether the extension has been 'pinned' by the user).
         * Optional.
         */
        isOnToolbar?: boolean;
    }

    interface SetIconDetailsType extends Details {
        /**
         * Either an ImageData object or a dictionary {size -> ImageData} representing icon to be set.
         * If the icon is specified as a dictionary, the actual image to be used is chosen depending on screen's pixel density.
         * If the number of image pixels that fit into one screen space unit equals <code>scale</code>, then image with size <code>
         * scale</code> * 19 will be selected. Initially only scales 1 and 2 will be supported.
         * At least one image must be specified. Note that 'details.imageData = foo' is equivalent to 'details.
         * imageData = {'19': foo}'
         * Optional.
         */
        imageData?: ImageDataType | Record<string, ImageDataType>;

        /**
         * Either a relative image path or a dictionary {size -> relative image path} pointing to icon to be set.
         * If the icon is specified as a dictionary, the actual image to be used is chosen depending on screen's pixel density.
         * If the number of image pixels that fit into one screen space unit equals <code>scale</code>, then image with size <code>
         * scale</code> * 19 will be selected. Initially only scales 1 and 2 will be supported.
         * At least one image must be specified. Note that 'details.path = foo' is equivalent to 'details.imageData = {'19': foo}'
         * Optional.
         */
        path?: string | Record<string, string>;
    }

    interface SetPopupDetailsType extends Details {
        /**
         * The html file to show in a popup.  If set to the empty string (''), no popup is shown.
         */
        popup: string | null;
    }

    interface SetBadgeTextDetailsType extends Details {
        /**
         * Any number of characters can be passed, but only about four can fit in the space.
         */
        text: string | null;
    }

    interface SetBadgeBackgroundColorDetailsType extends Details {
        color: ColorValue;
    }

    interface SetBadgeTextColorDetailsType extends Details {
        color: ColorValue;
    }

    /**
     * An object with information about the popup to open.
     */
    interface OpenPopupOptionsType {
        /**
         * Defaults to the $(topic:current-window)[current window].
         * Optional.
         */
        windowId?: number;
    }

    type OnClickDataModifiersItemEnum = "Shift" | "Alt" | "Command" | "Ctrl" | "MacCtrl";

    interface Static {
        /**
         * Sets the title of the browser action. This shows up in the tooltip.
         */
        setTitle(details: SetTitleDetailsType): Promise<void>;

        /**
         * Gets the title of the browser action.
         */
        getTitle(details: Details): Promise<string>;

        /**
         * Returns the user-specified settings relating to an extension's action.
         */
        getUserSettings(): Promise<GetUserSettingsCallbackUserSettingsType>;

        /**
         * Sets the icon for the browser action. The icon can be specified either as the path to an image file or as the pixel data
         * from a canvas element, or as dictionary of either one of those. Either the <b>path</b> or the <b>imageData</b>
         * property must be specified.
         */
        setIcon(details: SetIconDetailsType): Promise<void>;

        /**
         * Sets the html document to be opened as a popup when the user clicks on the browser action's icon.
         */
        setPopup(details: SetPopupDetailsType): Promise<void>;

        /**
         * Gets the html document set as the popup for this browser action.
         */
        getPopup(details: Details): Promise<string>;

        /**
         * Sets the badge text for the browser action. The badge is displayed on top of the icon.
         */
        setBadgeText(details: SetBadgeTextDetailsType): Promise<void>;

        /**
         * Gets the badge text of the browser action. If no tab nor window is specified is specified,
         * the global badge text is returned.
         */
        getBadgeText(details: Details): Promise<string>;

        /**
         * Sets the background color for the badge.
         */
        setBadgeBackgroundColor(details: SetBadgeBackgroundColorDetailsType): Promise<void>;

        /**
         * Gets the background color of the browser action badge.
         */
        getBadgeBackgroundColor(details: Details): Promise<ColorArray>;

        /**
         * Sets the text color for the badge.
         */
        setBadgeTextColor(details: SetBadgeTextColorDetailsType): Promise<void>;

        /**
         * Gets the text color of the browser action badge.
         */
        getBadgeTextColor(details: Details): Promise<ColorArray>;

        /**
         * Enables the browser action for a tab. By default, browser actions are enabled.
         *
         * @param tabId Optional. The id of the tab for which you want to modify the browser action.
         */
        enable(tabId?: number): Promise<void>;

        /**
         * Disables the browser action for a tab.
         *
         * @param tabId Optional. The id of the tab for which you want to modify the browser action.
         */
        disable(tabId?: number): Promise<void>;

        /**
         * Checks whether the browser action is enabled.
         */
        isEnabled(details: Details): Promise<boolean>;

        /**
         * Opens the extension popup window in the specified window.
         *
         * @param options Optional. An object with information about the popup to open.
         */
        openPopup(options?: OpenPopupOptionsType): Promise<void>;

        /**
         * Fired when a browser action icon is clicked.  This event will not fire if the browser action has a popup.
         *
         * @param info Optional.
         */
        onClicked: Events.Event<(tab: Tabs.Tab, info: OnClickData | undefined) => void>;
    }
}
