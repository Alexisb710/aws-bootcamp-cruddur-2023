import { getAccessToken } from "lib/CheckAuth";

function isJsonResponse(response) {
  const contentType = response.headers.get("content-type");
  return contentType && contentType.indexOf("application/json") !== -1;
}

async function request(method, url, payload_data, options) {
  if (options.hasOwnProperty("setErrors")) {
    options.setErrors("");
  }
  let res;
  try {
    const attrs = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (options.hasOwnProperty("auth") && options.auth === true) {
      await getAccessToken();
      const access_token = localStorage.getItem("access_token");
      attrs.headers["Authorization"] = `Bearer ${access_token}`;
    }

    if (method !== "GET") {
      attrs.body = JSON.stringify(payload_data);
    }

    res = await fetch(url, attrs);

    if (isJsonResponse(res)) {
      let data = await res.json();
      if (res.status === 200) {
        options.success(data);
      } else {
        if (options.setErrors !== null) {
          options.setErrors(data);
        }
        console.log(res, data);
      }
    } else {
      const text = await res.text();
      console.error("HTML response received instead of JSON:", text);
      if (options.hasOwnProperty("setErrors")) {
        options.setErrors(["generic_500", text]);
      }
    }
  } catch (err) {
    console.log("request catch", err);
    if (err instanceof Response) {
      console.log("HTTP error detected:", err.status);
      if (options.hasOwnProperty("setErrors")) {
        options.setErrors([`generic_${err.status}`]);
      }
    } else {
      if (options.hasOwnProperty("setErrors")) {
        options.setErrors([`generic_500`]);
      }
    }
  }
}

export function post(url, payload_data, options) {
  request("POST", url, payload_data, options);
}

export function put(url, payload_data, options) {
  request("PUT", url, payload_data, options);
}

export function get(url, options) {
  request("GET", url, null, options);
}

export function destroy(url, payload_data, options) {
  request("DELETE", url, payload_data, options);
}
