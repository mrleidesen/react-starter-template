import type { Input, Options } from 'ky/distribution/types/options';

import ky from 'ky';

import { getToken } from '.';

export const request = async <T>(url: Input, options?: Options) => {
  const urlToString = url.toString();
  const isURLHasPrefixURL =
    urlToString.startsWith('http:') || urlToString.startsWith('https:');

  return await ky(url, {
    // FIXME: 自行设定 prefixUrl
    prefixUrl: isURLHasPrefixURL
      ? undefined
      : 'https://jsonplaceholder.typicode.com',
    hooks: {
      beforeRequest: [
        (request) => {
          // FIXME: 自行处理 headers
          const token = getToken();
          request.headers.set('Authorization', `Bearer ${token}`);
        },
      ],
      beforeError: [
        // FIXME: 自行处理错误拦截
        (error) => {
          const response = error.response;

          if (!response.ok) {
            console.log(`${response.status}:${response.statusText}`);
          }

          return error;
        },
      ],
    },
    ...options,
  }).json<T>();
};
