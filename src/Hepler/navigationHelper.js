    // navigateHelper.js
    let navigateFunction;

    export const setNavigate = (navigate) => {
      navigateFunction = navigate;
    };

    export const navigateTo = (path) => {
      if (navigateFunction) {
        navigateFunction(path);
      } else {
        console.warn("navigateFunction not set. Cannot navigate.");
        // Optionally, use window.location.href for fallback if navigateFunction is not available
        // window.location.href = path;
      }
    };