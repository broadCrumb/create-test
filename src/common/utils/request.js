import store from "@/store";
import constants from "@/common/constants";

export const request = async (url) => {
  try {
    const response = await fetch(`${constants.BASE_API_URL}/${url}`);

    if (response.status !== constants.STATUS_OK) {
      throw new Error();
    }

    return await response.json();
  } catch (e) {
    store.dispatch("notification/createNotification", {
      text: "An error occurred on the server",
      type: "error",
      duration: 3000,
    });
  }
};
