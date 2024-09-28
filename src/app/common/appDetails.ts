import { appName } from "./utils/helpers"

export const getAppDetails = () => {
  return { name: appName, icon: window.location.origin + "/logo.png" }
}
