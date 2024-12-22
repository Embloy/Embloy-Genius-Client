"use client";
import { getCookie } from "cookies-next";
import { logout, claim_access_token } from "@/lib/api/auth";
import { siteConfig } from "@/config/site";

export const upload_profile_image = (file, router, recursive) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("image_url", file);
    fetch(`${siteConfig.core_api_url}/user/image`, {
      method: "POST",
      headers: new Headers({
        "Authorization": `Bearer ${getCookie("ep_access_token", { path: "/", domain: `${siteConfig.core_domain}` })}`,
      }),
      body: formData,
    })
      .then(async (response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 401 && !recursive) {
          await claim_access_token();
          return upload_profile_image(file, router, true);
        } else {
          throw new Error(response.statusText);
        }
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request or response
        console.error(error);
        reject(error);
      });
  });
};
export const delete_core = (path, router, body, recursive) => {
  return new Promise((resolve, reject) => {
    fetch(siteConfig.core_api_url + path, {
      method: "DELETE",
      headers: new Headers({
        "Authorization": `Bearer ${getCookie("ep_access_token", { path: "/", domain: `${siteConfig.core_domain}` })}`,
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(body),
    })
      .then(async (response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 401 && !recursive) {
          await claim_access_token();
          return delete_core(path, router, body, true);
        } else {
          throw new Error(response.statusText);
        }
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};
export const post_core = (path, router, body, recursive) => {
  return new Promise((resolve, reject) => {
    fetch(siteConfig.core_api_url + path, {
      method: "POST",
      headers: new Headers({
        "Authorization": `Bearer ${getCookie("ep_access_token", { path: "/", domain: `${siteConfig.core_domain}` })}`,
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(body),
    })
      .then(async (response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 401 && !recursive) {
          await claim_access_token();
          return post_core(path, router, body, true);
        } else {
          throw new Error(response.statusText);
        }
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

export const patch_core = (path, router, body, recursive) => {
  return new Promise((resolve, reject) => {
    fetch(siteConfig.core_api_url + path, {
      method: "PATCH",
      headers: new Headers({
        "Authorization": `Bearer ${getCookie("ep_access_token", { path: "/", domain: `${siteConfig.core_domain}` })}`,
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(body),
    })
      .then(async (response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 401 && !recursive) {
          await claim_access_token();
          return patch_core(path, router, body, true);
        } else {
          throw new Error(response.statusText);
        }
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

export const get_genius_query = (path) => {
  try {
    let url = siteConfig.core_api_url + path;
    return new Promise((resolve, reject) => {
      fetch(url, { method: "GET" })
        .then(async (response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            return response.status;
          }
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  } catch (e) {}
};

export const get_ops = (path, router, recursive = false) => {
  try {
    if (!getCookie("ep_refresh_token", { path: "/", domain: `${siteConfig.core_domain}` })) {
      throw new Error("No refresh token found");
    }
    let url = siteConfig.api_url + path;
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "text/plain",
          "Authorization": `Bearer ${getCookie("ep_access_token", { path: "/", domain: `${siteConfig.core_domain}` })}`,
        }),
      })
        .then(async (response) => {
          if (response.status === 200) {
            return response.json();
          } else if (response.status === 204 && !recursive) {
            return [];
          } else if (response.status === 401 && !recursive) {
            await claim_access_token();
            return get_ops(path, router, true);
          } else {
            throw new Error(response.statusText);
          }
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          // Handle any errors that occurred during the request or response
          console.error(error);
          reject(error);
        });
    });
  } catch (e) {
    logout();
  }
};
export const get_core = (path, router, recursive = false, method = "GET") => {
  try {
    if (!getCookie("ep_refresh_token", { path: "/", domain: `${siteConfig.core_domain}` })) {
      throw new Error("No refresh token found");
    }
    let url = siteConfig.core_api_url + path;
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: method,
        headers: new Headers({
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getCookie("ep_access_token", { path: "/", domain: `${siteConfig.core_domain}` })}`,
        }),
      })
        .then(async (response) => {
          if (response.status === 200) {
            return response.json();
          } else if (response.status === 204 && !recursive) {
            return [];
          } else if (response.status === 401 && !recursive) {
            await claim_access_token();
            return get_core(path, router, true);
          } else {
            throw new Error(response.statusText);
          }
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          // Handle any errors that occurred during the request or response
          console.error(error);
          reject(error);
        });
    });
  } catch (e) {
    logout();
  }
};
